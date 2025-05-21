import emailjs from '@emailjs/browser';

// EmailJS configuration values from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  /**
   * Initializes EmailJS with the public key
   */
  static init(): void {
    if (!PUBLIC_KEY) {
      console.warn('EmailJS public key is not configured. Email functionality will not work.');
      return;
    }
    emailjs.init(PUBLIC_KEY);
  }

  /**
   * Sends an email using EmailJS
   * @param formData - The data from the contact form
   * @returns Promise that resolves when the email is sent
   */
  static async sendEmail(formData: EmailFormData): Promise<{ status: number, text: string }> {
    // Check for missing configuration
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const missingVars = [];
      if (!SERVICE_ID) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
      if (!TEMPLATE_ID) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
      if (!PUBLIC_KEY) missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
      
      console.error(`EmailJS not properly configured. Missing environment variables: ${missingVars.join(', ')}`);
      throw new Error('Email service is not properly configured. Please check the documentation for setup instructions.');
    }

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email. Please try again later.');
    }
  }
}
