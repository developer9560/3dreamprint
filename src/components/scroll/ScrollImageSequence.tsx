'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollImageSequenceProps {
    totalFrames?: number;
    framePrefix?: string;
    frameExtension?: string;
    className?: string;
}

export default function ScrollImageSequence({
    totalFrames = 125,
    framePrefix = '/images/ezgif-frame-',
    frameExtension = '.png',
    className = '',
}: ScrollImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const requestRef = useRef<number | null>(null);

    // Preload all images
    useEffect(() => {
        const imageArray: HTMLImageElement[] = [];
        let loadedCount = 0;

        const imagePromises = Array.from({ length: totalFrames }, (_, i) => {
            return new Promise((resolve) => {
                const img = new Image();
                const frameNumber = String(i + 1).padStart(3, '0');
                img.src = `${framePrefix}${frameNumber}${frameExtension}`;

                img.onload = () => {
                    loadedCount++;
                    imageArray[i] = img;

                    // Update loading progress
                    if (loadedCount === totalFrames) {
                        setImages(imageArray);
                        setImagesLoaded(true);
                    }
                    resolve(img);
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${img.src}`);
                    resolve(null);
                };
            });
        });

        void Promise.all(imagePromises);

        return () => {
            // Cleanup
            imageArray.forEach(img => {
                if (img) img.src = '';
            });
        };
    }, [totalFrames, framePrefix, frameExtension]);

    // Handle scroll and render
    useEffect(() => {
        if (!imagesLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const render = () => {
            const scrollTop = window.scrollY;
            const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = Math.min(Math.max(scrollTop / maxScrollTop, 0), 1);

            // Map scroll position to frame index
            const frameIndex = Math.min(
                Math.floor(scrollFraction * (totalFrames - 1)),
                totalFrames - 1
            );

            const img = images[frameIndex];
            if (img && img.complete) {
                // Set canvas size to match window
                if (canvas.width !== window.innerWidth || canvas.height !== (window.innerHeight - 80)) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight - 80;
                }

                // Clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate dimensions to cover the canvas while maintaining aspect ratio
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    // Canvas is wider than image: fit width, crop height
                    // The image is too tall for the canvas, so we need to center it vertically
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2; // Center vertically
                } else {
                    // Canvas is taller than image: fit height, crop width
                    // The image is too wide for the canvas, so we need to center it horizontally
                    drawWidth = canvas.height * imgAspect;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2; // Center horizontally
                    offsetY = 0;
                }

                // Draw image
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const handleScroll = () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            requestRef.current = requestAnimationFrame(render);
        };

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - 80;
            }
            render();
        };

        // Initial render
        render();

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [images, imagesLoaded, totalFrames]);

    return (
        <>
            {/* Loading indicator */}
            {!imagesLoaded && (
                <div className="fixed inset-0 top-[80px] z-50 flex items-center justify-center bg-[var(--color-cream)]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[var(--color-amber)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-semibold text-[var(--color-text)]">
                            Loading Experience...
                        </p>
                    </div>
                </div>
            )}

            {/* Canvas for image sequence */}
            <canvas
                ref={canvasRef}
                className={`fixed left-0 w-full ${className}`}
                style={{ zIndex: 0, top: '80px', height: 'calc(100vh - 80px)' }}
            />
        </>
    );
}
