import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Projects - Alex Johnson Portfolio',
  description: 'Explore the portfolio of web development, mobile app, and WordPress projects by Alex Johnson.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
