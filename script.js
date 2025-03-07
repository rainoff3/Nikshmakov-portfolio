document.addEventListener("DOMContentLoaded", function () {
    // ---- Видео в модальном окне ----
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModalBtn = document.querySelector(".close");

    function openModal(videoUrl) {
        if (!videoUrl) return;

        if (videoUrl.includes("vkvideo.ru")) {
            videoUrl += "&autoplay=1&mute=0";
        }

        modalVideo.src = videoUrl;
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
    }

    function closeModal() {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = "";
        }, 300);
    }

    document.querySelectorAll(".video-frame").forEach(frame => {
        frame.addEventListener("click", function () {
            const videoUrl = frame.getAttribute("onclick").match(/'(.*?)'/)[1];
            openModal(videoUrl);
        });
    });

    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    modal.style.display = "none";

    // ---- Переключение темы ----
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    function setTheme(dark) {
        if (dark) {
            body.classList.add("dark-mode");
            themeIcon.src = "icons/moon.png";
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            themeIcon.src = "icons/sun.png";
            localStorage.removeItem("theme");
        }
    }

    // Проверяем сохранённую тему
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setTheme(isDarkMode);

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Проверяем сохранённую тему
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeIcon.src = "icons/moon.png"; // Луна
    }

    themeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            themeIcon.src = "icons/sun.png"; // Солнце
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-mode");
            themeIcon.src = "icons/moon.png"; // Луна
            localStorage.setItem("theme", "dark");
        }
    });
});

});

