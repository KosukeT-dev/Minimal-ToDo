const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const todo = document.getElementById('todo');

function showTime() {
  const today = new Date();
  let hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)} ${amPm}`;

  clearTodoAtMidnight();

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBg() {
  const today = new Date();
  const hour = today.getHours();

  if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
  } else {
    greeting.textContent = 'Good Evening, ';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function getTodo() {
  if (localStorage.getItem('todo') === null) {
    todo.textContent = '[Enter todo]';
  } else {
    todo.textContent = localStorage.getItem('todo');
  }
}

function clearTodoAtMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

  const timeUntilMidnight = midnight - now;

  setTimeout(() => {
    localStorage.removeItem('todo');
    getTodo();
    clearTodoAtMidnight();
  }, timeUntilMidnight);
}

if (localStorage.getItem('name') === null && localStorage.getItem('todo') === null) {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    progressSteps: ['1', '2']
  }).queue([
    {
      title: 'Your Name',
      input: 'text',
    },
    {
      title: 'What is your main focus for today?',
      input: 'text',
    }
  ]).then((result) => {
    if (result.value) {
      const enteredName = result.value[0];
      const enteredTodo = result.value[1];

      Swal.fire({
        title: 'All done!',
        html: `
              <p>Your Name: ${enteredName}</p>
              <p>Your Todo: ${enteredTodo}</p>
            `,
        confirmButtonText: 'Great!'
      })

      localStorage.setItem('name', enteredName); // 名前を正しく保存
      localStorage.setItem('todo', enteredTodo);

      getName();
      getTodo();
      showTime();
      setBg();
    }
  })
} else {
  getTodo();
  showTime();
  setBg();
  getName(); 
}
