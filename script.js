document.addEventListener("DOMContentLoaded", function () {
    const videoFrames = document.querySelectorAll(".video-frame");

    videoFrames.forEach(frame => {
        const videoId = frame.getAttribute("data-video-id");
        const previewSrc = frame.getAttribute("data-preview"); // Получаем путь к превью

        if (videoId && previewSrc) {
            // Устанавливаем превью как фон div
            frame.style.backgroundImage = `url('${previewSrc}')`;
            frame.style.backgroundSize = "cover";
            frame.style.backgroundPosition = "center";
            frame.style.cursor = "pointer";

            // Добавляем обработчик клика для открытия модального окна
            frame.addEventListener("click", function () {
                openModal(videoId);
            });
        }
    });

   function openModal(videoUrl) {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");

    modalVideo.src = videoUrl;
    modal.style.display = "block";
}

// Закрытие модального окна
document.querySelector(".close-modal").addEventListener("click", function() {
    const modal = document.getElementById("videoModal");
    modal.style.display = "none";
    document.getElementById("modalVideo").src = "";
});


    // Закрытие при клике вне модального окна
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("videoModal");
        if (event.target === modal) {
            modal.style.display = "none";
            document.getElementById("modalVideo").src = "";
        }
    });
});
