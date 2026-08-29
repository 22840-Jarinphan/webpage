/* =========================================================
   🌹 MY PORTFOLIO
   MAGIC INTERACTION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       💕 CREATE BACKGROUND HEARTS
    ===================================================== */

    const heartContainer = document.querySelector(
        ".floating-particles"
    ) || document.querySelector(
        ".floating-petals"
    );

    if (heartContainer) {

        const symbols = [
            "♡",
            "♥",
            "💕",
            "💗",
            "🌸",
            "💖"
        ];

        for (let i = 0; i < 22; i++) {

            const heart = document.createElement("span");

            heart.className =
                "floating-particle";

            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.fontSize =
                (12 + Math.random() * 22) + "px";

            heart.style.opacity =
                (.25 + Math.random() * .55);

            heart.style.setProperty(
                "--sway",
                (-80 + Math.random() * 160) + "px"
            );

            heart.style.animationDuration =
                (9 + Math.random() * 13) + "s";

            heart.style.animationDelay =
                (-Math.random() * 15) + "s";

            heartContainer.appendChild(heart);
        }
    }


    /* =====================================================
       🖱️ CURSOR GLOW
    ===================================================== */

    const cursor = document.createElement("div");

    cursor.className =
        "cursor-glow";

    document.body.appendChild(cursor);


    document.addEventListener(
        "mousemove",
        (event) => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";
        }
    );


    /* =====================================================
       💗 CLICK HEART EXPLOSION
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const hearts = [
                "♥",
                "♡",
                "💕",
                "💗",
                "💖",
                "💞"
            ];

            const amount = 6;

            for (let i = 0; i < amount; i++) {

                const heart =
                    document.createElement("span");

                heart.className =
                    "click-heart";

                heart.textContent =
                    hearts[
                        Math.floor(
                            Math.random() *
                            hearts.length
                        )
                    ];

                heart.style.left =
                    event.clientX + "px";

                heart.style.top =
                    event.clientY + "px";

                const angle =
                    Math.random() * Math.PI * 2;

                const distance =
                    35 + Math.random() * 75;

                heart.style.setProperty(
                    "--x",
                    Math.cos(angle) *
                    distance + "px"
                );

                heart.style.setProperty(
                    "--y",
                    Math.sin(angle) *
                    distance + "px"
                );

                heart.style.setProperty(
                    "--rotate",
                    (-45 + Math.random() * 90) +
                    "deg"
                );

                heart.style.setProperty(
                    "--heart-size",
                    (15 + Math.random() * 18) +
                    "px"
                );

                document.body.appendChild(
                    heart
                );

                setTimeout(() => {

                    heart.remove();

                }, 1000);
            }
        }
    );


    /* =====================================================
       ✨ BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(".btn, button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    const rect =
                        this.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "ripple";

                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );

                    ripple.style.width =
                        size + "px";

                    ripple.style.height =
                        size + "px";

                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left -
                            size / 2
                        ) + "px";

                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top -
                            size / 2
                        ) + "px";

                    this.appendChild(
                        ripple
                    );

                    setTimeout(() => {

                        ripple.remove();

                    }, 700);
                }
            );

        });


    /* =====================================================
       🃏 CARD 3D TILT
    ===================================================== */

    const cards = document.querySelectorAll(
        `
        .feature-card,
        .hobby-card,
        .contact-card,
        .education-card,
        .info-card,
        .fact-card,
        .profile-card,
        .about-card,
        .highlight-card,
        .interest-card
        `
    );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    18;

                const rotateY =
                    (centerX - x) /
                    18;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.015)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );

    });


    /* =====================================================
       🖼️ IMAGE INTERACTION
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "mouseenter",
                () => {

                    img.style.transform =
                        "scale(1.05) rotate(1deg)";
                }
            );


            img.addEventListener(
                "mouseleave",
                () => {

                    img.style.transform =
                        "";
                }
            );

        });


    /* =====================================================
       💫 SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .feature-card,
            .hobby-card,
            .contact-card,
            .education-card,
            .info-card,
            .fact-card,
            .profile-card,
            .about-card,
            .timeline-card,
            .cta-card,
            .section-heading,
            .page-hero-content
            `
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element => observer.observe(element)
    );


    /* =====================================================
       🧭 PAGE TRANSITION
    ===================================================== */

    const transition =
        document.createElement("div");

    transition.className =
        "page-transition";

    document.body.appendChild(
        transition
    );


    window.addEventListener(
        "pageshow",
        () => {

            transition.classList.remove(
                "active"
            );

        }
    );


    document
        .querySelectorAll(
            'a[href$=".html"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        link.href;

                    if (
                        !target ||
                        target.includes("#")
                    ) {
                        return;
                    }

                    event.preventDefault();

                    transition.classList.add(
                        "active"
                    );

                    setTimeout(
                        () => {

                            window.location.href =
                                target;

                        },
                        450
                    );

                }
            );

        });


    /* =====================================================
       💗 CLICK SCALE EFFECT
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            cursor.classList.add(
                "active"
            );

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            cursor.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       🌟 ACTIVE CLICK EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    link.style.transform =
                        "scale(.94)";

                    setTimeout(
                        () => {

                            link.style.transform =
                                "";

                        },
                        180
                    );

                }
            );

        });

});
