var modal = $('a[href="#myModal"]');


function showCart() {
    $.getJSON('goods.json', function (data) {
        if ($.isEmptyObject(cart)) {
            // корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину';
            $('.popup__cart').html(out);
            $('.cost_btn').removeClass('cb_show');
        }
        else {            
            var out = '';
            var cost_r = '';
            for(var key in data){
                var g = data[key]
                    for (var kk in cart) {
                        if (data[key]['code'] == kk) {
                            out += `<div class="popup__cart-item">`;
                            out += `<div class="popup__cart-c1">`;
                            out += `<button class="delete" data-art="${kk}" data-foo="${g['price']}">x</button>`;
                            out += `<div class="cart-img-wrapper">`;
                            out += '<img class="cart-img _loading-icon" src="' + g['image'] + '">';
                            out += `</div>`;
                            out += `<div class="cart-content">`;
                            out += `<div class="cart-title">`;
                            out += `<span class="cart-title-title">Название:</span>`;
                            out += `<span class="cart-title-text">${g['name']}</span>`;
                            out += `</div>`;
                            out += `<div class="cart-code">`;
                            out += `<span class="cart-code-title">Код товара:</span>`;
                            out += `<span class="cart-code-code">${g['code']}</span>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `<div class="popup__cart-c2">`;
                            out += `<div class="cart-cont-btns">`;
                            out += `<button class="minus" data-art="${kk}" data-foo="${g['price']}">-</button>`;
                            out += `<span id="cart-item-count">${cart[kk]}</span>`;
                            out += `<button class="plus" data-art="${kk}" data-foo="${g['price']}">+</button>`;
                            out += '</div>';
                            out += `<div class="cart-sum">`;
                            out += `<span class="cart-sum-title">Сумма</span>`;
                            out += `<span class="cart-sum-cost">${cart[kk] * g['price']}грн</span>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `</div>`;
                        }
                    }
            }
            
            cost_r += cost + 'грн';
            $('.cost_btn').addClass('cb_show');
            $('#total-sum').html(cost_r);
            $('.popup__cart').html(out);
            $('.popup__content._loading-icon').removeClass('_loading-icon');
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    });
}


modal.on('click', () => {
    checkCart();
    showCart();
})

function plusGoods() {
    var articul = $(this).attr('data-art');
    var atr_cost = $(this).attr('data-foo');
    console.log(articul);
    atr_cost = Number(atr_cost);
    console.log(atr_cost);
    localStorage.getItem('cost');
    cost += atr_cost;
    cart[articul]++;
    count++;


    changeCart('prev', this)


    saveCartToLs();

}

function minusGoods() {
    var articul = $(this).attr('data-art');
    var atr_cost = $(this).attr('data-foo');

    localStorage.getItem('cost');
    atr_cost = Number(atr_cost);
    cost -= atr_cost;

    if (cart[articul] > 1) {
        cart[articul]--;

    } else {
        $(this).closest('.popup__cart-item').addClass('hide-item');

        delete cart[articul];
        setTimeout(function () {
            showCart();
        }, 300);
        var ss = findSelect(articul);
        changeViewBtn(ss);

        delete select[articul];
    }


    count--;;


    changeCart('next', this)

    saveCartToLs();

}

function deleteGoods() {
    var articul = $(this).attr('data-art');
    var atr_cost = $(this).attr('data-foo');

    // console.log(articul);
    // console.log(atr_cost);

    atr_cost = Number(atr_cost);

    cost -= atr_cost * cart[articul];
    count -= cart[articul];

    delete cart[articul];


    $('#count-goods').html(count);
    $(this).closest('.popup__cart-item').addClass('hide-item');
    setTimeout(function () {
        showCart();
    }, 300);
    var ss = findSelect(articul);
    changeViewBtn(ss);

    delete select[articul];
    saveCartToLs();
}
function findSelect(q) {
    var a = $('.Ssl-btn__buy');
    for (var i = 0; i < a.length; i++) {
        for (var k in select) {
            if ($(a[i]).attr('data-art') == q) {
                return (a[i])
            }
        }
    }
}

function saveCartToLs() {
    localStorage.setItem('select', JSON.stringify(select));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cost', cost);
    localStorage.setItem('count', count);
}

function changeCart(where, a) {

    var articul = $(a).attr('data-art');
    var atr_cost = $(a).attr('data-foo');
    var fff = $(a).closest('.popup__cart-item');
    if(cart[articul] != undefined){
        fff.find('.cart-sum-cost').html(cart[articul] * atr_cost + 'грн');
        $('#total-sum').html(cost + "грн");
    }
    
    $('#count-goods').html(count);

    if (where == 'prev') {
        $(a).prev().html(cart[articul]);
    } else if (where == "next") {
        $(a).next().html(cart[articul]);
    }

}