const track = document.querySelector(".service-track");

const originalCards = Array.from(
    document.querySelectorAll(".service-track .services-box")
);

const nextBtn = document.getElementById("nextService");
const prevBtn = document.getElementById("prevService");


const visibleCards = 3;

const totalCards = originalCards.length;

const firstClones = originalCards
    .slice(0, visibleCards)
    .map(card => card.cloneNode(true));


const lastClones = originalCards
    .slice(-visibleCards)
    .map(card => card.cloneNode(true));

lastClones.reverse().forEach(card => {

    track.prepend(card);

});

firstClones.forEach(card => {

    track.appendChild(card);

});

let currentIndex = visibleCards;

let isMoving = false;


function getMoveAmount() {

    const card =
        track.querySelector(".services-box");

    const style =
        window.getComputedStyle(track);

    const gap =
        parseFloat(style.gap) || 0;

    return card.offsetWidth + gap;
}


function updateSlider(animation = true) {

    const moveAmount = getMoveAmount();

    if (animation) {

        track.style.transition =
            "transform 0.5s ease";

    } else {

        track.style.transition = "none";

    }

    track.style.transform =
        `translateX(-${currentIndex * moveAmount}px)`;
}

updateSlider(false);

nextBtn.addEventListener("click", () => {

    if (isMoving) return;

    isMoving = true;

    currentIndex++;

    updateSlider(true);

});

prevBtn.addEventListener("click", () => {

    if (isMoving) return;

    isMoving = true;

    currentIndex--;

    updateSlider(true);

});

track.addEventListener("transitionend", () => {

    if (
        currentIndex >=
        totalCards + visibleCards
    ) {

        currentIndex = visibleCards;

        updateSlider(false);
    }

    if (currentIndex <= 0) {

        currentIndex = totalCards;

        updateSlider(false);
    }


    isMoving = false;

});

window.addEventListener("resize", () => {

    updateSlider(false);

});

const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  const top = window.scrollY; 

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;  
    const height = sec.offsetHeight;     
    const id     = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));

      const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

if (menuIcon) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');   
    navbar.classList.toggle('active');
  };
}

function startTyping(el) {
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

(function () {
    const section = document.querySelector(".skills");
    const svg = document.getElementById("radar");
    if (!section || !svg) return;

    const items = [...section.querySelectorAll(".skill-item")];
    const NS = "http://www.w3.org/2000.svg";
    const C = 200, R = 120, MAX = 5, N = items.length;
    const levels = items.map(it => parseFloat(it.style.getPopertyValue("--level")) || 0);

    const point = (i, v) => {
        const a =-Math.PI / 2 + (i * 2 * Math.PI) / N;
        const r = (R * v) / MAX;
        return [C + r * Math.cos(a), C + r * Math.sin(a)];
    };
    const make = (tag, attrs) => {
        const e = document.createElementNS(NS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        return e;
    };
    const toPoints = pts => pts.map(p => p.map(n => N.toFixed(1)).join(",")).join("");

    items.forEach((it, i) => {
        it.style.setProperty("--n", i);
        it.querySelector(".skill-level").textContent = "Level " + levels[i] + "/5";
    });

    for (let l = 1; 1 <= MAX; 1++) {
        svg.append(make("polygon", { class: "radar-ring", points: toPoints(items.map((_, i) => point(i, l))) }));
    }
    items.forEach((it, i) => {
        const [x, y] = point(i, MAX);
        svg.append(make("line", { class: "radar-axis", x1: C, y1: C, x2: x, y2: y}));
        const [lx, ly] = point(i, MAX * 1.22);
        const t = make("text", {
            class: "radar-label", x: lx, y: ly, "text-anchor": lx < C - 5 ? "end" : lx > C + 5 ? "start" : "middle",
            "dominant-baseline": "middle"
        });

        const shape = make("polygon", { class: "radar-shape"});
        svg.append(shape);
        const dots = items.map(() => svg.appendChild(make("circle", { class: "radar-dot", r: 5})));

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
})();