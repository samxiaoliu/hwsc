$(function() {
    $.ajax({
        url: '../data/index_data.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(data) {
            // console.log(data)
            let result = '';

            for (let i = 0, len = data.length; i < len; i++) {
                result += `<li id=${data[i].id}>
                                <img src=${data[i].img_url} alt="">
                                <i>${data[i].name}</i>
                                <a href="#" class="money">${data[i].price}起</a>
                                <a href="#" class="more">多款可选</a>
                                <span>2229人评价 98%好评</span>
                            </li>`
            }
            $('.main2_list').append(result)

            $('.main2_list').click(function(e) {
                if (e.target.tagName !== 'LI') {
                    let id = $(e.target).parent().attr('id')
                    localStorage.setItem('product', id)
                    window.open('product.html')
                }
            })
        },
        error: function(err) {
            console.log(err)
        }
    })


})