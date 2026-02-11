'use client';

// Customize Lithophane Page - Premium Redesign
import React, { useState, useEffect } from 'react';
import Button from '@/src/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCamera, faMagic, faCheckCircle, faChevronRight, faArrowRight, faExclamationCircle, faLightbulb, faCropAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

export default function CustomizePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedImageURL, setUploadedImageURL] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);

    // DEBUGGER: Watch for state changes to prove it works
    useEffect(() => {
        if (uploadedImageURL) {
            console.log("✅ STATE UPDATED: uploadedImageURL is now", uploadedImageURL);
            setOrderForm(prev => ({ ...prev, url: uploadedImageURL }));
            console.log("✅ STATE UPDATED: orderForm is now", orderForm);
        }
    }, [uploadedImageURL]);

    // Cloudinary Configuration
    const CLOUDINARY_CLOUD_NAME = 'dua86mtsl';
    const CLOUDINARY_UPLOAD_PRESET = 'frontend_3d'; // Assuming unsigned preset
    const FORMSUBMIT_URL = 'https://formsubmit.co/23ac29d3baf4f2cd48111ed7b360c3c0';

    const [uploading, setUploading] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        url: ''
    });
    const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const totalSteps = 5;

    const steps = [
        { number: 1, title: 'Upload Memory', icon: faCloudUploadAlt },
        { number: 2, title: 'Choose Style', icon: faMagic },
        { number: 3, title: 'Select Shape', icon: faCropAlt },
        { number: 4, title: 'Personalize', icon: faLightbulb },
        { number: 5, title: 'Review', icon: faCheckCircle },
    ];

    // Mock Data for Options
    const productTypes = [
        { id: 'lamp', name: 'Lithophane Lamp', price: 1299, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop', desc: 'Warm ambient glow for bedside tables' },
        { id: 'keychain', name: 'Photo Keychain', price: 399, image: 'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=300&h=300&fit=crop', desc: 'Carry your loved ones everywhere' },
        { id: 'frame', name: 'Photo Frame', price: 1599, image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=300&h=300&fit=crop', desc: 'Elegant display for your memories' },
    ];

    const shapes = [
        { id: 'round', name: 'Round', icon: '⭕' },
        { id: 'square', name: 'Square', icon: '⬜' },
        { id: 'heart', name: 'Heart', icon: '❤️' },
        { id: 'hexagon', name: 'Hexagon', icon: '⬡' },
    ];

    const sizes = [
        { id: 'small', name: 'Small', dimensions: '10x10 cm', price: 0 },
        { id: 'medium', name: 'Medium', dimensions: '15x15 cm', price: 200 },
        { id: 'large', name: 'Large', dimensions: '20x20 cm', price: 400 },
    ];

    const lightingOptions = [
        { id: 'warm', name: 'Warm White', price: 0, desc: 'Cozy, nostalgic glow' },
        { id: 'cool', name: 'Cool White', price: 0, desc: 'Bright, modern look' },
        { id: 'multi', name: 'Multi-Color', price: 250, desc: 'RGB with remote control' },
    ];

    // Handle Cloudinary Upload with Progress
    const uploadToCloudinary = (file: File) => {
        setUploading(true);
        setUploadProgress(0);

        // 1. Immediate Local Preview
        const objectUrl = URL.createObjectURL(file);
        setUploadedImageURL(objectUrl);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        // 2. XMLHttpRequest for Progress Tracking
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percent);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const url = data.secure_url;

                setUploadedImageURL(url);

                // Update order form directly to be safe
                setOrderForm(prev => ({ ...prev, url: url }));

                console.log('Upload success. Link ready:', url);
                setUploading(false);
            }

            else {
                console.error('Upload failed:', xhr.responseText);
                alert('Image upload failed. Please try again.');

                setUploading(false);
            }
        };

        xhr.onerror = () => {
            console.error('Upload error');
            alert('Error uploading image.');

            setUploading(false);
        };

        xhr.send(formData);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadToCloudinary(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            uploadToCloudinary(file);
        }
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOrderStatus('submitting');

        // USE URLSearchParams: This is the secret to making it work with the image URL!
        const formData = new URLSearchParams();

        formData.append('product', 'Lithophane Lamp');
        formData.append('shape', 'Round');
        formData.append('size', 'Medium');
        formData.append('lighting', 'Lighting');
        formData.append('total_price', '1299');
        formData.append('url', orderForm.url);
        formData.append('name', orderForm.name);
        formData.append('email', orderForm.email);
        formData.append('phone', orderForm.phone);
        formData.append('address', orderForm.address);
        formData.append('message', orderForm.message);

        // FormSubmit Config
        formData.append('_subject', `New Lithophane Order from ${orderForm.name}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        try {
            await fetch('https://formsubmit.co/23ac29d3baf4f2cd48111ed7b360c3c0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });
            setOrderStatus('success');
        } catch (error) {
            console.error('Order submission error:', error);
            setOrderStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#FFF8E1]/30 to-[#FAFAFA] pb-32 relative overflow-hidden">
            {/* Background Particles (Animated via CSS) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="container max-w-5xl mx-auto relative z-10 pt-12 px-4">
                {/* Emotional Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 font-[family-name:var(--font-heading)] leading-tight">
                        Turn Your Memory <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Into Light</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto font-medium">
                        Your photo will be transformed into a glowing 3D artwork. Let's create something magical.
                    </p>
                </div>

                {/* Progress Timeline */}
                <div className="mb-16 relative px-4 md:px-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    />
                    <div className="flex justify-between relative z-10">
                        {steps.map((step) => (
                            <div key={step.number} className="flex flex-col items-center group">
                                <div
                                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-xl transition-all duration-500 mb-3 shadow-lg ${step.number <= currentStep
                                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white scale-110 shadow-amber-500/30'
                                        : 'bg-white text-gray-300 border-2 border-gray-100'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={step.icon} />
                                </div>
                                <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 ${step.number <= currentStep ? 'text-amber-600' : 'text-gray-400'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/50 overflow-hidden min-h-[500px] mb-8 animate-fadeIn">

                    {/* Step 1: Upload Hero */}
                    {currentStep === 1 && (
                        <div className="p-8 md:p-16 text-center">
                            {!uploadedImageURL ? (
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    className={`border-3 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer relative group ${isDragging
                                        ? 'border-amber-500 bg-amber-50 scale-[1.02]'
                                        : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50/30'
                                        }`}
                                >
                                    {/* Glowing Pulse Effect Behind Icon */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                            <FontAwesomeIcon icon={faCloudUploadAlt} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-3">
                                            Upload Your Photo
                                        </h2>
                                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                            Drag & drop your favorite memory here, or click to browse. We support high-quality JPG & PNG.
                                        </p>
                                        <label className="inline-block">
                                            <span className="bg-amber-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2">
                                                <FontAwesomeIcon icon={faImage} />
                                                Select Photo
                                            </span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center animate-fadeIn">
                                    <div className="relative group mb-8">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                                        <div className="relative w-full max-w-md bg-black/5 rounded-xl overflow-hidden aspect-[4/3]">
                                            <img src={uploadedImageURL} alt="Uploaded" className={`w-full h-full object-cover transition-all ${uploading ? 'blur-sm opacity-80' : ''}`} />

                                            {uploading && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                                                    <div className="w-48 h-2 bg-gray-200/50 rounded-full overflow-hidden mb-2">
                                                        <div
                                                            className="h-full bg-amber-500 transition-all duration-300 ease-out"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-white font-bold text-sm drop-shadow-md">Uploading... {uploadProgress}%</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => setUploadedImageURL("")}
                                            className="absolute top-4 right-4 bg-white/90 text-red-500 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-white transition-all text-sm z-20"
                                            disabled={uploading}
                                        >
                                            Change Photo
                                        </button>
                                    </div>
                                    {!uploading && (
                                        <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-2 rounded-full mb-6 animate-bounce-short">
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                            Photo Uploaded Successfully
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Smart Guidance Cards */}
                            <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
                                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 hover:border-blue-300 transition-colors">
                                    <div className="text-blue-500 text-2xl mb-3"><FontAwesomeIcon icon={faLightbulb} /></div>
                                    <h4 className="font-bold text-gray-800 mb-2">High Contrast</h4>
                                    <p className="text-sm text-gray-600">Photos with good light and dark areas create the most detailed 3D effect.</p>
                                </div>
                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 hover:border-purple-300 transition-colors">
                                    <div className="text-purple-500 text-2xl mb-3"><FontAwesomeIcon icon={faCamera} /></div>
                                    <h4 className="font-bold text-gray-800 mb-2">Clear Subjects</h4>
                                    <p className="text-sm text-gray-600">Close-ups of faces, pets, or logos work better than far-away group shots.</p>
                                </div>
                                <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 hover:border-green-300 transition-colors">
                                    <div className="text-green-500 text-2xl mb-3"><FontAwesomeIcon icon={faCheckCircle} /></div>
                                    <h4 className="font-bold text-gray-800 mb-2">High Resolution</h4>
                                    <p className="text-sm text-gray-600">Original quality photos ensure your lithophane looks sharp and crisp.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Choose Product */}
                    {currentStep === 2 && (
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-center mb-2">Choose Your Canvas</h2>
                            <p className="text-gray-500 text-center mb-12">Select the perfect way to display your memory</p>
                            <div className="grid md:grid-cols-3 gap-8">
                                {productTypes.map((product) => (
                                    <div key={product.id} className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end justify-center pb-6">
                                                <span className="text-white font-bold tracking-wide">Select This Style</span>
                                            </div>
                                            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                                        </div>
                                        <h3 className="text-xl font-bold text-center group-hover:text-amber-500 transition-colors">{product.name}</h3>
                                        <p className="text-sm text-gray-500 text-center mb-2">{product.desc}</p>
                                        <p className="text-lg font-bold text-center text-amber-600">₹{product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Select Shape */}
                    {currentStep === 3 && (
                        <div className="p-8 md:p-12 text-center animate-fadeIn">
                            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Select a Shape</h2>
                            <p className="text-gray-500 mb-10">Choose the form that best frames your memory</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {shapes.map((shape) => (
                                    <button
                                        key={shape.id}
                                        className="group relative p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0">
                                            {shape.icon}
                                        </div>
                                        <h3 className="font-bold text-gray-700 group-hover:text-amber-600 transition-colors">{shape.name}</h3>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-400 transform scale-x-0 group-hover:scale-x-50 transition-transform duration-300" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Size & Lighting */}
                    {currentStep === 4 && (
                        <div className="p-8 md:p-12 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-center mb-10">Personalize Details</h2>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Size Selection */}
                                <div>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">1</span>
                                        Choose Size
                                    </h3>
                                    <div className="space-y-4">
                                        {sizes.map((size) => (
                                            <button
                                                key={size.id}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all text-left group relative overflow-hidden"
                                            >
                                                <div className="relative z-10 flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{size.name}</h4>
                                                        <p className="text-sm text-gray-500">{size.dimensions}</p>
                                                    </div>
                                                    <span className="font-bold text-amber-600">
                                                        {size.price > 0 ? `+₹${size.price}` : 'Included'}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Lighting Selection */}
                                <div>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">2</span>
                                        Select Lighting
                                    </h3>
                                    <div className="space-y-4">
                                        {lightingOptions.map((light) => (
                                            <button
                                                key={light.id}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all text-left group relative overflow-hidden"
                                            >
                                                <div className="relative z-10 flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{light.name}</h4>
                                                        <p className="text-sm text-gray-500">{light.desc}</p>
                                                    </div>
                                                    <span className="font-bold text-amber-600">
                                                        {light.price > 0 ? `+₹${light.price}` : 'Free'}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Review & Order (Updated with Form) */}
                    {currentStep === 5 && (
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-center mb-8">Finalize Your Order</h2>

                            {orderStatus === 'success' ? (
                                <div className="text-center py-12 animate-fadeIn">
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-5xl">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h3>
                                    <p className="text-gray-600 mb-8">Thank you, {orderForm.name}. We have received your order and image. Check your email for confirmation.</p>
                                    <Button variant="primary" onClick={() => window.location.href = '/'}>Return Home</Button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-12">
                                    {/* Order Preview */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold border-b pb-2">Your Creation</h3>
                                        <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                                            {uploadedImageURL ? (
                                                <img src={uploadedImageURL} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-gray-400">No Image Selected</span>
                                            )}
                                            {uploading && (
                                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-amber-50 p-6 rounded-xl space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Product:</span>
                                                <span className="font-bold">Lithophane Lamp</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shape:</span>
                                                <span className="font-bold">Round</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                                                <span>Total:</span>
                                                <span className="text-amber-600">₹1,299</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Form */}
                                    <div>
                                        <h3 className="text-xl font-bold border-b pb-2 mb-6">Shipping Details</h3>
                                        <form onSubmit={handleOrderSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="John Doe"
                                                    value={orderForm.name}
                                                    onChange={e => setOrderForm({ ...orderForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="john@example.com"
                                                    value={orderForm.email}
                                                    onChange={e => setOrderForm({ ...orderForm, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="+91 98765 43210"
                                                    value={orderForm.phone}
                                                    onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })}
                                                />
                                            </div>
                                            {/* <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="+91 98765 43210"
                                                    disabled
                                                    value={uploadedImageURL || ''}
                                                // onChange={e => setOrderForm({ ...orderForm, url: uploadedImageURL })}
                                                />
                                            </div> */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Shipping Address</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="Full address with pincode"
                                                    value={orderForm.address}
                                                    onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Special Instructions (Optional)</label>
                                                <textarea
                                                    rows={2}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                                                    placeholder="Gift message, delivery instructions..."
                                                    value={orderForm.message}
                                                    onChange={e => setOrderForm({ ...orderForm, message: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={orderStatus === 'submitting' || !uploadedImageURL}
                                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all mt-6 disabled:opacity-50 disabled:scale-100"
                                            >
                                                {orderStatus === 'submitting' ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Processing...
                                                    </span>
                                                ) : (
                                                    'Place Order Now'
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Navigation - HIDE on Step 5 (handled by form) */}
            {currentStep < 5 && (
                <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="container max-w-5xl flex justify-between items-center">
                        <button
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            disabled={currentStep === 1}
                            className={`text-gray-500 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            Back
                        </button>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                                disabled={(currentStep === 1 && !uploadedImageURL)} // Requires image on step 1
                                className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:scale-100 disabled:shadow-none`}
                            >
                                {currentStep === 1 ? 'Bring My Memory to Life' : 'Continue'}
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
