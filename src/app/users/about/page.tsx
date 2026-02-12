import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
    title: "About 3DreamPrint | Premium 3D Printed Lithophane Art & Gifts",
    description: "Learn how 3DreamPrint turns memories into light. Our passion for 3D printing precision and handcrafted quality makes us India's favorite personalized gift studio.",
    keywords: "about 3dreamprint, personalized photo gifts India, 3d printed art, lithophane technology, handcrafted quality gifts, custom gift studio Mumbai",
    openGraph: {
        title: "About 3DreamPrint | Transforming Memories into Glowing Art",
        description: "Discover the story behind 3DreamPrint and our commitment to preserving your precious moments through 3D printed lithophanes.",
        url: 'https://3dreamprint.in/users/about',
        siteName: '3DreamPrint',
        images: [
            {
                url: 'https://3dreamprint.in/about-og.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    alternates: {
        canonical: 'https://3dreamprint.in/users/about',
    },
};

export default function Page() {
    return <AboutContent />;
}
