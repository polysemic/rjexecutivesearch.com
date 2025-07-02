/* ============================================
   MJ Direct Placement Services - Hero Slider
   Optional JavaScript for Enhanced Features
   ============================================ */

class HeroSlider {
  constructor(selector, options = {}) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;
    
    this.options = {
      autoplay: true,
      pauseOnHover: true,
      slideDuration: 5500, // 5.5 seconds
      transitionDuration: 800,
      touchEnabled: true,
      keyboardNav: true,
      ...options
    };
    
    this.slides = this.slider.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.isPlaying = this.options.autoplay;
    this.animationId = null;
    this.startTime = 0;
    this.pausedTime = 0;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.setupEventListeners();
    this.setupAccessibility();
    this.setupTouchEvents();
    
    if (this.options.autoplay) {
      this.startSlideshow();
    }
    
    // Set first slide as active
    this.updateActiveSlide();
  }
  
  setupEventListeners() {
    // Pause on hover
    if (this.options.pauseOnHover) {
      this.slider.addEventListener('mouseenter', () => this.pauseSlideshow());
      this.slider.addEventListener('mouseleave', () => this.resumeSlideshow());
    }
    
    // Keyboard navigation
    if (this.options.keyboardNav) {
      document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Visibility API - pause when tab is not active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseSlideshow();
      } else {
        this.resumeSlideshow();
      }
    });
    
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(mediaQuery);
    mediaQuery.addListener((mq) => this.handleReducedMotion(mq));
  }
  
  setupAccessibility() {
    // Add ARIA attributes
    this.slider.setAttribute('role', 'region');
    this.slider.setAttribute('aria-label', 'Hero Image Carousel');
    this.slider.setAttribute('aria-live', this.isPlaying ? 'off' : 'polite');
    
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`);
      slide.setAttribute('aria-hidden', index !== this.currentSlide);
    });
  }
  
  setupTouchEvents() {
    if (!this.options.touchEnabled) return;
    
    let startX = 0;
    let startY = 0;
    let isTouch = false;
    
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isTouch = true;
      this.pauseSlideshow();
    }, { passive: true });
    
    this.slider.addEventListener('touchmove', (e) => {
      if (!isTouch) return;
      
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      
      // Prevent vertical scrolling if horizontal swipe is detected
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    }, { passive: false });
    
    this.slider.addEventListener('touchend', (e) => {
      if (!isTouch) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Check if it's a horizontal swipe (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.previousSlide();
        } else {
          this.nextSlide();
        }
      }
      
      isTouch = false;
      this.resumeSlideshow();
    }, { passive: true });
  }
  
  handleKeyboard(e) {
    // Only handle keys when slider is focused or contains focus
    if (!this.slider.contains(document.activeElement) && document.activeElement !== this.slider) {
      return;
    }
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        this.togglePlayPause();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }
  
  handleReducedMotion(mediaQuery) {
    if (mediaQuery.matches) {
      this.pauseSlideshow();
      this.slider.style.setProperty('--slider-duration', '0s');
      this.slider.style.setProperty('--slider-transition', '0s');
    } else {
      this.slider.style.removeProperty('--slider-duration');
      this.slider.style.removeProperty('--slider-transition');
    }
  }
  
  startSlideshow() {
    if (!this.isPlaying) return;
    
    this.startTime = performance.now();
    this.animationId = requestAnimationFrame(() => this.slideLoop());
  }
  
  slideLoop() {
    if (!this.isPlaying) return;
    
    const elapsed = performance.now() - this.startTime;
    
    if (elapsed >= this.options.slideDuration) {
      this.nextSlide();
      this.startTime = performance.now();
    }
    
    this.animationId = requestAnimationFrame(() => this.slideLoop());
  }
  
  pauseSlideshow() {
    this.isPlaying = false;
    this.pausedTime = performance.now();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.slider.setAttribute('aria-live', 'polite');
  }
  
  resumeSlideshow() {
    if (!this.options.autoplay) return;
    
    this.isPlaying = true;
    if (this.pausedTime) {
      this.startTime += performance.now() - this.pausedTime;
      this.pausedTime = 0;
    }
    this.startSlideshow();
    this.slider.setAttribute('aria-live', 'off');
  }
  
  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseSlideshow();
    } else {
      this.resumeSlideshow();
    }
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateActiveSlide();
    this.announceSlideChange();
  }
  
  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.updateActiveSlide();
    this.announceSlideChange();
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length && index !== this.currentSlide) {
      this.currentSlide = index;
      this.updateActiveSlide();
      this.announceSlideChange();
    }
  }
  
  updateActiveSlide() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentSlide;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', !isActive);
      
      // Update z-index for proper layering
      slide.style.zIndex = isActive ? 2 : 1;
    });
  }
  
  announceSlideChange() {
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Slide ${this.currentSlide + 1} of ${this.slides.length}`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  // Public API methods
  play() {
    this.options.autoplay = true;
    this.resumeSlideshow();
  }
  
  pause() {
    this.options.autoplay = false;
    this.pauseSlideshow();
  }
  
  getCurrentSlide() {
    return this.currentSlide;
  }
  
  getTotalSlides() {
    return this.slides.length;
  }
  
  destroy() {
    this.pauseSlideshow();
    
    // Remove event listeners
    this.slider.removeEventListener('mouseenter', () => this.pauseSlideshow());
    this.slider.removeEventListener('mouseleave', () => this.resumeSlideshow());
    document.removeEventListener('keydown', (e) => this.handleKeyboard(e));
    document.removeEventListener('visibilitychange', () => {});
    
    // Remove ARIA attributes
    this.slider.removeAttribute('role');
    this.slider.removeAttribute('aria-label');
    this.slider.removeAttribute('aria-live');
    
    this.slides.forEach(slide => {
      slide.removeAttribute('role');
      slide.removeAttribute('aria-roledescription');
      slide.removeAttribute('aria-label');
      slide.removeAttribute('aria-hidden');
      slide.classList.remove('active');
      slide.style.removeProperty('z-index');
    });
  }
}

// Auto-initialize if slider exists
document.addEventListener('DOMContentLoaded', () => {
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    // Initialize with default options
    window.heroSliderInstance = new HeroSlider('.hero-slider', {
      autoplay: true,
      pauseOnHover: true,
      slideDuration: 5500,
      touchEnabled: true,
      keyboardNav: true
    });
  }
});

// Add screen reader only class
const style = document.createElement('style');
style.textContent = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroSlider;
}
