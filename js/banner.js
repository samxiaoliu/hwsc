$(function() {
    let banner_list = ['banner1.jpg', 'banner2.jpg',
        'banner3.jpg', 'banner4.jpg',
        'banner5.jpg', 'banner6.png',
        'banner7.jpg'
    ]

    $('.banner_first').css('background', 'url(../img/' + banner_list[0] + ') no-repeat center');
    $('.banner_second').css('background', 'url(../img/' + banner_list[1] + ') no-repeat center');
    $('.banner_second').css('opacity', '0');

    let timer;
    let index = 2;
    let current = 1;
    let interval = 1000;

    timer = setInterval(() => {
        if (index == banner_list.length - 1) {
            index = 0;
            playnext();
        } else {
            playnext();
        }
    }, 6000)

    function playnext() {
        if (current == 1) {
            $('.banner_first').animate({ opacity: 0 }, interval);
            $('.banner_second').animate({ opacity: 1 }, interval);

            setTimeout(() => {
                $('.banner_first').css('background', 'url(../img/' + banner_list[index] + ')');
            }, interval);
            current = 2
        } else if (current == 2) {
            $('.banner_second').animate({ opacity: 0 }, interval);
            $('.banner_first').animate({ opacity: 1 }, interval);

            setTimeout(() => {
                $('.banner_second').css('background', 'url(../img/' + banner_list[index] + ')');
            }, interval);
            current = 1
        }
        index++
    }

    // function playprev() {

    // }
})