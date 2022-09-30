import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js"; // добавляем функции из файрбейза для работы
import {firebaseConfig} from './firebaseConfig.js';
// Initialize Firebase
initializeApp(firebaseConfig);
const dbRef = ref(getDatabase()); // получаем ссылку на базу данных
const db = getDatabase();

let btnRegister = document.querySelector('.account-login__btn');

// считываем данные из  данных формы, а именно input
btnRegister.addEventListener('click', (e) => {
  e.preventDefault();
  let email = document.getElementsByName('email')[0].value;
  let password = document.getElementsByName('password')[0].value;
  let userDateOK = checkUserDate(email, password);
  readUserData(email, password, userDateOK);
});

// читаем список Пользователей в базе
async function readUserData (email, password, userDateOK) {
  await get(child(dbRef, `users/`)).then((snap) => {
        if (snap.exists()) {
          let listUser = snap.val();
          let arrayUser = Object.values(listUser);
          let coincident = checkUserEmail(email, password, arrayUser);

          if (coincident > 0 && !!coincident && userDateOK == 0) {
            localStorage.setItem('user',JSON.stringify({'id': coincident, "firstname": arrayUser[coincident].firstname}))
            setTimeout( function() {
                window.location.href = './onlineshop.html';
              }, 2 * 1000);
          }
        }
          else 
        {
          console.log('Нет доступных данных');
        }
      }).catch((error) => {
        console.error(error);
      })
  };

// проверяем на совпадение введенного Пользователем email при регистрации
function checkUserEmail (email, password, arrayUser) {
  for (let i = 0; i < arrayUser.length; ++i) {
    if (arrayUser[i].email == email && arrayUser[i].password == password) {
        return i;
    }
  }
  return undefined;
};

// проверяем на пустые и поля и на совпадение паролей
function checkUserDate (email, password) {
  let userDateOK = 0;

  if (email == '' || password == '') {
    ++userDateOK;
    document.querySelector('.alert-danger').style.display = 'block';
  };
  return userDateOK;
};
