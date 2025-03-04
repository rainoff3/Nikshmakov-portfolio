document.addEventListener("DOMContentLoaded", function () {
    const modal = document.createElement("div");
    modal.classList.add("video-modal");
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="close-modal">&times;</span>
            <iframe class="modal-video" src="" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    const modalVideo = modal.querySelector(".modal-video");
    const closeModal = modal.querySelector(".close-modal");

    document.querySelectorAll(".video-container iframe").forEach(video => {
        video.addEventListener("click", function (event) {
            event.preventDefault();
            modalVideo.src = this.src;
            modal.classList.add("open");
        });
    });

    closeModal.addEventListener("click", function () {
        modal.classList.remove("open");
        modalVideo.src = ""; // Очищаем src, чтобы видео останавливалось
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("open");
            modalVideo.src = "";
        }
    });
});
