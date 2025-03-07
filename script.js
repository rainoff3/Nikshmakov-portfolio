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
    const sunVideo = document.getElementById('sun-video');
    const moonVideo = document.getElementById('moon-video');
    
    // Проверяем текущую тему
    if (isDarkMode) {
        // Переключаем на светлую тему
        body.classList.remove('dark-mode');
        sunVideo.style.display = 'block';  // Показываем видео с солнцем
        moonVideo.style.display = 'none'; // Скрываем видео с луной
        moonVideo.pause();  // Останавливаем видео с луной
        sunVideo.play();    // Запускаем видео с солнцем
    } else {
        // Переключаем на тёмную тему
        body.classList.add('dark-mode');
        sunVideo.style.display = 'none';  // Скрываем видео с солнцем
        moonVideo.style.display = 'block'; // Показываем видео с луной
        sunVideo.pause();  // Останавливаем видео с солнцем
        moonVideo.play();  // Запускаем видео с луной
    }

    // Меняем состояние
    isDarkMode = !isDarkMode;
}


