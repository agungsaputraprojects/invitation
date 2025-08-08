// Enhanced interactive effects for twins theme
document.addEventListener("DOMContentLoaded", function () {
    // Smooth entrance animation
    const container = document.querySelector(".container");
    container.style.opacity = "0";
    container.style.transform = "translateY(50px)";

    setTimeout(() => {
        container.style.transition =
            "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
    }, 200);

    // Twin cards synchronized animation
    const twinCards = document.querySelectorAll(".twin-card");
    twinCards.forEach((card, index) => {
        card.addEventListener("mouseenter", function () {
            // Animate current card
            this.style.transform = "translateY(-15px) scale(1.03)";
            this.style.transition =
                "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

            // Create subtle effect on twin card
            const otherCard = twinCards[1 - index];
            if (otherCard) {
                setTimeout(() => {
                    otherCard.style.transform = "translateY(-5px) scale(1.01)";
                    otherCard.style.transition = "all 0.3s ease";
                }, 100);
            }
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";

            const otherCard = twinCards[1 - index];
            if (otherCard) {
                otherCard.style.transform = "translateY(0) scale(1)";
            }
        });
    });

    // Twin photos click effect with particles
    function createTwinParticles(element, isFirst) {
        const rect = element.getBoundingClientRect();
        const particles = isFirst ? ["💖", "🌸", "✨"] : ["💕", "🌺", "💫"];

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.innerHTML =
                particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = "fixed";
            particle.style.left = rect.left + rect.width / 2 + "px";
            particle.style.top = rect.top + rect.height / 2 + "px";
            particle.style.fontSize = "24px";
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "1000";
            particle.style.animation = `twin-particle-burst 2s ease-out forwards`;

            const angle = (i / 15) * Math.PI * 2;
            const distance = 120 + Math.random() * 80;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            particle.style.setProperty("--endX", endX + "px");
            particle.style.setProperty("--endY", endY + "px");

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    // Twin photos interaction
    const twinPhotos = document.querySelectorAll(".twin-photo img");
    twinPhotos.forEach((photo, index) => {
        photo.addEventListener("click", function () {
            this.style.transition =
                "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            this.style.transform = "scale(1.2) rotate(15deg)";
            this.style.zIndex = "10";

            createTwinParticles(this, index === 0);

            setTimeout(() => {
                this.style.transform = "scale(1) rotate(0deg)";
                this.style.zIndex = "1";
            }, 800);
        });
    });

    // Main photos synchronized hover
    const mainPhotos = document.querySelectorAll(".main-photo-item");
    mainPhotos.forEach((photo, index) => {
        photo.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-12px) scale(1.03)";

            // Subtle effect on twin photo
            const twinPhoto = mainPhotos[1 - index];
            if (twinPhoto) {
                setTimeout(() => {
                    twinPhoto.style.transform = "translateY(-6px) scale(1.01)";
                    twinPhoto.style.transition = "all 0.3s ease";
                }, 150);
            }
        });

        photo.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";

            const twinPhoto = mainPhotos[1 - index];
            if (twinPhoto) {
                twinPhoto.style.transform = "translateY(0) scale(1)";
            }
        });
    });

    // Gallery photos wave effect
    const photoItems = document.querySelectorAll(".photo-item");
    photoItems.forEach((item, index) => {
        item.addEventListener("mouseenter", function () {
            // Current photo
            this.style.transform = "translateY(-8px) scale(1.05)";
            this.style.transition = "all 0.4s ease";

            // Wave effect on adjacent photos
            const adjacentIndices = [index - 1, index + 1];
            adjacentIndices.forEach((adjIndex, i) => {
                if (adjIndex >= 0 && adjIndex < photoItems.length) {
                    setTimeout(() => {
                        photoItems[adjIndex].style.transform =
                            "translateY(-4px) scale(1.02)";
                        photoItems[adjIndex].style.transition = "all 0.3s ease";
                    }, i * 100);
                }
            });
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";

            const adjacentIndices = [index - 1, index + 1];
            adjacentIndices.forEach((adjIndex) => {
                if (adjIndex >= 0 && adjIndex < photoItems.length) {
                    photoItems[adjIndex].style.transform =
                        "translateY(0) scale(1)";
                }
            });
        });

        // Add click particle effect to gallery photos
        item.addEventListener("click", function () {
            createGalleryParticles(this);
        });
    });

    // Gallery particle effect
    function createGalleryParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = ["🌸", "🌺", "🏵️", "✨", "💫", "🎉"];

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement("div");
            particle.innerHTML =
                particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = "fixed";
            particle.style.left = rect.left + rect.width / 2 + "px";
            particle.style.top = rect.top + rect.height / 2 + "px";
            particle.style.fontSize = "20px";
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "1000";
            particle.style.animation = `twin-particle-burst 1.5s ease-out forwards`;

            const angle = (i / 12) * Math.PI * 2;
            const distance = 80 + Math.random() * 60;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            particle.style.setProperty("--endX", endX + "px");
            particle.style.setProperty("--endY", endY + "px");

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // Parent cards interaction
    const parentCards = document.querySelectorAll(".parent-card");
    parentCards.forEach((card, index) => {
        card.addEventListener("click", function () {
            // Animate clicked parent
            this.style.transform = "translateY(-10px) scale(1.05)";
            this.style.transition = "all 0.5s ease";

            // Show love connection to twins
            createLoveParticles(index);

            setTimeout(() => {
                this.style.transform = "translateY(0) scale(1)";
            }, 1000);
        });

        // Hover effect for parent cards
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px) scale(1.02)";
            this.style.transition = "all 0.3s ease";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Love particles for parent interaction
    function createLoveParticles(parentIndex) {
        const hearts = ["💖", "💕", "❤️", "💗", "💝"];
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement("div");
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = "fixed";
            heart.style.left = "50%";
            heart.style.top = "30%";
            heart.style.fontSize = "20px";
            heart.style.pointerEvents = "none";
            heart.style.zIndex = "1000";
            heart.style.animation = `love-float 3s ease-out forwards`;

            const direction = parentIndex === 0 ? -1 : 1;
            const endX = direction * (50 + Math.random() * 100);
            const endY = -100 - Math.random() * 50;

            heart.style.setProperty("--endX", endX + "px");
            heart.style.setProperty("--endY", endY + "px");

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }

    // Event items enhanced interaction
    const eventItems = document.querySelectorAll(".event-item");
    eventItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px) scale(1.03)";
            this.style.transition =
                "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

            const icon = this.querySelector(".event-icon");
            if (icon) {
                icon.style.transform = "scale(1.15) rotate(15deg)";
                icon.style.transition = "all 0.3s ease";
            }
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";

            const icon = this.querySelector(".event-icon");
            if (icon) {
                icon.style.transform = "scale(1) rotate(0deg)";
            }
        });
    });

    // Detail rows hover effect
    const detailRows = document.querySelectorAll(".detail-row");
    detailRows.forEach((row, index) => {
        row.addEventListener("mouseenter", function () {
            this.style.transform = "translateX(10px)";
            this.style.background = "rgba(255,255,255,0.3)";
            this.style.paddingLeft = "15px";
            this.style.borderRadius = "8px";
            this.style.transition = "all 0.3s ease";
        });

        row.addEventListener("mouseleave", function () {
            this.style.transform = "translateX(0)";
            this.style.background = "transparent";
            this.style.paddingLeft = "0";
            this.style.borderRadius = "0";
        });
    });

    // Scroll-triggered animations for ceremony items
    const ceremonySection = document.querySelector(".ceremony-section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items =
                        entry.target.querySelectorAll(".ceremony-item");
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = "none";
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0) scale(1.05)";
                            item.style.transition =
                                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

                            setTimeout(() => {
                                item.style.transform = "translateY(0) scale(1)";
                            }, 300);
                        }, index * 200);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    if (ceremonySection) {
        observer.observe(ceremonySection);
    }

    // Floating elements mouse interaction
    const floatingElements = document.querySelectorAll(".floating-flower");
    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.01;
            const x = mouseX * 15 * speed;
            const y = mouseY * 15 * speed;

            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Smooth scroll for better UX
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

    // Add loading screen fade out effect
    setTimeout(() => {
        document.body.style.opacity = "1";
        document.body.style.transition = "opacity 0.5s ease-in-out";
    }, 100);

    // Lazy loading for images
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = "0";
                img.style.transition = "opacity 0.5s ease-in-out";

                img.onload = () => {
                    img.style.opacity = "1";
                };

                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => {
        imageObserver.observe(img);
    });

    // Add easter egg - double click on twins name
    const twinsName = document.querySelector(".twins-name");
    if (twinsName) {
        let clickCount = 0;
        twinsName.addEventListener("click", function () {
            clickCount++;
            if (clickCount === 2) {
                // Create rainbow effect
                this.style.background =
                    "linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)";
                this.style.backgroundSize = "300% 300%";
                this.style.animation = "rainbow 2s ease infinite";
                this.style.backgroundClip = "text";
                this.style.webkitBackgroundClip = "text";
                this.style.color = "transparent";

                // Add CSS animation for rainbow
                const style = document.createElement("style");
                style.textContent = `
                    @keyframes rainbow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `;
                document.head.appendChild(style);

                setTimeout(() => {
                    this.style.background = "none";
                    this.style.color = "#fff";
                    this.style.animation = "none";
                    clickCount = 0;
                }, 3000);
            }

            setTimeout(() => {
                if (clickCount === 1) clickCount = 0;
            }, 500);
        });
    }

    console.log("🌺 Undangan Otonan Kembar telah dimuat dengan sempurna! 🌺");
    console.log(
        "💖 Selamat datang di upacara otonan Tunggasemi & Devinikha 💖"
    );
});
