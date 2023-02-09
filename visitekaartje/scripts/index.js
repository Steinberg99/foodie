const biographyContent = document.querySelector(".notes-content");

const id = "cldeozsp33vc90bw53gqzjjti";

const init = async () => {
  const data = await fetchData(id);

  console.log(data);

  setData(data);
};

// Fetch user data based on id

const fetchData = async (id) => {
  const url = `https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/member?id=${id}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.member;
};

// Set the user data

const setData = (data) => {
  biographyContent.innerHTML = `
  <img src="${data.avatar}" />

  ${getBiographyDivs(data)}
  `;
};

const getBiographyDivs = (data) => {
  const biographyDivs = [
    { label: "Name:", value: `${data.name} ${data.surname}` },
    { label: "Nickname:", value: data.nickname },
    { label: "Bio:", value: data.bio.html },
    { label: "GitHub handle:", value: data.gitHubHandle },
  ]
    .map((obj) => biographyDiv(obj))
    .join(" ");

  return biographyDivs;
};

const biographyDiv = (obj) => {
  return `
  <div>
    <h2>${obj.label}</h2>

    <p>${obj.value}</p>
  </div>
  `;
};

init();
