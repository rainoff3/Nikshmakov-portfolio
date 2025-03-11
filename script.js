document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModalBtn = document.querySelector(".close");

    function openModal(videoUrl) {
        if (!videoUrl) return; // Проверка на пустой URL

        // Добавляем параметры для автовоспроизведения
        if (videoUrl.includes("vkvideo.ru")) {
            videoUrl += "&autoplay=1&mute=0";
        }

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
            const videoUrl = frame.getAttribute("onclick").match(/'(.*?)'/)[1]; // Берём URL из onclick
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

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Проверяем сохранённую тему
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Сохраняем выбор пользователя
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.removeItem("theme");
        }
    });
});

let isDarkMode = false; // Начальный режим - светлая тема

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        themeIcon.src = "icons/sun.png"; // Статичное изображение солнца
    } else {
        body.classList.add("dark-mode");
        themeIcon.src = "icons/moonsun.mp4"; // Видео
        const videoElement = document.createElement("video");
        videoElement.src = "icons/moonsun.mp4";
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.onended = function () {
            themeIcon.src = "icons/moon.png"; // Статичное изображение луны после видео
        };
        themeIcon.replaceWith(videoElement);
        videoElement.id = "theme-icon"; // Сохраняем ID
    }
}
