let uiEle_main = document.getElementById("todoItemsContainer");
let btnEle = document.getElementById("addTodo");
let saveBtnEle = document.getElementById("save_btn");
// creating to-do list
//

let todoList = get_list();

function get_list() {
  let todo_List_local = localStorage.getItem("list");
  let parse_local_list = JSON.parse(todo_List_local);

  if (parse_local_list === null) {
    return [];
  } else {
    return parse_local_list;
  }
}
//
let todoCount = todoList.length;
//
// todo-status-change-function
function todoStatusChange(checkboxId, labelId, todoId) {
  let check_Id = document.getElementById(checkboxId);
  let label_Id = document.getElementById(labelId);

  //   if (check_Id.checked === true) {
  //     label_Id.classList.add("checked");
  //   } else {
  //     label_Id.classList.remove("checked");
  //   }

  // Using Toggle

  label_Id.classList.toggle("checked");

  let todo_obj_Index = todoList.findIndex((each_todo_item) => {
    let todo_each_id = "todo" + each_todo_item.unique_id;

    if (todo_each_id === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObj = todoList[todo_obj_Index];
  if (todoObj.isChecked === true) {
    todoObj.isChecked = false;
  } else {
    todoObj.isChecked = true;
  }
}

// deleting todo
function delete_todo(todoId) {
  let del_id = document.getElementById(todoId);
  uiEle_main.removeChild(del_id);
  let delete_index = todoList.findIndex((each_todo) => {
    let index_todo = "todo" + each_todo.unique_id;
    if (index_todo === todoId) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(delete_index, 1);
}

function create_and_append_todo(todo) {
  let checkboxId = "checkbox" + todo.unique_id;
  let labelId = "label" + todo.unique_id;
  let todoId = "todo" + todo.unique_id;
  // li
  let liEle = document.createElement("li");
  liEle.id = todoId;
  liEle.classList.add("todo-item-container", "d-flex", "flex-row");
  uiEle_main.appendChild(liEle);
  // input
  let inputEle = document.createElement("input");
  inputEle.type = "checkbox";
  inputEle.id = checkboxId;
  inputEle.checked = todo.isChecked;
  inputEle.classList.add("checkbox-input");
  liEle.appendChild(inputEle);
  //   checked-Function
  inputEle.onclick = function () {
    todoStatusChange(checkboxId, labelId, todoId);
  };
  // div-label
  let labelContainerEle = document.createElement("div");
  labelContainerEle.classList.add("d-flex", "flex-row", "label-container");
  liEle.appendChild(labelContainerEle);
  // label
  let labelEle = document.createElement("label");
  labelEle.setAttribute("for", checkboxId);
  labelEle.classList.add("checkbox-label");
  labelEle.id = labelId;
  labelEle.textContent = todo.text;
  labelContainerEle.appendChild(labelEle);
  if (todo.isChecked === true) {
    labelEle.classList.add("checked");
  } else {
    labelEle.classList.remove("checked");
  }
  // div-delete
  let delEleContainer = document.createElement("div");
  delEleContainer.classList.add("delete-icon-container");
  labelContainerEle.appendChild(delEleContainer);
  // icon-del
  let iconEle = document.createElement("i");
  iconEle.classList.add("far", "fa-trash-alt", "delete-icon");
  delEleContainer.appendChild(iconEle);
  iconEle.onclick = function () {
    delete_todo(todoId);
  };
}

// forEach loop
todoList.forEach((each) => {
  create_and_append_todo(each);
});

//add New todo function
function todo_Event() {
  let userInputEle = document.getElementById("todoUserInput");
  let user_Val = userInputEle.value;

  if (user_Val === "") {
    alert("Please Enter a Valid TODO....!");
    return;
  }

  todoCount = todoCount + 1;

  let newTodo = {
    text: user_Val,
    unique_id: todoCount,
    isChecked: false,
  };
  todoList.push(newTodo);
  create_and_append_todo(newTodo);
  userInputEle.value = "";
}

//onclick add
addTodo.onclick = function () {
  todo_Event();
};

// local storage
saveBtnEle.onclick = function () {
  localStorage.setItem("list", JSON.stringify(todoList));
  alert("Saved ....!");
};
