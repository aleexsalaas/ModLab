document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const slidesContainer = document.getElementById('slides');
    const dotsContainer = document.getElementById('dots');
  
    const images = [
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gaming-computer-banner-sale-design-template-4eee9f783ef62e0f7122e9ae7828bec1_screen.jpg?ts=1659604125',
      'https://www.shutterstock.com/image-vector/gaming-night-stream-cartoon-web-260nw-1927350614.jpg',
      'https://www.zotac.com/download/files/styles/org/public/news/images/super_mek_mini_banner_1920_580.jpg?itok=f9Dw6mDK'
    ];
  
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
  
    // Crear slides dinámicamente
    images.forEach(src => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      img.src = src;
      slide.appendChild(img);
      slidesContainer.appendChild(slide);
    });
  
    // Crear dots dinámicamente
    images.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  
    updateDots();
  
    // Event listeners
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseleave', touchEnd);
  
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);
  
    function touchStart(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      slider.classList.add('grabbing');
    }
  
    function touchEnd() {
      cancelAnimationFrame(animationID);
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
  
      if (movedBy < -100 && currentIndex < images.length - 1) currentIndex += 1;
      if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
  
      setPositionByIndex();
      slider.classList.remove('grabbing');
      updateDots();
    }
  
    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }
  
    function setSliderPosition() {
      slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function setPositionByIndex() {
      currentTranslate = currentIndex * -slider.offsetWidth;
      prevTranslate = currentTranslate;
      slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function goToSlide(index) {
      currentIndex = index;
      setPositionByIndex();
      updateDots();
    }
  
    function updateDots() {
      Array.from(dotsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  });
  