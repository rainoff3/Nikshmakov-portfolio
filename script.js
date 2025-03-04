document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalContent = document.querySelector(".modal-content");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    // По умолчанию скрываем модальное окно
    modal.style.display = "none";

    videoFrames.forEach(video => {
        video.addEventListener("click", function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение
            const videoSrc = this.getAttribute("src"); // Получаем ссылку на видео
            
            if (videoSrc) {
                modalVideo.src = videoSrc; // Устанавливаем видео в модальное окно
                modal.style.display = "flex"; // Показываем модальное окно
            }
        });
    });

    closeBtn.addEventListener("click", function() {
        closeModal();
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        modalVideo.src = ""; // Очищаем src, чтобы видео останавливалось
    }
});
