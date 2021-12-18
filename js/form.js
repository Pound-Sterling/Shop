"use strict"
$(document).ready(function () {
    const form = $('form')
    form.on('submit', formSend)

    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(this)
        if (error === 0) {
            var form = $(this);

            if (form.hasClass('cart-form')) {
                if (!$.isEmptyObject(cart)) {
                    $('#U6JAqGNpt7C1').val(JSON.stringify(cart));
                } else {
                    alert("Корзина не может быть пуста");
                    return false;
                }

            }


            form.addClass('_sending');
            $.ajax({
                url: "../php/mail.php",
                type: 'POST',
                data: $(this).serialize(),
                success: function () {
                    $(form).removeClass('_sending')
                    $(form).trigger('reset');
                    location.href = 'spasibo.html';
                    if (form.hasClass('cart-form')) {
                        localStorage.clear();
                    }
                },
                error: function () {
                    alert('Error!');
                }
            });



        } else {
            alert('Заполните обязательные поля')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = $(form).find('._req');
        for (var i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if ($(input).hasClass('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }

            } else if ($(input).attr('type') === "checkbox" && !$(input).prop("checked")) {
                formAddError(input);
                error++;
            } else {
                if ($(input).val() === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error
    }

    function formAddError(input) {
        $(input).parent().addClass('_error')
        $(input).addClass('_error')
    }
    function formRemoveError(input) {
        $(input).parent().removeClass('_error')
        $(input).removeClass('_error')
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/.test($(input).val())
    }



});

