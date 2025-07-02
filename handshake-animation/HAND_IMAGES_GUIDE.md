# Hand Images Creation Guide

Since the demo needs transparent PNG images of hands reaching out for a handshake, here are several options to create them:

## Option 1: Use Existing Images from Your Assets

You already have some handshake-related images in your assets folder:
- `handshake.jpg`
- `shake-small.jpg` 
- `woman-big-smile-shaking-hands.jpg`

You could extract/edit portions of these to create the left and right hand images.

## Option 2: Create Simple SVG Images

Create these two files in the `images/` folder:

### left-hand.png (or left-hand.svg)
A transparent image showing:
- An arm in business attire (shirt sleeve) extending from the left
- Hand positioned to receive a handshake
- Dimensions: approximately 300x200 pixels
- Transparent background

### right-hand.png (or right-hand.svg)  
A transparent image showing:
- An arm in business attire extending from the right
- Hand positioned to give a handshake
- Dimensions: approximately 300x200 pixels
- Transparent background

## Option 3: Use Placeholder Images

For testing, you can use any two images temporarily. The demo will work with the emoji fallbacks (👈👉) if images don't load.

## Option 4: Free Resources

- **Unsplash/Pexels**: Search for "handshake" and edit to separate the hands
- **Flaticon**: Business handshake icons (may require attribution)
- **Canva**: Create simple illustrations

## Technical Requirements

- **Format**: PNG with transparent background preferred
- **Size**: 200-400px wide, 150-250px tall
- **Content**: Professional business appearance
- **Positioning**: 
  - Left hand: Arm extending from left edge, hand reaching toward center-right
  - Right hand: Arm extending from right edge, hand reaching toward center-left

## Quick Test

The demo page will work immediately with emoji fallbacks, so you can test the animation while creating the proper images.

## Integration Note

Once you have the images, simply place them in the `images/` folder as:
- `left-hand.png`
- `right-hand.png`

The demo will automatically use them instead of the emoji fallbacks.
