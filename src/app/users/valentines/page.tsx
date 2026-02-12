import type { Metadata } from 'next';
import ValentinesContent from './ValentinesContent';

export const metadata: Metadata = {
    title: "Valentine's Day Special Collection | Romantic Photo Gifts | 3DreamPrint",
    description: "Surprise your partner with a glowing 3D photo lamp. 20% OFF Valentine's Day special collection. Handcrafted, romantic, and personalized for your love story. Fast delivery in India.",
    keywords: "personalized valentine's day gifts India, romantic photo lamps, custom couple gifts, valentine's day collection 3dreamprint, glowing love lamps, heart photo frames",
    openGraph: {
        title: "Valentine's Day Special: Illuminated Love Gifts | 3DreamPrint",
        description: "Gift a memory that glows. Explore our limited edition Valentine's collection with 20% OFF.",
        url: 'https://3dreamprint.in/users/valentines',
        siteName: '3DreamPrint',
        images: [
            {
                url: 'https://3dreamprint.in/valentines-og.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    alternates: {
        canonical: 'https://3dreamprint.in/users/valentines',
    },
};

export default function Page() {
    return <ValentinesContent />;
}
