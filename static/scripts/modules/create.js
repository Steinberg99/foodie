import { checkPreviousNextPage } from "./helpers.js";

const app = document.querySelector(".app");

export const createCamera = async () => {
  const camera = document.createElement("video");

  app.appendChild(camera);

  const barcodeDetector = new BarcodeDetector({
    formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
  });
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
  });

  camera.srcObject = stream;
  await camera.play();

  window.setInterval(async () => {
    const barcodes = await barcodeDetector.detect(camera);

    if (barcodes.length <= 0) return;

    window.location.hash = "#product/" + barcodes[0].rawValue;
  }, 1000);
};

export const createProduct = (product) => {
  const title = document.createElement("h1");
  title.textContent = product.product_name;

  const image = document.createElement("img");
  image.src = product.image_url;

  const paragraph = document.createElement("p");
  paragraph.textContent = product.categories;

  app.appendChild(title);
  app.appendChild(image);
  app.appendChild(paragraph);
};

export const createPagination = (pageNumber, productName, productCount) => {
  const previousNextPage = checkPreviousNextPage(productCount, 24, pageNumber);
  const productCountElem = document.createElement("p");
  productCountElem.textContent = `${productCount} results`;

  app.appendChild(productCountElem);

  if (previousNextPage.hasNextPage || previousNextPage.hasPreviousPage) {
    const paginationWrapper = document.createElement("div");

    if (previousNextPage.hasNextPage) {
      const nextPageLink = document.createElement("a");
      nextPageLink.textContent = "Next page";
      nextPageLink.href = `/#products/${productName}&${pageNumber + 1}`;

      paginationWrapper.appendChild(nextPageLink);
    }

    if (previousNextPage.hasPreviousPage) {
      const previousPageLink = document.createElement("a");
      previousPageLink.textContent = "Previous page";
      previousPageLink.href = `/#products/${productName}&${pageNumber - 1}`;

      paginationWrapper.appendChild(previousPageLink);
    }

    app.appendChild(paginationWrapper);
  }
};

export const createProducts = (products) => {
  const productList = document.createElement("ul");

  products.forEach((product) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/#product/${product._id}`;
    const img = document.createElement("img");

    if (product.image_url) {
      img.src = product.image_url;
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = product.product_name;

    if (product.image_url) {
      link.appendChild(img);
    }

    link.appendChild(paragraph);
    listItem.appendChild(link);
    productList.appendChild(listItem);
  });

  app.appendChild(productList);
};
