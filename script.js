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