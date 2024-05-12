var slideshowDuration = 3000;

function slideshowSwitch(slideshow, index, auto) {
  if (slideshow.data('wait')) return;

  var slides = slideshow.find('.slide');
  var pages = slideshow.find('.pagination');
  var activeSlide = slides.filter('.is-active');
  var newSlide = slides.eq(index);
  var transition = slideshow.attr('data-transition');
  if (newSlide.is(activeSlide)) return;

  newSlide.addClass('is-new');
  var timeout = slideshow.data('timeout');
  clearTimeout(timeout);
  slideshow.data('wait', true);

  if (transition === 'fade') {
    newSlide.css({ display: 'block', zIndex: 2 });
    newSlide.find('.image-container').css({ opacity: 0 });

    TweenMax.to(newSlide.find('.image-container'), 1, {
      alpha: 1,
      onComplete: function() {
        newSlide.addClass('is-active').removeClass('is-new');
        activeSlide.removeClass('is-active');
        newSlide.css({ display: '', zIndex: '' });
        newSlide.find('.image-container').css({ opacity: '' });
        pages.trigger('check');
        slideshow.data('wait', false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data('timeout', timeout);
        }
      }
    });
  } else {
    var newSlideProps = getSlideProps(slideshow, index, newSlide, activeSlide);

    newSlide.css(newSlideProps.slideCss);
    newSlide.find('.image-container').css(newSlideProps.imageCss);
    newSlide.find('.slide-content').css(newSlideProps.contentCss);
    activeSlide.find('.image-container').css({ left: 0 });

    TweenMax.set(newSlide.find('.caption > *'), { y: 20, force3D: true });
    TweenMax.to(activeSlide.find('.image-container'), 1, {
      left: newSlideProps.activeSlideImageLeft,
      ease: Power3.easeInOut
    });

    TweenMax.to(newSlide, 1, {
      width: slideshow.width(),
      ease: Power3.easeInOut
    });

    TweenMax.to(newSlide.find('.image-container'), 1, {
      right: newSlideProps.newSlideImageToRight,
      left: newSlideProps.newSlideImageToLeft,
      ease: Power3.easeInOut
    });

    TweenMax.staggerFromTo(
      newSlide.find('.caption > *'),
      0.8,
      { alpha: 0, y: 60 },
      { alpha: 1, y: 0, ease: Power3.easeOut, force3D: true, delay: 0.6 },
      0.1,
      function() {
        newSlide.addClass('is-active').removeClass('is-new');
        activeSlide.removeClass('is-active');
        newSlide.css({ display: '', width: '', left: '', zIndex: '' });
        newSlide.find('.image-container').css({ width: '', right: '', left: '' });
        newSlide.find('.slide-content').css({ width: '', left: '', right: '' });
        newSlide.find('.caption > *').css({ opacity: '', transform: '' });
        activeSlide.find('.image-container').css({ left: '' });
        pages.trigger('check');
        slideshow.data('wait', false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data('timeout', timeout);
        }
      }
    );
  }
}

function slideshowNext(slideshow, previous, auto) {
  var slides = slideshow.find('.slide');
  var activeSlide = slides.filter('.is-active');
  var newSlide = null;
  if (previous) {
    newSlide = activeSlide.prev('.slide');
    if (newSlide.length === 0) {
      newSlide = slides.last();
    }
  } else {
    newSlide = activeSlide.next('.slide');
    if (newSlide.length === 0) {
      newSlide = slides.eq(0);
    }
  }

  slideshowSwitch(slideshow, newSlide.index(), auto);
}

function getSlideProps(slideshow, index, newSlide, activeSlide) {
  var newSlideProps = {};
  if (index > activeSlide.index()) {
    newSlideProps = {
      slideCss: {
        display: 'block',
        width: 0,
        right: 0,
        left: 'auto',
        zIndex: 2
      },
      imageCss: {
        width: slideshow.width(),
        right: -slideshow.width() / 8,
        left: 'auto'
      },
      contentCss: {
        width: slideshow.width(),
        left: 'auto',
        right: 0
      },
      activeSlideImageLeft: slideshow.width() / 4,
      newSlideImageToRight: 0,
      newSlideImageToLeft: 'auto'
    };
  } else {
    newSlideProps = {
      slideCss: {
        display: 'block',
        width: 0,
        right: 'auto',
        left: 0,
        zIndex: 2
      },
      imageCss: {
        width: slideshow.width(),
        right: 'auto',
        left: -slideshow.width() / 8
      },
      contentCss: {
        width: slideshow.width(),
        left: 0,
        right: 'auto'
      },
      activeSlideImageLeft: -slideshow.width() / 4,
      newSlideImageToRight: 'auto',
      newSlideImageToLeft: 0
    };
  }

  return newSlideProps;
}

$(document).ready(function() {
  var slideshow = $('.main-content .slideshow');
  var windowHeight = $(window).height();

  $('.slide').addClass('is-loaded');

  $('.slideshow .arrows .arrow').on('click', function() {
    slideshowNext(slideshow, $(this).hasClass('prev'));
  });

  $('.slideshow .pagination .item').on('click', function() {
    slideshowSwitch(slideshow, $(this).index());
  });

  $('.slideshow .pagination').on('check', function() {
    var pages = $(this).find('.item');
    var index = slideshow.find('.slides .is-active').index();
    pages.removeClass('is-active');
    pages.eq(index).addClass('is-active');
  });

  var timeout = setTimeout(function() {
    slideshowNext(slideshow, false, true);
  }, slideshowDuration);

  slideshow.data('timeout', timeout);

  if (slideshow.length > 1) {
    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > windowHeight) return;
      var inner = slideshow.find('.slideshow-inner');
      var newHeight = windowHeight - (scrollTop / 2);
      var newTop = scrollTop * 0.8;
      inner.css({ transform: 'translateY(' + newTop + 'px)', height: newHeight });
    });
  }
});
