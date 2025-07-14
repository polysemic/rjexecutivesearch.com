$(document).ready(function() {
    'use strict';
    
    // Initialize preloader if DEPreLoad is available
    if (typeof $.fn.DEPreLoad !== 'undefined') {
        $("body").DEPreLoad();
    }
    
    // Mobile navigation toggle functionality
    $('.navbar-toggle').on('click', function() {
        var target = $(this).attr('data-target');
        $(target).toggleClass('in');
        $(this).toggleClass('collapsed');
        
        // Toggle aria-expanded attribute for accessibility
        var expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded);
    });
    
    // Close mobile menu when clicking on a link
    $('.navbar-nav a').on('click', function() {
        if ($(window).width() < 768) {
            $('.navbar-collapse').removeClass('in');
            $('.navbar-toggle').addClass('collapsed').attr('aria-expanded', 'false');
        }
    });
    
    // Handle dropdown functionality for mobile
    $('.dropdown-toggle').on('click', function(e) {
        if ($(window).width() < 768) {
            e.preventDefault();
            var $dropdown = $(this).parent();
            var $menu = $dropdown.find('.dropdown-menu');
            
            // Close other open dropdowns
            $('.dropdown').not($dropdown).removeClass('open');
            $('.dropdown-menu').not($menu).slideUp();
            
            // Toggle current dropdown
            $dropdown.toggleClass('open');
            $menu.slideToggle();
        }
    });
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown').removeClass('open');
            $('.dropdown-menu').slideUp();
        }
    });
    
    // Handle window resize
    $(window).resize(function() {
        if ($(window).width() >= 768) {
            // Reset mobile menu state on desktop
            $('.navbar-collapse').removeClass('in');
            $('.navbar-toggle').addClass('collapsed').attr('aria-expanded', 'false');
            $('.dropdown').removeClass('open');
            $('.dropdown-menu').removeAttr('style');
        }
    });
    
    // Initialize Bootstrap components if available
    if (typeof $.fn.dropdown !== 'undefined') {
        $('.dropdown-toggle').dropdown();
    }
    
    // Initialize revolution slider if it exists
    if (typeof $.fn.revolution !== 'undefined' && $('.tp-banner').length) {
        $('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 200,
            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview1",
            touchenabled: "on",
            onHoverStop: "on",
            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,
            parallax: "mouse",
            parallax_levels: [7,4,3,2,5,4,3,2,1,0],
            keyboardNavigation: "off",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,
            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,
            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,
            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",
            spinner: "spinner4",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            forceFullWidth: "off",
            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0,
            videoJsPath: "rs-plugin/videojs/",
            fullScreenOffsetContainer: ""
        });
    }
});
