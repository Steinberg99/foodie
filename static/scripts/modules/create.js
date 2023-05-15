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

    console.log(barcodes);

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

export const createPagination = () => {};

export const createProducts = () => {};
