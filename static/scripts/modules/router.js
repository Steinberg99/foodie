import { getProductByBarcode, getProductsByNameAndPageNumber } from "./api.js";
import { renderHome, renderBarcode, renderProduct, renderProducts } from "./render.js";

export const router = () => {
  routie({
    home: () => {
      renderHome();
    },
    barcode: () => {
      renderBarcode();
    },
    "product/:productId": (productId) => {
      renderProduct(productId);
    },
    "products/:productName&:pageNumber": (productName, pageNumber) => {
      renderProducts(productName, pageNumber);
    },
  });
};
