import {v4 as uuidV4} from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
}

const list = document.querySelector('.list')as HTMLUListElement
const form = document.querySelector('.task-form') as HTMLFormElement
const input = document.querySelector('.new-task-title') as HTMLInputElement
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)


form?.addEventListener('submit', (event) => {
  event.preventDefault()

  if (input.value == "" || input.value == null) return

  const newTask: Task =  {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTasks()
  
  addListItem(newTask)
  input.value = ''
})

function addListItem( task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')


  checkbox.classList.add ('form-check-input', 'mx-3')
  label.style.textTransform = 'capitalize'

  checkbox.addEventListener('change', ()=> {
    task.completed = checkbox.checked
    if (checkbox.checked){
      label.style.textDecoration = 'line-through'
    } else {
      label.style.textDecoration = 'none'
    }
    saveTasks()
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list.append(item)
}

function saveTasks() {
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

function loadTasks() {
  const taskJSON = localStorage.getItem('tasks')
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}