// Cover Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Click ripple effect
    document.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("click-effect");
        ripple.style.left = e.clientX - 25 + "px";
        ripple.style.top = e.clientY - 25 + "px";
        ripple.style.width = ripple.style.height = "50px";
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Photo frame interaction
    const photoFrame = document.querySelector(".photo-frame");
    photoFrame.addEventListener("click", function () {
        this.style.animation = "zoomIn 0.6s ease-out";
        setTimeout(() => {
            this.style.animation = "";
        }, 600);
    });

    // Add more butterflies dynamically
    function addButterfly() {
        const butterfly = document.createElement("div");
        butterfly.className = "butterfly";
        butterfly.innerHTML = Math.random() > 0.5 ? "🦋" : "🧚‍♀️";
        butterfly.style.left = "-5%";
        butterfly.style.top = Math.random() * 80 + "%";
        butterfly.style.animationDuration = 12 + Math.random() * 8 + "s";
        butterfly.style.animationDelay = Math.random() * 3 + "s";

        document.querySelector(".bg-elements").appendChild(butterfly);

        setTimeout(() => {
            butterfly.remove();
        }, 20000);
    }

    // Add butterfly every 5 seconds
    setInterval(addButterfly, 5000);

    // Add loading animation
    window.addEventListener("load", function () {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.5s ease-in-out";

        setTimeout(() => {
            document.body.style.opacity = "1";
        }, 100);
    });

    // Easter egg - double click on photo
    let photoClickCount = 0;
    photoFrame.addEventListener("click", function () {
        photoClickCount++;
        if (photoClickCount === 2) {
            // Create heart explosion
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.innerHTML = "💖";
                    heart.style.cssText = `
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        font-size: 20px;
                        pointer-events: none;
                        z-index: 1000;
                        animation: heartExplode 2s ease-out forwards;
                    `;

                    const angle = (i / 20) * Math.PI * 2;
                    const distance = 100 + Math.random() * 100;
                    heart.style.setProperty(
                        "--endX",
                        Math.cos(angle) * distance + "px"
                    );
                    heart.style.setProperty(
                        "--endY",
                        Math.sin(angle) * distance + "px"
                    );

                    this.appendChild(heart);

                    setTimeout(() => heart.remove(), 2000);
                }, i * 50);
            }
            photoClickCount = 0;
        }

        setTimeout(() => {
            if (photoClickCount === 1) photoClickCount = 0;
        }, 500);
    });
});

// Open invitation function
function openInvitation() {
    const button = document.querySelector(".cta-button");

    // Button animation
    button.style.transform = "scale(0.95)";
    button.style.background =
        "linear-gradient(135deg, #00a085 0%, #00b8b3 100%)";

    setTimeout(() => {
        button.style.transform = "scale(1)";
        // Redirect to invitation page
        createTransition();
    }, 200);
}

// Transition effect
function createTransition() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Dancing Script', cursive;
        font-size: 32px;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        animation: fadeIn 0.5s ease-in-out;
    `;
    overlay.innerHTML = "🌸 Membuka undangan... 🌸";

    document.body.appendChild(overlay);

    setTimeout(() => {
        // Redirect to invitation page
        window.location.href = "invitation.html";
    }, 1500);
}
