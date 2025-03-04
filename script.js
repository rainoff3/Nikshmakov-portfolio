document.addEventListener("DOMContentLoaded", function () {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    videoFrames.forEach(frame => {
        const videoUrl = frame.getAttribute("data-video-url"); // Поменяли атрибут для понятности
        const previewSrc = frame.getAttribute("data-preview"); 

        if (videoUrl && previewSrc) {
            frame.style.backgroundImage = `url('${previewSrc}')`;
            frame.style.backgroundSize = "cover";
            frame.style.backgroundPosition = "center";
            frame.style.cursor = "pointer";

            frame.addEventListener("click", function () {
                openModal(videoUrl);
            });
        }
    });

    function openModal(videoUrl) {
        console.log("Открываем модалку с видео:", videoUrl); // Проверка
        modalVideo.src = videoUrl; 
        modal.classList.add("show");
    }

    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modalVideo.src = ""; 
        }, 300);
    }

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.openModal = openModal;
});
