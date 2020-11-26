$(function() {
    if (localStorage.getItem('username')) {
        $('.login_form_right .user').html('欢迎回来 ' + localStorage.getItem('username'))
            // $.ajax({
            //     url: '../data/user.php',
            //     type: 'post',
            //     dataType: 'json',
            //     data: {
            //         username: localStorage.getItem('username'),
            //         request_type: 'getInfo'
            //     },
            //     success: function(result) {
            //         render_cart(result)
            //     },
            //     error: function(err) {
            //         console.log(err)
            //     }
            // })
    }

    let myajax = $.ajax({
        url: '../data/index_data.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(json) {
            hot_rightData(json)
                // goodsData = json
        },
        error: function(err) {
            console.log(err)
        }
    })

    function hot_rightData(data) {
        let result = '';

        for (let i = 0, len = 8; i < len; i++) {
            result += `<li id='${data[i].id}'>
                          <span class="title">新品上市</span>
                          <img src=${data[i].img_url} alt="">
                          <p class='name'>${data[i].name}</p>
                          <p class='feature'>${data[i].title}</p>
                          <p class='price'>${data[i].price}</i>
                      </li>`
        }
        $('.hot_right').append(result)

        $('.hot_right').click(function(e) {
            if (e.target.tagName !== 'LI') {
                let id = $(e.target).parent().attr('id')
                localStorage.setItem('product', id)
                window.open('product.html')
            }
        })
    }


})