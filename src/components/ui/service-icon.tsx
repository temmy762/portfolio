'use client';

import React from 'react';
import { 
  FiCode, 
  FiSmartphone, 
  FiLayout, 
  FiDatabase, 
  FiSettings, 
  FiServer,
  FiGlobe,
  FiEdit,
  FiShoppingCart,
  FiPieChart,
  FiZap,
  FiLayers
} from 'react-icons/fi';

// Map of icon names to components
const iconComponents = {
  code: FiCode,
  smartphone: FiSmartphone,
  layout: FiLayout,
  database: FiDatabase,
  settings: FiSettings,
  server: FiServer,
  globe: FiGlobe,
  edit: FiEdit,
  shopping: FiShoppingCart,
  chart: FiPieChart,
  performance: FiZap,
  layers: FiLayers
};

type IconNameType = keyof typeof iconComponents;

interface ServiceIconProps {
  icon: string;
  className?: string;
  size?: number;
  ariaLabel?: string;
}

/**
 * A component to dynamically render service icons
 * Falls back to FiCode if the requested icon is not found
 */
export function ServiceIcon({ 
  icon, 
  className = '', 
  size = 24,
  ariaLabel 
}: ServiceIconProps) {
  // Check if the icon name exists in our map
  const iconName = icon as IconNameType;
  const IconComponent = iconComponents[iconName] || FiCode;

  return (
    <div 
      className={className} 
      aria-label={ariaLabel || `${iconName} icon`}
      role="img"
    >
      <IconComponent size={size} />
    </div>
  );
}
