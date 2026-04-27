const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    nav.classList.toggle("open");
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

reveals.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll(".stat-number[data-count]");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;

    const steps = 40;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 28);

    counterObserver.unobserve(el);
  });
}, {
  threshold: 0.5
});

counters.forEach((counter) => counterObserver.observe(counter));

const tiltCards = document.querySelectorAll(".tilt-card, .feature-card, .player-card, .fact-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const filterButtons = document.querySelectorAll(".filter-row .filter-chip[data-filter]");
const playerCards = document.querySelectorAll(".player-card[data-position]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    playerCards.forEach((card) => {
      const position = card.dataset.position;
      const isSideBack = filter === "LD" && (position === "LD" || position === "LE");
      const shouldShow = filter === "all" || position === filter || isSideBack;

      card.style.display = shouldShow ? "" : "none";
    });
  });
});

const timezoneButtons = document.querySelectorAll(".timezone-filter .filter-chip[data-zone]");
const fixtureCards = document.querySelectorAll(".fixture-card[data-br]");

timezoneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const zone = button.dataset.zone;

    timezoneButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    fixtureCards.forEach((card) => {
      const timeElement = card.querySelector(".game-time");

      if (!timeElement) return;

      timeElement.textContent = card.dataset[zone] || card.dataset.br;
    });
  });
});

const form = document.querySelector(".contact-form-js");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Mensagem enviada com sucesso! Este é um protótipo visual.";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);

    form.reset();
  });
}

/* =========================================================
   JOGADORES.HTML — luz premium seguindo o mouse
   Cola no FINAL do script.js
   ========================================================= */

const premiumMouseCards = document.querySelectorAll(
  ".page-hero-card, .player-card, .stats-strip .item"
);

premiumMouseCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  });
});


