$(function() {
    let goodsData;
    if (localStorage.getItem('username')) {
        $('.hint_login').css('display', 'none');
        // return false;
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
                for (let i = 0, len = data.length; i < len; i++) {
                    for (let j = 0, lenj = goodsData.length; j < lenj; j++) {
                        if (data[i].product_id == goodsData[j].id) {
                            goodsList += `<div class="goods_list">
                                                <input type="checkbox">
                                                <img src=${goodsData[j].img_url} alt="" class="goods_img">
                                                <p class="describe">
                                                    ${goodsData[j].full_title}
                                                </p>
                                                <p class="price">${goodsData[j].price}</p>
                                                <p class="amount_module">
                                                    <span class="minus">-</span>
                                                    <input type="number" class="amount deal" value="1" min="1"></input>
                                                    <span class="plus">+</span>
                                                </p>
                                                <p class="total_price">${goodsData[j].price}</p>
                                                <div class="delete">
                                                    删除
                                                    <span class="delete_confirm">
                                                        <p>您确定要删除该商品?</p>
                                                        <div class="confirm_button">
                                                            <span class="yes">是</span>
                                                            <span class="no">否</span>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>`
                        }
                    }
                }
                $('.my_cart').append(goodsList)
            }
        })
    }
})