/* =========================================================
   SCRIPT.JS (rapi): tiap fitur dibungkus fungsi sendiri dan
   berhenti diam-diam jika elemennya tidak ada di halaman,
   sehingga satu error tidak mematikan fitur lain.
   JANGAN ada baris require(...) atau import di file ini.
========================================================= */

/* 1. Services slider (loop tanpa putus) */
(function () {
    const track = document.querySelector(".service-track");
    const nextBtn = document.getElementById("nextService");
    const prevBtn = document.getElementById("prevService");
    if (!track || !nextBtn || !prevBtn) return;

    const visibleCards = 3;
    const originalCards = Array.from(track.querySelectorAll(".services-box"));
    const totalCards = originalCards.length;
    if (totalCards === 0) return;

    originalCards.slice(0, visibleCards)
        .map(card => card.cloneNode(true))
        .forEach(card => track.appendChild(card));

    originalCards.slice(-visibleCards)
        .map(card => card.cloneNode(true))
        .reverse()
        .forEach(card => track.prepend(card));

    let currentIndex = visibleCards;
    let isMoving = false;

    function getMoveAmount() {
        const card = track.querySelector(".services-box");
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        return card.offsetWidth + gap;
    }

    function updateSlider(animation = true) {
        track.style.transition = animation ? "transform 0.5s ease" : "none";
        track.style.transform = `translateX(-${currentIndex * getMoveAmount()}px)`;
    }

    function move(step) {
        if (isMoving) return;
        isMoving = true;
        currentIndex += step;
        updateSlider(true);
    }

    updateSlider(false);
    nextBtn.addEventListener("click", () => move(1));
    prevBtn.addEventListener("click", () => move(-1));

    track.addEventListener("transitionend", e => {
        // abaikan transisi anak (mis. hover kartu) yang ikut "menggelembung" ke track
        if (e.target !== track) return;

        if (currentIndex >= totalCards + visibleCards) {
            currentIndex = visibleCards;
            updateSlider(false);
        }
        if (currentIndex <= 0) {
            currentIndex = totalCards;
            updateSlider(false);
        }
        isMoving = false;
    });

    window.addEventListener("resize", () => updateSlider(false));
})();

/* 2. Menu mobile + penanda menu aktif saat scroll */
(function () {
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header nav a");

    window.addEventListener("scroll", () => {
        const top = window.scrollY;
        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const id = sec.getAttribute("id");
            if (top >= offset && top < offset + sec.offsetHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    });

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle("bx-x");
            navbar.classList.toggle("active");
        };
    }
})();

/* 3. Efek typing (kata diatur lewat data-words di HTML) */
(function () {
    function startTyping(el) {
        if (!el.dataset.words) return;
        const words = JSON.parse(el.dataset.words);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.textContent = words[0];
            return;
        }

        let w = 0;
        let c = 0;
        let deleting = false;

        function tick() {
            const word = words[w];
            c += deleting ? -1 : 1;
            el.textContent = word.slice(0, c);

            let delay = deleting ? 40 : 90;
            if (!deleting && c === word.length) {
                deleting = true;
                delay = 1400;
            } else if (deleting && c === 0) {
                deleting = false;
                w = (w + 1) % words.length;
                delay = 400;
            }
            setTimeout(tick, delay);
        }
        tick();
    }

    document.querySelectorAll(".typing-text").forEach(startTyping);
})();

/* 4. Skills: radar dihitung dari --level pada setiap .skill-item */
(function () {
    const section = document.querySelector(".skills");
    const svg = document.getElementById("radar");
    if (!section || !svg) return;

    const items = [...section.querySelectorAll(".skill-item")];
    const NS = "http://www.w3.org/2000/svg";
    const C = 200, R = 120, MAX = 5, N = items.length;
    const levels = items.map(it => parseFloat(it.style.getPropertyValue("--level")) || 0);

    const point = (i, v) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        const r = (R * v) / MAX;
        return [C + r * Math.cos(a), C + r * Math.sin(a)];
    };
    const make = (tag, attrs) => {
        const e = document.createElementNS(NS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        return e;
    };
    const toPoints = pts => pts.map(p => p.map(n => n.toFixed(1)).join(",")).join(" ");

    items.forEach((it, i) => {
        it.style.setProperty("--n", i);
        it.querySelector(".skill-level").textContent = "Level " + levels[i] + "/5";
    });

    for (let l = 1; l <= MAX; l++) {
        svg.append(make("polygon", { class: "radar-ring", points: toPoints(items.map((_, i) => point(i, l))) }));
    }
    items.forEach((it, i) => {
        const [x, y] = point(i, MAX);
        svg.append(make("line", { class: "radar-axis", x1: C, y1: C, x2: x, y2: y }));
        const [lx, ly] = point(i, MAX * 1.22);
        const t = make("text", {
            class: "radar-label", x: lx, y: ly,
            "text-anchor": lx < C - 5 ? "end" : lx > C + 5 ? "start" : "middle",
            "dominant-baseline": "middle"
        });
        t.textContent = it.dataset.short;
        svg.append(t);
    });

    const shape = make("polygon", { class: "radar-shape" });
    svg.append(shape);
    const dots = items.map(() => svg.appendChild(make("circle", { class: "radar-dot", r: 5 })));

    function draw(k) {
        shape.setAttribute("points", toPoints(levels.map((v, i) => point(i, v * k))));
        dots.forEach((d, i) => {
            const [x, y] = point(i, levels[i] * k);
            d.setAttribute("cx", x.toFixed(1));
            d.setAttribute("cy", y.toFixed(1));
        });
    }

    function play() {
        section.classList.add("in-view");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return draw(1);
        const t0 = performance.now();
        (function frame(t) {
            const k = Math.min((t - t0) / 1100, 1);
            draw(1 - Math.pow(1 - k, 3));
            if (k < 1) requestAnimationFrame(frame);
        })(t0);
    }

    draw(0);
    if (!("IntersectionObserver" in window)) return play();
    const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { play(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(section);
})();

/* 5. Contact: salin email, progres 4 langkah, penghitung karakter, kirim opsional */
(function () {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
        const icon = btn.querySelector("i");
        btn.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
            } catch (err) {
                window.location.href = "mailto:" + btn.dataset.copy;   // cadangan jika clipboard diblokir
                return;
            }
            icon.className = "bx bx-check";
            btn.classList.add("is-copied");
            btn.title = "Copied!";
            setTimeout(function () {
                icon.className = "bx bx-copy";
                btn.classList.remove("is-copied");
                btn.title = "Copy email";
            }, 1800);
        });
    });

    const form = document.getElementById("contactForm");
    if (!form) return;

    const segments = form.querySelectorAll(".fp-steps span");
    const countEl = document.getElementById("fp-count");
    const textEl = document.getElementById("fp-text");
    const charEl = document.getElementById("msg-count");
    const field = n => form.querySelector('[name="' + n + '"]');
    const messages = ["Fill in the form to begin", "Good start", "Halfway there", "Almost done", "Ready to send"];
    const checks = [
        () => field("name").value.trim() !== "",
        () => field("email").value.trim() !== "" && field("email").validity.valid,
        () => field("topic").value !== "",
        () => field("message").value.trim() !== ""
    ];

    function update() {
        const done = checks.filter(fn => fn()).length;
        segments.forEach((s, i) => s.classList.toggle("is-done", i < done));
        countEl.textContent = done + "/" + checks.length + " completed";
        textEl.textContent = messages[done];
        form.classList.toggle("is-ready", done === checks.length);
        charEl.textContent = field("message").value.length;
    }
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();

    // Kirim tanpa pindah halaman, HANYA jika <form> punya data-endpoint
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async function (e) {
        const url = form.dataset.endpoint;
        if (!url) return;                       // tanpa endpoint: kirim biasa (action)
        e.preventDefault();
        const send = form.querySelector('button[type="submit"]');
        send.disabled = true;
        status.className = "form-status";
        status.textContent = "Sending...";
        try {
            const res = await fetch(url, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });
            if (!res.ok) throw new Error("bad response");
            form.reset();
            update();
            status.classList.add("is-ok");
            status.textContent = "Thanks! Your message has been sent.";
        } catch (err) {
            status.classList.add("is-error");
            status.textContent = "Something went wrong. Please try again or email me directly.";
        } finally {
            send.disabled = false;
        }
    });
})();

/* 6. Footer: tahun otomatis */
document.getElementById("ft-year").textContent =
    new Date().getFullYear();