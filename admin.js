(() => {
const OWNER="rainoff3", REPO="Nikshmakov-portfolio", BRANCH="main";
const API=`https://api.github.com/repos/${OWNER}/${REPO}/contents`;
let token="";
const $=id=>document.getElementById(id);
const headers=()=>({"Accept":"application/vnd.github+json","Authorization":"Bearer "+token,"X-GitHub-Api-Version":"2022-11-28"});
function status(id,message,ok=true){const el=$(id);el.textContent=message;el.className="status "+(ok?"ok":"error");}
async function getFile(path){
 const response=await fetch(`${API}/${path}?ref=${BRANCH}`,{headers:headers()});
 const body=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(`GitHub API (${response.status}): ${body.message||response.statusText}`);
 return body;
}
$("checkToken").addEventListener("click",async()=>{
 token=$("token").value.trim();
 if(!token)return status("connectionStatus","Сначала вставь токен.",false);
 const button=$("checkToken");button.disabled=true;
 try{await getFile("index.html");status("connectionStatus","Подключение успешно. Можно публиковать видео.");}
 catch(error){status("connectionStatus",error.message,false);}
 finally{button.disabled=false;}
});
$("cover").addEventListener("change",()=>{
 const file=$("cover").files[0],preview=$("coverPreview");
 if(!file){preview.style.display="none";return;}
 if(!["image/jpeg","image/png","image/webp"].includes(file.type)){status("publishStatus","Выбери JPG, PNG или WebP.",false);$("cover").value="";return;}
 preview.src=URL.createObjectURL(file);preview.style.display="block";
});
function slugify(value){
 const map={а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"};
 return value.toLowerCase().trim().replace(/[а-яё]/g,ch=>map[ch]||"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"video";
}
async function compressImage(file){
 const bitmap=await createImageBitmap(file),max=1800,scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
 const canvas=document.createElement("canvas");canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
 canvas.getContext("2d").drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/webp",0.82));
 if(!blob)throw new Error("Не удалось обработать обложку.");
 if(blob.size>8*1024*1024)throw new Error("Обложка слишком большая после сжатия. Выбери другое изображение.");
 return blob;
}
function toBase64(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]);reader.onerror=reject;reader.readAsDataURL(blob);});}
async function putFile(path,content,message){
 let sha;
 try{sha=(await getFile(path)).sha;}catch(error){if(!String(error.message).includes("(404)"))throw error;}
 const response=await fetch(`${API}/${path}`,{method:"PUT",headers:{...headers(),"Content-Type":"application/json"},body:JSON.stringify({message,content,branch:BRANCH,...(sha?{sha}:{})})});
 const body=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(body.message||`Не удалось записать ${path}`);
 return body;
}
$("videoForm").addEventListener("submit",async event=>{
 event.preventDefault();
 if(!token)return status("publishStatus","Сначала проверь GitHub-токен в первом блоке.",false);
 const url=$("videoUrl").value.trim(),title=$("videoTitle").value.trim(),category=$("category").value,format=$("format").value,file=$("cover").files[0];
 if(!file)return status("publishStatus","Добавь обложку.",false);
 try{if(new URL(url).protocol!=="https:")throw new Error("Ссылка должна начинаться с https://");}catch(error){return status("publishStatus",error.message||"Проверь ссылку на видео.",false);}
 const button=$("publish");button.disabled=true;button.textContent="Публикую...";
 try{
  const blob=await compressImage(file),filename=`${slugify(title)}-${Date.now()}.webp`,coverPath=`previews/${filename}`;
  await putFile(coverPath,await toBase64(blob),`Add cover: ${title}`);
  let videos=[];
  try{const fileData=await getFile("videos.json");videos=JSON.parse(decodeURIComponent(escape(atob(fileData.content.replace(/\n/g,"")))));if(!Array.isArray(videos))videos=[];}
  catch(error){if(!String(error.message).includes("(404)"))throw error;}
  videos.push({id:String(Date.now()),title,url,category,format,cover:coverPath});
  const json=JSON.stringify(videos,null,2)+"\n",encoded=btoa(unescape(encodeURIComponent(json)));
  await putFile("videos.json",encoded,`Publish video: ${title}`);
  status("publishStatus","Готово! Видео опубликовано в GitHub. На сайте оно появится после обновления GitHub Pages.");
  $("videoForm").reset();$("coverPreview").style.display="none";
 }catch(error){status("publishStatus","Ошибка публикации: "+error.message,false);}
 finally{button.disabled=false;button.textContent="Опубликовать видео";}
});
})();