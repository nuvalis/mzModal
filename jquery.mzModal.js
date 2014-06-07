(function ($) {

    $.fn.mzModal = function (settings) {

        // Defaults

        var settings = $.extend({
            animation: "flip",
            width: "50%",
            title: "Test Title",
            content: "Your content goes here. Can be text or html.",
            top: "15%",
            left: "25%",
            ajax: true,
            url: "",
            data: 'data',
            ignoreLink: true,
            bind: true,
            error: function () {
                settings.title = 'ERROR';
                settings.content = "Failed with AJAX request.";
                backdrop();
                modalUp();
                modalStyles();
                $("body").addClass("modal-open");
                $('.mzmodal').show();
            },
            complete: function () {}
        }, settings);

        if (settings.bind) {
            return this.click(function (e) {

                if (settings.ignoreLink) {
                    e.preventDefault();
                }

                console.log('Ajax?' + settings.ajax);

                if (settings.ajax) {

                    console.log("Starting GetJSON")

                    $.ajax({
                        type: "JSON",
                        url: settings.url,
                        data: settings.data,
                        success: function (data) {
                            settings.title = data.title,
                            settings.content = data.content
                            console.log(settings.title);
                            backdrop();
                            modalUp();
                            modalStyles();
                            $("body").addClass("modal-open");
                            $('.mzmodal').show();

                        },
                        dataType: 'json',
                        error: settings.error,
                        complete: settings.complete
                    });

                    console.log(settings.title);

                } else {

                    backdrop();
                    modalUp();
                    modalStyles();
                    $("body").addClass("modal-open");
                    $('.mzmodal').show();

                }


            });
        } else {

            backdrop();
            modalUp();
            modalStyles();
            $("body").addClass("modal-open");
            $('.mzmodal').show();

        }


        function modalStyles() {
            $('.mzmodal').css({
                'position': 'absolute',
                'z-index': '1000',
                'left': settings.left,
                'top': settings.top,
                'display': 'none',
                'width': settings.width,

            });
            $('.mzmodal-exit').css({
                'position': 'relative',
                'z-index': '1005',
                'float': 'right',
                'display': 'block',
                'padding': '1em'
            });
            $('.mzmodal-backdrop-box').css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'height': '100%',
                'width': '100%',
                'z-index': '500'
            });
            $('.mzmodal-inner').css({
                'height': '100%;',
                'padding': '1em'
            });
        }


        // Create backdrop
        function backdrop() {
            var backdrop = $('<div class="mzmodal-backdrop-box"></div>');

            $(backdrop).appendTo('body');
        }

        function modalUp() {
            var html = $('<div class="mzmodal mz'+settings.animation+'"><h2>' + settings.title +
                '</h2><div class="mzmodal-inner">' + settings.content +
                '</div><a href="#" class="mzmodal-exit">Close</a></div>');

            $(html).appendTo('.mzmodal-backdrop-box');

            $('.mzmodal-exit').click(function () {

                $("body").removeClass("modal-open");
                $(this).parent().fadeOut(300, function () {
                    $(this).parent().remove();
                });
                $('.mzmodal-backdrop-box').fadeOut(300, function () {
                    $('.mzmodal-backdrop-box').remove();
                });
            });
        }

        return this;
    };

    /*
    *
    *   mzSlider das awesome
    *
    */

    $.fn.mzSlider = function (settings) {

        var totalSlides, slideDuration, animationDur, element = this,
            currentSlide, slideTimer, nextSlide, animating;

        var settings = $.extend({
            // These are the defaults.
            debug: false,
            slideDuration: 4000,
            animationDur: 400,
            element: "li",
            currentSlide: 0,
            effect: "margin-left",
            effectStart: 0,
            effectEnd: "150%",
            addControls: true,
        }, settings);

        // Find all li elements in targeted parent element
        var slides = element.find(settings.element);

        totalSlides = slides.length;

        effectWrapper = {};
        effectWrapper[settings.effect] = settings.effectStart;
        effectWrapper['z-index'] = 3;

        slides.eq(0).css(effectWrapper);

        if(settings.addControls){createControls();}

        timer(); // Init

        function changeSlide(command) {
            var command, nextSlide;

            debugLog("Command:" + command);

            if (command === "next") {

                debugLog("Next slide " + settings.currentSlide);

                nextSlide = settings.currentSlide + 1;

                if (nextSlide > totalSlides - 1) {
                    nextSlide = 0;
                }

            } else if (command === "prev") {

                nextSlide = settings.currentSlide - 1;

                if (nextSlide < 0) {
                    nextSlide = totalSlides - 1;
                }

            } else {

                nextSlide = command;

            }

            animateSlide(settings.currentSlide, nextSlide);

        }

        function animateSlide(currentSlide, nextSlide) {

            if (animating) {
                return false;
            }

            animating = true;

            debugLog("Slide should be " + currentSlide);

            slides.eq(settings.currentSlide).css('z-index', 3);

            effectWrapper['z-index'] = 2;
            slides.eq(nextSlide).css(effectWrapper);

            var styles = {};
            styles['transition'] = settings.effect + ' ' + settings.animationDur + 'ms';
            styles[settings.effect] = settings.effectEnd;

            slides.eq(nextSlide).css('display', "block"); // Removes Glitch and Reveals next Slide
            slides.eq(settings.currentSlide).css(styles);


            var cssTimer = setTimeout(function () {
                slides.eq(settings.currentSlide).removeAttr('style');
                slides.eq(settings.currentSlide).css('display', "none"); // Removes Glitch and hides currentSlide
                debugLog("Waiting cssTimer... " + settings.animationDur + "ms");
                settings.currentSlide = nextSlide;
                animating = false;
                timer();
            }, settings.animationDur);

        }

        function timer() {

            debugLog("Waiting... " + settings.slideDuration + "ms");
            slideTimer = setTimeout(function () {
                changeSlide('next');
            }, settings.slideDuration);

        }

        function debugLog(string) {

            if (settings.debug === true) {
                console.log(string);
            }

        }

        element.find(".previous").click(function () {
            debugLog("Clicked Previous");
            clearInterval(slideTimer);
            changeSlide("prev");
        });

        element.find(".next").click(function () {
            debugLog("Clicked Next");
            clearInterval(slideTimer);
            changeSlide("next");
        });

        function createControls() {

            var controls = '<div class="controls"><a href="#" class="left previous">&lt;</a><a href="#" class="right next">&gt;</a></div>';

            element.append(controls);

        }

    };

})(jQuery);