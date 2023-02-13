const overlay = document.querySelector(".overlay");
const openOverlayButton = document.querySelector(".open-overlay-button");
const closeOverlayButton = document.querySelector(".close-overlay-button");

const toggleHiddenClass = () => {
  overlay.classList.toggle("hidden");
};

openOverlayButton.addEventListener("click", toggleHiddenClass);
closeOverlayButton.addEventListener("click", toggleHiddenClass);
