"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { FiCheckCircle } from "react-icons/fi";
import { SiUpwork, SiFiverr } from "react-icons/si";

export function FreelancePlatformsSection() {
  const platforms = [
    {
      name: "Upwork",
      icon: <SiUpwork className="text-5xl" />,
      color: "text-[#6FDA44]",
      bgColor: "bg-[#6FDA44]/10",
      url: "https://www.upwork.com/freelancers/username",
      stats: [
        { label: "Job Success", value: "100%" },
        { label: "Completed Jobs", value: "45+" },
        { label: "Total Earnings", value: "$50K+" },
      ],
      topSkills: [
        "React Development", 
        "Next.js", 
        "Full Stack Development", 
        "WordPress Development"
      ],
    },
    {
      name: "Fiverr",
      icon: <SiFiverr className="text-5xl" />,
      color: "text-[#1DBF73]",
      bgColor: "bg-[#1DBF73]/10",
      url: "https://www.fiverr.com/username",
      stats: [
        { label: "Rating", value: "4.9/5" },
        { label: "Completed Orders", value: "120+" },
        { label: "Repeat Clients", value: "85%" },
      ],
      topSkills: [
        "WordPress Customization", 
        "Frontend Development", 
        "Web App Development", 
        "E-commerce Solutions"
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Freelance Services"
          subtitle="Hire me through trusted freelance platforms where my work is backed by verified client satisfaction."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
            >
              <div className={`${platform.bgColor} px-6 py-8 flex items-center`}>
                <div className={`${platform.color} mr-4`}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Verified Freelance Profile
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {platform.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xl font-bold text-green-600 dark:text-green-500">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Top Skills
                </h4>
                <div className="space-y-2 mb-6">
                  {platform.topSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  href={platform.url}
                  isExternal={true}
                  className="w-full"
                  size="lg"
                >
                  Hire me on {platform.name}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
