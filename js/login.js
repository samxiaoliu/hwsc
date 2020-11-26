$(function() {
    $('input[value="登录"]').click(() => {
        $.ajax({
            url: '../data/user.php',
            dataType: 'text',
            type: 'POST',
            cache: false,
            data: {
                username: $('.username').val(),
                password: $('.password').val(),
                request_type: 'login'
            },
            success: function(result) {
                result = eval('(' + result + ')')

                if (result.error == 0) {
                    localStorage.removeItem('username')
                    localStorage.setItem('username', $('.username').val());
                    localStorage.setItem('cart', result.cart)
                    window.location.href = 'index.html'
                } else if (result.error == 1) {
                    alert('密码错误，请重新输入')
                } else if (result.error == 2) {
                    alert('用户不存在\n请检查用户名或先进行注册')
                }
                $('.username').val('');
                $('.password').val('');
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

    $('input[value="注册"]').click(() => {
        $.ajax({
            url: "../data/user.php",
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: {
                username: $('.username').val(),
                password: $('.password').val(),
                request_type: 'signin'
            },
            success: function(result) {
                if (result.error == 0) {
                    alert('您已注册成功, 请登录')
                } else if (result.error == 1) {
                    alert('注册失败, 请联系管理员')
                }
                $('.username').val('');
                $('.password').val('');
            },
            error: function(err) {
                console.log(err)
            }
        })
    })
})