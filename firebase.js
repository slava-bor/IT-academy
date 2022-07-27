import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"; // добавляем функции из файрбейза для работы
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"; // добавляем функции из файрбейза для работы

const firebaseConfig = {
  apiKey: "AIzaSyDp1vIRngfIoLbEjQQ8ZUG76wH19ja4xEE",
  authDomain: "zadanie-4-it-academy.firebaseapp.com",
  databaseURL: "https://zadanie-4-it-academy-default-rtdb.firebaseio.com",
  projectId: "zadanie-4-it-academy",
  storageBucket: "zadanie-4-it-academy.appspot.com",
  messagingSenderId: "50598495760",
  appId: "1:50598495760:web:e88d9c6cf81ebc9a89ac95"
}; // данные автоматически сконфигурированные при создании своей базы

const app = initializeApp(firebaseConfig); // просто инициализация приложения

document.querySelector('#send-button').addEventListener('click', writeUserData); // вешаем слушатель событий на кнопку отправки и привязываем к ней функцию writeUserData

const dbRef = ref(getDatabase()); // получаем ссылку на базу данных

let users = await getAllUSers(); // при загрузке страницы, сначала берем все данные с сервера (базы)
// с помощью await ждем пока придут все данные
textData(users); // выводим все имеющиеся данные в на сервере (базе) на экран

async function writeUserData() { // асинхронная функция для отправки нового пользователя на сервер
    let userId = users.length; // используем userId, чтобы при отправке пользователя на сервер, каждый пользователь имел свой номер 1,2,3 и т.д.
    let name = document.querySelector('#name').value;
    let surname = document.querySelector('#surname').value;
    
    await set(child(dbRef, 'users/' + userId), { // отправляем данные на сервер
      username: name,
      surname: surname
    });
    users = await getAllUSers(); // получаем всех пользователей с сервера
    textData(users); // выводим на экран обновленный список пользователей
}

async function getAllUSers() { // асинхронная функция для получения данных с сервера
  let users = await get(child(dbRef, `users/`)); 
  return users.val() == null ? [] : users.val(); 
}

function textData(users) { // функция для вывода списка пользователей
  let block = document.querySelector('#list-of-users');
  block.innerHTML = '';
  for(let i = 0; i < users.length; i++) {
      let text = `<li>Имя: ${users[i].username}; Фамилия: ${users[i].surname}</li>`;
      block.innerHTML += text;
  }
}