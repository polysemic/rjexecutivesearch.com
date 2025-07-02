# MJ Direct Placement Services - Hero Slider

A modern, mobile-first CSS-only slider with optional JavaScript enhancements for the hero section.

## Features

### Core Features (CSS Only)
- ✅ **Pure CSS animations** - No JavaScript required for basic functionality
- ✅ **Mobile-first responsive design** - Optimized for all screen sizes
- ✅ **Auto-advancing slides** - 5.5-second intervals
- ✅ **Smooth crossfade transitions** - Hardware accelerated
- ✅ **Fluid typography** - Scales with viewport using `clamp()`
- ✅ **Accessibility support** - Respects `prefers-reduced-motion`
- ✅ **High performance** - Optimized with `contain` and `will-change`

### Enhanced Features (with JavaScript)
- ✅ **Touch/swipe support** - Mobile gesture navigation
- ✅ **Keyboard navigation** - Arrow keys, spacebar, Home/End
- ✅ **Pause on hover** - Automatic pause when hovering
- ✅ **Tab visibility** - Pauses when tab is not active
- ✅ **Screen reader support** - Full ARIA implementation
- ✅ **Public API** - Programmatic control

## File Structure

```
assets/slider/
├── css/
│   └── hero-slider.css        # Main stylesheet (required)
├── js/
│   └── hero-slider.js         # Optional enhancements
└── README.md                  # This documentation
```

## Basic Usage (CSS Only)

### 1. Include CSS
```html
<link rel="stylesheet" href="assets/slider/css/hero-slider.css">
```

### 2. HTML Structure
```html
<div class="hero-slider">
  <div class="hero-slider-container">
    
    <!-- Slide 1 -->
    <div class="slide">
      <div class="slide-bg"></div>
      <div class="slide-caption">
        <h1 class="caption-text caption-large">We Give You the Attention You Deserve</h1>
      </div>
    </div>
    
    <!-- Slide 2 -->
    <div class="slide">
      <div class="slide-bg"></div>
      <div class="slide-caption">
        <h2 class="caption-text caption-medium">Our Seasoned<br>Recruiters Have</h2>
        <h2 class="caption-text caption-medium">Over 20 Years'<br>Experience</h2>
      </div>
    </div>
    
    <!-- Slide 3 -->
    <div class="slide">
      <div class="slide-bg"></div>
      <div class="slide-caption">
        <h2 class="caption-text caption-medium">Searching For</h2>
        <h2 class="caption-text caption-medium">Your Next Career?</h2>
        <h1 class="caption-text caption-large">We Can Help!</h1>
      </div>
    </div>
    
  </div>
</div>
```

## Enhanced Usage (with JavaScript)

### 1. Include JavaScript
```html
<script src="assets/slider/js/hero-slider.js"></script>
```

### 2. Manual Initialization (Optional)
```javascript
// Auto-initializes on DOMContentLoaded, or manually:
const slider = new HeroSlider('.hero-slider', {
  autoplay: true,           // Auto-advance slides
  pauseOnHover: true,       // Pause on mouse hover
  slideDuration: 5500,      // 5.5 seconds per slide
  touchEnabled: true,       // Enable touch/swipe
  keyboardNav: true         // Enable keyboard navigation
});
```

## Customization

### CSS Custom Properties
```css
:root {
  --slider-height-mobile: 50vh;     /* Mobile height */
  --slider-height-tablet: 60vh;     /* Tablet height */
  --slider-height-desktop: 800px;   /* Desktop height */
  --slider-duration: 5.5s;          /* Slide duration */
  --slider-transition: 0.8s;        /* Transition speed */
  --text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  --overlay-color: rgba(0, 0, 0, 0.2);
}
```

### Background Images
Update in CSS (lines 85-97):
```css
.slide:nth-child(1) .slide-bg {
  background-image: url('path/to/image1.jpg');
}
```

### Caption Styles
- `.caption-large` - Main headlines
- `.caption-medium` - Secondary text
- `.caption-small` - Small text

## Responsive Breakpoints

| Breakpoint | Size | Height | Features |
|------------|------|--------|----------|
| Mobile | 320px+ | 50vh | Stacked layout, touch-friendly |
| Large Mobile | 480px+ | 60vh | Improved typography |
| Tablet | 768px+ | 800px | Full desktop layout |
| Desktop | 1024px+ | 800px | Enhanced shadows |
| Large Desktop | 1200px+ | 800px | Max-width container |

## Accessibility Features

- **Reduced Motion**: Respects `prefers-reduced-motion: reduce`
- **High Contrast**: Enhanced shadows for `prefers-contrast: high`
- **Screen Readers**: Full ARIA implementation with JS
- **Keyboard Navigation**: Arrow keys, spacebar, Home/End
- **Focus Management**: Proper focus indicators and management

## JavaScript API

### Methods
```javascript
const slider = window.heroSliderInstance;

slider.play();                    // Start autoplay
slider.pause();                   // Pause autoplay
slider.nextSlide();              // Go to next slide
slider.previousSlide();          // Go to previous slide
slider.goToSlide(2);             // Go to specific slide (0-indexed)
slider.getCurrentSlide();        // Get current slide index
slider.getTotalSlides();         // Get total number of slides
slider.destroy();                // Clean up and remove
```

### Events
The slider automatically handles:
- Mouse hover (pause/resume)
- Touch/swipe gestures
- Keyboard navigation
- Tab visibility changes
- Reduced motion preferences

## Browser Support

- **Modern Browsers**: Full support with all features
- **IE11**: Basic CSS functionality (no custom properties)
- **Mobile**: Full touch support on iOS/Android
- **Screen Readers**: NVDA, JAWS, VoiceOver compatible

## Performance

- **CSS-only**: ~3KB minified
- **With JavaScript**: ~8KB total
- **Zero dependencies**: No jQuery or other libraries
- **Hardware accelerated**: Uses CSS transforms
- **Lazy loading ready**: Compatible with intersection observers

## Migration from Revolution Slider

This slider replaces Revolution Slider with:
- **67KB+ smaller** bundle size
- **Better performance** with hardware acceleration
- **Mobile-first** responsive design
- **Modern accessibility** standards
- **Maintainable code** with clear documentation

## Troubleshooting

### Images not loading
- Check image paths in CSS (lines 85-97)
- Ensure images exist in `assets/images/` directory

### Animations not working
- Verify CSS custom properties support
- Check for `prefers-reduced-motion` setting
- Ensure proper HTML structure

### Touch not working on mobile
- Include the JavaScript file
- Check touch event listeners in browser dev tools
- Verify `touchEnabled: true` in options

## License

Part of MJ Direct Placement Services website.
Created for https://mjdirectplacementsrvs.com/
