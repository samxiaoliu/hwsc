$(function() {
    let product_id = localStorage.getItem('product')

    $.ajax({
        url: '../data/index_data.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
            for (let i = 0, len = json.length; i < len; i++) {
                if (json[i].id == product_id) {
                    $('.full_title').html(json[i].full_title)
                    $('.f').html(json[i].price)
                }
            }
        },
        error: function(err) {
            console.log(err)
        }
    })

    $('.plus1').click(() => {
        let num = $('input.amount1').val()
        num++
        $('input.amount1').val(num)
    })

    $('.minus1').click(() => {
        let num = $('input.amount1').val()
        if (num > 1) {
            num--
            $('input.amount1').val(num)
        }
    })

    $('.r_a1').click(() => {
        update_cart()
    })
    $('.r_a2').click(() => {
        update_cart()
    })

    function update_cart() {
        $.ajax({
            url: '../data/user.php',
            type: 'POST',
            data: {
                username: localStorage.getItem('username'),
                productId: localStorage.getItem('product'),
                productAmount: parseInt($('input[type="number"]').val()),
                request_type: 'update_cart'
            },
            success: function(json) {
                console.log(json)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
})