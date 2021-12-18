var cart = {}; //моя корзина
var cost = 0;
var count = 0;
var select = {} // кнопки
var ki = 0;

var eW = window.innerWidth;
window.onresize = function (e) {
    eW = e.target.outerWidth
    checkSelect()
}

const loadMoreBlock = document.querySelector('._load-more');
var iqw = 2;

async function getContent(){

    if(!loadMoreBlock.classList.contains('_loading')){

        loadMoreBlock.classList.add('_loading');
        loadGoods(iqw);
        iqw++;

    }  
}


$('document').ready(function () {
    checkCart();
    showMiniCart();
    loadGoods();
});

function loadGoods(key_ss=1) {
    //загружаю товары на страницу
    // console.log(data);
        var key_p = 12;
        var key_r = key_p * key_ss;
        var key_k = key_p * (key_ss - 1);
        // console.log(key_r, ' - r, k - ', key_k);
        let b = new Promise(function (resolve, reject) {
            $.getJSON('goods.json', function (data) {
                var out = '';
                for(var key = key_k; key < key_r; key++){
                    if(data[key] !== undefined){
                        out += `<div class="Ssl-item">`;
                        out += `<div class="Ssl-img-wrapper">`;
                        out += `<img class="_loading-icon" src="${data[key]['image']}" alt="">`;
                        out += `</div>`;
                        out += `<div class="Ssl-content">`;
                        out += `<span class="Ssl-price-cont">`;
                        out += `<span class="Ssl-price__title"> Старая цена:</span>`;
                        var oldPrice = parseInt(data[key]['price']) + 200;
                        out += `<span class="Ssl-price Ssl-price__old">${oldPrice}грн</span>`;
                        out += `</span>`;
                        out += `<span class="Ssl-price-cont">`;
                        out += `<span class="Ssl-price__title">Цена со скидкой:</span>`;
                        out += `<span class="Ssl-price Ssl-price__new">${data[key]['price']}грн</span>`;
                        out += `</span>`;
                        out += `</div>`;
                        out += `<div class="Ssl-btn">`;
                        out += `<button class="Ssl-btn__delete" data-art="${data[key]['code']}" data-foo="${data[key]['price']}">Удалить</button>`;
                        out += `<button class="Ssl-btn__buy" data-art="${data[key]['code']}" data-foo="${data[key]['price']}">Купить</button>`;
                        out += `</div>`;
                        out += `<div class="Ssl-code">`;
                        out += `<span class="Ssl-code-title">Код товара:</span>`;
                        out += `<span class="Ssl-code-code">${data[key]['code']}</span>`;
                        out += `</div>`;
                        out += '</div>';
                    }

                }
                out += `<div id='Ssl_post'>`;
                out += `</div>`;
                
    
                $('#Ssl_post').replaceWith(out);
                $('button.Ssl-btn__buy').on('click', addToCart);
                $('button.Ssl-btn__delete').on('click', deleteBtn);
                resolve(true);
                return true;
            });
        });
        b.then(function () {
            checkSelect()
            loadMoreBlock.classList.remove('_loading');
            $('.Ssl_load-more').removeClass("lm-hide");

        })
  

}

function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    var atr_cost = $(this).attr('data-foo');
    atr_cost = Number(atr_cost);

    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
        popupOpen(document.getElementById('myModal'));
        showCart();
    }
    cost += atr_cost;
    count++;
    changeBtn($(this))
    saveCartToLs()
    showMiniCart();
}

function checkCart() {
    // проверяю наличия корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    if (localStorage.getItem('select') != null) {
        select = JSON.parse(localStorage.getItem('select'))
    }
    if (localStorage.getItem('cost') != null) {
        cost = parseInt(localStorage.getItem('cost'))
    }
    if (localStorage.getItem('count') != null) {
        count = localStorage.getItem('count')
    }
}

function showMiniCart() {
    var cart = $('#count-goods')
    cart.html(count);
}

function changeBtn(a) {
    
    a = $(a)
    a.addClass('s');
    a.prev().addClass('s');
    if(eW < 576){
        a.text('');
        a.prev().text('');
        // корзина
        a.append(`<div class="icon-cart-plus"></div>`);
        // мусорка
        a.prev().append(`<div class="icon-trash"></div>`);

    } else { 
        a.prev().text('Удалить');
        a.text('Добавить ещё');

    }
    a.attr('data-select', '1');

    var articul = a.attr('data-art');

    select[articul] = 1;


}

function deleteBtn() {
    var a = $(this).next()
    var atr_cost = a.attr('data-foo');
    var articul = a.attr('data-art');

    changeViewBtn(a)

    count -= cart[articul];
    cost -= atr_cost * cart[articul];


    delete select[articul];
    delete cart[articul];

    saveCartToLs();//сохраняю корзину в локал стораже
    showMiniCart();
}

function changeViewBtn(a) {

    a = $(a)
    a.prev().removeClass('s');
    a.removeClass('s');
    a.text('Купить');
    a.attr('data-select', '0');
}

function checkSelect() {
    var a = $('.Ssl-btn__buy');
    var b;
    var c;
    for (var i = 0; i < a.length; i++) {
        b = a[i];
        for (var k in select) {
            c = $(b).attr('data-art');
            if (c == k) {
                changeBtn(b)
            }
        }
    }
}

