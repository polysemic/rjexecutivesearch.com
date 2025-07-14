# Handshake Animation Project

A smooth, performance-optimized scroll-triggered handshake animation built for RJ Executive Search. This animation symbolizes the connection between employers and candidates.

## Features

- **Performance Optimized**: Uses CSS transforms and GPU acceleration for smooth 60fps animations
- **Fully Customizable**: Easy-to-adjust variables for timing, positioning, and animation behavior
- **Cross-Browser Compatible**: Works across all modern browsers with vanilla JavaScript
- **Responsive Design**: Automatically adapts to different screen sizes
- **Accessibility Friendly**: Respects `prefers-reduced-motion` settings
- **Fallback Support**: Graceful fallback when images fail to load

## Files Structure

```
handshake-animation/
├── index.html              # Demo page with live configuration panel
├── css/
│   └── handshake-styles.css # All animation styles and responsive design
├── js/
│   └── handshake-scroll.js  # Scroll-triggered animation controller
├── images/
│   ├── left-hand.png        # Left arm/hand reaching out (transparent PNG)
│   └── right-hand.png       # Right arm/hand reaching out (transparent PNG)
└── README.md               # This documentation
```

## Quick Start

1. **Include the CSS and JavaScript files in your HTML:**

```html
<link href="css/handshake-styles.css" rel="stylesheet">
<script src="js/handshake-scroll.js"></script>
```

2. **Add the handshake container to your HTML:**

```html
<div class="handshake-container">
  <img src="images/left-hand.png" id="left-hand" alt="Left arm reaching out">
  <img src="images/right-hand.png" id="right-hand" alt="Right arm reaching out">
  
  <!-- Fallback for when images don't load -->
  <div class="handshake-fallback" id="handshake-fallback">
    <div class="hand-placeholder left-placeholder">👈</div>
    <div class="hand-placeholder right-placeholder">👉</div>
  </div>
</div>
```

3. **The animation will automatically initialize when the page loads!**

## Configuration

### CSS Variables

You can customize the animation by modifying CSS custom properties:

```css
:root {
  --shake-amplitude: 20px;    /* How far hands move up/down when shaking */
  --shake-duration: 0.8s;     /* Duration of one shake cycle */
  --handshake-z-index: 10;    /* Z-index for layering */
  --transition-duration: 0.3s; /* Smooth transition timing */
}
```

### JavaScript Configuration

Access the global `handshakeAnimation` object for dynamic control:

```javascript
// Update scroll distance (how much scroll needed for hands to meet)
handshakeAnimation.updateScrollDistance(600);

// Update initial hand visibility (0.5 = 50% hidden, 0.9 = 90% hidden)
handshakeAnimation.updateLeftVisibility(0.8);
handshakeAnimation.updateRightVisibility(0.8);

// Enable debug mode
handshakeAnimation.setDebugMode(true);

// Get current state
console.log(handshakeAnimation.getState());
```

## Customization Options

### Animation Variants

Use CSS classes for different shake styles:

```html
<!-- Gentle handshake -->
<div class="handshake-container gentle-shake">

<!-- Vigorous handshake -->
<div class="handshake-container vigorous-shake">

<!-- Slow handshake -->
<div class="handshake-container slow-shake">
```

### Scroll Distance

Control how much scrolling is needed for the animation:

- `200px` - Quick animation (hands meet quickly)
- `400px` - Default balanced animation
- `800px` - Slow, dramatic animation

### Initial Visibility

Control how much of each hand is visible initially:

- `0.5` - Half the hand visible (50% hidden)
- `0.9` - Just a hint visible (90% hidden)
- `0.95` - Barely visible (95% hidden)

## Integration Examples

### Basic Integration

```html
<!DOCTYPE html>
<html>
<head>
    <link href="handshake-animation/css/handshake-styles.css" rel="stylesheet">
</head>
<body>
    <section class="hero">
        <h1>Welcome to Our Company</h1>
        <p>Scroll down to see how we bring people together</p>
    </section>
    
    <section class="demo-section">
        <div class="handshake-container">
            <img src="handshake-animation/images/left-hand.png" id="left-hand" alt="Left arm">
            <img src="handshake-animation/images/right-hand.png" id="right-hand" alt="Right arm">
            <div class="handshake-fallback" id="handshake-fallback">
                <div class="hand-placeholder left-placeholder">👈</div>
                <div class="hand-placeholder right-placeholder">👉</div>
            </div>
        </div>
    </section>
    
    <script src="handshake-animation/js/handshake-scroll.js"></script>
</body>
</html>
```

### With Background Content

```html
<section class="parallax-section">
    <!-- Background content -->
    <div class="background-content">
        <h2>Building Connections</h2>
        <p>We bring together the right people at the right time</p>
    </div>
    
    <!-- Handshake overlay -->
    <div class="handshake-container">
        <img src="images/left-hand.png" id="left-hand" alt="Left arm">
        <img src="images/right-hand.png" id="right-hand" alt="Right arm">
        <div class="handshake-fallback" id="handshake-fallback">
            <div class="hand-placeholder left-placeholder">👈</div>
            <div class="hand-placeholder right-placeholder">👉</div>
        </div>
    </div>
</section>
```

## Performance Notes

- **GPU Acceleration**: Uses CSS transforms for smooth animations
- **Throttled Scroll**: Scroll events are throttled using `requestAnimationFrame`
- **Responsive**: Automatically adjusts to screen size changes
- **Memory Efficient**: Minimal memory footprint with clean event handling

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Mobile**: Optimized for touch devices
- **IE11+**: Basic support (no CSS custom properties)

## Accessibility

- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Screen Readers**: Proper alt text and semantic HTML
- **Keyboard Navigation**: Focusable elements with proper indicators
- **High Contrast**: Supports high contrast mode

## Troubleshooting

### Images Not Loading

If hand images don't load, the system automatically falls back to emoji placeholders (👈👉). To fix:

1. Ensure image paths are correct
2. Check image file permissions
3. Verify images are valid PNG files with transparent backgrounds

### Animation Not Smooth

For performance issues:

1. Ensure no other heavy animations are running
2. Check for console errors
3. Enable debug mode: `handshakeAnimation.setDebugMode(true)`

### Not Responsive

If the animation doesn't adapt to screen size:

1. Check CSS viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
2. Ensure container has proper responsive classes
3. Call `handshakeAnimation.reinitialize()` after dynamic content changes

## API Reference

### Methods

- `updateScrollDistance(pixels)` - Set scroll distance for animation
- `updateLeftVisibility(fraction)` - Set left hand initial visibility (0-1)
- `updateRightVisibility(fraction)` - Set right hand initial visibility (0-1)
- `setDebugMode(boolean)` - Enable/disable debug mode
- `getState()` - Get current animation state
- `getConfig()` - Get current configuration
- `reinitialize()` - Recalculate measurements (for dynamic content)

### CSS Classes

- `.handshake-container` - Main container
- `.shaking` - Applied when hands are shaking
- `.gentle-shake` - Gentle shake variant
- `.vigorous-shake` - Strong shake variant
- `.slow-shake` - Slow shake variant
- `.handshake-debug` - Debug mode styles

## License

Built for RJ Executive Search. Feel free to adapt for your projects.

## Support

For questions or issues with this animation system, refer to the demo page (`index.html`) which includes a live configuration panel for testing different settings.
