var cart = {},
  cost = 0,
  count = 0,
  select = {},
  ki = 0,
  eW = window.innerWidth;
window.onresize = function (t) {
  (eW = t.target.outerWidth), checkSelect();
};
const loadMoreBlock = document.querySelector("._load-more");
var iqw = 2;
async function getContent() {
  loadMoreBlock.classList.contains("_loading") ||
    (loadMoreBlock.classList.add("_loading"), loadGoods(iqw), iqw++);
}
function loadGoods(t = 1) {
  var a = 12 * t,
    e = 12 * (t - 1);
  new Promise(function (t, s) {
    $.getJSON("goods.json", function (s) {
      for (var o = "", n = e; n < a; n++)
        void 0 !== s[n] &&
          ((o += '<div class="Ssl-item">'),
          (o += '<div class="Ssl-img-wrapper">'),
          (o += `<img class="_loading-icon" src="${s[n].image}" alt="">`),
          (o += "</div>"),
          (o += '<div class="Ssl-content">'),
          (o += '<span class="Ssl-size-cont">'),
          (o += "<span>Розмір:</span>"),
          (o += `<span class="Ssl-content__text Ssl-size">${s[n].size}</span>`),
          (o += "</span>"),
          (o += '<span class="Ssl-price-cont">'),
          (o += "<span> Стара ціна:</span>"),
          (o += `<span class="Ssl-content__text Ssl-price__old">${parseInt(
            s[n].price + (s[n].price / 100) * 30
          )}грн</span>`),
          (o += "</span>"),
          (o += '<span class="Ssl-price-cont">'),
          (o += "<span>Ціна зі знижкою:</span>"),
          (o += `<span class="Ssl-content__text Ssl-price__new">${s[n].price}грн</span>`),
          (o += "</span>"),
          (o += "</div>"),
          (o += '<div class="Ssl-btn">'),
          (o += `<button class="Ssl-btn__delete" data-art="${s[n].code}" data-foo="${s[n].price}">Видалити</button>`),
          (o += `<button class="Ssl-btn__buy" data-art="${s[n].code}" data-foo="${s[n].price}">Додати<wbr> в&nbsp;кошик</button>`),
          (o += "</div>"),
          (o += '<div class="Ssl-code">'),
          (o += '<span class="Ssl-code-title">Код товару:</span>'),
          (o += `<span class="Ssl-code-code">${s[n].code}</span>`),
          (o += "</div>"),
          (o += "</div>"));
      return (
        (o += "<div id='Ssl_post'>"),
        (o += "</div>"),
        $("#Ssl_post").replaceWith(o),
        $("button.Ssl-btn__buy").on("click", addToCart),
        $("button.Ssl-btn__delete").on("click", deleteBtn),
        t(!0),
        !0
      );
    });
  }).then(function () {
    checkSelect(),
      loadMoreBlock.classList.remove("_loading"),
      $(".Ssl_load-more").removeClass("lm-hide");
  });
}
function addToCart() {
  var t = $(this).attr("data-art"),
    a = $(this).attr("data-foo");
  (a = Number(a)),
    null != cart[t]
      ? cart[t]++
      : ((cart[t] = 1),
        popupOpen(document.getElementById("myModal")),
        showCart()),
    (cost += a),
    count++,
    changeBtn($(this)),
    saveCartToLs(),
    showMiniCart();
}
function checkCart() {
  null != localStorage.getItem("cart") &&
    (cart = JSON.parse(localStorage.getItem("cart"))),
    null != localStorage.getItem("select") &&
      (select = JSON.parse(localStorage.getItem("select"))),
    null != localStorage.getItem("cost") &&
      (cost = parseInt(localStorage.getItem("cost"))),
    null != localStorage.getItem("count") &&
      (count = localStorage.getItem("count"));
}
function showMiniCart() {
  $("#count-goods").html(count);
}
function changeBtn(t) {
  (t = $(t)).addClass("s"),
    t.prev().addClass("s"),
    eW < 576
      ? (t.text(""),
        t.prev().text(""),
        t.append('<div class="icon-cart-plus"></div>'),
        t.prev().append('<div class="icon-trash"></div>'))
      : (t.prev().text("Видалити"), t.text("Додати ще")),
    t.attr("data-select", "1");
  var a = t.attr("data-art");
  select[a] = 1;
}
function deleteBtn() {
  var t = $(this).next(),
    a = t.attr("data-foo"),
    e = t.attr("data-art");
  changeViewBtn(t),
    (count -= cart[e]),
    (cost -= a * cart[e]),
    delete select[e],
    delete cart[e],
    saveCartToLs(),
    showMiniCart();
}
function changeViewBtn(t) {
  (t = $(t)).prev().removeClass("s"),
    t.removeClass("s"),
    t.html("Додати<wbr> в&nbsp;кошик"),
    t.attr("data-select", "0");
}
function checkSelect() {
  for (var t, a = $(".Ssl-btn__buy"), e = 0; e < a.length; e++)
    for (var s in ((t = a[e]), select))
      $(t).attr("data-art") == s && changeBtn(t);
}
$("document").ready(function () {
  checkCart(), showMiniCart(), loadGoods();
});
