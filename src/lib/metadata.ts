// Metadata configuration for SEO optimization
import { aboutMe } from "./data/portfolio-data";
import { Metadata } from "next";

export type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alex-johnson-portfolio.com";

// Default metadata values
const defaultMetadata = {
  title: `${aboutMe.name} | ${aboutMe.title}`,
  description: aboutMe.bio.substring(0, 155) + "...",
  keywords: "full stack developer, web developer, react developer, node.js, nextjs, mobile app developer, wordpress developer",
  ogImage: `${BASE_URL}/images/og-image.jpg`,
};

/**
 * Generate metadata for a page
 * @param props Metadata properties to override defaults
 * @returns Metadata object for Next.js
 */
export function generateMetadata(props?: MetadataProps): Metadata {
  const {
    title = defaultMetadata.title,
    description = defaultMetadata.description,
    keywords = defaultMetadata.keywords,
    ogImage = defaultMetadata.ogImage,
    noIndex = false,
    canonical,
  } = props || {};

  const pageTitle = title === defaultMetadata.title 
    ? title 
    : `${title} | ${aboutMe.name}`;

  return {
    title: pageTitle,
    description,
    keywords,
    // Robots meta tags
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
    },
    // Open Graph metadata
    openGraph: {
      title: pageTitle,
      description,
      url: canonical || BASE_URL,
      siteName: `${aboutMe.name} Portfolio`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
    // Canonical URL
    alternates: {
      canonical: canonical || BASE_URL,
    },
    // Additional metadata
    authors: [{ name: aboutMe.name }],
    creator: aboutMe.name,
    publisher: aboutMe.name,
  };
}

/**
 * Generate structured data for a person (for Rich Results)
 * @returns JSON-LD structured data
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: aboutMe.name,
    jobTitle: aboutMe.title,
    description: aboutMe.bio,
    email: aboutMe.email,
    telephone: aboutMe.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: aboutMe.location,
    },
    url: BASE_URL,
    sameAs: [
      // Add your social profiles here
      "https://github.com/username",
      "https://linkedin.com/in/username",
    ],
  };
}

/**
 * Generate structured data for a portfolio website
 * @returns JSON-LD structured data
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${aboutMe.name} | Portfolio`,
    url: BASE_URL,
    description: defaultMetadata.description,
    author: {
      "@type": "Person",
      name: aboutMe.name,
    },
  };
}
