    // Vanila JavaScript todo list app

 // New-task
var taskInput = document.getElementById("new-task");  
// First button                   
var addButton = document.getElementsByTagName("button")[0];     
// Incomplete-tasks
var incompleteTasksHolder = document.getElementById("incomplete-tasks");  
// Completed-tasks
var completedTasksHolder = document.getElementById("completed-tasks");    


// New Task List Item
var createNewTaskElement = function(taskString) {  
  // Create List Item     
  var listItem = document.createElement("li");   
  // Input (checkbox)       
  var checkBox = document.createElement("input");   
  // Label    
  var label = document.createElement("label");   
   // Input (text)       
  var editInput = document.createElement("input");    
  // Button.edit
  var editButton = document.createElement("button");    
  // Button.delete
  var deleteButton = document.createElement("button");  


// Each element needs to be modified
  checkBox.type = "checkbox";         
  editInput.type = "text";            
  editButton.innerText = "Edit";      
  editButton.className = "edit";      
  deleteButton.innerText = "Delete";  
  deleteButton.className = "delete";  
  label.innerText = taskString;   
  

// Each element needs to be appended
  listItem.appendChild(checkBox);      
  listItem.appendChild(label);         
  listItem.appendChild(editInput);     
  listItem.appendChild(editButton);    
  listItem.appendChild(deleteButton);  

  return listItem;
};

// Add a new task
var addTask = function() {                     
  // We hold the current value or provide the default one       
  var listItemName = taskInput.value || "New Item";  
  // Create a new list item with the text from #new-task 
  var listItem = createNewTaskElement(listItemName);  
  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);  
  // We bind it to the incomplete holder      
  bindTaskEvents(listItem, taskCompleted);  
  // Resets the field          
  taskInput.value = "";                               
};

 // Edit an existing task
var editTask = function() {   
  // Create List Item                                 
  var listItem = this.parentNode;    
  // Input (text)                           
  var editInput = listItem.querySelector("input[type=text");   
   // Label 
  var label = listItem.querySelector("label");     
  // Button            
  var button = listItem.getElementsByTagName("button")[0];      
  // We check for .editMode and assign it a variable
  var containsClass = listItem.classList.contains("editMode");  

   // Switch from .editMode
  if(containsClass) {    
    // Label text become the input's value                                      
      label.innerText = editInput.value;       
      // Buttons name modified to Edit                 
      button.innerText = "Edit";     


     // Switch to .editMode                            
  } else {    
    // Input value becomes the label's  text                                                  
     editInput.value = label.innerText;    
      // Button name modified to Save                   
     button.innerText = "Save";                                 
  }
  // Toggle .editMode on the parent
    listItem.classList.toggle("editMode");                      
};

// Delete an existing task
var deleteTask = function() { 
  // We use parentNode to target the object containing the delete button     
  var listItem = this.parentNode;  
  // We use parentNode again to target the list containing the task
  var ul = listItem.parentNode;    
  // Remove the parent list item from the ul
  ul.removeChild(listItem);        
};

// Mark a task as complete
var taskCompleted = function() {   
  // We assign it for readability            
  var listItem = this.parentNode;          
  // Append the task list item to the #completed-tasks    
  completedTasksHolder.appendChild(listItem);  
  // We bind it to the opposite holder
  bindTaskEvents(listItem, taskIncomplete);    
};

// Mark a task as incomplete
var taskIncomplete = function() {     
  // We assign it for readability          
  var listItem = this.parentNode; 
  // Append the task list item to the #incomplete-tasks              
  incompleteTasksHolder.appendChild(listItem); 
  // We bind it to the opposite holder 
  bindTaskEvents(listItem, taskCompleted);      
};

// Select it's children
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {   
  var checkBox = taskListItem.querySelector("input[type=checkbox]");  
  var editButton = taskListItem.querySelector("button.edit");         
  var deleteButton = taskListItem.querySelector("button.delete");   
  
  // Bind editTask to edit button
  editButton.onclick = editTask;      
   // Bind deleteTask to delete button                                
  deleteButton.onclick = deleteTask;  
  // Bind checkBoxEventHandler to checkbox                               
  checkBox.onchange = checkBoxEventHandler;                           
};

var ajaxRequest = function() {
  console.log("AJAX request");
};

// Adds event listener for the click handler to the addTask function
addButton.addEventListener("click", addTask);   
// Adds an event listener for AJAX   
addButton.addEventListener("click", ajaxRequest);  

// Cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {   
  // Bind events to list item's children (taskCompleted)  
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  
}

  // Cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {    
  // Bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);   
}