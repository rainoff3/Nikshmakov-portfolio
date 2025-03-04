document.addEventListener("DOMContentLoaded", function () {
    // Получаем элементы
    const videoFrames = document.querySelectorAll(".video-frame");
    const modalBackground = document.querySelector(".modalBackground");
    const modalClose = document.querySelector(".modalClose");
    const modalActive = document.querySelector(".modalActive");
    const modalVideo = document.getElementById("modalVideo");

    // Скрываем модальное окно при загрузке
    modalBackground.style.display = "none";

    // Открытие модального окна по клику на видео
    videoFrames.forEach(video => {
        video.addEventListener("click", function (event) {
            event.preventDefault();

            const videoSrc = this.getAttribute("src"); // Получаем URL видео

            if (videoSrc) {
                modalVideo.src = videoSrc;
                modalBackground.style.display = "flex";
            }
        });
    });

    // Закрытие модального окна по кнопке
    modalClose.addEventListener("click", function () {
        closeModal();
    });

    // Закрытие при клике вне окна
    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            closeModal();
        }
    });

    // Функция закрытия модального окна
    function closeModal() {
        modalBackground.style.display = "none";
        modalVideo.src = ""; // Очищаем видео
    }
});
