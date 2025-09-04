// CODE EXPLAINED channel
// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST,id;

// get item from localStorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;   //set the id to the last one in the list
  loadList(LIST);   //load the list to the user interface
} else {
  //if data is empty
  LIST = [];
  id = 0;
}

//load items to the user's interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name,item.id,item.done,item.trash);
  });
}

// Clear Local Storage
clear.addEventListener("click",function(){
  localStorage.clear();
  location.reload();
})

//Show today's date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric"
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to-do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
            </li>
            `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
};

//add item to the list when user press the enter key
//enter keycode no is 13, so,
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const toDo = input.value;

    //if input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      id++;
      // add item to local storage (this code must be addded where LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    input.value = "";
  }
});

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event) {
  const element = event.target; //return clicked lement inside list
  const elementJob = element.attributes.job.value; //complete or remove

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "remove") {
    removeToDo(element);
  }
  // add item to local storage (this code must be addded where LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
