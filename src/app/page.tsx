import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: "Custom Lithophane Lamps & 3D Printed Personalized Photo Gifts | 3DreamPrint",
  description: "Transform your photos into glowing 3D art. Shop custom lithophane lamps, photo keychains & frames. Personalized handcrafted gifts for anniversaries & weddings in India.",
  keywords: "lithophane lamp, custom photo lamp, 3D printed gifts India, personalized photo gift, heart lithophane lamp, photo keychain India, wedding gift ideas, anniversary gift",
  openGraph: {
    title: "Custom Lithophane Lamps & 3D Printed Photo Gifts | 3DreamPrint",
    description: "Transform your photos into glowing 3D art. Unique handcrafted gifts for your loved ones.",
    url: 'https://3dreamprint.in',
    siteName: '3DreamPrint',
    images: [
      {
        url: 'https://3dreamprint.in/og-image.jpg', // Placeholder, update if real OG exists
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://3dreamprint.in',
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "3DreamPrint",
    "image": "https://3dreamprint.in/logo.png",
    "@id": "https://3dreamprint.in",
    "url": "https://3dreamprint.in",
    "telephone": "+91-XXXXXXXXXX", // Update with real phone if available
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Mumbai",
      "postalCode": "",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://www.facebook.com/3dreamprint",
      "https://www.instagram.com/3dreamprint"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "3DreamPrint",
    "url": "https://3dreamprint.in",
    "logo": "https://3dreamprint.in/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomeContent />
    </>
  );
}
