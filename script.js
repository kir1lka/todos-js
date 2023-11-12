const inputEl = document.getElementById("title");
const btnCreateEl = document.getElementById("create");
const listEl = document.getElementById("list");

//array date
let arr = [];

//res
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    arr = json.slice(0, 20);
    render(arr);
  })
  .catch((error) => console.error("Ошибка при загрузке данных:", error));

//functions
const render = (arr) => {
  listEl.innerHTML = "";

  arr.map((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
       <span class=${item.completed ? "text-decoration-line-through" : ""}>${
      item.title
    }</span>
       <span>
          <span class="btn btn-small btn-${
            item.completed ? "warning" : "success"
          }" data-index=${item.id} data-type="toggle">✓</span>
          <span class="btn btn-small btn-danger" data-index=${
            item.id
          } data-type="remove">×</span>
       </span>
    </li>`;

    listEl.appendChild(listItem);
  });
};

// events
btnCreateEl.onclick = () => {
  if (inputEl.value !== "") {
    //new value
    const index = arr.length;
    const newArr = { id: index + 1, title: inputEl.value, completed: false };
    arr.push(newArr);

    render(arr);
    inputEl.value = "";
  } else {
    inputEl.value = "";
    alert("Введите что-то в поле!");
  }
};

listEl.onclick = (e) => {
  if (e.target.dataset.index) {
    const index = Number(e.target.dataset.index);
    const type = e.target.dataset.type;

    if (type === "toggle") {
      arr[index - 1].completed = !arr[index - 1].completed;
    } else if (type === "remove") {
      delete arr[index - 1];
    }

    render(arr);
  }
};

//start script
render(arr);
