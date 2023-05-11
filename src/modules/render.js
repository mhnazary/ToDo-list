import { setTasks, getTasks } from './storage.js';
import addTask from './add.js';
import removeTask from './remove.js';

const render = () => {
  const tasks = getTasks();
  const listContainer = document.getElementById('tasks');
  listContainer.innerHTML = '';
  const headingContainer = document.createElement('li');
  const heading = document.createElement('h1');
  const refreshIcon = document.createElement('div');
  refreshIcon.classList.add('icon-refresh');
  heading.textContent = 'Today\'s To Do';
  heading.classList.add('heading');
  headingContainer.appendChild(heading);
  headingContainer.appendChild(refreshIcon);
  listContainer.appendChild(headingContainer);
  refreshIcon.addEventListener('click', () => {
    render();
  });

  // Add task input field

  const inputField = document.createElement('input');
  inputField.classList.add('add-task');
  inputField.type = 'text';
  inputField.placeholder = 'Add to your list';
  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputField.value.trim() !== '') {
      if (inputField.value !== '') {
        addTask(inputField.value.trim());
        inputField.value = '';
        render();
      }
    }
  });

  // Return icon (add task button)

  const addBtn = document.createElement('input');
  addBtn.classList.add('icon-return');
  addBtn.type = 'submit';
  addBtn.setAttribute('value', '');
  addBtn.setAttribute('id', 'submit-new-item');
  addBtn.setAttribute('title', 'click this or press enter to submit');
  const addListInput = document.createElement('li');
  addListInput.appendChild(inputField);
  addListInput.appendChild(addBtn);
  listContainer.appendChild(addListInput);
  addBtn.addEventListener('click', () => {
    if (inputField.value !== '') {
      addTask(inputField.value.trim());
      render(tasks);
    }
  });

  // Creating li element

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', index + 1);

    // Checkbox

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';
    listItem.appendChild(checkbox);

    // Remove Button

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-task';
    removeBtn.classList.add('hidden');

    // Task text

    const description = document.createElement('textarea');
    description.setAttribute('rows', '1');
    description.value = task.description;
    if (task.completed === true) {
      description.classList.add('completed');
    }
    description.addEventListener('focus', () => {
      removeBtn.classList.remove('hidden');
      removeBtn.addEventListener('mousedown', () => {
        removeTask(index);
        render(tasks);
      });
    });
    description.addEventListener('blur', () => {
      removeBtn.classList.add('hidden');
    });
    description.addEventListener('input', (event) => {
      task.description = event.target.value;
    });
    description.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        task.description = description.value;
        setTasks(tasks);
        render(tasks);
      }
    });
    listItem.appendChild(description);
    listItem.appendChild(removeBtn);

    // Three vertical dots (more button)

    const dots = document.createElement('span');
    dots.classList.add('dots');
    listItem.appendChild(dots);
    listContainer.appendChild(listItem);
  });

  // Clear button

  const clearButton = document.createElement('button');
  clearButton.classList.add('clear-btn');
  clearButton.textContent = 'Clear completed tasks';
  const lastListItem = document.createElement('li');
  lastListItem.classList.add('clear-btn-container');
  lastListItem.appendChild(clearButton);
  listContainer.appendChild(lastListItem);
};

export default render;
