document.addEventListener("DOMContentLoaded", function() {
    const videoFrames = document.querySelectorAll(".video-frame");
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    videoFrames.forEach(video => {
        video.addEventListener("click", function() {
            modal.style.display = "flex";
            modalVideo.src = this.getAttribute("src"); 
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        modalVideo.src = "";
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalVideo.src = "";
        }
    });
});
