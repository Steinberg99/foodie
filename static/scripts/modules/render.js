import { getProductByBarcode, getProductsByNameAndPageNumber } from "./api.js";
import { constants } from "./constants.js";
import { createCamera, createProduct, createPagination, createProducts } from "./create.js";
import { checkPreviousNextPage } from "./helpers.js";
import { renderProductError, renderProductsError, renderSkeletons } from "./states.js";

const app = document.querySelector(".app");
const skeletonsWrapper = document.querySelector(".skeletons-wrapper");

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

  const skeletonsWrapper = document.createElement("div");
  app.appendChild(skeletonsWrapper);

  renderSkeletons(skeletonsWrapper);

  const productsData = await getProductsByNameAndPageNumber(productName, pageNumber);

  skeletonsWrapper.innerHTML = ""; // Remove skeletons

  if (productsData) {
    createPagination(checkPreviousNextPage(productsData.count));
    createProducts(productsData.products);
  } else {
    renderProductsError();
  }
};
