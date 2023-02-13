const camera = document.querySelector("video");
const overlayContent = document.querySelector(".overlay-content");

const exampleId = "5000112545326";

let barcodeDetector = new BarcodeDetector({
  formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
});

const init = () => {
  scanBarcode();
};

const scanBarcode = async () => {
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

    fetchData(barcodes[0].rawValue);
  }, 1000);
};

const fetchData = async (barcode) => {
  const baseUrl = "https://world.openfoodfacts.org/api/v0/product/";

  const response = await fetch(baseUrl + barcode);
  const data = await response.json();

  console.log(data);

  setData(data);
};

const setData = (data) => {
  const product = data.product;

  overlayContent.append(createImg(product.image_url));
};

init();
