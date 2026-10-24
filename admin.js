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
function decodeContent(value){return decodeURIComponent(escape(atob(value.replace(/\n/g,""))));}
async function readVideos(){
 try{const file=await getFile("videos.json");const videos=JSON.parse(decodeContent(file.content));return Array.isArray(videos)?videos:[];}
 catch(error){if(String(error.message).includes("(404)"))return [];throw error;}
}
async function putFile(path,content,message){
 let sha;
 try{sha=(await getFile(path)).sha;}catch(error){if(!String(error.message).includes("(404)"))throw error;}
 const response=await fetch(`${API}/${path}`,{method:"PUT",headers:{...headers(),"Content-Type":"application/json"},body:JSON.stringify({message,content,branch:BRANCH,...(sha?{sha}:{})})});
 const body=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(body.message||`Не удалось записать ${path}`);
 return body;
}
async function deleteFile(path){
 const file=await getFile(path);
 const response=await fetch(`${API}/${path}`,{method:"DELETE",headers:{...headers(),"Content-Type":"application/json"},body:JSON.stringify({message:"Delete unused video cover",sha:file.sha,branch:BRANCH})});
 const body=await response.json().catch(()=>({}));
 if(!response.ok && response.status!==404)throw new Error(body.message||`Не удалось удалить ${path}`);
}
async function loadVideoList(){
 const list=$("videoList");list.textContent="Загружаю...";
 try{
  const videos=await readVideos();list.replaceChildren();
  if(!videos.length){list.textContent="Пока нет видео, добавленных через админ-панель.";return;}
  videos.forEach((video,index)=>{
   const row=document.createElement("div");row.className="video-row";
   const info=document.createElement("div");info.className="video-info";
   const name=document.createElement("strong");name.textContent="Видео "+(index+1);
   const meta=document.createElement("div");meta.className="video-meta";
   const category={events:"Съёмка мероприятий",commercial:"Коммерческая съёмка",personal:"Для души"}[video.category]||"Без категории";
   meta.textContent=category+" · "+(video.format==="vertical"?"Вертикальное":"Горизонтальное");
   info.append(name,meta);
   const button=document.createElement("button");button.type="button";button.className="delete-btn";button.textContent="Удалить";
   button.addEventListener("click",()=>removeVideo(video,button));
   row.append(info,button);list.append(row);
  });
 }catch(error){list.textContent="Не удалось загрузить список: "+error.message;}
}
async function removeVideo(video,button){
 if(!confirm("Удалить это видео с сайта?"))return;
 button.disabled=true;
 try{
  const videos=await readVideos(),remaining=videos.filter(item=>String(item.id)!==String(video.id));
  if(remaining.length===videos.length)throw new Error("Видео уже отсутствует в списке.");
  await putFile("videos.json",btoa(unescape(encodeURIComponent(JSON.stringify(remaining,null,2)+"\n"))),"Remove video from portfolio");
  if(video.cover && !remaining.some(item=>item.cover===video.cover)){
   try{await deleteFile(video.cover);}catch(error){status("deleteStatus","Видео удалено с сайта, но обложку удалить не удалось: "+error.message,false);await loadVideoList();return;}
  }
  status("deleteStatus","Видео удалено. Сайт обновится после публикации GitHub Pages.");
  await loadVideoList();
 }catch(error){status("deleteStatus","Не удалось удалить видео: "+error.message,false);button.disabled=false;}
}
$("checkToken").addEventListener("click",async()=>{
 token=$("token").value.trim();
 if(!token)return status("connectionStatus","Сначала вставь токен.",false);
 const button=$("checkToken");button.disabled=true;
 try{await getFile("index.html");status("connectionStatus","Подключение успешно. Можно управлять видео.");await loadVideoList();}
 catch(error){status("connectionStatus",error.message,false);}
 finally{button.disabled=false;}
});
$("loadVideos").addEventListener("click",loadVideoList);
$("cover").addEventListener("change",()=>{
 const file=$("cover").files[0],preview=$("coverPreview");
 if(!file){preview.style.display="none";return;}
 if(!["image/jpeg","image/png","image/webp"].includes(file.type)){status("publishStatus","Выбери JPG, PNG или WebP.",false);$("cover").value="";return;}
 preview.src=URL.createObjectURL(file);preview.style.display="block";
});
function slugify(value){return value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"video";}
async function compressImage(file){
 const bitmap=await createImageBitmap(file),max=1800,scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
 const canvas=document.createElement("canvas");canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
 canvas.getContext("2d").drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/webp",0.82));
 if(!blob)throw new Error("Не удалось обработать обложку.");
 if(blob.size>8*1024*1024)throw new Error("Обложка слишком большая после сжатия.");
 return blob;
}
function toBase64(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]);reader.onerror=reject;reader.readAsDataURL(blob);});}
$("videoForm").addEventListener("submit",async event=>{
 event.preventDefault();
 if(!token)return status("publishStatus","Сначала проверь GitHub-токен в первом блоке.",false);
 const url=$("videoUrl").value.trim(),category=$("category").value,format=$("format").value,file=$("cover").files[0];
 if(!file)return status("publishStatus","Добавь обложку.",false);
 try{if(new URL(url).protocol!=="https:")throw new Error("Ссылка должна начинаться с https://");}catch(error){return status("publishStatus",error.message||"Проверь ссылку.",false);}
 const button=$("publish");button.disabled=true;button.textContent="Публикую...";
 try{
  const blob=await compressImage(file),filename="video-"+Date.now()+".webp",coverPath="previews/"+filename;
  await putFile(coverPath,await toBase64(blob),"Add video cover");
  const videos=await readVideos();
  videos.push({id:String(Date.now()),url,category,format,cover:coverPath});
  await putFile("videos.json",btoa(unescape(encodeURIComponent(JSON.stringify(videos,null,2)+"\n"))),"Publish video");
  status("publishStatus","Готово! Видео опубликовано. На сайте оно появится после обновления GitHub Pages.");
  $("videoForm").reset();$("coverPreview").style.display="none";await loadVideoList();
 }catch(error){status("publishStatus","Ошибка публикации: "+error.message,false);}
 finally{button.disabled=false;button.textContent="Опубликовать видео";}
});
})();