export interface SEOMetaTags {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  canonicalUrl: string;
}

export const generateSEOMetaTags = (): SEOMetaTags => {
  const baseUrl = import.meta.env.PROD 
    ? 'https://saboresdecuba.com' 
    : 'http://localhost:5173';

  return {
    title: 'Sabores de Cuba - Restaurante Auténtico Cubano',
    description: 'Restaurante cubano auténtico con sabores tradicionales, música en vivo y ambiente familiar. Disfruta de nuestra cocina cubana tradicional.',
    keywords: 'restaurante cubano, comida cubana, mojito, ropa vieja, flan de coco, música cubana, La Habana, comida tradicional, sabor auténtico',
    author: 'Sabores de Cuba',
    ogTitle: 'Sabores de Cuba - Experiencia Culinaria Cubana Auténtica',
    ogDescription: 'Disfruta de los auténticos sabores cubanos en un ambiente familiar con música tradicional y recetas transmitidas por generaciones.',
    ogImage: `${baseUrl}/og-image.jpg`,
    ogUrl: baseUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonicalUrl: baseUrl
  };
};

export const generateStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Sabores de Cuba",
  "description": "Restaurante auténtico cubano con recetas tradicionales, música en vivo y ambiente familiar.",
  "image": "https://saboresdecuba.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Cubana 123",
    "addressLocality": "Ciudad",
    "addressRegion": "Provincia",
    "postalCode": "12345",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.416775,
    "longitude": -3.703790
  },
  "openingHours": [
    "Mo-Th 11:00-22:00",
    "Fr-Su 11:00-00:00"
  ],
  "telephone": "+1-555-123-4567",
  "servesCuisine": "Cuban",
  "priceRange": "$$",
  "menu": "https://saboresdecuba.com/menu.pdf",
  "acceptsReservations": true,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156"
  }
});

export const generateBreadcrumbList = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://saboresdecuba.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Menú",
      "item": "https://saboresdecuba.com#menu"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Especialidades",
      "item": "https://saboresdecuba.com#especialidades"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Experiencias",
      "item": "https://saboresdecuba.com#experiencia"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Contacto",
      "item": "https://saboresdecuba.com#contact"
    }
  ]
});

export const setMetaTags = (customTags?: Partial<SEOMetaTags>) => {
  const tags = { ...generateSEOMetaTags(), ...customTags };
  
  // Actualizar meta tags dinámicamente
  if (typeof document !== 'undefined') {
    document.title = tags.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', tags.description);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', tags.keywords);
    
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) metaAuthor.setAttribute('content', tags.author);
    
    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', tags.ogTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', tags.ogDescription);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', tags.ogImage);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', tags.ogUrl);
    
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', tags.ogType);
    
    // Twitter
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) twitterCard.setAttribute('content', tags.twitterCard);
    
    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', tags.canonicalUrl);
  }
  
  return tags;
};
