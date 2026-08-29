/* =========================================================
   💗 MY PORTFOLIO
   PREMIUM INTERACTION SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       💗 PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("page-loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("loaded");

            }, 1000);

        });

    }


    /* =====================================================
       💗 HEART CURSOR
    ===================================================== */

    const cursor = document.getElementById("heart-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    if (cursor && window.innerWidth > 700) {

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });

        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        /* =================================================
           💕 CURSOR TRAIL
        ================================================= */

        let lastTrail = 0;

        document.addEventListener("mousemove", (event) => {

            const now = Date.now();

            if (now - lastTrail < 70) return;

            lastTrail = now;

            createCursorTrail(
                event.clientX,
                event.clientY
            );

        });

    }


    /* =====================================================
       💕 INTERACTIVE HOVER
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .btn, .feature-card, .profile-card, " +
            ".info-card, .education-card, .hobby-card, " +
            ".contact-card, .profile-frame"
        );

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            if (cursor) {

                cursor.classList.add("hovering");

            }

        });

        element.addEventListener("mouseleave", () => {

            if (cursor) {

                cursor.classList.remove("hovering");

            }

        });

    });


    /* =====================================================
       💥 CLICK EFFECT
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (cursor) {

            cursor.classList.remove("clicking");

            void cursor.offsetWidth;

            cursor.classList.add("clicking");

        }

        createClickRing(
            event.clientX,
            event.clientY
        );

        createEmojiExplosion(
            event.clientX,
            event.clientY
        );

        createRipple(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       🔄 SCROLL PROGRESS
    ===================================================== */

    const scrollProgress =
        document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (scrollProgress) {

            scrollProgress.style.width =
                `${progress}%`;

        }

    });


    /* =====================================================
       ✨ SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .profile-card, " +
            ".info-card, .education-card, " +
            ".hobby-card, .contact-card, " +
            ".timeline-card, .about-card, " +
            ".stat-card, .highlight-card, " +
            ".interest-card, .section-heading"
        );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


   /* =========================================================
   🔗 PAGE TRANSITION
   ระบบเปลี่ยนหน้าพร้อม Animation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const transition =
        document.querySelector(".page-transition");


    document.querySelectorAll("a[href]").forEach((link) => {

        link.addEventListener("click", function(event) {

            const href =
                this.getAttribute("href");


            /* -----------------------------------------
               ตรวจสอบลิงก์
            ----------------------------------------- */

            if (!href) return;

            if (
                href.startsWith("#") ||
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }


            /* -----------------------------------------
               ป้องกันการทำงานซ้ำ
            ----------------------------------------- */

            if (
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.metaKey
            ) {

                return;

            }


            event.preventDefault();


            /* -----------------------------------------
               ถ้าเป็นปุ่มกลับหน้าแรก
            ----------------------------------------- */

            if (
                this.classList.contains("btn-home") ||
                href === "index.html" ||
                href.endsWith("/index.html")
            ) {

                if (transition) {

                    transition.classList.add("active");

                    setTimeout(() => {

                        window.location.assign(
                            "index.html"
                        );

                    }, 500);

                } else {

                    window.location.assign(
                        "index.html"
                    );

                }

                return;

            }


            /* -----------------------------------------
               ลิงก์หน้าอื่น
            ----------------------------------------- */

            if (transition) {

                transition.classList.add("active");

                setTimeout(() => {

                    window.location.assign(href);

                }, 500);

            } else {

                window.location.assign(href);

            }

        });

    });

});

    document
        .querySelectorAll("a")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    const transition =
                        document.querySelector(
                            ".page-transition"
                        );

                    if (transition) {

                        transition.classList.add(
                            "active"
                        );

                        setTimeout(() => {

                            window.location.href =
                                href;

                        }, 500);

                    } else {

                        window.location.href =
                            href;

                    }

                }
            );

        });

});


/* =========================================================
   💕 CURSOR TRAIL FUNCTION
========================================================= */

function createCursorTrail(x, y) {

    const heart =
        document.createElement("span");

    heart.className =
        "cursor-trail-heart";

    const hearts = [
        "♡",
        "♥",
        "💗",
        "💕"
    ];

    heart.textContent =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];

    heart.style.left =
        `${x}px`;

    heart.style.top =
        `${y}px`;

    heart.style.setProperty(
        "--tx",
        `${(Math.random() - .5) * 35}px`
    );

    heart.style.setProperty(
        "--ty",
        `${-20 - Math.random() * 30}px`
    );

    heart.style.setProperty(
        "--rotate",
        `${(Math.random() - .5) * 80}deg`
    );

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 800);

}


/* =========================================================
   💥 EMOJI EXPLOSION
========================================================= */

function createEmojiExplosion(x, y) {

    const emojis = [
        "💗",
        "💕",
        "💖",
        "💘",
        "💝",
        "🌸",
        "🌷",
        "✨",
        "♡",
        "♥"
    ];

    /* จำนวนอิโมจิต่อหนึ่งคลิก */

    const amount = 10;

    for (let i = 0; i < amount; i++) {

        const emoji =
            document.createElement("span");

        emoji.className =
            "click-emoji";

        emoji.textContent =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        emoji.style.left =
            `${x}px`;

        emoji.style.top =
            `${y}px`;

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            50 + Math.random() * 110;

        const moveX =
            Math.cos(angle) * distance;

        const moveY =
            Math.sin(angle) * distance;

        emoji.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        emoji.style.setProperty(
            "--move-y",
            `${moveY}px`
        );

        emoji.style.setProperty(
            "--rotation",
            `${(Math.random() - .5) * 180}deg`
        );

        emoji.style.setProperty(
            "--emoji-size",
            `${14 + Math.random() * 15}px`
        );

        emoji.style.setProperty(
            "--duration",
            `${.7 + Math.random() * .5}s`
        );

        document.body.appendChild(emoji);

        setTimeout(() => {

            emoji.remove();

        }, 1300);

    }

}


/* =========================================================
   💗 CLICK RING
========================================================= */

function createClickRing(x, y) {

    const ring =
        document.createElement("span");

    ring.className =
        "click-ring";

    ring.style.left =
        `${x}px`;

    ring.style.top =
        `${y}px`;

    document.body.appendChild(ring);

    setTimeout(() => {

        ring.remove();

    }, 700);

}


/* =========================================================
   💥 BUTTON RIPPLE
========================================================= */

function createRipple(x, y) {

    const target =
        document.elementFromPoint(x, y);

    if (!target) return;

    const button =
        target.closest(
            ".btn, button"
        );

    if (!button) return;

    const rect =
        button.getBoundingClientRect();

    const ripple =
        document.createElement("span");

    ripple.className =
        "ripple";

    const size =
        Math.max(
            rect.width,
            rect.height
        );

    ripple.style.width =
        `${size}px`;

    ripple.style.height =
        `${size}px`;

    ripple.style.left =
        `${x - rect.left - size / 2}px`;

    ripple.style.top =
        `${y - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 700);

}

/* =========================================================
   💗 HOME BUTTON HEART EFFECT
========================================================= */

document.querySelectorAll(".btn-home").forEach((button) => {

    button.addEventListener("click", (event) => {

        const rect =
            button.getBoundingClientRect();

        for (let i = 0; i < 8; i++) {

            const heart =
                document.createElement("span");

            heart.textContent =
                ["💗", "💕", "💖", "✨"][Math.floor(
                    Math.random() * 4
                )];

            heart.style.position = "fixed";

            heart.style.left =
                `${rect.left + rect.width / 2}px`;

            heart.style.top =
                `${rect.top + rect.height / 2}px`;

            heart.style.pointerEvents =
                "none";

            heart.style.zIndex =
                "100001";

            heart.style.fontSize =
                `${14 + Math.random() * 12}px`;

            const x =
                (Math.random() - .5) * 140;

            const y =
                (Math.random() - .5) * 100;

            heart.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(.3)",
                        opacity: 0
                    },
                    {
                        transform:
                            "translate(-50%, -50%) scale(1.2)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.3)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 750,
                    easing: "cubic-bezier(.2,.8,.2,1)"
                }
            );

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 800);

        }

    });

});
