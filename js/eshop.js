var cart = {}; //моя корзина
var cost = 0;
var count = 0;
var keys = {} // ключи
var select = {} // кнопки
var ki = 0;

$('document').ready(function () {
    checkCart();
    showMiniCart();
    loadGoods();
});

function loadGoods() {
    //загружаю товары на страницу
    // console.log(data);
    let b = new Promise(function (resolve, reject) {
        $.getJSON('goods.json', function (data) {
            var out = '';
            let ti = 0;
            for (var key in data) {
                var d = data[key]
                out += `<div class="Ssl-item">`;
                if(!ti) {
                    out += `<h1 class="Ssl-title icon-arrow-l active-nav"><span>${d['title']}</span></h1>`;
                    out += `<div class="Ssl-slider sl-show">`;
                } else{
                    out += `<h1 class="Ssl-title icon-arrow-l"><span>${d['title']}</span></h1>`;
                    out += `<div class="Ssl-slider">`;
                }
                ti++;
                out += `<div class="slider-track slider">`;
                var j = 0;
                for (var i in d.goods) {
                    j++;
                    var d_g = d.goods[i];
                    out += `<div class="slider-item slider__item" data-attr="${d_g['id']}">`;
                    out += `<div class="Ssl-img-wrapper">`;
                    out += `<img src="${d_g['image']}" alt="">`;
                    out += `</div>`;
                    out += `<div class="Ssl-content">`;
                    out += `<span class="Ssl-price-cont">`;
                    out += `<span class="Ssl-price__title"> Старая цена:</span>`;
                    var oldPrice = parseInt(d_g['cost']) + 200;
                    out += `<span class="Ssl-price Ssl-price__old">${oldPrice}грн</span>`;
                    out += `</span>`;
                    out += `<span class="Ssl-price-cont">`;
                    out += `<span class="Ssl-price__title">Цена со скидкой:</span>`;
                    out += `<span class="Ssl-price Ssl-price__new">${d_g['cost']}грн</span>`;
                    out += `</span>`;
                    out += `</div>`;
                    out += `<div class="Ssl-btn">`;
                    out += `<button class="Ssl-btn__delete" data-key="${key}"data-art="${d_g['id']}" data-foo="${d_g['cost']}">Удалить</button>`;
                    out += `<button class="Ssl-btn__buy" data-key="${key}"data-art="${d_g['id']}" data-foo="${d_g['cost']}">Добавить в корзину</button>`;
                    out += `</div>`;
                    out += `<div class="Ssl-code">`;
                    out += `<span class="Ssl-code-title">Код товара:</span>`;
                    out += `<span class="Ssl-code-code">${d_g['code']}</span>`;
                    out += `</div>`;
                    out += `</div>`;
                }
                out += `</div>`;
                out += `</div>`;
                out += '</div>';
            }



            $('#Ssl').html(out);
            $('button.Ssl-btn__buy').on('click', addToCart);
            $('button.Ssl-btn__delete').on('click', deleteBtn);
            resolve(true);
        });
    });
    b.then(function () {
        checkSelect()
        $('.slider-track').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            touchThreshold: 10,
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        $('.Ssl-title').on('click', function(){
            $(this).next().toggleClass('sl-show');
            $(this).toggleClass('active-nav');
            
        })
    })

}

function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    var key = $(this).attr('data-key');
    var atr_cost = $(this).attr('data-foo');
    atr_cost = Number(atr_cost);
    if (keys[key] === undefined) {
        keys[key] = 1;
    }
    else if (cart[articul] === undefined) {
        keys[key]++;
    }
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
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
    if (localStorage.getItem('keys') != null) {
        keys = JSON.parse(localStorage.getItem('keys'))
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
    a.text('Добавить ещё');
    a.attr('data-select', '1');

    var articul = a.attr('data-art');

    select[articul] = 1;


}

function deleteBtn() {
    var a = $(this).next()
    var atr_cost = a.attr('data-foo');
    var key = a.attr('data-key');
    var articul = a.attr('data-art');

    changeViewBtn(a)

    count -= cart[articul];
    cost -= atr_cost * cart[articul];


    delete select[articul];


    if (keys[key] == 1) {
        delete keys[key];
    } else {
        keys[key]--;
    }
    delete cart[articul];

    saveCartToLs();//сохраняю корзину в локал стораже
    showMiniCart();
}
function changeViewBtn(a) {

    a = $(a)
    a.prev().removeClass('s');
    a.removeClass('s');
    a.text('Добавить в корзину');
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

