/* 0. Cegah halaman bergeser ke samping (mis. setelah refresh di tengah halaman). */
      (function () {
        const reset = () => { if (window.scrollX) window.scrollTo(0, window.scrollY); };
        window.addEventListener("scroll", reset, { passive: true });
        window.addEventListener("load", reset);
        window.addEventListener("pageshow", reset);
    })();
    
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
    
/* 2. Menu mobile + penanda menu aktif (IntersectionObserver: tanpa baca layout di setiap scroll) */
    (function () {
        const menuIcon = document.querySelector("#menu-icon");
        const navbar = document.querySelector(".navbar");
        const links = Array.from(document.querySelectorAll("header nav a"));
        const sections = Array.from(document.querySelectorAll("section[id]"));
    
        if ("IntersectionObserver" in window && sections.length) {
            // pita tipis di sekitar 40-45% tinggi layar: section yang melintasinya dianggap aktif
            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    links.forEach(link => {
                        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
                    });
                });
            }, { rootMargin: "-40% 0px -55% 0px" });
            sections.forEach(sec => io.observe(sec));
        }
    
        if (menuIcon && navbar) {
            menuIcon.onclick = () => {
                const open = navbar.classList.toggle("active");
                const icon = menuIcon.querySelector("i");
                if (icon) {
                    icon.classList.toggle("bx-menu", !open);
                    icon.classList.toggle("bx-x", open);
                }
                menuIcon.setAttribute("aria-expanded", open);
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
                    window.location.href = "mailto:" + btn.dataset.copy;   
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
            if (!url) return;                       
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
    (function () {
        const year = document.getElementById("ft-year");
        if (year) year.textContent = new Date().getFullYear();
    })();
    
/* 7. Serpentine: pita berkelok dari dasar Home sampai akhir About; chip skill berjalan di atasnya. */
    (function () {
        const zone = document.getElementById("flowZone");
        const box = document.getElementById("serpentine");
        const svg = document.getElementById("serpSvg");
        const home = zone && zone.querySelector(".home");
        const about = zone && zone.querySelector(".about");
        if (!zone || !box || !svg || !home || !about) return;
    
        box.style.cssText += ";position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1";
        svg.style.cssText += ";position:absolute;left:0;top:0;display:block;max-width:100%";
    
        const words = (box.dataset.words || "").split("|").filter(Boolean);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const SPEED = 60;                                
        let pts = [], cum = [], total = 0, chips = [], shift = 0, last = 0, running = false;
    
        function build() {
            const hr = home.getBoundingClientRect(), ar = about.getBoundingClientRect();
            const W = Math.round(zone.clientWidth);
            const H = Math.round(ar.bottom - hr.top);
            if (!W || !H || H > 30000) return;             
            const narrow = W < 700;
            const y0 = Math.max(0, home.offsetHeight - (narrow ? 90 : 140));   
            const span = H - y0;
            const swings = narrow ? 1 : 1.5, amp = 0.62;
            const n = Math.max(240, Math.min(900, Math.round(span / 5)));
    
            pts = []; cum = [0];
            for (let i = 0; i <= n; i++) {
                const t = i / n;
                pts.push([W * (0.5 + amp * Math.sin(2 * Math.PI * swings * t - Math.PI / 2)), y0 + span * t]);
                if (i) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
            }
            total = cum[n];
    
            const d = "M" + pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L");
            svg.setAttribute("viewBox", "0 0 " + W + " " + H);   
            svg.setAttribute("width", W);
            svg.setAttribute("height", H);
            svg.innerHTML = ["serp-halo", "serp-ribbon", "serp-core"]
                .map(c => '<path class="' + c + '" d="' + d + '"/>').join("");
    
            const spacing = narrow ? 230 : 330;
            const count = words.length ? Math.max(1, Math.round(total / spacing)) : 0;
            while (chips.length > count) chips.pop().remove();
            while (chips.length < count) {
                const chip = document.createElement("span");
                chip.className = "serp-chip";
                chip.style.cssText = "position:absolute;left:0;top:0";
                box.appendChild(chip);
                chips.push(chip);
            }
            chips.forEach((chip, i) => {
                chip.textContent = words[i % words.length];
                chip._base = (i * total) / count;
            });
        }
    
        function place() {
            if (!total) return;
            chips.forEach(chip => {
                const dist = (chip._base + shift) % total;
                let lo = 0, hi = cum.length - 1;
                while (hi - lo > 1) {
                    const mid = (lo + hi) >> 1;
                    if (cum[mid] <= dist) lo = mid; else hi = mid;
                }
                const a = pts[lo], b = pts[hi];
                const f = (dist - cum[lo]) / ((cum[hi] - cum[lo]) || 1);
                const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f;
                const tilt = 24 * Math.sin(2 * Math.atan2(b[1] - a[1], b[0] - a[0]));   
                chip.style.opacity = Math.min(dist, total - dist, 180) / 180;          
                chip.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) +
                    "px,0) translate(-50%,-50%) rotate(" + tilt.toFixed(1) + "deg)";
            });
        }
    
        function frame(t) {
            if (!running) return;
            if (last) shift += SPEED * Math.min((t - last) / 1000, 0.05);
            last = t;
            place();
            requestAnimationFrame(frame);
        }
        function start() { if (reduce || running) return; running = true; last = 0; requestAnimationFrame(frame); }
        function stop() { running = false; }
    
        let raf = 0;
        const rebuild = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { build(); place(); }); };
        if ("ResizeObserver" in window) {
            const ro = new ResizeObserver(rebuild);
            ro.observe(home);                              
            ro.observe(about);
        } else {
            window.addEventListener("resize", rebuild);
        }
        window.addEventListener("load", rebuild);
        document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    
        build();
        place();
        start();
    })();