const btnMobileNav = document.querySelector(".nav-btn");
const headerEl = document.querySelector(".header");
const heroSection = document.querySelector(".section-hero");
const headerWrapper = document.querySelector(".header-wrapper");
const navWrapper = document.querySelector(".nav-wrapper");

/////////////////////////////
//Mobile Navigation
btnMobileNav.addEventListener("click", (e) => {
  headerEl.classList.toggle("active");
});

navWrapper.addEventListener("click", (e) => {
  //make sure its a nav link and its active
  if (
    !e.target.classList.contains("main-nav-link") ||
    !headerEl.classList.contains("active")
  )
    return;

  //hide the nav
  headerEl.classList.remove("active");
});

/////////////////////////////
//Smooth Scrolling
const headerElHeight = headerEl.offsetHeight;

const allLinks = document.querySelectorAll("[data-scroll-to]");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const currentScroll = window.scrollY;
    const scrollToSection = document.querySelector(`${link.dataset.scrollTo}`);
    const coords = scrollToSection.getBoundingClientRect();

    //scroll to that element
    window.scrollTo({
      left: 0,
      top: coords.top + currentScroll - headerElHeight,
      behavior: "smooth",
    });
  });
});

/////////////////////////////
//slide in animations
let slideElements = [];

[...document.querySelectorAll(".slide-in-left")].forEach((el) =>
  slideElements.push(el)
);
[...document.querySelectorAll(".slide-in-right")].forEach((el) =>
  slideElements.push(el)
);
[...document.querySelectorAll(".slide-in-down")].forEach((el) =>
  slideElements.push(el)
);

const slideInCallback = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(
        "slide-in-left",
        "slide-in-down",
        "slide-in-right"
      );
      observer.unobserve(entry.target);
    }
  });
};

const slideInOptions = {
  root: null,
  threshold: 0.2,
};

const slideInObserver = new IntersectionObserver(
  slideInCallback,
  slideInOptions
);

slideElements.forEach((elem) => {
  slideInObserver.observe(elem);
});

/////////////////////////////
//Lazy imgages
const allImgs = document.querySelectorAll("img");

//add lazy-img class
allImgs.forEach((img) => {
  //dont add in logo img,header img,icons
  if (
    img.classList.contains("logo-img") ||
    img.closest(".hero-img") ||
    img.classList.contains("amentity-icon")
  ) {
    return;
  }

  img.classList.add("lazy-img");
});

const imgsCallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting == false) return;

    entry.target.classList.remove("lazy-img");
    this.unobserve(entry.target);
  });
};

const imgsOptions = {
  root: null,
  threshold: 0.3,
};

const imgsObserver = new IntersectionObserver(imgsCallback, imgsOptions);

allImgs.forEach((img) => {
  imgsObserver.observe(img);
});

/////////////////////////////
//Sticky navigation
const heroSectionHeight = heroSection.offsetHeight;
const thresholdValue = headerElHeight / heroSectionHeight ;

const navCallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting == true) {
      headerEl.classList.remove("sticky");
    } else {
      headerEl.classList.add("sticky");
    }
  });
};

const navOptions = {
    root: null,
    threshold: thresholdValue
};

const navObserver = new IntersectionObserver(navCallback, navOptions);
navObserver.observe(heroSection);
