let audioPlaying = false;
let audioElement = null;
let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;

    audioElement = document.getElementById("backgroundAudio");
    if (audioElement) {
        const unlockPromise = audioElement.play();

        if (unlockPromise !== undefined) {
            unlockPromise
                .then(() => {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                    audioUnlocked = true;
                    console.log("Audio context unlocked");
                })
                .catch((error) => {
                    console.log("Audio unlock failed:", error);
                    const audioContext = new (window.AudioContext ||
                        window.webkitAudioContext)();
                    if (audioContext.state === "suspended") {
                        audioContext.resume().then(() => {
                            audioUnlocked = true;
                            console.log("Audio context resumed");
                        });
                    }
                });
        }
    }
}

function toggleAudio() {
    audioElement = document.getElementById("backgroundAudio");
    const audioBtn = document.getElementById("audioBtn");
    const audioIcon = document.getElementById("audioIcon");

    if (!audioUnlocked) {
        unlockAudio();
    }

    if (audioPlaying) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioIcon.textContent = "🔇";
        audioBtn.classList.remove("playing");
        audioPlaying = false;
    } else {
        const playPromise = audioElement.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    audioIcon.textContent = "🔊";
                    audioBtn.classList.add("playing");
                    audioPlaying = true;
                    audioUnlocked = true;
                })
                .catch((error) => {
                    console.log("Audio play failed:", error);

                    audioIcon.textContent = "⌘";
                    audioBtn.title =
                        "Audio tidak dapat diputar. Coba refresh halaman.";

                    setTimeout(() => {
                        audioIcon.textContent = "🔇";
                        audioBtn.title = "Putar Musik";
                        unlockAudio();
                    }, 2000);
                });
        }
    }
}

function showAudioToggle() {
    const audioToggle = document.getElementById("audioToggle");
    if (audioToggle) {
        setTimeout(() => {
            audioToggle.style.opacity = "1";
            audioToggle.style.visibility = "visible";
            audioToggle.style.transform = "translateY(0)";
        }, 1500);
    }
}

function openInvitation() {
    const coverPage = document.getElementById("coverPage");
    const mainContent = document.getElementById("mainContent");

    coverPage.style.transform = "translateY(-100vh)";
    coverPage.style.transition =
        "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    setTimeout(() => {
        coverPage.style.display = "none";
        mainContent.classList.add("active");
        initFastScrollAnimations();
        addSmoothScrollEffects();
        showAudioToggle();
    }, 1000);
}

// Updated function with new Google Maps link
function openGoogleMaps() {
    window.open("https://maps.app.goo.gl/djweLPrND6ViMA1DA", "_blank");
}

function initFastScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                setTimeout(() => {
                    element.classList.add("visible");
                    addSpecialAnimations(element);
                }, 20);

                if (
                    element.classList.contains("section-title") &&
                    element.textContent.includes("Waktu dan Tempat")
                ) {
                    setTimeout(() => {
                        const eventDetails =
                            document.querySelector(".event-details");
                        if (
                            eventDetails &&
                            !eventDetails.classList.contains("visible")
                        ) {
                            eventDetails.classList.add("visible");
                        }
                    }, 100);

                    setTimeout(() => {
                        const mapEmbed = document.querySelector(".map-embed");
                        if (
                            mapEmbed &&
                            !mapEmbed.classList.contains("visible")
                        ) {
                            mapEmbed.classList.add("visible");
                        }
                    }, 200);

                    setTimeout(() => {
                        const mapBtn = document.querySelector(".map-btn");
                        if (mapBtn && !mapBtn.classList.contains("visible")) {
                            mapBtn.classList.add("visible");
                        }
                    }, 300);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-fade, .scroll-animate").forEach((el) => {
        observer.observe(el);
    });
}

function addSpecialAnimations(element) {
    const smoothCurve = "cubic-bezier(0.23, 1, 0.32, 1)";

    if (element.classList.contains("sanskrit-image")) {
        element.style.transition = `all 0.6s ${smoothCurve}`;
        element.style.transform = "translateY(0) rotate(360deg)";
        setTimeout(() => {
            element.style.transform = "translateY(0) rotate(0deg)";
        }, 600);
    }

    if (element.classList.contains("baby-portrait")) {
        element.style.transition = `all 0.5s ${smoothCurve}`;
        element.style.transform = "scale(0.85) rotate(-2deg)";
        setTimeout(() => {
            element.style.transform = "scale(1) rotate(0deg)";
        }, 50);
    }

    if (element.classList.contains("ornament-img")) {
        element.style.animation = `pulse 1s ${smoothCurve}`;
        setTimeout(() => {
            element.style.animation = "";
        }, 1000);
    }

    if (element.classList.contains("divider-img")) {
        element.style.transition = `all 0.5s ${smoothCurve}`;
        element.style.transform = "translateY(0) scaleX(0)";
        setTimeout(() => {
            element.style.transform = "translateY(0) scaleX(1)";
        }, 50);
    }

    if (element.classList.contains("event-details")) {
        element.style.transition = `all 0.5s ${smoothCurve}`;
        element.style.transform = "translateX(-30px) scale(0.97)";
        setTimeout(() => {
            element.style.transform = "translateX(0) scale(1)";
        }, 50);
    }

    if (element.classList.contains("map-embed")) {
        element.style.transition = `all 0.5s ${smoothCurve}`;
        element.style.transform = "translateY(15px) scale(0.97)";
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.transform = "translateY(0) scale(1)";
            element.style.opacity = "1";
        }, 30);
    }

    if (element.classList.contains("map-btn")) {
        element.style.transition = `all 0.5s ${smoothCurve}`;
        element.style.transform = "translateY(10px) scale(0.92)";
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.transform = "translateY(0) scale(1)";
            element.style.opacity = "1";
            element.style.animation = `bounce-in 0.6s ${smoothCurve}`;
        }, 30);
    }
}

function initSuperSmoothHoverEffects() {
    const smoothCurve = "cubic-bezier(0.23, 1, 0.32, 1)";

    const babyPortraits = document.querySelectorAll(".baby-portrait");
    babyPortraits.forEach((portrait) => {
        portrait.addEventListener("mouseenter", function () {
            this.style.transition = `all 0.6s ${smoothCurve}`;
            this.style.transform = "scale(1.1) rotate(3deg)";
            this.style.boxShadow =
                "0 0 40px rgba(210, 105, 30, 0.4), 0 25px 50px rgba(0, 0, 0, 0.35)";
            this.style.filter = "brightness(1.1) saturate(1.2)";
            this.style.zIndex = "10";
        });

        portrait.addEventListener("mouseleave", function () {
            this.style.transition = `all 0.6s ${smoothCurve}`;
            this.style.transform = "scale(1) rotate(0deg)";
            this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
            this.style.filter = "brightness(1) saturate(1)";
            this.style.zIndex = "1";
        });
    });

    const sanskritImg = document.querySelector(".sanskrit-image");
    if (sanskritImg) {
        sanskritImg.addEventListener("mouseenter", function () {
            this.style.transition = `all 0.4s ${smoothCurve}`;
            this.style.transform = "scale(1.1) rotate(5deg)";
            this.style.filter =
                "drop-shadow(0 10px 25px rgba(210, 105, 30, 0.4)) brightness(1.2)";
        });

        sanskritImg.addEventListener("mouseleave", function () {
            this.style.transition = `all 0.4s ${smoothCurve}`;
            this.style.transform = "scale(1) rotate(0deg)";
            this.style.filter = "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))";
        });
    }

    const ornamentImg = document.querySelector(".ornament-img");
    if (ornamentImg) {
        ornamentImg.addEventListener("mouseenter", function () {
            this.style.transition = `all 0.6s ${smoothCurve}`;
            this.style.transform = "rotate(360deg) scale(1.15)";
            this.style.filter = "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3))";
        });

        ornamentImg.addEventListener("mouseleave", function () {
            this.style.transition = `all 0.6s ${smoothCurve}`;
            this.style.transform = "rotate(0deg) scale(1)";
            this.style.filter = "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2))";
        });
    }

    const audioBtn = document.querySelector(".audio-btn");
    if (audioBtn) {
        audioBtn.addEventListener("mouseenter", function () {
            this.style.transition = `all 0.4s ${smoothCurve}`;
            this.style.transform = "scale(1.1) translateY(-3px)";
        });

        audioBtn.addEventListener("mouseleave", function () {
            this.style.transition = `all 0.4s ${smoothCurve}`;
            this.style.transform = "scale(1) translateY(0)";
        });
    }
}

function addSmoothScrollEffects() {
    let ticking = false;

    function updateSmoothScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        const parallaxBg = document.querySelector(".parallax-bg");
        if (parallaxBg) {
            parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }

        const dividers = document.querySelectorAll(".divider-img");
        dividers.forEach((divider, index) => {
            const movement = Math.sin(scrolled * 0.005 + index) * 3;
            divider.style.transform = `translate3d(${movement}px, 0, 0)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateSmoothScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
}

function createSmoothParticle() {
    const particle = document.createElement("div");
    const colors = [
        "rgba(255,215,0,0.6)",
        "rgba(255,140,0,0.5)",
        "rgba(255,165,0,0.5)",
        "rgba(218,165,32,0.6)",
        "rgba(210,105,30,0.4)",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 3;

    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: float-up ${
            8 + Math.random() * 4
        }s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        will-change: transform;
        box-shadow: 0 0 10px ${randomColor};
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 12000);
}

function addSmoothRippleEffect(button, event) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: smoothRipple 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
    `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

function addDynamicAnimations() {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            75% { transform: rotate(-1deg); }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        
        @keyframes bounce-in {
            0% { transform: scale(0.3) translateY(20px); opacity: 0; }
            50% { transform: scale(1.05) translateY(-5px); }
            70% { transform: scale(0.95) translateY(0); }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
            0% { transform: translateX(100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        .bounce-in { animation: bounce-in 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .slide-in-left { animation: slide-in-left 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
        .slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
    `;
    document.head.appendChild(style);
}

function initTypingEffects() {
    const typingElements = document.querySelectorAll(".baby-name");

    const typeWriter = (element, text, speed = 80) => {
        element.innerHTML = "";
        element.style.borderRight = "2px solid #8b4513";
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = "none";
                }, 500);
            }
        }

        type();
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    const plainText = entry.target.textContent;
                    entry.target.dataset.typed = "true";

                    setTimeout(() => {
                        typeWriter(entry.target, plainText, 60);
                    }, 300);
                }
            });
        },
        { threshold: 0.3 }
    );

    typingElements.forEach((el) => observer.observe(el));
}

function updateOpenGraphTags() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName =
        urlParams.get("to") || urlParams.get("name") || "Tamu Undangan";

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute(
            "content",
            `Undangan Upacara Nelu Bulanin - ${guestName}`
        );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.setAttribute(
            "content",
            `Undangan Upacara Nelu Bulanin - ${guestName}`
        );
    }

    if (guestName !== "Tamu Undangan") {
        document.title = `Undangan - Upacara Nelu Bulanin untuk ${guestName}`;
    }
}

function setDynamicGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName =
        urlParams.get("to") || urlParams.get("name") || "Tamu Undangan";

    const guestTitleElement = document.querySelector(".guest-title");
    if (guestTitleElement) {
        guestTitleElement.textContent = guestName;
    }

    updateOpenGraphTags();
}

document.addEventListener("DOMContentLoaded", function () {
    setDynamicGuestName();
    addDynamicAnimations();
    initTypingEffects();
    initSuperSmoothHoverEffects();

    audioElement = document.getElementById("backgroundAudio");
    if (audioElement) {
        audioElement.volume = 0.5;
        audioElement.preload = "auto";

        audioElement.addEventListener("ended", function () {
            const audioIcon = document.getElementById("audioIcon");
            const audioBtn = document.getElementById("audioBtn");
            audioIcon.textContent = "🔇";
            audioBtn.classList.remove("playing");
            audioPlaying = false;
        });

        audioElement.addEventListener("loadstart", function () {
            console.log("Audio loading started");
        });

        audioElement.addEventListener("canplaythrough", function () {
            console.log("Audio can play through");
        });

        audioElement.addEventListener("error", function (e) {
            console.log("Audio error:", e);
            const audioIcon = document.getElementById("audioIcon");
            if (audioIcon) {
                audioIcon.textContent = "⌘";
                setTimeout(() => {
                    audioIcon.textContent = "🔇";
                }, 3000);
            }
        });
    }

    const unlockEvents = [
        "touchstart",
        "touchend",
        "mousedown",
        "keydown",
        "click",
    ];

    const handleFirstInteraction = function () {
        unlockAudio();
        unlockEvents.forEach((event) => {
            document.removeEventListener(event, handleFirstInteraction, true);
        });
    };

    unlockEvents.forEach((event) => {
        document.addEventListener(event, handleFirstInteraction, true);
    });

    const photos = document.querySelectorAll(".baby-photo, .baby-portrait");
    photos.forEach((photo) => {
        photo.addEventListener("mouseenter", function () {
            this.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
            this.style.transform = "scale(1.08) translateY(-5px) rotate(2deg)";
            this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.35)";
            this.style.filter = "brightness(1.1) saturate(1.2)";
            this.style.zIndex = "10";
        });

        photo.addEventListener("mouseleave", function () {
            this.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
            this.style.transform = "scale(1) translateY(0) rotate(0deg)";
            this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
            this.style.filter = "brightness(1) saturate(1)";
            this.style.zIndex = "1";
        });
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            addSmoothRippleEffect(this, e);
            if (!audioUnlocked) {
                unlockAudio();
            }
        });

        button.addEventListener("mouseenter", function () {
            this.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
            this.style.transform = "translateY(-5px) scale(1.05)";
            this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.4)";
            this.style.filter = "brightness(1.1)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
            this.style.transform = "translateY(0) scale(1)";
            this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
            this.style.filter = "brightness(1)";
        });
    });

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.addEventListener("error", function () {
            console.log(`Failed to load image: ${this.src}`);
            this.style.opacity = "0.5";
            this.style.filter = "grayscale(100%)";
            this.style.transition = "all 0.5s ease";
        });

        img.addEventListener("load", function () {
            this.style.opacity = "0";
            this.style.transition = "opacity 1s cubic-bezier(0.23, 1, 0.32, 1)";
            setTimeout(() => {
                this.style.opacity = "1";
            }, 100);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    setInterval(createSmoothParticle, 2500);
    setTimeout(() => setInterval(createSmoothParticle, 3000), 1000);

    const imageUrls = [
        "assets/sanskrit.svg",
        "assets/cover.png",
        "assets/logo.png",
        "assets/foto-prila.png",
        "assets/foto-vinikha.png",
        "assets/divider.png",
    ];

    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
});

function checkAudioSupport() {
    const audio = document.createElement("audio");
    const canPlayMP3 = audio.canPlayType("audio/mpeg");

    if (canPlayMP3 === "") {
        console.warn("MP3 format might not be supported");
        const audioIcon = document.getElementById("audioIcon");
        if (audioIcon) {
            audioIcon.title = "Format audio mungkin tidak didukung browser ini";
        }
    }

    return canPlayMP3 !== "";
}

window.addEventListener("load", function () {
    document.body.classList.remove("loading");

    checkAudioSupport();

    const visibleElements = document.querySelectorAll(".cover-content *");
    visibleElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.willChange = "auto";
        }, index * 100 + 2000);
    });

    console.log(
        "Ultra-smooth Nelu Bulanin invitation with enhanced audio toggle loaded!"
    );
});

document.addEventListener(
    "touchstart",
    function (e) {
        const target = e.target;
        if (
            target.tagName === "BUTTON" ||
            target.classList.contains("baby-photo") ||
            target.classList.contains("baby-portrait")
        ) {
            target.style.transition =
                "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
            target.style.transform = "scale(0.95)";

            setTimeout(() => {
                target.style.transform = "";
            }, 200);
        }

        if (!audioUnlocked) {
            unlockAudio();
        }
    },
    { passive: true }
);

window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

    if (isMobile) {
        document.body.classList.add("mobile");
        document.body.classList.remove("tablet", "desktop");
    } else if (isTablet) {
        document.body.classList.add("tablet");
        document.body.classList.remove("mobile", "desktop");
    } else {
        document.body.classList.add("desktop");
        document.body.classList.remove("mobile", "tablet");
    }

    if (window.initFastScrollAnimations) {
        initFastScrollAnimations();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        const activeElement = document.activeElement;
        if (activeElement.tagName === "BUTTON") {
            e.preventDefault();
            activeElement.click();

            activeElement.style.transition = "transform 0.1s ease";
            activeElement.style.transform = "scale(0.95)";
            setTimeout(() => {
                activeElement.style.transform = "";
            }, 100);
        }
    }

    if (!audioUnlocked) {
        unlockAudio();
    }
});

console.log(
    "Fast & smooth animations with enhanced autoplay-compliant audio toggle loaded!"
);
