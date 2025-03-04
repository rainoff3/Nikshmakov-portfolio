document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalContent = document.querySelector(".modal-content");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    // Скрываем модальное окно при загрузке
    modal.style.display = "none";

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            const videoSrc = this.getAttribute("src"); // Получаем URL видео
            modalVideo.src = videoSrc; 
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function() {
        closeModal();
    });

    modal.addEventListener("click", function(event) {
        // Закрываем модальное окно только если клик был вне контента (фон)
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        modalVideo.src = ""; // Очищаем src, чтобы видео остановилось
    }
});
