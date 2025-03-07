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
    const sunGif = document.getElementById('sun-gif');
    const moonGif = document.getElementById('moon-gif');
    
    // Проверяем текущую тему
    if (isDarkMode) {
        // Переключаем на светлую тему
        body.classList.remove('dark-mode');
        sunGif.style.display = 'block';  // Показываем гифку с солнцем
        moonGif.style.display = 'none'; // Скрываем гифку с луной

        // Запускаем гифку с солнцем
        sunGif.style.animation = 'none';  // Сбрасываем анимацию
        sunGif.offsetHeight;  // Форсируем перерисовку
        sunGif.style.animation = 'play-sun 1s forwards';  // Анимация солнца
    } else {
        // Переключаем на тёмную тему
        body.classList.add('dark-mode');
        sunGif.style.display = 'none';  // Скрываем гифку с солнцем
        moonGif.style.display = 'block'; // Показываем гифку с луной

        // Запускаем гифку с луной
        moonGif.style.animation = 'none';  // Сбрасываем анимацию
        moonGif.offsetHeight;  // Форсируем перерисовку
        moonGif.style.animation = 'play-moon 1s forwards';  // Анимация луны
    }

    // Замораживаем гифки после проигрывания
    sunGif.style.animation = 'freeze 0s forwards';
    moonGif.style.animation = 'freeze 0s forwards';

    // Меняем состояние
    isDarkMode = !isDarkMode;
}

/* Ключевые кадры для анимаций */
@keyframes play-sun {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1); /* Можно добавить эффект, если гифка поддается */
    }
}

@keyframes play-moon {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1); /* Можно добавить эффект */
    }
}

