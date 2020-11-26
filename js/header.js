$(function() {
    let user = localStorage.getItem('username')

    if (user) {
        $('.user_in_header').html('<span style="font-size: 14px; color: #afafaf; line-height: 36px; float:left; overflow: hidden">欢迎回来 ' + user + '</span>')
    }

    $('.cart').click(() => {
        window.location.href = 'cart.html'
    })
})