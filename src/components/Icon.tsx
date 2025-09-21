import React from 'react';
import { LucideProps } from 'lucide-react';

// Create a dynamic icon loader to reduce bundle size
const iconCache = new Map<string, React.ComponentType<LucideProps>>();

export const Icon = React.memo(function Icon({ 
  name, 
  ...props 
}: { name: string } & LucideProps) {
  const [IconComponent, setIconComponent] = React.useState<React.ComponentType<LucideProps> | null>(null);

  React.useEffect(() => {
    if (iconCache.has(name)) {
      setIconComponent(iconCache.get(name)!);
      return;
    }

    // Dynamically import the icon
    import('lucide-react')
      .then((module) => {
        const IconComponent = (module as any)[name];
        if (IconComponent) {
          iconCache.set(name, IconComponent);
          setIconComponent(() => IconComponent);
        }
      })
      .catch(() => {
        console.warn(`Icon "${name}" not found`);
      });
  }, [name]);

  if (!IconComponent) {
    return <div className="w-4 h-4" />; // Placeholder
  }

  return <IconComponent {...props} />;
});
