import { router } from "./modules/router.js";

if (window.location.hash == "") {
  window.location.hash = "#home";
}

const productForm = document.querySelector(".product-form");
const productInput = document.querySelector(".product-input");
const productsForm = document.querySelector(".products-form");
const productsInput = document.querySelector(".products-input");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  window.location.hash = `#product/${productInput.value}`;
});
productsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  window.location.hash = `#products/${productsInput.value}&1`;
});

router();
