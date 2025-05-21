# Troubleshooting Guide

This document provides solutions for common issues in the portfolio website.

## Static Export Mode Issues

### Middleware Error

If you see an error about middleware not being compatible with static export:

1. This is expected and has been fixed in the configuration
2. During development, the middleware will work normally
3. For production builds, the authentication will use client-side checks

### Admin Authentication in Static Export

When deployed as a static export, the admin authentication works differently:

1. Authentication state is stored in both localStorage and cookies
2. You might need to log in again after deployment
3. If you experience authentication issues, clear your browser cookies and localStorage, then log in again

## Image Handling Issues

### Testimonial Avatars

If testimonial avatars aren't loading properly:

1. Make sure the avatar URL is valid and accessible
2. The fallback mechanism will automatically generate an avatar with initials when an image fails to load
3. Image dimensions for testimonials should be square (1:1 aspect ratio)
4. If the issue persists, check the network tab in your browser's dev tools for specific errors

### Project Images

For project images:

1. Use images with the correct aspect ratio (16:9 recommended for thumbnails)
2. Compress images before uploading to improve loading performance
3. The site will automatically generate placeholders if images are missing or fail to load

## EmailJS Integration

### Configuration Steps

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service and template
3. Set environment variables in your `.env.local` file:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Make sure your EmailJS template has the following variables:
   - `from_name` - The sender's name
   - `from_email` - The sender's email
   - `subject` - The email subject
   - `message` - The email content

### Common Issues

1. **Email not sending**: Check your browser console for errors; ensure all EmailJS environment variables are set correctly.
2. **Rate limiting**: Free accounts have limited monthly email sends. Check your EmailJS dashboard for usage.
3. **Template mismatch**: Ensure your template variable names match what the code is sending.

## Form Validation

The contact form implements the following validations:

1. Required fields: name, email, and message
2. Email format validation
3. Error messages appear below the form when validation fails
4. Successful submissions show a green success message

## Firebase Authentication

If you're having issues with the admin dashboard:

1. Make sure your Firebase credentials are properly configured
2. Check if the Firebase project is correctly set up with Authentication enabled
3. The portfolio uses email/password authentication by default
4. Ensure your admin users are added to the Firebase Authentication service

## Additional Help

For any other issues, check:

1. The browser console for JavaScript errors
2. Application logs for server-side issues
3. Make sure all required environment variables are set correctly

## Recent Bug Fixes

1. Fixed image loading issues in the testimonials admin page
2. Added better error handling for failed image loads
3. Enhanced EmailJS configuration with improved error messages
4. Added form validation for the contact form
5. Fixed HTML entity issues with quotes and apostrophes 
6. Improved placeholder image generation based on content context
