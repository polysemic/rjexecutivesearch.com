jQuery(function ($) {
    'use strict';
    /*----------- Preloader -----------*/
    // jQuery(window).load(function () {
    //   jQuery('.loadingFade').delay(2500).fadeOut('slow');
    //   jQuery('.pinFade1').delay(2500).fadeOut('slow');
    //   jQuery('.pinFade2').delay(2500).fadeOut('slow');
    //   jQuery('.pinFade3').delay(2500).fadeOut('slow');
    //   jQuery('.preloader').delay(2500).fadeOut('slow');
    // });
    /*
    $(window).resize(function () {
        $(".navbar-collapse").css({maxHeight: $(window).height() - $(".navbar-header").height() + "px"});
    });
    //sticky navbar
    $(".navbar-sticky").sticky({topSpacing: 0});
    //menu on hover
    $('.js-activated').dropdownHover({
        instantlyCloseOthers: false,
        delay: 0
    }).dropdown();

    $('.counter-digit').counterUp({
        delay: 10,
        time: 5000
    });
   
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        }
    );
    $('.menubtn').collapse();
});
*/ 
    // $(document).on('click', '.dropdown',            
        // function() {
        //     $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
        //     $(this).toggleClass('open');        
        // },
        // function() {
        //     $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
        //     $(this).toggleClass('open');       
        // }
    // );
    /*
    $(document).on('click', '.dropdown a',function() {
        if($(this).parent().hasClass('open')){
            $(this).next().hide().end().parent().siblings().find('.mega-dropdown-menu').slideUp("400");
            $(this).next().stop(true,true).slideDown("400");
        }else{
            $(this).next().stop(true,true).slideUp("400");
        }            
    });
    $(document).mouseup(function (e){
    var container = $('.mega-dropdown, .mega-dropdown-menu');

    if (!container.is(e.target) && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('.mega-dropdown-menu').slideUp("400");
    }
});
    $('.menubtn').collapse();
    $('.navbar-toggle').on('click', function () {
       var target = $(this).data('apply');
       $('#'+target).slideToggle();
    });
    */
    $('.navbar-toggle').on('click', function () {
       var target = $(this).data('apply');
       var $menu = $('#'+target);
       $menu.toggleClass('in'); // Toggle Bootstrap's 'in' class for collapse
       if ($menu.hasClass('in')) {
           $menu.slideDown(200);
       } else {
           $menu.slideUp(200);
       }
    });

    $(document).ready(function() {
        var loader = $("body").DEPreLoad({
            OnStep: function(percent) {
                // console.log(percent);
                // console.log();
                var getFigure = Math.floor(Math.random() * ((80-40)+1) + 40);
                var getFigure2 = Math.floor(Math.random() * ((90-10)+1) + 20);
                console.log(Math.round(percent));
                if(Math.round(percent/10) <= 10){
                    $('.pinFade'+Math.round(percent/10)).addClass('animate').css({
                        top: Math.floor((Math.random() * 80) + 20)+'%',
                        left: Math.floor((Math.random() * 80) + 20)+'%',
                        width: getFigure + 'px',
                        backgroundSize: 'contain',
                        animationDelay: ((Math.round(percent/10))*0.1)+'s',
                    });
                }
                if(Math.round(percent/10) == 10){
                    $('.pinFade11').addClass('animate').css({
                        top: Math.floor((Math.random() * 80) + 20)+'%',
                        left: Math.floor((Math.random() * 80) + 20)+'%',
                        width: getFigure + 'px',
                        backgroundSize: 'contain',
                        animationDelay: 2.2+'s',
                    });
                    $('.pinFade12').addClass('animate').css({
                        top: Math.floor((Math.random() * 80) + 20)+'%',
                        left: Math.floor((Math.random() * 80) + 20)+'%',
                        width: getFigure + 'px',
                        backgroundSize: 'contain',
                        animationDelay: 2.4+'s',
                    });
                }
                // console.log('.pinFade'+percent/10);
            },
            OnComplete: function() {
                setTimeout(function () {
                   $('.preloader').fadeOut();
                }, 1500);
            }
        });
    });

});

