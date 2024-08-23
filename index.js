
let addBtn = document.querySelector('.add')
let deleteBtn = document.querySelector('.delete')
let allBtn = document.querySelector('.all')

let modal = true;
let deleteSelect = false;
let sectionSelect = true


let taskModal = document.querySelector('.add-task')
let removeModal=()=>{
    console.log(3)
    taskModal.classList.remove('flex')
    modal = true
}

let priorityColor = 'blue'

let redBtn = document.querySelector('.red')
let yellowBtn = document.querySelector('.yellow')
let greenBtn = document.querySelector('.green')
let blueBtn = document.querySelector('.blue')

let cont = document.querySelector('.main-body')

let index = localStorage.length
if(localStorage.length > 0){
    Object.keys(localStorage).forEach(function(key){
        index = Math.max(index,key)
    })
}

let edit = (task) => {

    let taskContent = task.querySelector('.task').children[1]
    let text = taskContent.innerHTML
    taskContent.innerHTML = ""
    let edition = document.createElement('textarea')
    edition.classList.add('.edit-text')
    edition.innerText = `${text}`
    taskContent.appendChild(edition)
}

let update = (task,key,priorityColor)=>{
    let taskContent = task.querySelector('.task').children[1]
    let taskEdit = task.querySelector('textarea')
    taskContent.innerHTML = taskEdit.value

    let taskData = [];
    taskData[0] = taskEdit.value
    taskData[1] = priorityColor
    localStorage.setItem(`${key}`,JSON.stringify(taskData))
}

let addTask = (priorityColor)=>{

    console.log(4)
    let textInput = document.querySelector('#input-text')
    let text = textInput.value

    if(text == "") return

    let task = document.createElement('div')

    task.innerHTML = `<div class="border task flex">
            <div class="border priority-indicator"></div>
            <div class="border task-content">${text}</div>
                <div class="border lock-section flex">
                <div class="border lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path></svg>
                </div>
            </div>
        </div> `

    task.classList.add(`pri-${priorityColor}`)
    
    task.setAttribute('id', `${++index}`)
    let key = index

    let taskData = [];
    taskData[0] = text
    taskData[1] = priorityColor

    localStorage.setItem(`${index}`,JSON.stringify(taskData))

    task.classList.add('task-locked')
    let lock = task.querySelector('.lock')

    lock.addEventListener('click',()=>{

        if(task.classList[1] == 'task-locked'){
            lock.children[0].style.color="green"
            lock.children[0].innerHTML = '<path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path>'
            task.classList.replace('task-locked','unlock') 
            edit(task)
        }else{
            lock.children[0].style.color="black"
            lock.children[0].innerHTML = '<path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>'
            task.classList.replace('unlock','task-locked') 
            update(task,key,priorityColor)
        }
        
    })

    cont.appendChild(task)

}

let addFromLS = (key,text, priorityColor)=>{

    if(text == "") return

    let task = document.createElement('div')
    task.innerHTML = `<div class="border task flex">
            <div class="priority-indicator"></div>
            <div class="task-content">${text}</div>
                <div class="lock-section flex">
                <div class="lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path></svg>
                </div>
            </div>
        </div> `
    task.classList.add(`pri-${priorityColor}`)

    task.setAttribute('id', `${key}`)

    task.classList.add('task-locked')
    let lock = task.querySelector('.lock')

    lock.addEventListener('click',()=>{

        if(task.classList[1] == 'task-locked'){
            lock.children[0].style.color="green"
            lock.children[0].innerHTML = '<path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path>'
            task.classList.replace('task-locked','unlock') 
            edit(task)
            
        }else{
            lock.children[0].style.color="black"
            lock.children[0].innerHTML = '<path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>'
            task.classList.replace('unlock','task-locked') 
            update(task,key,priorityColor)
        }
    })

    cont.appendChild(task)

}

let add = () =>{
    if(modal && sectionSelect){
        taskModal.classList.add('flex')
        modal = false;
        priorityColor = 'blue'

        taskModal.querySelector('.priority').addEventListener('click', function(e){
            let eventTarget = e.target
            // eventTarget.closest('.priority').children[4].classList.remove('border')
            let color = eventTarget.classList[0]
            console.log(5) 
            if(color == 'red' || color == 'yellow' || color == 'green' || color == 'blue') {
                priorityColor = color
                // eventTarget.classList.remove('border')
            }
        })

        document.addEventListener('keypress',(e)=>{

            if(e.key == 'Enter'){
                addTask(priorityColor)
                console.log(2)
                let textInput = document.querySelector('#input-text')
                textInput.value = ""
                priorityColor = 'blue'
                // taskModal.querySelector('.priority').children[4].classList.add('border')
                removeModal()
            }
        })
        
    }else{
        addTask(priorityColor)
        console.log(1)
        // taskModal.querySelector('.priority').children[4].classList.add('border')
        let textInput = document.querySelector('#input-text')
        textInput.value = ""
        priorityColor = "blue"
        removeModal()
    }
}

let del = (e)=>{

    if(deleteSelect){
        let eventTarget = e.target
        let delClass = eventTarget.closest('.task')
        if(delClass != null){
            let key = delClass.parentElement.id
            localStorage.removeItem(key)
            document.getElementById(`${key}`).remove()
        }
    }

}


let delfn = () =>{

    deleteSelect = !deleteSelect

    if(deleteSelect){
        deleteBtn.children[0].style.color="red"
        cont.addEventListener('click',del)
    }

    if(!deleteSelect){
        deleteBtn.children[0].style.color="black"
    }
    
    
}

let showSelected = (eventTarget) =>{
    sectionSelect = false
    let section = eventTarget.classList[0]
    // let priorityTask = cont.querySelectorAll(`.pri-${section}`)

    let selectedPriority = cont.querySelectorAll(`.pri-${section}`)
    if(selectedPriority.length>0){
        selectedPriority.forEach((item)=>{
            if(item.classList[2] != undefined) item.classList.remove('display-none')
        })
    }

    let priorityTask = cont.querySelectorAll(`div[class^="pri-"]:not(.pri-${section})`)
    
    if(priorityTask.length>0){
        priorityTask.forEach((item)=>{
            item.classList.add('display-none')
        })
    }
    // priorityTask.classList.add('display-none')

}

let showAll = ()=>{
    sectionSelect = true
    let allTask = cont.querySelectorAll('div[class^="pri-"]')
    if(allTask.length>0){
        allTask.forEach((item)=>{
            if(item.classList[2] != undefined) item.classList.remove('display-none')
        })
    }
}

document.querySelector('body').addEventListener('click',function(e){
    let eventTarget = e.target

    if(eventTarget.classList[0] == 'add'){
        add()
    }else if(eventTarget.classList[0] == 'delete'){
        delfn()
    }else if(eventTarget.classList[0] == 'all'){
        showAll()
    }else {
        let section = eventTarget.classList[0]
        if(eventTarget.closest('.navbar') && (section == 'red' || section == 'yellow' || section == 'green' || section == 'blue' )){
            showSelected(eventTarget)
        }
    }
})




if(localStorage.length > 0){ 
    for (const [key, value] of Object.entries(localStorage)) {
        let dataArr = JSON.parse(localStorage.getItem(key))
        addFromLS(key,dataArr[0],dataArr[1])
     }
}