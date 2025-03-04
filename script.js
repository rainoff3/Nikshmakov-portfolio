document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    // Скрываем модальное окно при загрузке
    modal.style.display = "none";

    videoFrames.forEach(video => {
        video.addEventListener("click", function(event) {
            event.preventDefault(); // Блокируем стандартное поведение

            const videoSrc = this.getAttribute("src"); // Получаем URL видео

            if (videoSrc) {
                // Добавляем полный URL для iframe
                modalVideo.src = videoSrc;
                modal.style.display = "flex"; // Показываем модальное окно
            }
        });
    });

    // Закрываем окно при клике на кнопку закрытия
    closeBtn.addEventListener("click", function() {
        closeModal();
    });

    // Закрываем окно при клике за пределами видео
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = "none";
        modalVideo.src = ""; // Очищаем src, чтобы остановить видео
    }
});
