document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            const videoId = this.getAttribute("data-video-id");
            modalVideo.src = `https://vkvideo.ru/video_ext.php?oid=226153973&id=${videoId}&hd=2`;
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        modalVideo.src = "";
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalVideo.src = "";
        }
    });
});
