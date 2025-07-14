/**
 * Handshake Animation Controller
 * Performance-optimized scroll-triggered handshake animation
 * Built for RJ Executive Search
 */

(function() {
    'use strict';

    // Configuration object - easily customizable
    const config = {
        initialHiddenFractionLeft: 0.9,   // fraction of left-hand width initially off-screen
        initialHiddenFractionRight: 0.9,  // fraction of right-hand width initially off-screen
        scrollDistance: 400,              // scroll distance (in px) for hands to come together
        debounceDelay: 16,                // throttle scroll events (60fps)
        overlap: 0,                       // overlap in pixels when hands meet (0 = touching)
        enableDebugMode: false            // set to true for debugging
    };

    // State management
    let state = {
        isInitialized: false,
        isShaking: false,
        currentFraction: 0,
        containerTop: 0,
        leftHandWidth: 0,
        rightHandWidth: 0,
        viewportWidth: 0,
        lastScrollY: 0,
        ticking: false
    };

    // DOM elements
    const elements = {
        container: null,
        leftHand: null,
        rightHand: null,
        fallback: null,
        progressDisplay: null,
        stateDisplay: null
    };

    /**
     * Initialize the handshake animation system
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Get DOM elements
        elements.container = document.querySelector('.handshake-container');
        elements.leftHand = document.getElementById('left-hand');
        elements.rightHand = document.getElementById('right-hand');
        elements.fallback = document.getElementById('handshake-fallback');
        elements.progressDisplay = document.getElementById('scroll-progress');
        elements.stateDisplay = document.getElementById('animation-state');

        if (!elements.container) {
            console.warn('Handshake container not found');
            return;
        }

        // Set up image loading
        setupImageLoading();

        // Initialize viewport and element measurements
        updateMeasurements();

        // Set up event listeners
        setupEventListeners();

        // Set initial positions
        updateHandPositions();

        state.isInitialized = true;

        if (config.enableDebugMode) {
            enableDebugMode();
        }

        console.log('Handshake animation initialized');
    }

    /**
     * Set up image loading with fallbacks
     */
    function setupImageLoading() {
        if (elements.leftHand && elements.rightHand) {
            let imagesLoaded = 0;
            const totalImages = 2;

            function onImageLoad() {
                imagesLoaded++;
                this.classList.add('loaded');
                
                if (imagesLoaded === totalImages) {
                    // Hide fallback when both images are loaded
                    if (elements.fallback) {
                        elements.fallback.style.display = 'none';
                    }
                    updateMeasurements();
                    updateHandPositions();
                }
            }

            function onImageError() {
                console.warn('Hand image failed to load:', this.src);
                this.style.display = 'none';
                
                // Show fallback if images fail
                if (elements.fallback) {
                    elements.fallback.style.display = 'block';
                }
            }

            elements.leftHand.addEventListener('load', onImageLoad);
            elements.leftHand.addEventListener('error', onImageError);
            elements.rightHand.addEventListener('load', onImageLoad);
            elements.rightHand.addEventListener('error', onImageError);

            // If images are already cached and loaded
            if (elements.leftHand.complete) {
                onImageLoad.call(elements.leftHand);
            }
            if (elements.rightHand.complete) {
                onImageLoad.call(elements.rightHand);
            }
        }
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Throttled scroll handler for performance
        window.addEventListener('scroll', throttledScrollHandler);
        
        // Handle resize events
        window.addEventListener('resize', debounce(function() {
            updateMeasurements();
            updateHandPositions();
        }, 250));

        // Handle visibility change (pause animations when tab is hidden)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Pause animations when tab is hidden for performance
                if (elements.container) {
                    elements.container.style.animationPlayState = 'paused';
                }
            } else {
                // Resume animations when tab is visible
                if (elements.container) {
                    elements.container.style.animationPlayState = 'running';
                }
            }
        });
    }

    /**
     * Throttled scroll handler using requestAnimationFrame
     */
    function throttledScrollHandler() {
        state.lastScrollY = window.pageYOffset || window.scrollY || 0;
        requestTick();
    }

    /**
     * Request animation frame for smooth updates
     */
    function requestTick() {
        if (!state.ticking) {
            requestAnimationFrame(updateHandPositions);
            state.ticking = true;
        }
    }

    /**
     * Update measurements for responsive behavior
     */
    function updateMeasurements() {
        if (!elements.container) return;

        state.containerTop = elements.container.offsetTop;
        state.viewportWidth = window.innerWidth;

        // Get image dimensions
        if (elements.leftHand && elements.leftHand.offsetWidth > 0) {
            state.leftHandWidth = elements.leftHand.offsetWidth;
        } else {
            state.leftHandWidth = 250; // fallback width
        }

        if (elements.rightHand && elements.rightHand.offsetWidth > 0) {
            state.rightHandWidth = elements.rightHand.offsetWidth;
        } else {
            state.rightHandWidth = 250; // fallback width
        }
    }

    /**
     * Main update function - calculates and applies hand positions
     */
    function updateHandPositions() {
        state.ticking = false;

        if (!state.isInitialized || !elements.container) return;

        // Calculate scroll progress fraction (0.0 to 1.0)
        const scrollY = state.lastScrollY;
        const startY = state.containerTop - (window.innerHeight * 0.5); // Start animation when container is halfway visible
        const endY = startY + config.scrollDistance;

        let fraction;
        if (scrollY < startY) {
            fraction = 0;
        } else if (scrollY > endY) {
            fraction = 1;
        } else {
            fraction = (scrollY - startY) / config.scrollDistance;
        }

        // Apply easing for smoother animation (optional)
        // fraction = easeInOutQuad(fraction);

        // Clamp fraction
        fraction = Math.max(0, Math.min(1, fraction));
        state.currentFraction = fraction;

        // Calculate positions
        const centerX = state.viewportWidth / 2;
        
        // Final positions (when hands meet)
        const leftFinalX = centerX - state.leftHandWidth + (config.overlap / 2);
        const rightFinalX = centerX - (config.overlap / 2);

        // Initial positions (when hands are off-screen)
        const leftInitialX = -config.initialHiddenFractionLeft * state.leftHandWidth;
        const rightInitialX = state.viewportWidth - (1 - config.initialHiddenFractionRight) * state.rightHandWidth;

        // Linear interpolation
        const leftCurrentX = leftInitialX + (leftFinalX - leftInitialX) * fraction;
        const rightCurrentX = rightInitialX + (rightFinalX - rightInitialX) * fraction;

        // Apply transforms to hands
        if (elements.leftHand && elements.leftHand.style.display !== 'none') {
            elements.leftHand.style.transform = `translateY(-50%) translateX(${leftCurrentX}px)`;
        }
        
        if (elements.rightHand && elements.rightHand.style.display !== 'none') {
            elements.rightHand.style.transform = `translateY(-50%) translateX(${rightCurrentX}px)`;
        }

        // Handle fallback placeholder positioning
        if (elements.fallback && elements.fallback.style.display !== 'none') {
            const leftPlaceholder = elements.fallback.querySelector('.left-placeholder');
            const rightPlaceholder = elements.fallback.querySelector('.right-placeholder');
            
            if (leftPlaceholder) {
                const leftPlaceholderX = (leftCurrentX / state.viewportWidth) * 100;
                leftPlaceholder.style.left = `${Math.max(0, Math.min(90, leftPlaceholderX))}%`;
            }
            
            if (rightPlaceholder) {
                const rightPlaceholderX = ((state.viewportWidth - rightCurrentX) / state.viewportWidth) * 100;
                rightPlaceholder.style.right = `${Math.max(0, Math.min(90, rightPlaceholderX))}%`;
            }
        }

        // Handle shaking animation trigger
        const shouldShake = fraction >= 1;
        
        if (shouldShake && !state.isShaking) {
            elements.container.classList.add('shaking');
            state.isShaking = true;
        } else if (!shouldShake && state.isShaking) {
            elements.container.classList.remove('shaking');
            state.isShaking = false;
        }

        // Update debug displays
        updateDebugDisplays(fraction);
    }

    /**
     * Update debug information displays
     */
    function updateDebugDisplays(fraction) {
        if (elements.progressDisplay) {
            elements.progressDisplay.textContent = `${Math.round(fraction * 100)}%`;
        }

        if (elements.stateDisplay) {
            let stateText = 'Approaching';
            if (fraction >= 1) {
                stateText = 'Handshaking';
            } else if (fraction >= 0.8) {
                stateText = 'Almost there';
            } else if (fraction >= 0.5) {
                stateText = 'Getting closer';
            } else if (fraction > 0) {
                stateText = 'Moving together';
            }
            elements.stateDisplay.textContent = stateText;
        }
    }

    /**
     * Easing function for smoother animation (optional)
     */
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Enable debug mode for development
     */
    function enableDebugMode() {
        document.body.classList.add('handshake-debug');
        console.log('Handshake debug mode enabled');
        
        // Add debug controls
        const debugPanel = document.createElement('div');
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            border-radius: 4px;
        `;
        debugPanel.innerHTML = `
            <div>Debug Mode</div>
            <div>Fraction: <span id="debug-fraction">0</span></div>
            <div>Container Top: <span id="debug-container-top">0</span></div>
            <div>Scroll Y: <span id="debug-scroll-y">0</span></div>
            <div>Viewport Width: <span id="debug-viewport-width">0</span></div>
        `;
        document.body.appendChild(debugPanel);

        // Update debug info
        const originalUpdate = updateHandPositions;
        updateHandPositions = function() {
            originalUpdate.call(this);
            
            const debugFraction = document.getElementById('debug-fraction');
            const debugContainerTop = document.getElementById('debug-container-top');
            const debugScrollY = document.getElementById('debug-scroll-y');
            const debugViewportWidth = document.getElementById('debug-viewport-width');
            
            if (debugFraction) debugFraction.textContent = state.currentFraction.toFixed(3);
            if (debugContainerTop) debugContainerTop.textContent = state.containerTop;
            if (debugScrollY) debugScrollY.textContent = state.lastScrollY;
            if (debugViewportWidth) debugViewportWidth.textContent = state.viewportWidth;
        };
    }

    /**
     * Public API for external configuration
     */
    const handshakeAnimation = {
        /**
         * Update scroll distance
         */
        updateScrollDistance: function(distance) {
            config.scrollDistance = distance;
            updateHandPositions();
        },

        /**
         * Update left hand visibility
         */
        updateLeftVisibility: function(fraction) {
            config.initialHiddenFractionLeft = fraction;
            updateHandPositions();
        },

        /**
         * Update right hand visibility
         */
        updateRightVisibility: function(fraction) {
            config.initialHiddenFractionRight = fraction;
            updateHandPositions();
        },

        /**
         * Enable/disable debug mode
         */
        setDebugMode: function(enabled) {
            config.enableDebugMode = enabled;
            if (enabled) {
                enableDebugMode();
            } else {
                document.body.classList.remove('handshake-debug');
            }
        },

        /**
         * Get current state
         */
        getState: function() {
            return { ...state };
        },

        /**
         * Get current configuration
         */
        getConfig: function() {
            return { ...config };
        },

        /**
         * Reinitialize the animation (useful for dynamic content)
         */
        reinitialize: function() {
            if (state.isInitialized) {
                updateMeasurements();
                updateHandPositions();
            }
        }
    };

    // Expose API to global scope
    window.handshakeAnimation = handshakeAnimation;

    // Auto-initialize when script loads
    init();

})();
