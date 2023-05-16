import { getProductByBarcode, getProductsByNameAndPageNumber } from "./api.js";
import { constants } from "./constants.js";
import { createCamera, createProduct, createProductCount, createProducts, createPagination } from "./create.js";
import { renderProductError, renderProductsError, renderProductsLoadingState } from "./states.js";

const app = document.querySelector(".app");

export const renderHome = () => {
  app.innerHTML = ""; // Reset app

  const title = document.createElement("h1");
  title.textContent = constants.homeTitleContent;

  const paragraph = document.createElement("p");
  paragraph.textContent = constants.homeParagraphContent;

  const link = document.createElement("a");
  link.textContent = constants.homeLinkContent;
  link.href = "/#barcode";

  app.appendChild(title);
  app.appendChild(paragraph);
  app.appendChild(link);
};

export const renderBarcode = () => {
  app.innerHTML = ""; // Reset app

  const title = document.createElement("h1");
  title.textContent = constants.barcodeTitleContent;

  const paragraph = document.createElement("p");
  paragraph.textContent = constants.barcodeParagraphContent;

  app.appendChild(title);
  app.appendChild(paragraph);

  createCamera();
};

export const renderProduct = async (productId) => {
  app.innerHTML = ""; // Reset app

  const productData = await getProductByBarcode(productId);

  if (productData) {
    createProduct(productData);
  } else {
    renderProductError();
  }
};

export const renderProducts = async (productName, pageNumber) => {
  app.innerHTML = ""; // Reset app

  const title = document.createElement("h1");
  title.textContent = `Search results for ${productName}`;

  app.appendChild(title);

  renderProductsLoadingState();

  const productsData = await getProductsByNameAndPageNumber(productName, pageNumber);

  // Remove all children except the first
  while (app.childNodes.length > 1) {
    app.removeChild(app.lastChild);
  }

  if (productsData.products.length !== 0) {
    createProductCount(productsData.count);
    createProducts(productsData.products);
    createPagination(pageNumber, productName, productsData.count);
  } else {
    renderProductsError();
  }
};
