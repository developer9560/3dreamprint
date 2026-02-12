import type { Metadata, ResolvingMetadata } from 'next';
import ProductDetailContent from './ProductDetailContent';
import { productsAPI } from '@/src/lib/api';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    try {
        const product = await productsAPI.getBySlug(slug);

        if (!product) return { title: 'Product Not Found | 3DreamPrint' };

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `${product.name} | Custom 3D Printed Gift | 3DreamPrint`,
            description: product.summary || `Buy ${product.name} - a personalized 3D printed lithophane gift. Custom handcrafted quality, perfect for any occasion. Order now in India.`,
            openGraph: {
                title: product.name,
                description: product.summary,
                url: `https://3dreamprint.in/users/shop/${slug}`,
                images: product.images?.[0]?.imageUrl ? [product.images[0].imageUrl, ...previousImages] : previousImages,
            },
            keywords: `${product.name}, custom lithophane, 3d printed photo lamp, personalized gift India, ${product.name} price`,
        };
    } catch (error) {
        return { title: 'Product | 3DreamPrint' };
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    let product = null;
    try {
        product = await productsAPI.getBySlug(slug);
    } catch (e) { }

    const productSchema = product ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images?.map(img => img.imageUrl) || [],
        "description": product.summary || product.name,
        "brand": {
            "@type": "Brand",
            "name": "3DreamPrint"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://3dreamprint.in/users/shop/${slug}`,
            "priceCurrency": "INR",
            "price": product.skus?.[0]?.price || 0,
            "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    } : null;

    return (
        <>
            {productSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                />
            )}
            <ProductDetailContent params={params} />
        </>
    );
}
