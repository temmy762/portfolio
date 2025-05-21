import { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: 'Contact - Alex Johnson Portfolio',
  description: 'Get in touch with Alex Johnson for web development, mobile app development, and WordPress projects.',
};

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 mb-16">
        <SectionTitle
          title="Contact Me"
          subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
          centered={true}
        />
      </div>
      
      <ContactSection />
    </div>
  );
}
