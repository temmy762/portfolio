import { Metadata } from "next";
import { FiFileText, FiDownload, FiBriefcase, FiBook } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { aboutMe, experiences, education } from "@/lib/data/portfolio-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'About Me - Alex Johnson Portfolio',
  description: 'Learn more about Alex Johnson, a Full Stack Developer with expertise in web and mobile development.',
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="My journey, expertise, and professional background"
        />

        {/* Introduction Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            {/* Replace with actual profile image */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-400 dark:from-green-900 dark:to-green-700">
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Profile Image Placeholder
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {aboutMe.name}
            </h2>
            <p className="text-xl text-green-600 dark:text-green-500 font-medium mb-6">
              {aboutMe.title}
            </p>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
              <p>{aboutMe.bio}</p>
              <p>{aboutMe.longBio.split('\n\n').slice(0, 2).join('\n\n')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Location:
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {aboutMe.location}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Email:
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {aboutMe.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Phone:
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {aboutMe.phone}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Availability:
                </h4>
                <p className="text-green-600 dark:text-green-500 font-medium">
                  {aboutMe.availability}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button href="/contact">
                <FiFileText className="mr-2" /> Hire Me
              </Button>
              <Button href="/resume.pdf" variant="outline" isExternal={true}>
                <FiDownload className="mr-2" /> Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Full Bio Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Story
          </h3>
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
            {aboutMe.longBio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FiBriefcase className="mr-3 text-green-600 dark:text-green-500" />
            Professional Experience
          </h3>
          
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-green-200 dark:before:bg-green-900">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-green-600 dark:bg-green-500 -translate-x-[7px]"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h4>
                  <p className="text-green-600 dark:text-green-500 font-medium">
                    {exp.company} - {exp.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                  </p>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-500 mr-2 mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FiBook className="mr-3 text-green-600 dark:text-green-500" />
            Education
          </h3>
          
          <div className="space-y-12">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-green-200 dark:before:bg-green-900">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-green-600 dark:bg-green-500 -translate-x-[7px]"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="text-green-600 dark:text-green-500 font-medium">
                    {edu.institution} - {edu.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate!)}
                  </p>
                </div>
                {edu.description && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            If you&apos;re looking for a developer who&apos;s passionate about creating exceptional digital experiences,
            I&apos;d love to hear about your project. Let&apos;s create something amazing together!
          </p>
          <div className="flex justify-center space-x-4">
            <Button href="/contact" size="lg">
              Get In Touch
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              View My Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
