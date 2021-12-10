$(document).ready(function () {
    $('.preload').removeClass('preload')
    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const blockID = anchor.getAttribute('href').substr(1)
            if (blockID == '') return false;

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    $('.header__burger').on('click', () => {
        $('.header__burger,.header__menu').toggleClass('burger-active')
        $('body').toggleClass('lock');
        window.onresize = function (e) {
            var eW = e.target.outerWidth
            if (eW >= 993) {
                $('.header__burger,.header__menu').removeClass('burger-active')
                $('body').removeClass('lock')
            }
        }

    })
    $('._phone').mask('+38 (999) 999-99-99');
    $('._ch').blur(function () {
        var f = $(this).val()
        $(this).val(f)
    });

    $('.footer__soc a').on('click', () => {
        alert('На данный момент ссылка не доступна');
    })
    var h = localStorage.getItem('h') ? localStorage.getItem('h') : 0;
    if(h === 0){
        $('.hello').addClass('hello-show');
        localStorage.setItem('h', 1);
    }
})