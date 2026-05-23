const signupEndpoint = "https://formsubmit.co/ajax/6a598b8e0a39184d2a15e0c00c841586";

const yearEl = document.getElementById("footer-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const animatedItems = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
);

animatedItems.forEach((item) => {
  const delay = item.getAttribute("data-delay");
  if (delay) {
    item.style.transitionDelay = `${delay}ms`;
  }
  observer.observe(item);
});

const parallaxSection = document.querySelector(".color-match");
const parallaxTarget = document.querySelector("[data-parallax]");
let parallaxTicking = false;

const updateParallax = () => {
  if (!parallaxSection || !parallaxTarget) return;
  const rect = parallaxSection.getBoundingClientRect();
  const windowHeight = window.innerHeight || 0;
  const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  const clamped = Math.max(0, Math.min(1, progress));
  const translate = 30 - clamped * 60;
  parallaxTarget.style.transform = `translateY(${translate}px)`;
  parallaxTicking = false;
};

const requestParallax = () => {
  if (!parallaxTicking) {
    parallaxTicking = true;
    window.requestAnimationFrame(updateParallax);
  }
};

window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);
updateParallax();

const form = document.getElementById("waitlist-form");
const emailInput = document.getElementById("testing-email");
const submitButton = document.getElementById("waitlist-submit");
const statusText = document.getElementById("form-status");

if (form && emailInput && submitButton && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusText.textContent = "";
    statusText.classList.remove("error");

    const originalLabel = submitButton.querySelector("span").textContent;
    submitButton.querySelector("span").textContent = "Joining...";
    submitButton.disabled = true;

    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          message: `${emailInput.value} joined a waitlist!`,
          _captcha: "false",
          _subject: "New Test Signup",
          _template: "table",
        }),
      });

      if (!response.ok) throw new Error("Signup failed");

      statusText.textContent = "You are on the testing waitlist.";
      emailInput.value = "";
    } catch (error) {
      statusText.textContent =
        "Something went wrong. Please try again in a moment.";
      statusText.classList.add("error");
    } finally {
      submitButton.querySelector("span").textContent = originalLabel;
      submitButton.disabled = false;
    }
  });
}
