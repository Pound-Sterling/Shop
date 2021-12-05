var modal = $('a[href="#myModal"]');


function showCart() {
    $.getJSON('goods.json', function (data) {
        var goods = data;
        if ($.isEmptyObject(cart)) {
            // корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину';
            $('.popup__cart').html(out);
            $('.cost_btn').removeClass('cb_show');
        }
        else {
            var out = '';
            var cost_r = '';
            for (var key in keys) {
                var g = goods[key]
                var gg = g['goods']
                for (var k in gg) {
                    var gk = gg[k];
                    for (var kk in cart) {
                        if (gk['id'] == kk) {
                            out += `<div class="popup__cart-item">`;
                            out += `<div class="popup__cart-c1">`;
                            out += `<button class="delete" data-key="${key}"data-art="${kk}" data-foo="${gk['cost']}">x</button>`;
                            out += `<div class="cart-img-wrapper">`;
                            out += '<img class="cart-img" src="' + gk.image + '">';
                            out += `</div>`;
                            out += `<div class="cart-content">`;
                            out += `<div class="cart-title">`;
                            out += `<span class="cart-title-title">Категория:</span>`;
                            out += `<span class="cart-title-text">${g.title}</span>`;
                            out += `</div>`;
                            out += `<div class="cart-code">`;
                            out += `<span class="cart-code-title">Код товара:</span>`;
                            out += `<span class="cart-code-code">${gk.code}</span>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `<div class="popup__cart-c2">`;
                            out += `<div class="cart-cont-btns">`;
                            out += `<button class="minus" data-key="${key}"data-art="${kk}" data-foo="${gk['cost']}">-</button>`;
                            out += `<span id="cart-item-count">${cart[kk]}</span>`;
                            out += `<button class="plus" data-key="${key}"data-art="${kk}" data-foo="${gk['cost']}">+</button>`;
                            out += '</div>';
                            out += `<div class="cart-sum">`;
                            out += `<span class="cart-sum-title">Сумма</span>`;
                            out += `<span class="cart-sum-cost">${cart[kk] * gk.cost}грн</span>`;
                            out += `</div>`;
                            out += `</div>`;
                            out += `</div>`;
                        }
                    }
                }

            }
            cost_r += cost + 'грн';
            $('.cost_btn').addClass('cb_show');
            $('#total-sum').html(cost_r);
            $('.popup__cart').html(out);
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
    atr_cost = Number(atr_cost);
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
    var key = $(this).attr('data-key');

    localStorage.getItem('cost');
    atr_cost = Number(atr_cost);
    cost -= atr_cost;

    if (cart[articul] > 1) {
        cart[articul]--;

    } else {
        $(this).closest('.popup__cart-item').addClass('hide-item');
        if (keys[key] == 1) {
            delete keys[key];
        } else {
            keys[key]--;
        }
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
    var key = $(this).attr('data-key');

    // console.log(articul);
    // console.log(atr_cost);
    // console.log(key);

    atr_cost = Number(atr_cost);

    cost -= atr_cost * cart[articul];
    count -= cart[articul];


    if (keys[key] == 1) {
        delete keys[key];
    } else {
        keys[key]--;
    }
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
    localStorage.setItem('keys', JSON.stringify(keys));
    localStorage.setItem('cost', cost);
    localStorage.setItem('count', count);
}

function changeCart(where, a) {

    var articul = $(a).attr('data-art');
    var atr_cost = $(a).attr('data-foo');
    var fff = $(a).closest('.popup__cart-item');
    fff.find('.cart-sum-cost').html(cart[articul] * atr_cost + 'грн');
    $('#count-goods').html(count);
    $('#total-sum').html(cost + "грн");

    if (where == 'prev') {
        $(a).prev().html(cart[articul]);
    } else if (where == "next") {
        $(a).next().html(cart[articul]);
    }

}