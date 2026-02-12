import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/auth/',
                '/user/profile/',
                '/cart',
                '/checkout',
                '/api/',
            ],
        },
        sitemap: 'https://3dreamprint.in/sitemap.xml',
    };
}
