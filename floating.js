/* =====================================================
   FLOATING HEARTS & SAKURA
   ใช้ได้ทุกหน้า
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.createElement("div");

    container.className = "floating-particles";

    document.body.appendChild(container);


    const emojis = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "🌸",
        "🌸",
        "🌸",
        "💮"
    ];


    // จำนวนอิโมจิบนหน้าจอ
    const particleCount = 32;


    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "floating-particle";

        particle.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];


        // ตำแหน่งเริ่มต้นแบบสุ่ม
        particle.style.left =
            Math.random() * 100 + "%";


        // ขนาดสุ่ม
        const size =
            14 + Math.random() * 18;

        particle.style.fontSize =
            size + "px";


        // ความเร็วตก
        const duration =
            7 + Math.random() * 10;

        particle.style.animationDuration =
            duration + "s";


        // เริ่มตกต่างเวลากัน
        const delay =
            Math.random() * 12;

        particle.style.animationDelay =
            "-" + delay + "s";


        // การแกว่งซ้ายขวา
        particle.style.setProperty(
            "--sway",
            (30 + Math.random() * 70) + "px"
        );


        // ความโปร่งใส
        particle.style.opacity =
            0.45 + Math.random() * 0.5;


        container.appendChild(particle);
    }

});
