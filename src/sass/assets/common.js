// $(window).scroll(function () {
//     if ($(window).scrollTop() > 0) {
//         $('.l-header').addClass('is-scrolled');
//     } else {
//         $('.l-header').removeClass('is-scrolled');
//     }
// });


$(function () {

    $(window).scroll(function() {
       
        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop(); 
        footHeight = $("footer").innerHeight(); 

        if (scrollHeight - scrollPosition <= footHeight) { 
            // $(".c-phonesticky").css({
            //     "position": "absolute", 
            //     "bottom": 30
            // });
            $(".c-phonesticky").removeClass('is-scroll');
            $(".c-phonesticky").addClass('is-stay');
        } else {
            // $(".c-phonesticky").css({
            //     "position": "fixed",
            //     "bottom": 30
            // });
            $(".c-phonesticky").removeClass('is-stay');
            $(".c-phonesticky").addClass('is-scroll');

        }

    });

    $('a[href^="#"]').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });
    $( ".p-faq1__parent" ).click(function() {
        if(!$(this).parents(".p-faq1__list").find(".p-faq1__item1").hasClass("is-active")){
            $(this).parents(".p-faq1__list").find(".p-faq1__item1").addClass("is-active");
            $(this).parents(".p-faq1__list").find(".open").   removeClass(" fa-plus").addClass("fa-minus")
        }
        else{
            $(this).parents(".p-faq1__list").find(".p-faq1__item1").removeClass("is-active");
            $(this).parents(".p-faq1__list").find(".open").   addClass(" fa-plus").removeClass("fa-minus")
        }
    });
    $( ".p-faq1__parent" ).on('click', function() {
        $(this).parents(".p-faq1__list").find(".p-faq1__item1").stop().slideToggle();
        if($(this).parents(".p-faq1__list").find(".fa-plus").length > 0 ) {
            
            $(this).parents(".p-faq1__list").find(".open").removeClass("fa-minus");
            $(this).parents(".p-faq1__list").find(".open").addClass("fa-plus");
        } else {
            
            $(this).parents(".p-faq1__list").find(".open").removeClass("fa-plus");
            $(this).parents(".p-faq1__list").find(".open").addClass("fa-minus");
        }
        
    });

});

var swiper = new Swiper('.c-list2', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    spaceBetween: 15,
    breakpoints: {
        770: {
            spaceBetween: 30
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
});

var scrl_pos;
$(".c-menu").click(function () {
    if ($(this).hasClass("is-open")) {
        $(this).find(".c-menu__txt").text("MENU");
        $(this).removeClass("is-open");
        $(".c-nav2").slideUp(300);
        $('body').removeClass('fixed');
        $("html, body").animate({ scrollTop: scrl_pos }, 0);
    } else {
        $(this).addClass("is-open");
        $(this).find(".c-menu__txt").text("CLOSE");
        $(".c-nav2").slideDown(300);
        scrl_pos = $(window).scrollTop();
        $('body').addClass('fixed').css({ 'top': -scrl_pos });
    }
});


$(window).on('scroll', function () {
    var value = $(this).scrollTop();
    if (value > 100) {
        $(".c-phonesticky").addClass('is-show');

    } else {
        if (!$("body").hasClass("fixed")) {
            $(".c-phonesticky").removeClass('is-show');
        }
    }
});

// $(window).on('load resize', function () {
//     if ($(window).innerWidth() < 992) {
//         var wwidth = $(".c-box1").offset().left;
//         $(".c-box1 .c-box1__item .c-box1__bg").css({ "width": "calc(100% + " + (wwidth - 38) + "px)" })
//         $(".c-box1 .c-box1__item:nth-child(2n+1) .c-box1__bg").css({ "margin-left": -wwidth })
//     } else {
//         $(".c-box1 .c-box1__item .c-box1__bg").removeAttr("style");
//     }
// });