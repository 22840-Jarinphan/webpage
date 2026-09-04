/* =========================================================
   GLOBAL MUSIC PLAYER
   เพลงจะเล่นต่อเมื่อเปลี่ยนหน้าแบบ SPA
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    const VIDEO_ID = "9-WagXIJZo4";

    const PLAYER_STORAGE = "portfolio_music_state";


    /* =====================================================
       VARIABLES
    ===================================================== */

    let player = null;

    let playerReady = false;

    let currentTime = 0;

    let isPlaying = false;

    let isHidden = false;


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const musicPlayer =
        document.getElementById("music-player");

    const musicToggle =
        document.getElementById("music-toggle");

    const musicHide =
        document.getElementById("music-hide");

    const musicShow =
        document.getElementById("music-show");

    const musicStatus =
        document.getElementById("music-status");


    /* =====================================================
       LOAD SAVED STATE
    ===================================================== */

    function loadState() {

        try {

            const saved =
                sessionStorage.getItem(PLAYER_STORAGE);

            if (!saved) return;

            const data = JSON.parse(saved);

            currentTime =
                Number(data.time) || 0;

            isPlaying =
                data.playing === true;

            isHidden =
                data.hidden === true;

        } catch (error) {

            console.log(
                "Music state error:",
                error
            );

        }

    }


    /* =====================================================
       SAVE STATE
    ===================================================== */

    function saveState() {

        if (!playerReady || !player) return;

        try {

            const time =
                player.getCurrentTime();

            const state = {

                time: time,

                playing:
                    player.getPlayerState() ===
                    YT.PlayerState.PLAYING,

                hidden: isHidden

            };

            sessionStorage.setItem(
                PLAYER_STORAGE,
                JSON.stringify(state)
            );

        } catch (error) {

            console.log(
                "Cannot save music state"
            );

        }

    }


    /* =====================================================
       LOAD YOUTUBE API
    ===================================================== */

    function loadYouTubeAPI() {

        if (
            window.YT &&
            window.YT.Player
        ) {

            createPlayer();

            return;

        }


        const oldScript =
            document.querySelector(
                'script[src="https://www.youtube.com/iframe_api"]'
            );


        if (!oldScript) {

            const script =
                document.createElement("script");

            script.src =
                "https://www.youtube.com/iframe_api";

            document.head.appendChild(script);

        }


        window.onYouTubeIframeAPIReady =
            () => {

                createPlayer();

            };

    }


    /* =====================================================
       CREATE PLAYER
    ===================================================== */

    function createPlayer() {

        if (player) return;


        player = new YT.Player(
            "youtube-player",
            {

                videoId: VIDEO_ID,

                width: "1",

                height: "1",

                playerVars: {

                    autoplay: 0,

                    controls: 0,

                    disablekb: 1,

                    playsinline: 1,

                    rel: 0,

                    modestbranding: 1

                },


                events: {

                    onReady:
                        onPlayerReady,

                    onStateChange:
                        onPlayerStateChange,

                    onError:
                        onPlayerError

                }

            }
        );

    }


    /* =====================================================
       PLAYER READY
    ===================================================== */

    function onPlayerReady(event) {

        playerReady = true;


        /*
           กลับไปยังวินาทีเดิม
        */

        if (currentTime > 0) {

            try {

                event.target.seekTo(
                    currentTime,
                    true
                );

            } catch (error) {

                console.log(
                    "Seek error"
                );

            }

        }


        updateUI();


        /*
           ถ้าก่อนเปลี่ยนหน้ากำลังเล่น
           ให้เล่นต่อ
        */

        if (isPlaying) {

            try {

                event.target.playVideo();

            } catch (error) {

                console.log(
                    "Autoplay ถูกเบราว์เซอร์บล็อก"
                );

                updateStatus(
                    "กด ▶ เพื่อเล่นเพลงต่อ"
                );

            }

        }

    }


    /* =====================================================
       PLAYER STATE
    ===================================================== */

    function onPlayerStateChange(event) {

        if (
            event.data ===
            YT.PlayerState.PLAYING
        ) {

            isPlaying = true;

            updateStatus(
                "กำลังเล่นเพลง ♪"
            );

            updatePlayButton(true);

        }


        else if (
            event.data ===
            YT.PlayerState.PAUSED
        ) {

            isPlaying = false;

            updateStatus(
                "หยุดชั่วคราว"
            );

            updatePlayButton(false);

            saveState();

        }


        else if (
            event.data ===
            YT.PlayerState.ENDED
        ) {

            isPlaying = false;

            updateStatus(
                "เพลงจบแล้ว"
            );

            updatePlayButton(false);

            saveState();

        }

    }


    /* =====================================================
       PLAYER ERROR
    ===================================================== */

    function onPlayerError(event) {

        console.log(
            "YouTube Player Error:",
            event.data
        );

        updateStatus(
            "ไม่สามารถเล่นเพลงนี้ได้"
        );

    }


    /* =====================================================
       PLAY / PAUSE
    ===================================================== */

    function toggleMusic() {

        if (!playerReady || !player) {

            return;

        }


        const state =
            player.getPlayerState();


        if (
            state ===
            YT.PlayerState.PLAYING
        ) {

            player.pauseVideo();

        }

        else {

            player.playVideo();

        }

    }


    /* =====================================================
       HIDE PLAYER
    ===================================================== */

    function hideMusic() {

        isHidden = true;

        if (musicPlayer) {

            musicPlayer.classList.add(
                "music-hidden"
            );

        }

        if (musicShow) {

            musicShow.classList.add(
                "music-show-visible"
            );

        }

        saveState();

    }


    /* =====================================================
       SHOW PLAYER
    ===================================================== */

    function showMusic() {

        isHidden = false;

        if (musicPlayer) {

            musicPlayer.classList.remove(
                "music-hidden"
            );

        }

        if (musicShow) {

            musicShow.classList.remove(
                "music-show-visible"
            );

        }

        saveState();

    }


    /* =====================================================
       UI
    ===================================================== */

    function updatePlayButton(playing) {

        if (!musicToggle) return;

        musicToggle.textContent =
            playing ? "Ⅱ" : "▶";

    }


    function updateStatus(text) {

        if (!musicStatus) return;

        musicStatus.textContent = text;

    }


    function updateUI() {

        if (isHidden) {

            musicPlayer?.classList.add(
                "music-hidden"
            );

            musicShow?.classList.add(
                "music-show-visible"
            );

        }

    }


    /* =====================================================
       SAVE POSITION EVERY SECOND
    ===================================================== */

    setInterval(() => {

        if (
            playerReady &&
            player &&
            player.getPlayerState() ===
            YT.PlayerState.PLAYING
        ) {

            saveState();

        }

    }, 1000);


    /* =====================================================
       SAVE BEFORE PAGE UNLOAD
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            saveState();

        }
    );


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    musicToggle?.addEventListener(
        "click",
        toggleMusic
    );


    musicHide?.addEventListener(
        "click",
        hideMusic
    );


    musicShow?.addEventListener(
        "click",
        showMusic
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadState();

    loadYouTubeAPI();


})();
