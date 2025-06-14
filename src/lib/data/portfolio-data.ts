import {
  Project,
  Service,
  Testimonial,
  BlogPost,
  Skill,
  Experience,
  Education,
  SocialLink
} from '@/types';

// Projects data
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment processing.',
    imageUrl: '/images/projects/ecommerce.svg',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.com',
    featured: true,
    date: '2024-12-15',
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Real Estate Mobile App',
    description: 'A cross-platform mobile application for real estate listings, featuring property search, filtering, and appointment scheduling.',
    imageUrl: '/images/projects/realestate.svg',
    tags: ['React Native', 'Firebase', 'Google Maps API', 'Expo'],
    category: 'Mobile App',
    githubUrl: 'https://github.com/username/real-estate-app',
    demoUrl: 'https://real-estate-app-demo.com',
    featured: true,
    date: '2024-10-20',
    techStack: ['React Native', 'Expo', 'Firebase', 'Google Maps API', 'Redux', 'Node.js']
  },
  {
    id: '3',
    title: 'Corporate WordPress Website',
    description: 'A custom WordPress website for a corporate client with custom theme development, plugins integration, and performance optimization.',
    imageUrl: '/images/projects/wordpress.svg',
    tags: ['WordPress', 'PHP', 'JavaScript', 'SCSS'],
    category: 'WordPress',
    demoUrl: 'https://corporate-website-demo.com',
    date: '2024-08-05',
    techStack: ['WordPress', 'PHP', 'JavaScript', 'SCSS', 'MySQL', 'ACF Pro', 'WooCommerce']
  },
  {
    id: '4',
    title: 'Task Management Dashboard',
    description: 'A comprehensive task management system with team collaboration, file sharing, and project analytics.',
    imageUrl: '/images/projects/taskmanager.svg',
    tags: ['React', 'Firebase', 'Material UI', 'Chart.js'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/username/task-manager',
    demoUrl: 'https://task-manager-demo.com',
    date: '2024-06-18',
    techStack: ['React', 'Firebase', 'Material UI', 'Chart.js', 'Node.js', 'Express']
  },
  {
    id: '5',
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with personalized recommendations.',
    imageUrl: '/images/projects/fitnessapp.svg',
    tags: ['Flutter', 'Firebase', 'Dart', 'Provider'],
    category: 'Mobile App',
    githubUrl: 'https://github.com/username/fitness-app',
    demoUrl: 'https://fitness-app-demo.com',
    date: '2024-04-10',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Provider State Management', 'RESTful APIs']
  },
  {
    id: '6',
    title: 'WordPress Plugin for E-learning',
    description: 'Custom WordPress plugin for creating and managing online courses with payment integration and user management.',
    imageUrl: '/images/projects/wordpressplugin.svg',
    tags: ['WordPress', 'PHP', 'JavaScript', 'WooCommerce'],
    category: 'WordPress',
    githubUrl: 'https://github.com/username/wp-elearning-plugin',
    demoUrl: 'https://wordpress-plugin-demo.com',
    date: '2024-02-22',
    techStack: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'WooCommerce', 'REST API']
  }
];

// Services data
export const services: Service[] = [
  {
    id: '1',
    title: 'Custom WordPress Solutions',
    description: 'Bespoke WordPress development that goes far beyond standard templates.',
    icon: 'wordpress',
    features: [
      'Custom Theme Development - Unique, responsive designs tailored to brand identity',
      'Advanced Plugin Development - Custom functionality and third-party integrations',
      'WordPress Optimization - Performance tuning, security hardening, and SEO optimization',
      'E-commerce Solutions - WooCommerce stores optimized for conversions',
      'Multisite Development - Complex WordPress network solutions',
      'Migration & Maintenance - Seamless transitions and ongoing support'
    ]
  },
  {
    id: '2',
    title: 'Full Stack Development',
    description: 'Complete web application development using modern technologies and industry best practices.',
    icon: 'code',
    features: [
      'Frontend Technologies - React, Vue.js, JavaScript (ES6+), HTML5, CSS3',
      'Backend Development - Node.js, PHP, Python, RESTful APIs',
      'Database Management - MySQL, PostgreSQL, MongoDB',
      'Cloud Integration - AWS, Google Cloud, deployment and hosting',
      'Mobile Development - React Native, Progressive Web Apps',
      'AI Integration - Machine learning and automation solutions'
    ]
  },
  {
    id: '3',
    title: 'Technical Consulting',
    description: 'Expert guidance and strategic consulting for your technical projects.',
    icon: 'briefcase',
    features: [
      'WordPress architecture and strategy consulting',
      'Code review and optimization',
      'Technical project management',
      'Developer mentoring and training',
      'Performance audits and recommendations',
      'Technology stack selection and implementation'
    ]
  }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'CEO',
    company: 'TechCorp Inc.',
    content: 'Working with this developer was a game-changer for our company. The web application they built exceeded our expectations in terms of functionality and design. Highly recommended!',
    avatarUrl: '/images/testimonials/john.jpg',
    rating: 5,
    date: '2024-11-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Growth Marketing',
    content: 'The mobile app developed for our company has significantly improved our customer engagement. The attention to detail and user experience design was exceptional.',
    avatarUrl: '/images/testimonials/sarah.jpg',
    rating: 5,
    date: '2024-09-22'
  },
  {
    id: '3',
    name: 'David Chen',
    role: 'Founder',
    company: 'StartupXYZ',
    content: 'Our WordPress website has never performed better. The custom theme and optimizations have resulted in faster load times and better SEO rankings. Excellent work!',
    avatarUrl: '/images/testimonials/david.jpg',
    rating: 4,
    date: '2024-08-10'
  }
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2025',
    excerpt: 'Exploring upcoming trends in web development including AI integration, immersive experiences, and performance optimization.',
    content: `# The Future of Web Development in 2025

Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging constantly. In this article, we'll explore some key trends that are shaping the future of web development in 2025.

## AI Integration

Artificial intelligence is becoming increasingly integrated into web applications, enabling:
- Personalized user experiences
- Intelligent content generation
- Automated testing and optimization
- Smart chatbots and virtual assistants
- Predictive analytics

## Immersive Experiences

With advancements in web technologies, we're seeing more immersive experiences:
- WebGL and Three.js for 3D graphics
- WebXR for virtual and augmented reality
- Web-based game development
- Interactive data visualizations
- Gesture-based interactions

## Performance Optimization

As applications become more complex, performance remains crucial:
- Code splitting and lazy loading
- Edge computing and CDN optimization
- Web Assembly for high-performance code
- Progressive Web Apps (PWAs)
- Automated performance monitoring

## Conclusion

The future of web development is exciting, with new possibilities emerging every day. Staying updated with these trends will be crucial for developers in 2025 and beyond.`,
    coverImage: '/images/blog/webdev2025.svg',
    date: '2024-12-01',
    author: 'Jane Developer',
    tags: ['Web Development', 'Trends', 'AI', 'Performance'],
    slug: 'future-web-development-2025'
  },
  {
    id: '2',
    title: 'Building Cross-Platform Mobile Apps: A Comprehensive Guide',
    excerpt: 'Learn about the best approaches for building mobile applications that work seamlessly across iOS and Android platforms.',
    content: `# Building Cross-Platform Mobile Apps: A Comprehensive Guide

Developing mobile applications that work across multiple platforms can significantly reduce development time and costs. Let's explore different approaches and best practices.

## React Native Development

React Native offers several advantages:
- JavaScript/TypeScript development
- Native performance
- Large ecosystem of libraries
- Hot reloading for faster development
- Extensive community support

## Flutter Development

Flutter provides unique benefits:
- Single codebase in Dart
- Custom widget system
- Excellent performance
- Beautiful animations
- Strong tooling support

## Best Practices

Consider these factors for success:
- Platform-specific design guidelines
- Performance optimization
- State management strategies
- Testing and quality assurance
- Deployment and distribution

## Conclusion

Choose the right framework based on your project needs and team expertise.`,
    coverImage: '/images/blog/crossplatform.svg',
    date: '2024-10-15',
    author: 'Jane Developer',
    tags: ['Mobile Development', 'React Native', 'Flutter', 'Cross-Platform'],
    slug: 'cross-platform-mobile-apps-guide'
  },
  {
    id: '3',
    title: 'WordPress Performance Optimization Techniques',
    excerpt: 'Discover practical tips and strategies to improve the performance and loading speed of your WordPress websites.',
    content: `# WordPress Performance Optimization Techniques

A fast-loading WordPress website is crucial for user experience and SEO. Here's how to optimize your WordPress site for maximum performance.

## Caching Implementation

Effective caching strategies:
- Page caching
- Object caching
- Browser caching
- CDN integration
- Database query caching

## Database Optimization

Keep your database clean and efficient:
- Regular cleanup of post revisions
- Optimize database tables
- Remove spam comments
- Clean up unused meta data
- Use efficient queries

## Asset Optimization

Optimize your site's assets:
- Image compression
- CSS/JS minification
- Lazy loading
- Font optimization
- Responsive images

## Hosting Considerations

Choose the right hosting solution:
- Managed WordPress hosting
- SSD storage
- PHP 8.x support
- Server-side caching
- Regular backups

## Conclusion

Implementing these optimization techniques will significantly improve your WordPress site's performance.`,
    coverImage: '/images/blog/wordpress-performance.svg',
    date: '2024-09-05',
    author: 'Jane Developer',
    tags: ['WordPress', 'Performance', 'Optimization', 'Speed'],
    slug: 'wordpress-performance-optimization'
  }
];

// Skills data
export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, icon: 'react', category: 'frontend' },
  { name: 'Next.js', level: 90, icon: 'nextjs', category: 'frontend' },
  { name: 'TypeScript', level: 85, icon: 'typescript', category: 'frontend' },
  { name: 'JavaScript', level: 95, icon: 'javascript', category: 'frontend' },
  { name: 'HTML/CSS', level: 90, icon: 'html', category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, icon: 'tailwind', category: 'frontend' },
  { name: 'Redux', level: 85, icon: 'redux', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 90, icon: 'nodejs', category: 'backend' },
  { name: 'Express', level: 85, icon: 'express', category: 'backend' },
  { name: 'MongoDB', level: 80, icon: 'mongodb', category: 'backend' },
  { name: 'PostgreSQL', level: 75, icon: 'postgresql', category: 'backend' },
  { name: 'Firebase', level: 85, icon: 'firebase', category: 'backend' },
  { name: 'GraphQL', level: 80, icon: 'graphql', category: 'backend' },
  
  // Mobile
  { name: 'React Native', level: 85, icon: 'reactnative', category: 'mobile' },
  { name: 'Flutter', level: 75, icon: 'flutter', category: 'mobile' },
  { name: 'Expo', level: 80, icon: 'expo', category: 'mobile' },
  
  // Other
  { name: 'WordPress', level: 90, icon: 'wordpress', category: 'other' },
  { name: 'PHP', level: 80, icon: 'php', category: 'other' },
  { name: 'Git', level: 90, icon: 'git', category: 'other' },
  { name: 'Docker', level: 75, icon: 'docker', category: 'other' },
  { name: 'AWS', level: 70, icon: 'aws', category: 'other' }
];

// Experience data
export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA (Remote)',
    startDate: '2023-05-01',
    current: true,
    description: [
      'Lead developer for client projects in fintech and e-commerce sectors',
      'Architect and develop full-stack applications using React, Node.js, and MongoDB',
      'Implemented CI/CD pipelines resulting in 40% faster deployment times',
      'Mentor junior developers and conduct code reviews'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'TypeScript']
  },
  {
    id: '2',
    title: 'Mobile App Developer',
    company: 'MobileFirst Solutions',
    location: 'Austin, TX',
    startDate: '2021-08-15',
    endDate: '2023-04-30',
    current: false,
    description: [
      'Developed cross-platform mobile applications using React Native',
      'Created a healthcare app that increased patient engagement by 35%',
      'Optimized app performance, reducing load time by 50%',
      'Collaborated with UI/UX designers to implement user-centered designs'
    ],
    skills: ['React Native', 'JavaScript', 'Firebase', 'Redux', 'REST APIs']
  },
  {
    id: '3',
    title: 'WordPress Developer',
    company: 'Digital Agency XYZ',
    location: 'Chicago, IL (Remote)',
    startDate: '2019-03-01',
    endDate: '2021-08-10',
    current: false,
    description: [
      'Developed custom WordPress themes and plugins for enterprise clients',
      'Created e-commerce solutions using WooCommerce with custom extensions',
      'Improved website performance and SEO, increasing organic traffic by 60%',
      'Maintained and updated 15+ client websites'
    ],
    skills: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'WooCommerce', 'SCSS']
  }
];

// Education data
export const education: Education[] = [
  {
    id: '1',
    degree: 'Master of Science',
    field: 'Computer Science',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    startDate: '2017-09-01',
    endDate: '2019-06-30',
    current: false,
    description: 'Specialized in Software Engineering and Artificial Intelligence'
  },
  {
    id: '2',
    degree: 'Bachelor of Science',
    field: 'Computer Engineering',
    institution: 'University of Michigan',
    location: 'Ann Arbor, MI',
    startDate: '2013-09-01',
    endDate: '2017-05-30',
    current: false,
    description: 'Graduated with Honors, Minor in Mathematics'
  }
];

// Social links
export const socialLinks: SocialLink[] = [
  {
    id: '1',
    name: 'GitHub',
    url: 'https://github.com/username',
    icon: 'github'
  },
  {
    id: '2',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/username',
    icon: 'linkedin'
  },
  {
    id: '3',
    name: 'Fiverr',
    url: 'https://www.fiverr.com/username',
    icon: 'fiverr'
  },
  {
    id: '4',
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/username',
    icon: 'upwork'
  }
];

// About me data
export const aboutMe = {
  name: 'Daniel Bankole Oriyomi',
  title: 'WordPress Expert & Full Stack Developer',
  bio: 'Passionate WordPress expert and full-stack developer who transforms complex ideas into powerful digital solutions. With years of experience and 100+ successful projects worldwide, I bring technical expertise and creative problem-solving to every challenge.',
  location: 'Lagos, Nigeria',
  email: 'info@solvatree.com',
  phone: '+234 (XXX) XXX-XXXX',
  availability: 'Open for freelance projects and collaborations',
  profileImage: '/images/profile/daniel-bankole-oriyomi.jpg',
  intro: "Hello! I'm Daniel, a dedicated WordPress expert and full-stack developer with a passion for creating exceptional digital experiences. My journey in web development has been driven by one core belief: technology should empower businesses to achieve their greatest potential.",
  longBio: "Over the years, I've had the privilege of working with over 100+ clients across the globe, ranging from individual entrepreneurs to large-scale enterprises. Each project has taught me something new and reinforced my commitment to delivering solutions that not only meet requirements but exceed expectations.\n\nAs the founder of SolvaTree, I've built a company that reflects my values of innovation, quality, and client success. However, this portfolio represents my personal work and individual expertise in the field of web development and WordPress specialization.\n\nMy approach combines technical precision with creative vision, ensuring that every website, application, or solution I build is both functionally robust and visually compelling. With years of proven expertise and 100+ completed projects, I bring extensive experience across diverse industries and project requirements."
};
