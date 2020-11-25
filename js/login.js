$(function() {
    $('input[value="登录"]').click(() => {
        console.log($('.username').val(), $('.password').val())
        $.ajax({
            url: '../data/user.php',
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: {
                username: $('.username').val(),
                password: $('.password').val()
            },
            // contentType: "application/x-www-form-urlencoded",
            success: function(data) {
                console.log(data)
            },
            error: function(err) {
                console.log(err)
            }
        })
    })
})