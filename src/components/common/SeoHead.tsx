import React, { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  schemaData?: object;
}

export const SeoHead: React.FC<SeoProps> = ({ title, description, schemaData }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Hamra Annaba Échecs`;
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    if (schemaData) {
      let script = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }
  }, [title, description, schemaData]);

  return null;
};
