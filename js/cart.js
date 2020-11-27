$(function() {
    let goodsData;
    let selected = 0;

    if (localStorage.getItem('username')) {
        $('.hint_login').css('display', 'none');
    }

    $.ajax({
        url: '../data/user.php',
        type: 'post',
        dataType: 'json',
        data: {
            username: localStorage.getItem('username'),
            request_type: 'getInfo'
        },
        success: function(result) {
            render_cart(result)
        },
        error: function(err) {
            console.log(err)
        }
    })

    let myajax = $.ajax({
        url: '../data/index_data.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(json) {
            goodsData = json
        },
        error: function(err) {
            console.log(err)
        }
    })

    function render_cart(data) {
        $.when(myajax).done(function() {
            if (data.length == 0) {
                $('.nav_right .cart').html('<i></i><a href="#">购物车(0)</a><dl class="cart_empty"><dt></dt><dt>您的购物车是空的，赶紧选购吧~</dt></dl>')
            } else {
                let goodsList = '';
                for (let i = 0, len = data.length; i < len; i++) {
                    for (let j = 0, lenj = goodsData.length; j < lenj; j++) {
                        if (data[i].product_id == goodsData[j].id) {
                            console.log(goodsData[j].price.substring(1), parseInt(data[i].product_amount))
                            goodsList += `<div class="goods_list" total_price=${parseInt(goodsData[j].price.substring(1)) * parseInt(data[i].product_amount)} price=${goodsData[j].price.substring(1)}>
                                                <input type="checkbox">
                                                <img src=${goodsData[j].img_url} alt="" class="goods_img">
                                                <p class="describe">
                                                    ${goodsData[j].full_title}
                                                </p>
                                                <p class="price">${goodsData[j].price}</p>
                                                <p class="amount_module" style="user-select: none;">
                                                    <span class="minus">-</span>
                                                    <input type="number" class="amount deal" value=${data[i].product_amount} readonly>
                                                    <span class="plus">+</span>
                                                </p>
                                                <p class="total_price">¥${parseInt(goodsData[j].price.substring(1)) * parseInt(data[i].product_amount)}</p>
                                                <div class="delete">
                                                    删除
                                                    <span class="delete_confirm">
                                                        <p>您确定要删除该商品?</p>
                                                        <div class="confirm_button">
                                                            <span class="yes" product_id=${goodsData[j].id}>是</span>
                                                            <span class="no">否</span>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>`
                        }
                    }
                }
                $('.my_cart').append(goodsList)

                $('.my_cart').on('click', '.goods_list .amount_module .minus', function(e) {
                    let num = $(e.target).next().val()
                    if (num >= 1) {
                        num -= 1
                        $(e.target).next().val(num)

                        let single_price = $(e.target).parent().parent().attr('price')
                        let new_total = parseInt(single_price) * parseInt(num)
                        $(e.target).parent().parent().attr('total_price', new_total)

                        $(e.target).parent().next().html('¥ ' + new_total)

                        if ($(e.target).parent().parent().children()[0].checked) {
                            update_total_price()
                        }
                    }
                })

                $('.my_cart').on('click', '.goods_list .amount_module .plus', function(e) {
                    let num = $(e.target).prev().val()
                    num = parseInt(num) + 1
                    $(e.target).prev().val(num)

                    let single_price = $(e.target).parent().parent().attr('price')
                    let new_total = parseInt(single_price) * parseInt(num)
                    $(e.target).parent().parent().attr('total_price', new_total)

                    $(e.target).parent().next().html('¥ ' + new_total)

                    if ($(e.target).parent().parent().children()[0].checked) {
                        update_total_price()
                    }
                })

                $('.my_cart').on('click', '.goods_list .delete', function(e) {
                    let delete_confirm = $(e.target).children()
                    delete_confirm.css('display', 'block')

                    delete_confirm.on('click', '.confirm_button', function(e) {
                        if ($(e.target).attr('class') == 'no') {
                            delete_confirm.css('display', 'none')
                        }
                        if ($(e.target).attr('class') == 'yes') {
                            $(e.target).parent().parent().parent().parent().remove()
                            console.log($(e.target).attr('product_id'))
                            $.ajax({
                                url: '../data/user.php',
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    username: localStorage.getItem('username'),
                                    productId: $(e.target).attr('product_id'),
                                    request_type: 'delete_cart'
                                },
                                success: function(json) {
                                    alert(json.msg)
                                    window.history.go(0)
                                },
                                error: function(err) {
                                    console.log(err)
                                }
                            })
                        }
                    })
                })

                $('.my_cart').on('click', '.goods_list input[type="checkbox"]', function(e) {
                    if ($(e.target).prop('checked')) {
                        selected += 1
                        update_total_price()
                        isCheck_all()
                    } else {
                        selected -= 1
                        update_total_price()
                        isCheck_all()
                    }
                })

                $('.input_checkbox').on('click', 'input[type="checkbox"]', function(e) {
                    if ($(e.target).prop('checked')) {
                        select_all(true)
                        update_total_price()
                    } else {
                        select_all(false)
                        update_total_price()
                    }
                })

                $('.input_checkbox').on('click', 'span', function(e) {
                    select_all(true)
                    update_total_price()
                })
            }
        })
    }

    function isCheck_all() {
        if (selected == $('.goods_list').length) {
            select_all(true)
        } else {
            $('.input_checkbox').each(element => {
                $('.input_checkbox input[type="checkbox"]').eq(element).prop('checked', false)
            })
        }
    }

    function select_all(condition) {
        $('input[type="checkbox"]').each(element => {
            if (condition) {
                $('input[type="checkbox"]').eq(element).prop('checked', true)
            } else {
                $('input[type="checkbox"]').eq(element).prop('checked', false)
            }
        })

        $('.goods_list').each(element => {
            if (condition) {
                $('.goods_list input[type="checkbox"]').eq(element).prop('checked', true)
            } else {
                $('.goods_list input[type="checkbox"]').eq(element).prop('checked', false)
            }
        });
    }

    function update_total_price() {
        let totalprice = 0;
        let totalnum = 0;

        $('.goods_list').each(element => {
            if ($('.goods_list input[type="checkbox"]').eq(element).prop('checked')) {
                totalprice += parseInt($('.goods_list').eq(element).attr('total_price'))
                totalnum += parseInt($('.goods_list .amount_module input[type="number"]').eq(element).val())
            }
        });
        if (totalprice == 0) {
            $('.money').html(' ¥ 0.00')
        } else {
            $('.money').html(' ¥ ' + totalprice)
        }
        $('.amount').html(' ' + totalnum + ' ')
    }
})