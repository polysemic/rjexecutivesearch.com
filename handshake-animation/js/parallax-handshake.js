/**
 * Parallax Handshake Animation Controller
 * Manages scroll-based hand movement through page sections
 */

class ParallaxHandshake {
    constructor() {
        this.leftHand = document.getElementById('left-hand');
        this.rightHand = document.getElementById('right-hand');
        this.handshakeComplete = document.getElementById('handshake-complete');
        this.handshakeLayer = document.getElementById('handshake-layer');
        
        // Debug elements
        this.debugPanel = document.getElementById('debug-panel');
        this.currentSectionSpan = document.getElementById('current-section');
        this.scrollProgressSpan = document.getElementById('scroll-progress');
        this.leftPositionSpan = document.getElementById('left-position');
        this.rightPositionSpan = document.getElementById('right-position');
        this.animationStateSpan = document.getElementById('animation-state');
        
        // Configuration
        this.config = {
            // Hand starting positions (off-screen)
            leftStartX: -250,
            rightStartX: -250,
            
            // Section-specific hand positions
            sectionPositions: {
                1: { left: -200, right: -200, visible: true },    // Hero - hands visible at edges
                2: { left: -300, right: -300, visible: false },   // Main content - hands hidden
                3: { left: -100, right: -100, visible: true },    // Middle CTA - hands closer
                4: { left: -300, right: -300, visible: false },   // Services - hands hidden
                5: { left: 0, right: 0, visible: true, handshake: true } // Final CTA - handshake
            },
            
            // Animation settings
            transitionDuration: 300,
            shakeAmplitude: 15,
            debug: true
        };
        
        this.currentSection = 1;
        this.scrollProgress = 0;
        this.isHandshaking = false;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        // Get all sections
        this.sections = [
            { element: document.getElementById('section-1'), id: 1 },
            { element: document.getElementById('section-2'), id: 2 },
            { element: document.getElementById('section-3'), id: 3 },
            { element: document.getElementById('section-4'), id: 4 },
            { element: document.getElementById('section-5'), id: 5 }
        ];
        
        // Set initial positions
        this.updateHandPositions(1, 0);
        
        // Bind events
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        
        // Initial calculation
        this.calculateSectionBounds();
        
        console.log('Parallax handshake animation initialized');
    }
    
    calculateSectionBounds() {
        this.sections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            section.top = rect.top + scrollTop;
            section.height = rect.height;
            section.bottom = section.top + section.height;
        });
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateAnimation.bind(this));
            this.ticking = true;
        }
    }
    
    onResize() {
        this.calculateSectionBounds();
        this.updateAnimation();
    }
    
    updateAnimation() {
        this.ticking = false;
        
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate overall scroll progress
        this.scrollProgress = Math.min(scrollY / (documentHeight - windowHeight), 1);
        
        // Determine current section
        let newSection = 1;
        let sectionProgress = 0;
        
        for (let i = 0; i < this.sections.length; i++) {
            const section = this.sections[i];
            const sectionCenter = section.top + (section.height / 2);
            const viewportCenter = scrollY + (windowHeight / 2);
            
            if (viewportCenter >= section.top && viewportCenter <= section.bottom) {
                newSection = section.id;
                // Calculate progress within this section (0 to 1)
                sectionProgress = Math.max(0, Math.min(1, 
                    (viewportCenter - section.top) / section.height
                ));
                break;
            }
        }
        
        // Update section if changed
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
            this.onSectionChange(newSection);
        }
        
        // Update hand positions based on current section and progress
        this.updateHandPositions(newSection, sectionProgress);
        
        // Update debug panel
        this.updateDebugPanel(newSection, sectionProgress, scrollY);
    }
    
    onSectionChange(sectionId) {
        const sectionConfig = this.config.sectionPositions[sectionId];
        
        if (sectionConfig) {
            // Handle handshake activation/deactivation
            if (sectionConfig.handshake && !this.isHandshaking) {
                this.activateHandshake();
            } else if (!sectionConfig.handshake && this.isHandshaking) {
                this.deactivateHandshake();
            }
            
            // Handle visibility
            if (sectionConfig.visible) {
                this.showHands();
            } else {
                this.hideHands();
            }
        }
    }
    
    updateHandPositions(sectionId, sectionProgress) {
        const sectionConfig = this.config.sectionPositions[sectionId];
        
        if (!sectionConfig || this.isHandshaking) {
            return; // Don't move hands during handshake
        }
        
        // Calculate smooth transitions between sections
        let leftX = sectionConfig.left;
        let rightX = sectionConfig.right;
        
        // Add smooth progression within sections that show hand movement
        if (sectionId === 1) {
            // Hero section: hands move in slightly as user scrolls
            const moveIn = sectionProgress * 50;
            leftX = sectionConfig.left + moveIn;
            rightX = sectionConfig.right + moveIn;
        } else if (sectionId === 3) {
            // Middle CTA: hands move closer together
            const closerMovement = sectionProgress * 50;
            leftX = sectionConfig.left + closerMovement;
            rightX = sectionConfig.right + closerMovement;
        }
        
        // Apply positions
        this.leftHand.style.transform = `translateY(-50%) translateX(${leftX}px)`;
        this.rightHand.style.transform = `translateY(-50%) translateX(${-rightX}px)`;
        
        // Update debug
        if (this.leftPositionSpan) {
            this.leftPositionSpan.textContent = `${leftX}px`;
        }
        if (this.rightPositionSpan) {
            this.rightPositionSpan.textContent = `${-rightX}px`;
        }
    }
    
    showHands() {
        this.leftHand.style.opacity = '1';
        this.rightHand.style.opacity = '1';
        this.handshakeLayer.classList.remove('hands-hidden');
    }
    
    hideHands() {
        this.leftHand.style.opacity = '0';
        this.rightHand.style.opacity = '0';
        this.handshakeLayer.classList.add('hands-hidden');
    }
    
    activateHandshake() {
        this.isHandshaking = true;
        
        // Hide individual hands
        this.leftHand.style.opacity = '0';
        this.rightHand.style.opacity = '0';
        
        // Show and animate complete handshake
        this.handshakeComplete.classList.add('visible');
        
        // Start shaking animation after a brief delay
        setTimeout(() => {
            this.handshakeComplete.classList.add('shaking');
        }, 500);
        
        if (this.animationStateSpan) {
            this.animationStateSpan.textContent = 'handshaking';
        }
    }
    
    deactivateHandshake() {
        this.isHandshaking = false;
        
        // Hide handshake image
        this.handshakeComplete.classList.remove('visible', 'shaking');
        
        // Show individual hands
        this.showHands();
        
        if (this.animationStateSpan) {
            this.animationStateSpan.textContent = 'approaching';
        }
    }
    
    updateDebugPanel(sectionId, sectionProgress, scrollY) {
        if (!this.config.debug) return;
        
        if (this.currentSectionSpan) {
            this.currentSectionSpan.textContent = sectionId;
        }
        
        if (this.scrollProgressSpan) {
            this.scrollProgressSpan.textContent = `${Math.round(this.scrollProgress * 100)}%`;
        }
    }
    
    // Public API methods
    setDebugMode(enabled) {
        this.config.debug = enabled;
        if (this.debugPanel) {
            this.debugPanel.style.display = enabled ? 'block' : 'none';
        }
    }
    
    getState() {
        return {
            currentSection: this.currentSection,
            scrollProgress: this.scrollProgress,
            isHandshaking: this.isHandshaking,
            leftHandPosition: this.leftHand.style.transform,
            rightHandPosition: this.rightHand.style.transform
        };
    }
    
    getConfig() {
        return { ...this.config };
    }
    
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.updateAnimation();
    }
    
    reinitialize() {
        this.calculateSectionBounds();
        this.updateAnimation();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.parallaxHandshake = new ParallaxHandshake();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.parallaxHandshake = new ParallaxHandshake();
    });
} else {
    window.parallaxHandshake = new ParallaxHandshake();
}
