document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            const videoId = this.getAttribute("data-video-id");
            if (videoId) {
                modalVideo.src = `https://vkvideo.ru/video_ext.php?oid=226153973&id=${videoId}&hd=2`;
                modal.style.display = "flex";
            }
        });
    });

    function closeModal() {
        modal.style.display = "none";
        setTimeout(() => {
            modalVideo.src = ""; // Очистка src после закрытия
        }, 300);
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
