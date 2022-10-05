import { getDatabase, ref, child, get, set} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js"; // добавляем функции из файрбейза для работы
// import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {firebaseConfig} from './firebaseConfig.js';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// функция для чтения из базы данных Пользователей
const dbRef = ref(getDatabase()); // получаем ссылку на базу данных
let userName = JSON.parse(localStorage.getItem('user')).id;

readCompressors("All", userName); // выводим информацию о товаре, заранее передаем данные для фильтров
totalCountProductInCart(userName);

// функция вывода товаров на экран
async function readCompressors (brand, userName) {
    await get(child(dbRef, 'users/' + userName + '/' + 'cart/')).then((snap) => {
      if (snap.exists()) {
        let goodsUserCart = snap.val();
        console.log(goodsUserCart);
        let keys = Object.keys(goodsUserCart);
        console.log(keys);
        let sumCart = 0;

        get(child(dbRef, `compressors/`)).then((snap) => {
          if (snap.exists()) {
            let compressor = snap.val();
            console.log('compressor =', compressor);

            for (let i = 0; i < keys.length; ++i) {
              let img = compressor[keys[i]].img;
              let model = compressor[keys[i]].model;
              let capacity = compressor[keys[i]].capacity;
              let power = compressor[keys[i]].power;
              let pressure = compressor[keys[i]].pressure;
              let price = compressor[keys[i]].price;
              let name = compressor[keys[i]].name;
              let urlproduct = compressor[i].url;
              sumCart = sumCart + price;
              console.log('сумма товара в корзине = ', sumCart);
              let totalCartProduct = goodsUserCart[keys[i]].count;

              createDivProduct(img, brand, model, capacity, power, pressure, price, name, keys[i], totalCartProduct, urlproduct);
            }
          }
        });
      // вешаем слушатель событий на все кнопки добавления товара в корзину, иначе кнопки не будут реагировать на событие
        buttonListener();
      } 
        else 
      {
        console.log('Нет доступных данных');
      }
    }).catch((error) => {
      console.error(error);
    })
};

// функция для проверки товара, есть или нет в корзине и в случае, если есть то увеличивает на 1
async function chekUserGoods(userName, model, id, figure) {
  await get(child(dbRef, 'users/' + userName + '/' + 'cart/')).then((snap) => {
      let Cart = snap.val();
      // console.log(Cart);
      let keys = Object.keys(Cart);
      // console.log(keys);
      keys.forEach(key => {
        let count = Cart[id].count;
        if (key == id) {
          if (figure == 1) {
          set(ref(db, 'users/' + userName + '/' + 'cart/' + id), {
            model: model,
            count: ++count
          })
          document.querySelector(`.${model}`).innerHTML = count; //выводим каждый раз новое количество по каждому товару
        }
        else {
          if (count > 0) {
            set(ref(db, 'users/' + userName + '/' + 'cart/' + id), {
              model: model,
              count: --count
            });
          }
          else {
          }
          document.querySelector(`.${model}`).innerHTML = count; //выводим каждый раз новое количество по каждому товару
        }
      };
      });
      totalCountProductInCart(userName);
    });
};

// вешаем на все кнопки товара событие, чтобы записать товар в корзину
function buttonListener() {
  let buttonPlus = document.querySelectorAll('.button_cart_plus');
  let buttonMinus = document.querySelectorAll('.button_cart_minus');

  buttonPlus.forEach(item => {
    item.addEventListener('click', ()=>{
    let id = item.value;
    let model = item.name;
    let userName = JSON.parse(localStorage.getItem('user')).id;
    chekUserGoods(userName, model, id, 1);
    });
  });
  buttonMinus.forEach(item => {
    item.addEventListener('click', ()=>{
    let id = item.value;
    let model = item.name;
    let userName = JSON.parse(localStorage.getItem('user')).id; // Временное решение, чтобы передать Пользователя Sidor. В базе зарегистрирован стоит под номером 3
    chekUserGoods(userName, model, id, 0);
    });
  });
};

// создает div для отображения информации о товаре
function createDivProduct(img, brand, model, capacity, power, pressure, price, name, i, totalCartProduct, urlproduct) {
  let divFirst = document.querySelector('.container_products');
  let div = document.createElement('div');
  div.className = 'container_product';
  div.id = `${name}`;
  div.innerHTML = ` <div class="image" onclick="location.href='${urlproduct}'";>
                    <img class="img_product" src=${img} alt="Винтовой компрессор"></div>
                    <div class="description_product">
                        <table class="product_table">
                        <tbody>
                          <tr>
                            <td><span>Производитель:</span></td>
                            <td><span class="brand">${brand}</span></td>
                          </tr>
                          <tr>
                            <td><span>Модель:</span></td>
                            <td><span class="model">${model}</span></td>
                          </tr>
                          <tr>
                            <td><span>Производительность, м3/час</span></td>
                            <td><span class="capacity">${capacity}</span></td>
                          </tr>
                          <tr>
                            <td><span>Мощность, кВт:</span></td>
                            <td><span class="power">${power}</span></td>
                          </tr>
                          <tr>
                            <td><span>Давление, бар:</span></td>
                            <td><span class="pressure">${pressure}</span></td>
                          </tr>
                          <tr>
                            <td><span>Цена, EUR:</span></td>
                            <td><span class="price">${price}</span></td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <div class="cart_product_user">
                    <div class="countProduct">
                      <p>Количество товара</p>
                      <p style="text-align: center; font-size: 2em; color: #0072BC" class="${name}">${totalCartProduct}</p>
                    </div>
                      <div>
                        <button class="button_cart_plus" name="${name}" type="button"  value ="${i}">+</button>
                        <button class="button_cart_minus" name="${name}" type="button"  value ="${i}">-</button>
                      </div>
                  </div>`
  divFirst.append(div);
  buttonListener();
}

// функция вывода товаров на экран
async function totalCountProductInCart (userName) {
  await get(child(dbRef, 'users/' + userName + '/' + 'cart/')).then((snap) => {
    if (snap.exists()) {
      let goodsUserCart = snap.val();
      console.log(goodsUserCart);
      let keys = Object.keys(goodsUserCart);
      console.log(keys);
      let sumTotalCart = 0;
      let sumProductInCart = 0;

      get(child(dbRef, `compressors/`)).then((snap) => {
        if (snap.exists()) {
          let compressor = snap.val();

          for (let i = 0; i < keys.length; ++i) {
            let model = compressor[keys[i]].model;
            let countProductCart = goodsUserCart[keys[i]].count;
            let price = compressor[keys[i]].price;
            sumTotalCart = sumTotalCart + (countProductCart * price);
            sumProductInCart = sumProductInCart + countProductCart;
          }

          document.querySelector('.sumProductInCart').innerHTML = `${sumProductInCart}`;
          document.querySelector('.Total').innerHTML = `${sumTotalCart} EUR`;
          document.querySelector('.sumTotalCart').innerHTML = `${sumTotalCart} EUR`;
        }
      });
    } 
      else 
    {
      console.log('Нет доступных данных');
    }
  }).catch((error) => {
    console.error(error);
  })
};