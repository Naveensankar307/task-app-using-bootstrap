/* parent object 
for Browser -> window object,
for DOM -> document
 */

//document -> to access DOM element 
//querySelector -> it will help to access the element directly

const taskContainer = document.querySelector(".task__container");

//this is for readability 
const generateNewCard = (dataObject) =>
    `<div class="col-md-6 col-lg-4" id = ${dataObject.id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button type="button" class="btn btn-outline-danger">
      <i class="fa-solid fa-trash-can"></i>
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
};

//close the modal after save -> oneline code

/* issues 
    1) Modal is not closing after onclick -> after save changes
    2) whenever refreshing i lost the data
 */