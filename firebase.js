import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js"; // добавляем функции из файрбейза для работы
import {firebaseConfig} from './firebaseConfig.js';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// функция для чтения из базы данных Пользователей
const dbRef = ref(getDatabase()); // получаем ссылку на базу данных

await readCompressors("All", 100, 3000, 0.5, 4); // выводим информацию о товаре, заранее передаем данные для фильтров
let countCart = 0; // счетчик товара в корзине

let form = document.getElementById('form');
// получаем данные из form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let brand = document.querySelector('select').value;
  let capacityMin = Number(document.getElementById('capacityMin').value);
  let capacityMax = Number(document.getElementById('capacityMax').value);
  let priceMin = Number(document.getElementById('priceMin').value);
  let priceMax = Number(document.getElementById('priceMax').value);

  readCompressors(brand, priceMin, priceMax, capacityMin, capacityMax); // выводим информацию о товаре
})

// функция вывода товаров на экран
async function readCompressors (brand, priceMin, priceMax, capacityMin, capacityMax) {
    await get(child(dbRef, `compressors/`)).then((snap) => {
      if (snap.exists()) {
        let compressor = snap.val();
        document.querySelector('.container_products').innerHTML = '';

        for (let i = 0; i <=18; ++i) {
          let img = compressor[i].img;
          let model = compressor[i].model;
          let capacity = compressor[i].capacity;
          let power = compressor[i].power;
          let pressure = compressor[i].pressure;
          let price = compressor[i].price;
          let name = compressor[i].name;
          let urlproduct = compressor[i].url;
          if (brand == "All" && price > priceMin && price < priceMax && capacity > capacityMin && capacity < capacityMax) {
            createDivProduct(img, brand, model, capacity, power, pressure, price, name, i, urlproduct);
          }
          if (compressor[i].brand == brand && price > priceMin && price < priceMax && capacity > capacityMin && capacity < capacityMax) {
            createDivProduct(img, brand, model, capacity, power, pressure, price, name, i, urlproduct);
          }
        }
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

let count = 1;
// функция для записи товара Пользователя в базу
async function writeUserCart(userName, model, id, countCart) {
  chekUserGoods(userName, model, id);
  // console.log('countCart =', countCart);
  await set(ref(db, 'users/' + userName + '/' + 'cart' + '/' + id), {
    model: model,
    count: count
  }).then( () => {
    set(ref(db, 'users/' + userName + '/' + 'cntCart'), {
      cntCart: countCart
    })
  });
};

// функция для проверки товара, есть или нет в корзине и в случае, если есть то увеличивает на 1
async function chekUserGoods(userName, model, id) {
  await get(child(dbRef, 'users/' + userName + '/' + 'cart/')).then((snap) => {
      let Cart = snap.val();
      console.log(Cart);
      let keys = Object.keys(Cart);

      keys.forEach(key => {
        if (key == id) {
          let count = Cart[id].count;
          let price = Cart[id].price;
          console.log('price =', price);
          set(ref(db, 'users/' + userName + '/' + 'cart/' + id), {
            model: model,
            count: ++count,
          });
        };
      });
    }).then( () => {
      set(ref(db, 'users/' + userName + '/' + 'cntCart'), {
        cntCart: countCart
      })
    });
};

// вешаем на все кнопки товара событие, чтобы записать товар в корзину
function buttonListener() {
  let button = document.querySelectorAll('.button_cart');
  let countCart = 0;
  button.forEach(item => {
    item.addEventListener('click', ()=>{
    let id = item.value; // id кнопки button на которую нажали
    let model = item.name;

    ++countCart;
    document.querySelector('.headerCartCount').innerHTML = countCart;

    let userName = JSON.parse(localStorage.getItem('user')).id; // достаем из LocalStorage данные о Пользователе

    writeUserCart(userName, model, id, countCart);
    });
  });
};

// создает div для отображения информации о товаре
function createDivProduct(img, brand, model, capacity, power, pressure, price, name, i, urlproduct) {
  let divFirst = document.querySelector('.container_products');
  let div = document.createElement('div');
  div.className = 'container_product';
  div.innerHTML = ` <div class="image" onclick="location.href='${urlproduct}';">
                    <img class="img_product" src=${img} alt="Винтовой компрессор"></div>
                    <div class="description_product">
                        <table class="product_table">
                        <tbody>
                          <tr>
                            <td><span>Производитель:</span></td>
                            <td><span id="brand">${brand}</span></td>
                          </tr>
                          <tr>
                            <td><span>Модель:</span></td>
                            <td><span id="model">${model}</span></td>
                          </tr>
                          <tr>
                            <td><span>Производительность, м3/час</span></td>
                            <td><span id="capacity">${capacity}</span></td>
                          </tr>
                          <tr>
                            <td><span>Мощность, кВт:</span></td>
                            <td><span id="power">${power}</span></td>
                          </tr>
                          <tr>
                            <td><span>Давление, бар:</span></td>
                            <td><span id="pressure">${pressure}</span></td>
                          </tr>
                          <tr>
                            <td><span>Цена, EUR:</span></td>
                            <td><span id="price">${price}</span></td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <div class="cart_product">
                    <button class="button_cart" name="${name}" type="button"  value ="${i}">Положить товар в корзину</button>
                  </div>`
  divFirst.append(div);
}