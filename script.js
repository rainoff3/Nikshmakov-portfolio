document.addEventListener("DOMContentLoaded", function () {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeModal = document.querySelector(".close");

    videoFrames.forEach(frame => {
        const videoId = frame.getAttribute("data-video-id");

        // Устанавливаем фоновое изображение и иконку Play
        frame.style.background = `url('https://vk.com/images/video_preview.jpg') center/cover`;
        frame.style.display = "flex";
        frame.style.alignItems = "center";
        frame.style.justifyContent = "center";
        frame.style.cursor = "pointer";
        frame.innerHTML = `<span style="font-size: 50px; color: white;">▶</span>`;

        frame.addEventListener("click", () => {
            modalVideo.src = `https://vkvideo.ru/video_ext.php?oid=226153973&id=${videoId}&hd=2`;
            modal.classList.add("show");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
        modalVideo.src = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modalVideo.src = "";
        }
    });
});
