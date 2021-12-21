var modal = $('a[href="#myModal"]');
function showCart() {
  $.getJSON("goods.json", function (t) {
    if ($.isEmptyObject(cart)) {
      var a = "Кошик порожній. Додайте товар у кошик";
      $(".popup__cart").html(a),
        $(".cost_btn").removeClass("cb_show"),
        $(".popup__content._loading-icon").removeClass("_loading-icon");
    } else {
      a = "";
      var s = "";
      for (var c in t) {
        var o = t[c];
        for (var e in cart)
          t[c].code == e &&
            ((a += '<div class="popup__cart-item">'),
            (a += '<div class="popup__cart-c1">'),
            (a += `<button class="delete" data-art="${e}" data-foo="${o.price}">x</button>`),
            (a += '<div class="cart-img-wrapper">'),
            (a += '<img class="cart-img _loading-icon" src="' + o.image + '">'),
            (a += "</div>"),
            (a += '<div class="cart-content">'),
            (a += '<div class="cart-title">'),
            (a += '<span class="cart-title-title"><span>Назва:</span></span>'),
            (a += `<span class="cart-title-text" style="font-style:italic">" ${o.name} "</span>`),
            (a += "</div>"),
            (a += '<div class="cart-size">'),
            (a += '<span class="cart-size-title">Розмір:</span>'),
            (a += `<span class="cart-size-text">${o.size}</span>`),
            (a += "</div>"),
            (a += '<div class="cart-code">'),
            (a += '<span class="cart-code-title">Код товару:</span>'),
            (a += `<span class="cart-code-code">${o.code}</span>`),
            (a += "</div>"),
            (a += "</div>"),
            (a += "</div>"),
            (a += '<div class="popup__cart-c2">'),
            (a += '<div class="cart-cont-btns">'),
            (a += `<button class="minus" data-art="${e}" data-foo="${o.price}"><span>-</span></button>`),
            (a += `<span id="cart-item-count">${cart[e]}</span>`),
            (a += `<button class="plus" data-art="${e}" data-foo="${o.price}"><span>+</span></button>`),
            (a += "</div>"),
            (a += '<div class="cart-sum">'),
            (a += '<span class="cart-sum-title">Сума</span>'),
            (a += `<span class="cart-sum-cost">${cart[e] * o.price}грн</span>`),
            (a += "</div>"),
            (a += "</div>"),
            (a += "</div>"));
      }
      (s += cost + "грн"),
        $(".cost_btn").addClass("cb_show"),
        $("#total-sum").html(s),
        $(".popup__cart").html(a),
        $(".popup__content._loading-icon").removeClass("_loading-icon"),
        $(".plus").on("click", plusGoods),
        $(".minus").on("click", minusGoods),
        $(".delete").on("click", deleteGoods);
    }
  });
}
function plusGoods() {
  var t = $(this).attr("data-art"),
    a = $(this).attr("data-foo");
  (a = Number(a)),
    localStorage.getItem("cost"),
    (cost += a),
    cart[t]++,
    count++,
    changeCart("prev", this),
    saveCartToLs();
}
function minusGoods() {
  var t = $(this).attr("data-art"),
    a = $(this).attr("data-foo");
  if ((localStorage.getItem("cost"), (a = Number(a)), (cost -= a), cart[t] > 1))
    cart[t]--;
  else {
    $(this).closest(".popup__cart-item").addClass("hide-item"),
      delete cart[t],
      setTimeout(function () {
        showCart();
      }, 300);
    var s = findSelect(t);
    changeViewBtn(s), delete select[t];
  }
  count--, changeCart("next", this), saveCartToLs();
}
function deleteGoods() {
  var t = $(this).attr("data-art"),
    a = $(this).attr("data-foo");
  (a = Number(a)),
    (cost -= a * cart[t]),
    (count -= cart[t]),
    delete cart[t],
    $("#count-goods").html(count),
    $(this).closest(".popup__cart-item").addClass("hide-item"),
    setTimeout(function () {
      showCart();
    }, 300);
  var s = findSelect(t);
  changeViewBtn(s), delete select[t], saveCartToLs();
}
function findSelect(t) {
  for (var a = $(".Ssl-btn__buy"), s = 0; s < a.length; s++)
    for (var c in select) if ($(a[s]).attr("data-art") == t) return a[s];
}
function saveCartToLs() {
  localStorage.setItem("select", JSON.stringify(select)),
    localStorage.setItem("cart", JSON.stringify(cart)),
    localStorage.setItem("cost", cost),
    localStorage.setItem("count", count);
}
function changeCart(t, a) {
  var s = $(a).attr("data-art"),
    c = $(a).attr("data-foo"),
    o = $(a).closest(".popup__cart-item");
  null != cart[s] &&
    (o.find(".cart-sum-cost").html(cart[s] * c + "грн"),
    $("#total-sum").html(cost + "грн")),
    $("#count-goods").html(count),
    "prev" == t
      ? $(a).prev().html(cart[s])
      : "next" == t && $(a).next().html(cart[s]);
}
modal.on("click", () => {
  checkCart(), showCart();
});
