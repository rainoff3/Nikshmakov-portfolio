document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeButton = document.querySelector(".close");

    function openModal(url) {
        if (!url || !modal || !modalVideo) return;
        modalVideo.src = url;
        modal.style.display = "flex";
        requestAnimationFrame(() => modal.style.opacity = "1");
    }

    function closeModal() {
        if (!modal || !modalVideo) return;
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = "";
        }, 300);
    }

    document.addEventListener("click", event => {
        const frame = event.target.closest(".video-frame[data-video-url]");
        if (frame) {
            openModal(frame.dataset.videoUrl);
            return;
        }
        if (event.target === closeButton || event.target.closest(".close") || event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal && modal.style.display !== "none") closeModal();
    });

    if (modal) {
        modal.style.display = "none";
        modal.style.opacity = "0";
    }

    fetch("videos.json?t=" + Date.now())
        .then(response => {
            if (!response.ok) throw new Error("Не удалось загрузить videos.json");
            return response.json();
        })
        .then(videos => {
            if (!Array.isArray(videos)) return;
            videos.forEach(video => {
                const container = document.querySelector('.video-container[data-category="' + video.category + '"]');
                if (!container || !video.url || !video.cover || !video.format) return;

                const card = document.createElement("article");
                card.className = "video-card";

                const frame = document.createElement("div");
                frame.className = "video-frame " + (video.format === "vertical" ? "vertical" : "horizontal");
                frame.dataset.videoUrl = video.url;
                frame.setAttribute("role", "button");
                frame.setAttribute("tabindex", "0");
                frame.setAttribute("aria-label", "Открыть видео: " + (video.title || "Видео"));

                const image = document.createElement("img");
                image.src = video.cover;
                image.alt = video.title || "Превью видео";
                image.loading = "lazy";
                frame.appendChild(image);

                frame.addEventListener("keydown", event => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openModal(video.url);
                    }
                });

                const caption = document.createElement("div");
                caption.className = "video-caption";
                caption.textContent = video.title || "";

                card.append(frame, caption);
                container.appendChild(card);
            });
        })
        .catch(error => console.warn("Портфолио:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    if (!themeToggle || !themeIcon) return;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeIcon.src = "icons/moon.png";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const dark = body.classList.contains("dark-mode");
        themeIcon.style.opacity = "0";
        setTimeout(() => {
            themeIcon.src = dark ? "icons/moon.png" : "icons/sun.png";
            themeIcon.style.opacity = "1";
        }, 200);
        localStorage.setItem("theme", dark ? "dark" : "light");
    });
});
