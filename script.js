document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModalBtn = document.querySelector(".close");

    function openModal(videoUrl) {
        if (!videoUrl) return; // Проверка на пустой URL

        modalVideo.src = videoUrl;
        modal.style.display = "flex"; // Делаем модалку видимой
        setTimeout(() => {
            modal.style.opacity = "1"; // Плавное появление
        }, 10);
    }

    function closeModal() {
        modal.style.opacity = "0"; // Плавное исчезновение
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = ""; // Очищаем видео, чтобы оно останавливалось
        }, 300);
    }

    document.querySelectorAll(".video-frame").forEach(frame => {
        frame.addEventListener("click", function () {
            const videoUrl = frame.getAttribute("onclick").match(/'(.*?)'/)[1]; // Берём URL из `onclick`
            openModal(videoUrl);
        });
    });

    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Убираем случайное появление при загрузке
    modal.style.display = "none";
});
