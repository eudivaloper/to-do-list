// Aplicativo de lista de tarefas 
var taskInput = document.getElementById("new-task");                      // Nova tarefa
var addButton = document.getElementsByTagName("button")[0];               // Primeiro botão
var incompleteTasksHolder = document.getElementById("incomplete-tasks");  // Tarefas incompletas
var completedTasksHolder = document.getElementById("completed-tasks");    // Tarefas concluídas

var createNewTaskElement = function(taskString) {       // Novo item da lista de tarefas
  var listItem = document.createElement("li");          // Criar item de lista
  var checkBox = document.createElement("input");       // Input (checkbox)
  var label = document.createElement("label");          // Label
  var editInput = document.createElement("input");      // Input (text)
  var editButton = document.createElement("button");    // Button.edit
  var deleteButton = document.createElement("button");  // Button.delete

  checkBox.type = "checkbox";         // Cada elemento precisa ser modificado
  editInput.type = "text";            //
  editButton.innerText = "Edit";      //
  editButton.className = "edit";      //
  deleteButton.innerText = "Delete";  //
  deleteButton.className = "delete";  //
  label.innerText = taskString;       //

  listItem.appendChild(checkBox);      // Cada elemento precisa ser anexado
  listItem.appendChild(label);         //
  listItem.appendChild(editInput);     //
  listItem.appendChild(editButton);    //
  listItem.appendChild(deleteButton);  //

  return listItem;
};

var addTask = function() {                            // Adiciona uma nova tarefa
  var listItemName = taskInput.value || "New Item";   // Mantemos o valor atual ou fornecemos o padrão
  var listItem = createNewTaskElement(listItemName);  // Cria um novo item de lista com o texto de #new-task
  incompleteTasksHolder.appendChild(listItem);        // Anexar listItem a incompleteTasksHolder
  bindTaskEvents(listItem, taskCompleted);            // Nós o ligamos ao detentor incompleto
  taskInput.value = "";                               // redefine o campo
};

var editTask = function() {                                     // Editar uma tarefa existente
  var listItem = this.parentNode;                               // Criar item de lista
  var editInput = listItem.querySelector("input[type=text");    // Input (text)
  var label = listItem.querySelector("label");                  // Label
  var button = listItem.getElementsByTagName("button")[0];      // Button

  var containsClass = listItem.classList.contains("editMode");  // Verificamos o .editMode e atribuímos a ele uma variável
  if(containsClass) {                                           // Alterna de .editMode
      label.innerText = editInput.value;                        // O texto do rótulo se torna o valor da entrada
      button.innerText = "Edit";                                // Nome dos botões modificado para Editar
  } else {                                                      // Muda para .editMode
     editInput.value = label.innerText;                         // Valor de entrada se torna o texto do rótulo
     button.innerText = "Save";                                 // Nome do botão modificado para salvar
  }
    listItem.classList.toggle("editMode");                      // Toggle .editMode no pai
};

var deleteTask = function() {      // Exclui uma tarefa existente
  var listItem = this.parentNode;  // Usamos parentNode para direcionar o objeto que contém o botão delete
  var ul = listItem.parentNode;    // Usamos parentNode novamente para segmentar a lista que contém a tarefa
  ul.removeChild(listItem);        // Remove o item da lista pai do ul
};

var taskCompleted = function() {               // Marcar uma tarefa como concluída
  var listItem = this.parentNode;              // Nós atribuímos isso para legibilidade
  completedTasksHolder.appendChild(listItem);  // Anexar o item da lista de tarefas às # tarefas concluídas
  bindTaskEvents(listItem, taskIncomplete);    // Ligamo-lo ao suporte oposto
};

var taskIncomplete = function() {               // Marcar uma tarefa como incompleta
  var listItem = this.parentNode;               // Nós atribuímos isso para legibilidade
  incompleteTasksHolder.appendChild(listItem);  // Anexar o item da lista de tarefas às # tarefas incompletas
  bindTaskEvents(listItem, taskCompleted);      // Ligamo-lo ao suporte oposto
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {   // Selecione seus filhos
  var checkBox = taskListItem.querySelector("input[type=checkbox]");  //
  var editButton = taskListItem.querySelector("button.edit");         //
  var deleteButton = taskListItem.querySelector("button.delete");     //
  editButton.onclick = editTask;                                      // Vincular editTask ao botão editar
  deleteButton.onclick = deleteTask;                                  // Vincular deleteTask ao botão delete
  checkBox.onchange = checkBoxEventHandler;                           // Vincular checkBoxEventHandler à caixa de seleção
};

var ajaxRequest = function() {
  console.log("AJAX request");
};

addButton.addEventListener("click", addTask);      // Adiciona ouvinte de evento para o manipulador de clique à função addTask
addButton.addEventListener("click", ajaxRequest);  // Adiciona um ouvinte de evento para o AJAX

for(var i = 0; i < incompleteTasksHolder.children.length; i++) {     // Ciclo sobre incompletaTasksHolder ul itens da lista
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  // Vincular eventos aos filhos do item da lista (taskCompleted)
}

for(var i = 0; i < completedTasksHolder.children.length; i++) {      // Ciclo sobre concluídoTasksHolder ul itens da lista
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);   // Vincular eventos aos filhos do item da lista (taskIncomplete)
}