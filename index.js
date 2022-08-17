/* parent object 
for Browser -> window object,
for DOM -> document
 */

//document -> to access DOM element 
//querySelector -> it will help to access the element directly

const taskContainer = document.querySelector(".task__container");

let globalStore = []; // some values -> localstorage objects

//this is for readability 
const generateNewCard = (dataObject) =>
  `<div class="col-md-6 col-lg-4" >
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id = ${dataObject.id} onclick="deleteCard.apply(this, arguments)">
      <i class="fa-solid fa-trash-can" id = ${dataObject.id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src="${dataObject.imageUrl}"
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title text-primary fw-bolder">
      ${dataObject.taskTitle}
    </h5>
    <p class="card-text">
      ${dataObject.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${dataObject.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end">
      open task
    </button>
  </div>
</div>
</div>`;


// loading previous card to window to tackle the refreshing issue
const loadInitialCardData = () => {
  //accessing localstorage to get tasky card data
  const getCardData = localStorage.getItem("tasky"); //to get a new data i have to use getItem
  //converting the data from string to normal object
  const {cards} = JSON.parse(getCardData);
  //looping over the array of task to create a HTML card, inject it to in DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
    // updating my global storage 
    globalStore.push(cardObject);
  })
};

//To save the new card while clicking save new button
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,  //it will return unique number for id for every seconds 
    imageUrl: document.getElementById("imageUrl").value,// value -> to access the value not the whole tag
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value,
  };

  console.log(taskData);

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
};
// Features
//1) Delete Card
const deleteCard = (event) =>{
  //to access the ID i need to access the event
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  //need the ID of the element that being clicked
  
  //match the ID of the element with the element ID in Global store
  globalStore = globalStore.filter((task) => task.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}))
  //contacting the parent
  if(tagname==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
  
}



//close the modal after save -> oneline code -> data-bs-dismiss

/* issues 
    1) Modal is not closing after onclick -> after save changes -> solved with data-bs-dismiss
    2) whenever refreshing i lost the data -> to solve this i have to use -> LOCAL STORAGE -> Solved with local storage

    local storage -> It is API -> Application Programming interface
    Application -> can be web app or mobile app or browser app -> But here Local Storage is our APP
    Programming -> Accessing application via Programming
    Interface -> Middle man -> accessing application programmatically

    we can access the local storage via javascript with some methods 
 */

/* Features
    1) Delete the card❌ -> added
    2) Edit the card📝
    3) Open the Card📖
 */

