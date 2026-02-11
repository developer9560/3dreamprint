'use client';

import React, { useState } from 'react';
import Button from '@/src/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle, faCropAlt, faRulerCombined, faLightbulb, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function CustomizationPanel() {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [shape, setShape] = useState('round');
    const [size, setSize] = useState('medium');
    const [light, setLight] = useState('warm');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Customize Your Piece</h3>
                <p className="text-sm text-gray-500">3 simple steps to perfection</p>

                {/* Progress Bar */}
                <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Step 1: Upload */}
                <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>1</div>
                        <h4 className="font-bold text-gray-700">Upload Photo</h4>
                    </div>

                    <label className={`block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'}`}>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        {file ? (
                            <div className="text-green-600">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-3xl mb-2" />
                                <p className="font-bold">{file.name}</p>
                                <p className="text-xs">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-gray-400">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl mb-2" />
                                <p className="font-medium text-gray-600">Click to Upload Image</p>
                                <p className="text-xs">Supports JPG, PNG</p>
                            </div>
                        )}
                    </label>
                </div>

                {/* Step 2: Shape */}
                <div className={`transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>2</div>
                        <h4 className="font-bold text-gray-700">Choose Shape</h4>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {['round', 'square', 'heart', 'hexa'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setShape(s)}
                                className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${shape === s ? 'border-amber-500 bg-amber-50 text-amber-600 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <FontAwesomeIcon icon={s === 'heart' ? faHeart : faCropAlt} className="text-xl" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 3: Size & Light */}
                <div className={`transition-all duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>3</div>
                        <h4 className="font-bold text-gray-700">Size & Light</h4>
                    </div>

                    <div className="space-y-4">
                        {/* Size */}
                        <div className="flex gap-2">
                            {['small', 'medium', 'large'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${size === s ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-500'}`}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Light */}
                        <div className="flex gap-2">
                            {['warm', 'white', 'multi'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLight(l)}
                                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${light === l ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-500'}`}
                                >
                                    {l.charAt(0).toUpperCase() + l.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100">
                    {step < 3 ? (
                        <Button
                            fullWidth
                            variant="primary"
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !file}
                            className={step === 1 && !file ? 'opacity-50 cursor-not-allowed' : ''}
                        >
                            Next Step
                        </Button>
                    ) : (
                        <Button fullWidth variant="primary" className="shadow-lg shadow-amber-500/20">
                            Add to Cart - ₹1,299
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Icon helper
import { faHeart } from '@fortawesome/free-solid-svg-icons';
