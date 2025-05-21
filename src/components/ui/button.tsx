"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(  (
    {
      className,
      variant = "default",
      size = "md",
      href,
      isExternal = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700",
      outline:
        "border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950",
      ghost:
        "bg-transparent text-green-600 hover:bg-green-50 dark:text-green-500 dark:hover:bg-green-950",
      link: "bg-transparent text-green-600 underline-offset-4 hover:underline dark:text-green-500",
    };

    const sizes = {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );    if (href) {
      const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = isExternal
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `${props['aria-label'] || children?.toString()} (opens in new tab)`,
          }
        : {};

      return isExternal ? (
        <a
          href={href}
          className={buttonClasses}
          {...linkProps}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={buttonClasses} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <button 
        ref={ref} 
        className={buttonClasses} 
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
