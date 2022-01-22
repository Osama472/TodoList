const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() !=0 ){
        addBtn.classList.add('active')//active the button
    }else{
        addBtn.classList.remove('active')//unactive the button
    }
}

showTask();

addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem('New Todo');
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object 
    }
    listArr.push(userData);
    localStorage.setItem('New Todo', JSON.stringify(listArr));//transforming js object into a json string
    showTask();
}
//function to add task list inside ul
function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object 
    }
    const pendingNum = document.querySelector('.pendingNum')
    pendingNum.textContent = listArr.length; //passing the length value in pendingNum
    if(listArr.length > 0 ){
        deleteAllBtn.classList.add('active')
    }else{
        deleteAllBtn.classList.remove('active')
    }
    let newLiTag = ``;
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";//once the task done leave the input field blank
}

//deleting task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//deleting or removing the particular indexed li
    //after remove the li again update the local stroage
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    showTask();
}

//deleting all task function
deleteAllBtn.onclick = () => {
    listArr = [];//empty an array
    //after delete all task again update the local storage 
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}
