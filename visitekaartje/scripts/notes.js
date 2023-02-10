const notes = document.querySelector(".notes");
const openNotesButton = document.querySelector(".open-notes-button");
const closeNotesButton = document.querySelector(".close-notes-button");
const toolbarNotesButton = document.querySelector(".toolbar-notes-button");

openNotesButton.addEventListener("click", () => {
  if (!notes.classList.contains("hidden")) return;

  notes.classList.toggle("hidden");
  toolbarNotesButton.classList.toggle("hidden");
});

closeNotesButton.addEventListener("click", () => {
  notes.classList.toggle("hidden");
  toolbarNotesButton.classList.toggle("hidden");
});
