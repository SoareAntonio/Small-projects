//Întârzie execuția unei funcții (func) până când a trecut un anumit timp (wait, default 20ms) de la ultima apelare.
//Ideală pentru evenimente foarte dese, ca scroll, resize, mousemove
//Răspunde o singură dată la fiecare 20ms, chiar dacă scroll e declanșat de sute de ori.
function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    const sliderImages = document.querySelectorAll('.slide-in');

    function checkSlide() {
      sliderImages.forEach(sliderImage => {
        // să vedem dacă partea de jos a viewport-ului a trecut de jumătatea imaginii
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;//offsetTop = distanța dintre partea de sus a imaginii și partea de sus a paginii
        
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        
        //Această condiție verifică dacă nu am trecut deja complet de imagine
        const isNotScrolledPast = window.scrollY < imageBottom;
        
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
      });
    }
//Atașează funcția checkSlide() la evenimentul scroll
    window.addEventListener('scroll', debounce(checkSlide));
