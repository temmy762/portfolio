import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { generateMetadata, generatePersonSchema, generateWebsiteSchema } from "@/lib/metadata";
import Analytics from "@/components/analytics";
import AccessibilityFeatures from "@/components/accessibility-features";
import { ServerCriticalCSS } from "@/components/ui/critical-css";
import { DynamicCriticalCSS } from "@/components/ui/dynamic-critical-css";
import { PerformanceDisplay } from "@/components/ui/performance-display";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for better SEO
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Critical CSS for above-the-fold content */}
        <ServerCriticalCSS route="/" minify={true} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMonoVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AuthProvider>
            <AccessibilityFeatures />
            <DynamicCriticalCSS />
            <Header />
            <main id="main-content" className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
            
            {/* Performance monitoring in development */}
            {process.env.NODE_ENV === 'development' && (
              <PerformanceDisplay showInDev={true} logMetrics={true} />
            )}
          </AuthProvider>
        </ThemeProvider>
        
        {/* Add Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}
