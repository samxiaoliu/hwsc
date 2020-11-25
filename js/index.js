$(function() {
    $.ajax({
        url: '../data/index_data.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(json) {
            hot_rightData(json)
        },
        error: function(err) {
            console.log(err)
        }
    })

    function hot_rightData(data) {
        let result = '';

        for (let i = 0, len = data.length; i < len; i++) {
            result += `<li>
                          <span class="title">新品上市</span>
                          <img src=${data[i].img_url} alt="">
                          <p class='name'>${data[i].name}</p>
                          <p class='feature'>${data[i].title}</p>
                          <p class='price'>${data[i].price}</i>
                          <a href="./login.html" class="mlist_a"></a>
                      </li>`
        }
        $('.hot_right').append(result)
    }
})