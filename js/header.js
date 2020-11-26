$(function() {
    let goodsData;

    let user = localStorage.getItem('username')

    if (user) {
        $('.user_in_header').html('<span style="font-size: 14px; color: #afafaf; line-height: 36px; float:left; overflow: hidden">欢迎回来 ' + user + '</span>')
    }

    // $('.cart').click(() => {
    //     window.location.href = 'cart.html'
    // })

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
            // hot_rightData(json)
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
                let temp = '';
                let total_price = 0;
                let goodsList = '';
                let total_amount = 0;
                console.log(goodsData)
                for (let i = 0, len = data.length; i < len; i++) {
                    for (let j = 0, lenj = goodsData.length; j < lenj; j++) {
                        if (data[i].product_id == goodsData[j].id) {
                            temp += `<dt>
                                    <input type="checkbox">
                                    <img src=${goodsData[j].img_url} alt="">
                                    <div class="cart_info">
                                    <p class="item_title">${goodsData[j].full_title}</p>
                                    <div class="item_price">${goodsData[j].price}<p>x ${data[i].product_amount}</p>
                                    </div>
                                    </div>
                                </dt>`
                            total_price += parseFloat(goodsData[j].price.replace('￥', '')) * parseFloat(data[i].product_amount)
                            total_amount += parseInt(data[i].product_amount)
                        }
                    }

                }

                let header = `<i></i>
                                <a href="#">购物车`

                let footer = `</div>
                                <dl class="total_price1">
                                <div class="price_amount">
                                <p>总计: </p>
                                <p>￥</p>
                                <span class="cart_total_price">${total_price}</span>
                            </div>
                            <div class="pay_button1">

                                <span>结算</span>
                            </div>
                            </dl>
                            </dl>`

                let amount = `(${total_amount})</a><dl class="cart_good_list"><div class="goods_item">`
                goodsList = header + amount + temp + footer
                $('.cart_in_header').html(goodsList)
            }
        })
    }
})