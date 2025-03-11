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
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Проверяем сохранённую тему и обновляем иконку
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeIcon.src = "icons/moon.png"; // Устанавливаем луну
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Меняем иконку в зависимости от темы
        if (body.classList.contains("dark-mode")) {
            themeIcon.style.opacity = "0";
            setTimeout(() => {
                themeIcon.src = "icons/moon.png"; // Меняем на луну
                themeIcon.style.opacity = "1";
            }, 200);
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.style.opacity = "0";
            setTimeout(() => {
                themeIcon.src = "icons/sun.png"; // Меняем на солнце
                themeIcon.style.opacity = "1";
            }, 200);
            localStorage.setItem("theme", "light");
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Добавляем класс, если элемент в зоне видимости
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => observer.observe(element));
    });
});
