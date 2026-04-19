/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    // Ensure Home is active on page load
    $('#mainNav li').removeClass('active');
    $('#mainNav li:first-child').addClass('active');
    
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false

    });
	
    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }
    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }
    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 400,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');

    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });

   $(".fancybox").fancybox({
        padding: 0,
        margin: 0,
        nextEffect: 'fade',
        prevEffect: 'fade',
        closeEffect: 'fade',
        nextClick: true,
        autoSize: true,
        autoResize: true,
        width: 'auto',
        height: 'auto',
        maxWidth: '95%',
        maxHeight: '95%',
        closeBtn: true,
        helpers: {
            title: { 
                type: 'inside',
                position: 'bottom'
            },
            overlay: { 
                locked: false,
                css: {
                    'background': 'rgba(0,0,0,0.95)'
                }
            }
        },
        beforeLoad: function() {
            var href = $(this.element).attr('href');
            // Force image type for all image formats including HEIC, JPG, PNG, etc
            if (href && (href.match(/\.(heic|jpg|jpeg|png|gif|webp)$/i) || href.match(/^img\//))) {
                this.type = 'image';
            }
        },
        beforeShow: function() {
            var titleText = $(this.element).attr('title') || $(this.element).attr('data-caption') || '';
            // Replace \n with <br> for proper line breaks in Fancybox title
            this.title = titleText.replace(/\\n/g, '<br>');
        }
    });

    // Handle PDF files - open them in fullscreen
    $('.fancybox[href$=".pdf"]').each(function() {
        $(this).on('click', function(e) {
            var pdfUrl = $(this).attr('href');
            // Open PDF in fullscreen-like iframe modal
            var pdfViewer = $('<div class="pdf-modal"><div class="pdf-modal-content"><button class="pdf-close-btn">&times;</button><iframe src="' + pdfUrl + '" style="width:100%;height:100%;border:none;"></iframe></div></div>');
            
            $('body').append(pdfViewer);
            $('body').css('overflow', 'hidden');
            
            pdfViewer.find('.pdf-close-btn').on('click', function() {
                pdfViewer.fadeOut(300, function() {
                    $(this).remove();
                    $('body').css('overflow', 'auto');
                });
            });
            
            pdfViewer.on('click', function(e) {
                if ($(e.target).is(pdfViewer)) {
                    pdfViewer.fadeOut(300, function() {
                        $(this).remove();
                        $('body').css('overflow', 'auto');
                    });
                }
            });
            
            return false;
        });
    });

    // Клик на весь olympiad-item открывает fancybox
    $('.olympiad-item').click(function(e) {
        // Не открываем если клик был на самой ссылке (чтобы избежать двойного срабатывания)
        if ($(e.target).closest('a.fancybox').length === 0) {
            $(this).find('a.fancybox').first().trigger('click');
            return false;
        }
    });

    // Отдельные настройки Fancybox для olympiads (без ограничений размера)
    $('a[data-fancybox-group="olympiads"]').fancybox({
        padding: 0,
        margin: 0,
        nextEffect: 'fade',
        prevEffect: 'fade',
        closeEffect: 'fade',
        nextClick: true,
        autoSize: false,
        autoResize: false,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        closeBtn: true,
        helpers: {
            title: { 
                type: 'inside',
                position: 'bottom'
            },
            overlay: { 
                locked: false,
                css: {
                    'background': 'rgba(0,0,0,0.95)'
                }
            }
        }
    });
    
    // Portfolio Modal Functionality
    var portfolioModal = $('#portfolio-modal');
    var modalClose = $('.portfolio-modal-close');
    
    // Open portfolio modal on click
    $('.portfolio-item').click(function(e) {
        e.preventDefault();
        var img = $(this).data('portfolio-img');
        var title = $(this).data('portfolio-title');
        var desc = $(this).data('portfolio-desc');
        
        $('#portfolio-modal-img').attr('src', img);
        $('#portfolio-modal-title').text(title);
        $('#portfolio-modal-desc').text(desc);
        
        portfolioModal.addClass('show');
        $('body').css('overflow', 'hidden');
    });
    
    // Close portfolio modal
    function closePortfolioModal() {
        portfolioModal.removeClass('show');
        $('body').css('overflow', 'auto');
    }
    
    modalClose.click(function() {
        closePortfolioModal();
    });
    
    // Close modal when clicking outside
    $(window).click(function(e) {
        if (e.target === portfolioModal[0]) {
            closePortfolioModal();
        }
    });
    
    // Close with ESC key
    $(document).keydown(function(e) {
        if (e.key === "Escape") {
            closePortfolioModal();
        }
    });
    
        // Smooth scroll when clicking filters that link to page sections
        $('#filters a[href^="#"]').click(function(e){
            var href = $(this).attr('href');
            if (href && href.indexOf('#') === 0) {
                e.preventDefault();
                var target = $(href);
                if (target.length) {
                    $('html, body').animate({ scrollTop: target.offset().top - 60 }, 800);
                }
                return false;
            }
        });

    // Olympiads horizontal gallery scroll functionality
    var olympiadsWrapper = $('.olympiads-wrapper');
    var olympiadsScrollLeftBtn = $('.olympiads-scroll-left');
    var olympiadsScrollRightBtn = $('.olympiads-scroll-right');
    var scrollAmount = 360; // pixels to scroll per click
    
    function updateOlympiadsArrows() {
        var scrollLeft = olympiadsWrapper.scrollLeft();
        var scrollWidth = olympiadsWrapper[0].scrollWidth;
        var clientWidth = olympiadsWrapper[0].clientWidth;
        
        if (scrollLeft <= 0) {
            olympiadsScrollLeftBtn.addClass('disabled');
        } else {
            olympiadsScrollLeftBtn.removeClass('disabled');
        }
        
        if (scrollLeft >= scrollWidth - clientWidth - 5) {
            olympiadsScrollRightBtn.addClass('disabled');
        } else {
            olympiadsScrollRightBtn.removeClass('disabled');
        }
    }
    
    updateOlympiadsArrows();
    olympiadsWrapper.on('scroll', updateOlympiadsArrows);
    
    olympiadsScrollLeftBtn.click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('disabled')) {
            olympiadsWrapper.animate({scrollLeft: '-=' + scrollAmount}, 400, 'swing', function() {
                updateOlympiadsArrows();
            });
        }
    });
    
    olympiadsScrollRightBtn.click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('disabled')) {
            olympiadsWrapper.animate({scrollLeft: '+=' + scrollAmount}, 400, 'swing', function() {
                updateOlympiadsArrows();
            });
        }
    });


    
    // Initialize hobby photos scrolling functionality
    function initHobbyPhotoScroll() {
        $('.hobby-detail-box').each(function(index) {
            var box = $(this);
            var wrapper = box.find('.hobby-photos-wrapper');
            var items = box.find('.hobby-photo-item');
            var leftBtn = box.find('.hobby-scroll-left');
            var rightBtn = box.find('.hobby-scroll-right');
            
            // Add staggered animation to hobby photos
            items.each(function(i) {
                $(this).css('animation-delay', (i * 0.1) + 's');
            });
            
            var scrollAmount = 260; // width of one photo item
            
            function updateHobbyArrows() {
                var scrollLeft = wrapper.scrollLeft();
                var scrollWidth = wrapper[0].scrollWidth;
                var clientWidth = wrapper[0].clientWidth;
                var maxScroll = scrollWidth - clientWidth;
                
                if (scrollLeft <= 0) {
                    leftBtn.addClass('disabled');
                } else {
                    leftBtn.removeClass('disabled');
                }
                
                if (scrollLeft >= maxScroll) {
                    rightBtn.addClass('disabled');
                } else {
                    rightBtn.removeClass('disabled');
                }
            }
            
            updateHobbyArrows();
            wrapper.on('scroll', function() {
                updateHobbyArrows();
                // Enforce max scroll limit
                var scrollLeft = wrapper.scrollLeft();
                var scrollWidth = wrapper[0].scrollWidth;
                var clientWidth = wrapper[0].clientWidth;
                var maxScroll = scrollWidth - clientWidth;
                if (scrollLeft > maxScroll) {
                    wrapper.scrollLeft(maxScroll);
                }
            });
            
            leftBtn.click(function(e) {
                e.preventDefault();
                var newScroll = Math.max(0, wrapper.scrollLeft() - scrollAmount);
                wrapper.animate({scrollLeft: newScroll}, 300, 'swing', function() {
                    updateHobbyArrows();
                });
            });
            
            rightBtn.click(function(e) {
                e.preventDefault();
                var scrollWidth = wrapper[0].scrollWidth;
                var clientWidth = wrapper[0].clientWidth;
                var maxScroll = scrollWidth - clientWidth;
                var newScroll = Math.min(maxScroll, wrapper.scrollLeft() + scrollAmount);
                wrapper.animate({scrollLeft: newScroll}, 300, 'swing', function() {
                    updateHobbyArrows();
                });
            });
        });
    }
    
    // Initialize fancybox for hobby images
    function initHobbyFancybox() {
        if ($(".hobby-fancybox").length) {
            $(".hobby-fancybox").fancybox({
                padding: 0,
                margin: 0,
                nextEffect: 'fade',
                prevEffect: 'fade',
                closeEffect: 'fade',
                nextClick: true,
                    fitToView: true,
                aspectRatio: true,
                autoSize: true,
                autoResize: true,
                width: 'auto',
                height: 'auto',
                maxWidth: '90%',
                maxHeight: '90%',
                autoCenter: true,
                helpers: {
                    title: { 
                        type: 'inside',
                        position: 'bottom'
                    },
                    overlay: { 
                        locked: false,
                        css: {
                            'background': 'rgba(0,0,0,0.95)'
                        }
                    }
                },
                beforeLoad: function() {
                    var href = $(this.element).attr('href');
                    if (href && href.match(/\.heic$/i)) {
                        this.type = 'image';
                    }
                },
                beforeShow: function() {
                    this.title = $(this.element).attr('title');
                }
            });
        }
    }
    
    // Add click handler for hobby photos
    $(document).on('click', '.hobby-photo-item', function(e) {
        if ($(e.target).closest('a.hobby-fancybox').length === 0) {
            $(this).find('a.hobby-fancybox').first().trigger('click');
            return false;
        }
    });

});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();
document.getElementById('').onclick = function() {
    var section = document.createElement('section');
    section.className = 'wow fadeInDown';
    section.className = 'wow shake';
    section.className = 'wow zoomIn';
    section.className = 'wow lightSpeedIn';
    this.parentNode.insertBefore(section, this);
};