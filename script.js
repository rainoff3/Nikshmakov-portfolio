document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModalBtn = document.querySelector(".close");

    function openModal(videoUrl) {
        modalVideo.src = videoUrl;
        modal.classList.add("show");
    }

    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modalVideo.src = ""; // Очищаем src, чтобы видео останавливалось
        }, 300);
    }

    document.querySelectorAll(".video-frame").forEach(frame => {
        frame.addEventListener("click", function () {
            const videoUrl = frame.getAttribute("data-video-url");
            if (videoUrl) {
                openModal(videoUrl);
            }
        });
    });

    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // **Фикс бага с появлением при загрузке**  
    modal.classList.remove("show"); 
});
