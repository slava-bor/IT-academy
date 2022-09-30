import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js"; // добавляем функции из файрбейза для работы
import {firebaseConfig} from './firebaseConfig.js';
// Initialize Firebase
initializeApp(firebaseConfig);
const dbRef = ref(getDatabase()); // получаем ссылку на базу данных
const db = getDatabase();

let btnRegister = document.querySelector('.account-register__submit');

// считываем данные из  данных формы, а именно input
btnRegister.addEventListener('click', () => {
  displayNone();

  let firstname = document.getElementsByName('firstname')[0].value;
  let lastname = document.getElementsByName('lastname')[0].value;
  let email = document.getElementsByName('email')[0].value;
  let telephone = document.getElementsByName('telephone')[0].value;
  let password = document.getElementsByName('password')[0].value;
  let confirm = document.getElementsByName('confirm')[0].value;

  let userDateOK = checkUserDate (firstname, lastname, email, password, confirm);
  readUserData(firstname, lastname, email, telephone, password, userDateOK);
});

// читаем список Пользователей в базе
async function readUserData (firstname, lastname, email, telephone, password, userDateOK) {
  await get(child(dbRef, `users/`)).then((snap) => {
        if (snap.exists()) {
          let listUser = snap.val();
          let arrayUser = Object.values(listUser);
          let countUser = arrayUser.length;
          let coincident = checkUserEmail(email, arrayUser);

          if (coincident == 0 && userDateOK == 0) {
            writeUserData(countUser, firstname, lastname, email, telephone, password);
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
function checkUserEmail (email, arrayUser) {
  let coincident = 0;
  for (let i = 0; i < arrayUser.length; ++i) {
    if (arrayUser[i].email == email) ++coincident;
  }
  if (coincident > 0 && email != '') {
    document.querySelector('.error-email').innerHTML = 'Такой пользователь уже зарегистрирован';
    document.querySelector('.error-email').style.display = 'block';
  }
  return coincident;
};

// проверяем на пустые и поля и на совпадение паролей
function checkUserDate (firstname, lastname, email, password, confirm) {
  let userDateOK = 0;

  if (firstname == '') {
    ++userDateOK;
    document.querySelector('.error-firstname').style.display = 'block';
  };

  if (lastname == '') {
    ++userDateOK;
    document.querySelector('.error-lastname').style.display = 'block';
  };

  if (email == '') {
    ++userDateOK;
    document.querySelector('.error-email').style.display = 'block';
  };

  if (password == '') {
    ++userDateOK;
    document.querySelector('.error-password').style.display = 'block';
  };

  if (password != confirm) {
    ++userDateOK;
    document.querySelector('.error-confirm').style.display = 'block';
  };

  return userDateOK;
}

// функция для записи в базу данных Пользователей
async function writeUserData(countUser, firstname, lastname, email, telephone, password) {
  await set(ref(db, 'users/' + countUser), {
    firstname: firstname,
    lastname: lastname,
    email: email,
    telephone: telephone,
    password: password,
    cntcart: 0
  }).then(data => {
    localStorage.setItem('user', JSON.stringify({"id": countUser, "firstname": firstname}))
  });
  setTimeout( function() {  
    window.location.href = './accountsuccess.html';
  }, 2 * 1000);
  document.querySelector('.logging_User').className = `logging_User status-active`;
}

// выключаем все div с сообщениями об ошибках
function displayNone() {
  document.querySelector('.error-firstname').style.display = 'none';
  document.querySelector('.error-lastname').style.display = 'none';
  document.querySelector('.error-email').style.display = 'none';
  document.querySelector('.error-password').style.display = 'none';
  document.querySelector('.error-confirm').style.display = 'none';
}