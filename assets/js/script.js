'use strict';

/**
 * Adds an event to an element or list of elements
 */
const addEventOnElem = function (elem, event, callback) {
  if (elem instanceof NodeList) {
    elem.forEach(el => el.addEventListener(event, callback));
  } else {
    elem.addEventListener(event, callback);
  }
};

/**
 * Toggle navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header active on scroll down to 100px
 */
const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);

/**
 * Filter tab
 */
const tabCard = document.querySelectorAll("[data-tab-card]");
let lastTabCard = tabCard[0];

const navigateTab = function () {
  lastTabCard.classList.remove("active");
  this.classList.add("active");
  lastTabCard = this;
}

addEventOnElem(tabCard, "click", navigateTab);