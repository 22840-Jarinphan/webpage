/* =====================================================
   🎵 CONTINUOUS MUSIC + PAGE NAVIGATION
   เพลงเล่นต่อเนื่องขณะเปลี่ยนหน้า
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       🎵 MUSIC PLAYER
    ================================================= */

    const musicHTML = `
        <div class="music-box" id="musicBox">

            <div class="music-header">

                <div class="music-disc">
                    🎵
                </div>

                <div class="music-info">

                    <span class="music-label">
                        NOW PLAYING
                    </span>

                    <strong>
                        Hey Daddy
                    </strong>

                    <small>
                        Usher • Slowed
                    </small>

                </div>

                <button
                    class="music-close"
                    id="musicMinimize"
                    aria-label="ย่อเครื่องเล่นเพลง">
                    −
                </button>

            </div>


            <div class="music-wave">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>


            <div class="music-video">

                <iframe
                    id="youtubeMusic"
                    src="https://www.youtube.com/embed/9-WagXIJZo4?enablejsapi=1&rel=0"
                    title="Hey Daddy - Usher Slowed"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>

            </div>

        </div>
    `;


    /* =================================================
       เพิ่ม Music Player
    ================================================= */

    if (!document.getElementById("musicBox")) {

        document.body.insertAdjacentHTML(
            "beforeend",
            musicHTML
        );

    }


    /* =================================================
       🎵 ปุ่มย่อ
    ================================================= */

    const minimizeButton =
        document.getElementById("musicMinimize");

    const musicBox =
        document.getElementById("musicBox");


    if (minimizeButton && musicBox) {

        minimizeButton.addEventListener(
            "click",
            () => {

                musicBox.classList.toggle(
                    "music-mini"
                );

                minimizeButton.textContent =
                    musicBox.classList.contains(
                        "music-mini"
                    )
                    ? "+"
                    : "−";

            }
        );

    }


    /* =================================================
       ✨ PAGE NAVIGATION
       เปลี่ยนหน้าโดยไม่ Reload ทั้งเว็บ
    ================================================= */

    const pageLinks =
        document.querySelectorAll(
            'a[href$=".html"]'
        );


    pageLinks.forEach(link => {

        link.addEventListener(
            "click",
            async (event) => {

                const href =
                    link.getAttribute("href");


                /* ไม่จัดการลิงก์ภายนอก */

                if (
                    !href ||
                    href.startsWith("http") ||
                    href.startsWith("#") ||
                    link.target === "_blank"
                ) {
                    return;
                }


                event.preventDefault();


                try {

                    await loadPage(
                        href,
                        true
                    );

                } catch (error) {

                    console.error(
                        "ไม่สามารถโหลดหน้า:",
                        error
                    );

                    /*
                       ถ้าเกิดปัญหา ให้เปิดหน้า
                       ตามปกติแทน
                    */

                    window.location.href =
                        href;

                }

            }
        );

    });


    /* =================================================
       โหลดหน้าใหม่โดยไม่ทำลาย Music Player
    ================================================= */

    async function loadPage(
        url,
        changeHistory = true
    ) {

        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Page not found"
            );
        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const newDocument =
            parser.parseFromString(
                html,
                "text/html"
            );


        /*
           หาเนื้อหาหลักของหน้าใหม่
        */

        const newMain =
            newDocument.querySelector(
                "main"
            );


        const currentMain =
            document.querySelector(
                "main"
            );


        if (!newMain || !currentMain) {

            throw new Error(
                "ไม่พบ <main>"
            );

        }


        /*
           เปลี่ยนเฉพาะเนื้อหา main
           Music Player จึงไม่ถูกสร้างใหม่
        */

        currentMain.innerHTML =
            newMain.innerHTML;


        /*
           เปลี่ยน title
        */

        document.title =
            newDocument.title;


        /*
           เปลี่ยน URL
        */

        if (changeHistory) {

            history.pushState(
                {
                    page: url
                },
                "",
                url
            );

        }


        /*
           เลื่อนกลับด้านบน
        */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /*
           อัปเดตเมนู Active
        */

        updateActiveMenu(url);


        /*
           ใส่ animation ให้เนื้อหาใหม่
        */

        currentMain.classList.remove(
            "page-changing"
        );


        void currentMain.offsetWidth;


        currentMain.classList.add(
            "page-changing"
        );

    }


    /* =================================================
       💗 ACTIVE MENU
    ================================================= */

    function updateActiveMenu(url) {

        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(link => {

                link.classList.remove(
                    "active"
                );


                const linkURL =
                    link.getAttribute(
                        "href"
                    );


                if (
                    linkURL === url
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    /* =================================================
       ⬅️ ปุ่ม Back / Forward
    ================================================= */

    window.addEventListener(
        "popstate",
        async () => {

            try {

                await loadPage(
                    location.pathname
                    .split("/")
                    .pop() || "index.html",
                    false
                );

            } catch (error) {

                console.error(error);

            }

        }
    );

});
