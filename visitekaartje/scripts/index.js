const id = "cldeozsp33vc90bw53gqzjjti";

const init = async () => {
  const data = fetchData(id);

  setData(data);
};

const fetchData = async (id) => {
  const url =
    "https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/members?first=100";
  const response = await fetch(url);
  const data = await response.json();
  const members = data.members;

  return members.filter((member) => member.id === id)[0];
};

const setData = (data) => {
  console.log(data);
};

init();
