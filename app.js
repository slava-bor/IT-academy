const userData = {
  login: '',
  createPassword: '',
  confirmPassword: '',
};

const userDataIn = {
  login: '',
  password: '',
};

const url = 'https://immense-badlands-47107.herokuapp.com';
const urlSignUp = '/auth/signUp';
const urlSignIn = '/auth/signIn';
const urlVerifyToken = '/auth/verifyToken';

const signInBtn = document.querySelector('#signInBtn');
const signUpBtn = document.querySelector('#signUpBtn');
const createUser = document.querySelector('.createUser');
const registeredUser = document.querySelector('.registeredUser');
const message = document.querySelector('.message');
const emailIn = document.querySelector('.emailIn');
const passwordIn = document.querySelector('.passwordIn');
const emailUp = document.querySelector('.emailUp');
const passwordUp = document.querySelector('.passwordUp');
const passwordUpConf = document.querySelector('.passwordUpConf');

// кнопка (ВОЙТИ) АВТОРИЗАЦИЯ пользователя
signInBtn.addEventListener('click', function (e) {
  e.preventDefault();
  message.innerHTML = 'Авторизация';
  document.querySelector('.emailIn_message').innerHTML = 'в формате: name@mail.by';
  document.querySelector('.passwordIn_message').innerHTML = 'длина пароля не менее 6 символов';

  checkLength('.passwordIn_message', passwordIn, 6)

  if (emailIn.value == '') {
    document.querySelector('.emailIn_message').innerHTML = 'Не правильный формат e-mail';
  } 
    if (passwordIn.value == '') {
      document.querySelector('.passwordIn_message').innerHTML = 'Ошибочная длина пароля';
    } 
      else {
        signIn();
      }
});

// кнопка (СОЗДАТЬ) РЕГИСТРАЦИЯ нового пользователя
signUpBtn.addEventListener('click', function (e) {
  e.preventDefault();
  message.innerHTML = 'Регистрация нового пользователя';

  checkEmail(emailUp);
  checkLength('.passwordUpConf_message', passwordUpConf, 6);
  checkLength('.passwordUp_message', passwordUp, 6);
  checkPasswords(passwordUp, passwordUpConf, 6);

  if (emailUp.value == '' && passwordUp.value == '' && passwordUpConf.value == '') {
    document.querySelector('.message_error').innerHTML = 'Заполните поля';
  } else {
  signUp();
  }
});

// функция Регистрации
function signUp() {
  userData.login = emailUp.value;
  userData.createPassword = passwordUp.value;
  userData.confirmPassword = passwordUpConf.value;

  fetch (url + urlSignUp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;character=utf-8',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
      let result = response.status;
      if (result === 200) {
        document.querySelector('.message').innerHTML = 'Пользователь успешно создан!';
        setTimeout(() => {window.location.href = 'https://www.google.com'}, 1000);
      }
      return response.json();
      
  })
  .then(data => {console.log(data);
    if (data.message == 'Данный пользователь уже зарегистрирован') document.querySelector('.message_error').innerHTML = data.message;
  })
  .catch(error => console.log(error))
  
}

// функция Авторизации
function signIn() {
  userDataIn.login = emailIn.value;
  userDataIn.password = passwordIn.value;

  fetch (url + urlSignIn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;character=utf-8',
    },
    body: JSON.stringify(userDataIn),
  })
  .then(response => response.json())
  .then((data) => {
    if (data.token) {
      return fetch(url + urlVerifyToken, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;character=utf-8',
          Authorization: data.token,
        },
      })
      .then(response => response.json())
      .then(() => {window.location.href = 'https://www.google.com'})
      .catch((error) => console.log(error)) 
    }
    document.querySelector('.message_error').innerHTML = data.message; // вывод сообщений в заголовок
  })  
  .catch((error) => console.log(error));
}

// слушатель события для перехода в форму Регистрации нового пользователя
createUser.addEventListener('click', function (e) {
  message.innerHTML = 'Регистрация нового пользователя';
  document.querySelector('.message_error').innerHTML = '';
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.register-form').style.display = 'block';
});

// кнопка для возвращения к авторизации, если пользователь уже был создан
registeredUser.addEventListener('click', function (e) {
  message.innerHTML = 'Авторизация';
  document.querySelector('.message_error').innerHTML = '';
  document.querySelector('.login-form').style.display = 'block';
  document.querySelector('.register-form').style.display = 'none';
});

//проверяем правильность заполнения поля email
function checkEmail(input) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regExp.test(input.value.trim())) {
      showSuccess(input);
  } else {
      document.querySelector('.emailUp_message').innerHTML = 'Не правильный формат e-mail';
  }
}

// Если поле заполнено верно, выделяем зеленой границей
function showSuccess(input) {
  input.style.border = '1px solid green';
}

// Проверяем миниимальную длину пароля и выводим сообщение, если пароль меньше 6 символов (min)
function checkLength(str, input, min) {
  if (input.value.length < min) {
    document.querySelector(str).innerHTML = 'Ошибочная длина пароля';
  } 
  else {
      showSuccess(input);
  }
}

// Проверяем пароли на совпадение
function checkPasswords(password1, password2, min) {
  if (password1.value !== password2.value && password1.value.length > min && password2.value.length > min) {
    document.querySelector('.message_error').innerHTML = 'Пароли не совпадают';
  }
}