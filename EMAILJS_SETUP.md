# Setting Up EmailJS in Your Portfolio

This document provides steps to set up and use the EmailJS service in your portfolio website.

## What is EmailJS?

EmailJS allows you to send emails directly from your client-side code without needing a server. This makes it perfect for contact forms in static sites.

## Steps to Set Up EmailJS

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for an account
   - The free tier allows 200 emails per month

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Connect to a mail service provider (Gmail, Outlook, etc.)
   - Note the service ID that is assigned to your service

3. **Create an Email Template**
   - Go to "Email Templates" in your dashboard
   - Create a new template with placeholders for:
     - `from_name` - The name of the person sending the message
     - `from_email` - The email of the person sending the message
     - `subject` - The subject line of the message
     - `message` - The content of the message
   - Note the template ID that is assigned to your template

4. **Update Environment Variables**
   - Open your `.env.local` file and update the following variables:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - You can find your public key in the EmailJS dashboard under "Account" > "API Keys"

5. **Test Your Setup**
   - Fill out the contact form on your website and submit it
   - Check if the email is received at your configured email address

## Troubleshooting

- If emails are not being sent, check the browser console for errors
- Verify that your service ID, template ID, and public key are correctly entered in the environment variables
- Make sure your email template has the correct placeholders as mentioned above

## Security Notes

- The public key is exposed to the client, but this is standard for EmailJS
- To prevent spam, consider adding reCAPTCHA to your contact form

## Rate Limits

- Be aware of the limits on your EmailJS account to avoid service interruptions
- The free tier includes 200 emails per month
- Consider upgrading if you need a higher volume of emails
