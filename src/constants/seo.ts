export const SEO_CONFIG = {
  title: 'Sabores de Cuba - Restaurante Auténtico Cubano',
  description: 'Restaurante cubano auténtico con sabores tradicionales, música en vivo y ambiente familiar. Disfruta de nuestra cocina cubana tradicional.',
  keywords: 'restaurante cubano, comida cubana, mojito, ropa vieja, flan de coco, música cubana, La Habana',
  author: 'Sabores de Cuba',
  ogImage: '/og-image.jpg',
  siteUrl: 'https://saboresdecuba.com',
  twitterHandle: '@saboresdecuba',
  locale: 'es_ES',
  type: 'website'
};

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Sabores de Cuba",
  "description": "Restaurante auténtico cubano",
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
  "telephone": "+15551234567",
  "servesCuisine": "Cuban",
  "priceRange": "$$",
  "image": "https://saboresdecuba.com/og-image.jpg"
};
