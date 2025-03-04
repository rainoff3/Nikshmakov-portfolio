document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    // Гарантируем, что модальное окно скрыто при загрузке страницы
    modal.style.display = "none";

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            modal.style.display = "flex";
            modalVideo.src = this.src; 
        });
    });

    closeBtn.addEventListener("click", function() {
        closeModal();
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        modalVideo.src = "";
    }
});
