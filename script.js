document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    // Убедимся, что модальное окно скрыто при загрузке страницы
    modal.style.display = "none";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    modal.style.transition = "opacity 0.3s ease-in-out";

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            modal.style.display = "flex";
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
            }, 10);
            modalVideo.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = "";
        }, 300);
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.opacity = "0";
            modal.style.visibility = "hidden";
            setTimeout(() => {
                modal.style.display = "none";
                modalVideo.src = "";
            }, 300);
        }
    });
});
