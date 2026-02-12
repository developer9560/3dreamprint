import type { Metadata } from 'next';
import ShopContent from './ShopContent';

export const metadata: Metadata = {
    title: "Shop Collection | Custom 3D Printed Photo Lamps & Gifts | 3DreamPrint",
    description: "Browse our collection of custom lithophane lamps, photo keychains, and heart-shaped glowing frames. The perfect personalized gift for any occasion. Handcrafted in India.",
    keywords: "personalized photo lamp online, buy lithophane lamp India, custom 3D printed gifts, heart photo light, custom keychain photo, photo frame gift ideas",
    openGraph: {
        title: "Shop Custom Lithophane Lamps & Personalized Gifts | 3DreamPrint",
        description: "Discover our full collection of glowing photo gifts. Handcrafted with precision 3D printing.",
        url: 'https://3dreamprint.in/users/shop',
        siteName: '3DreamPrint',
        images: [
            {
                url: 'https://3dreamprint.in/shop-og.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    alternates: {
        canonical: 'https://3dreamprint.in/users/shop',
    },
};

export default function Page() {
    return <ShopContent />;
}
