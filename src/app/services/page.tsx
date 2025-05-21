import { Metadata } from "next";
import { ServiceCard } from "@/components/ui/service-card";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/portfolio-data";
import { FreelancePlatformsSection } from "@/components/sections/freelance-platforms-section";

export const metadata: Metadata = {
  title: 'Services - Alex Johnson Portfolio',
  description: 'Professional services offered by Alex Johnson, including web development, mobile app development, and WordPress solutions.',
};

export default function ServicesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="My Services"
          subtitle="Specialized services tailored to meet your digital needs with expertise and innovation."
          centered={true}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <SectionTitle
            title="My Process"
            subtitle="A collaborative, efficient, and transparent approach to bringing your projects to life."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                step: 1,
                title: "Discovery",
                description: "Understanding your business, goals, target audience, and project requirements in detail.",
                icon: "/images/icons/discovery.svg",
              },
              {
                step: 2,
                title: "Planning",
                description: "Developing a strategic plan, technical specifications, and project timeline.",
                icon: "/images/icons/planning.svg",
              },
              {
                step: 3,
                title: "Execution",
                description: "Building your solution with regular updates and opportunities for feedback.",
                icon: "/images/icons/execution.svg",
              },
              {
                step: 4,
                title: "Launch & Support",
                description: "Deploying your project and providing ongoing support and maintenance.",
                icon: "/images/icons/launch.svg",
              },
            ].map((item) => (
              <div 
                key={item.step}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center relative"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="mt-6 mb-4 flex justify-center">
                  {/* Placeholder for icon */}
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-500">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about my services, process, and working relationship."
            centered={true}
          />

          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "What types of projects do you work on?",
                answer: "I specialize in full-stack web applications, mobile apps (iOS and Android), and custom WordPress solutions. This includes e-commerce platforms, SaaS applications, corporate websites, and mobile applications across various industries."
              },
              {
                question: "What is your typical timeframe for completing a project?",
                answer: "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. During our initial consultation, I'll provide a more accurate timeline specific to your project requirements."
              },
              {
                question: "How do you handle project pricing?",
                answer: "I offer both fixed-price and hourly rate options depending on the project requirements. For well-defined projects, I typically work with fixed prices based on project scope. For ongoing development or projects with evolving requirements, an hourly rate might be more suitable. I provide detailed proposals with transparent pricing before beginning any work."
              },
              {
                question: "What is your payment schedule?",
                answer: "For fixed-price projects, I typically require a 50% deposit to begin work, with the remaining 50% due upon completion. For larger projects, I may suggest a milestone-based payment schedule. For hourly work, I invoice on a bi-weekly basis."
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer: "Yes, I offer ongoing maintenance and support packages to ensure your application remains secure, up-to-date, and functioning optimally. These packages can be tailored to your specific needs and can include regular updates, security monitoring, performance optimization, and content updates."
              },
              {
                question: "How do we communicate during the project?",
                answer: "Clear communication is essential for project success. I typically use a combination of email, video calls, and project management tools to keep you updated on progress. I provide regular updates and am available for questions throughout the development process."
              },
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-24 bg-gray-50 dark:bg-gray-800 rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to start your project?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss how I can help bring your ideas to life with tailored solutions 
            that meet your specific requirements and business goals.
          </p>
          <Button href="/contact" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Freelance Platforms Section */}
      <div className="mt-20">
        <FreelancePlatformsSection />
      </div>
    </div>
  );
}
