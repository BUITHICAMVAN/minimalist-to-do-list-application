var addInput = document.getElementById("add-input"),
  listItems = document.getElementById("list-items");

  // retrieve data from JS and save to localStorage
let todoData = JSON.parse(localStorage.getItem("todoData"))

function addButton() {
  // INFORM EMPTY INPUT
  if (addInput.value === "") {
    addInput.style.border = "1px solid red";
    alert("Please fill in your task");
    addInput.focus();
  } else {
    // ADD ITEM
    let li = document.createElement("li");
    const todoItems = `<div>${addInput.value}</div>
                        <div class="todo-controls">
                            <i onCLick="editInput(this)" class="edit fa-solid fa-pen-to-square"></i>
                            <i onClick="deleteInput(this)" class="delete fa-solid fa-trash"></i>
                        </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    addInput.value = ""
  }

  // if no data exists, create empty array
  if (!todoData) {
    todoData = []
  }
  let dataItem = {item: addInput.value, status: false};
  console.log(dataItem)
  todoData.push(dataItem)
  // store data, save todoData as string
  setLocalStorage()
}

// HANDLE DELETE
function deleteInput(e) {
  console.log(e.parentElement.parentElement);
  let deleteValue = e.parentElement.parentElement.innerText;
  if (confirm(`Are you sure? Do you want to delete this ${deleteValue}!`)) {
    e.parentElement.parentElement.remove();
    addInput.focus()
  }

  // iterate each element in todoData array
  todoData.forEach((element, index) => {
    // if the element is the one trimmed from deleteValue -> splice it out of the array
    if (element.item == deleteValue.trim()) {
      // starting index vs number of e to splice
      todoData.splice(index, 1)
    }
  });
  setLocalStorage()
}

function setLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(todoData))
}
