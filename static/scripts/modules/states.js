import { constants } from "./constants.js";

const app = document.querySelector(".app");

export const renderProductsLoadingState = () => {
  const skeletonsWrapper = document.createElement("div");
  skeletonsWrapper.classList.add("skeletons-wrapper");
  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading...";

  for (let i = 0; i < 24; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton");

    skeletonsWrapper.appendChild(skeleton);
  }

  app.appendChild(loadingText);
  app.appendChild(skeletonsWrapper);
};

export const renderProductError = () => {
  const title = document.createElement("h1");
  title.textContent = "Whoops!";

  const paragraph = document.createElement("p");
  paragraph.textContent = constants.errorMessage;

  app.appendChild(title);
  app.appendChild(paragraph);
};

export const renderProductsError = () => {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = constants.errorMessage;

  const homeLink = document.createElement("a");
  homeLink.textContent = "Return to home";
  homeLink.href = "/#home";

  app.appendChild(errorMessage);
  app.appendChild(homeLink);
};
