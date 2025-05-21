# Accessibility Guide for Portfolio Website

This document outlines the accessibility features implemented in the portfolio website and provides guidance for maintaining accessibility standards as you continue to develop the site.

## Implemented Accessibility Features

### Keyboard Navigation

- **Skip to Content Link**: Hidden until focused, allows keyboard users to bypass navigation
- **Focus Management**: Custom focus styles for keyboard users that don't affect mouse users
- **Logical Tab Order**: Controls are arranged in a logical sequence for keyboard navigation

### Screen Reader Support

- **Semantic HTML**: Proper heading structure and landmark regions
- **ARIA Attributes**: Used where necessary to enhance screen reader experience
- **Alt Text**: Descriptive alt text for all images

### Visual Accessibility

- **Color Contrast**: Meets WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text)
- **Text Sizing**: Uses relative units (rem) to support browser text resizing
- **Dark Mode**: Reduces eye strain in low-light environments

### Form Accessibility

- **Form Labels**: All form controls have associated labels
- **Error Messages**: Clear error states with instructions for correction
- **Focus Indication**: Strong visual focus indicators

## WCAG 2.1 Compliance

The website aims to meet WCAG 2.1 Level AA compliance. Key principles include:

1. **Perceivable**
   - Text alternatives for non-text content
   - Content adaptable and distinguishable

2. **Operable**
   - Keyboard accessible
   - Enough time to read and use content
   - Navigable and input modalities beyond keyboard

3. **Understandable**
   - Readable and predictable
   - Input assistance

4. **Robust**
   - Compatible with current and future user tools

## Maintaining Accessibility

### Development Guidelines

1. **Semantic HTML**
   - Use appropriate elements (`<button>`, `<a>`, `<nav>`, `<main>`, etc.)
   - Maintain a logical heading structure (h1-h6)
   - Use lists (`<ul>`, `<ol>`) for groups of related items

2. **Interactive Elements**
   - Ensure all interactive elements are keyboard accessible
   - Maintain a minimum target size of 44x44px for touch targets
   - Provide visual feedback for hover and focus states

3. **Forms**
   - Always use explicit labels for form controls
   - Group related form elements with `<fieldset>` and `<legend>`
   - Provide clear error messages and validation feedback

4. **Images and Media**
   - Add meaningful alt text to images
   - Provide captions and transcripts for video/audio content
   - Avoid content that flashes more than 3 times per second

### Testing Accessibility

#### Manual Testing

- **Keyboard Navigation**: Test using Tab, Enter, Space, and arrow keys
- **Screen Reader Testing**: Test with VoiceOver (macOS), NVDA or JAWS (Windows)
- **Zoom Testing**: Test at 200% zoom
- **Reduced Motion**: Test with reduced motion settings enabled

#### Automated Testing

- Use tools like axe DevTools, Lighthouse, or WAVE to identify issues
- Validate HTML with W3C validator

## Resources

### Tools and Extensions

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/)

### Guidelines and Standards

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)

### Learning Resources

- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Accessibility Statement

Consider adding an accessibility statement to your portfolio that:
- Affirms your commitment to accessibility
- Lists implemented accessibility features
- Provides contact information for accessibility feedback
- Acknowledges any known limitations
