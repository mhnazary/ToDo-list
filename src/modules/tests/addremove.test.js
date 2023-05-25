import addTask from '../add.js';
import removeTask from '../remove.js';
import { setTasks, getTasks } from '../storage.js';

jest.mock('../storage', () => {
  let tasks = [];
  return {
    setTasks: (newTasks) => {
      tasks = newTasks;
    },
    getTasks: () => tasks,
  };
});

describe('addTask', () => {
  beforeEach(() => {
    setTasks([]);
  });
  it('should add a task to the tasks array', () => {
    const description = 'Test task';
    addTask(description);
    const tasks = getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe(description);
    expect(tasks[0].completed).toBeFalsy();
    expect(tasks[0].index).toBe(1);
  });
});

describe('removeTask', () => {
  beforeEach(() => {
    setTasks([]);
  });
  it('should remove a task from the tasks array', () => {
    setTasks([{ description: 'Task 1', completed: false, index: 1 }, { description: 'Task 2', completed: false, index: 2 }]);
    expect(getTasks()).toHaveLength(2);
    removeTask(0);
    expect(getTasks()).toHaveLength(1);
    expect(getTasks()[0].index).toBe(1);
  });
});

describe('addTask', () => {
  beforeEach(() => {
    setTasks([]);
    document.body.innerHTML = `
      <ul id="task-list">
        <button type="submit" id="add-task">Add Task</button>
      </ul>
        `;
  });

  it('should add a task to the tasks array and the task list', () => {
    const addListInput = document.getElementById('task-list');
    const inputField = document.createElement('textarea');
    addListInput.appendChild(inputField);
    const submitBtn = document.getElementById('add-task');
    const description = 'Test task';
    addTask(description);
    inputField.value = description;
    submitBtn.click();

    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe(description);
    expect(tasks[0].completed).toBeFalsy();
    expect(tasks[0].index).toBe(1);

    expect(addListInput.children).toHaveLength(2);
    expect(addListInput.children[1].tagName).toBe('TEXTAREA');
    expect(addListInput.children[1].value).toBe(description);
    expect(addListInput.children[0].tagName).toBe('BUTTON');
    expect(addListInput.children[1].value.trim()).toBe(description);
  });
});
