import { MetadataRoute } from 'next';
import { productsAPI } from '@/src/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://3dreamprint.in';

    // Static routes
    const routes = [
        '',
        '/users/about',
        '/users/shop',
        '/users/valentines',
        '/users/customize',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic product routes
    try {
        const productsRes = await productsAPI.getAll({ page: 0, limit: 100 }); // Adjust size if needed
        const productRoutes = (productsRes.content || []).map((product) => ({
            url: `${baseUrl}/users/shop/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...routes, ...productRoutes];
    } catch (error) {
        console.error('Error generating product sitemap:', error);
        return routes;
    }
}
