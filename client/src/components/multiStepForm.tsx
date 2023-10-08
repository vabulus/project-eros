import React, { useState, FC } from 'react';
import Step from '../components/step';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon
} from "@heroicons/react/20/solid";
import Dashboard from "./dashboard";

interface FormData {
    [key: string]: string;
}

const MultiStepForm: FC = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({});

    const questions_short = [
        "Auslöser",
        "Gefühle",
        "Wünsche",
        "Wünsche vom Anderen",
        "Lerneffekt",
        "Vermeidung"
    ];
    const questions_full = [
        "Was war der Auslöser für den Streit?",
        "Wie habe ich mich während des Streits gefühlt?",
        "Was wünsche ich mir von der anderen Person?",
        "Was denke ich, dass die andere Person sich von mir wünscht?",
        "Was konnte ich aus dem Streit lernen?",
        "Was könnten wir in Zukunft tun, um solche Streits zu vermeiden?"
    ];

    const questions_help = [
        "Missverständnisse",
        "Eifersucht",
        "Finanzielle Probleme",
        "Unterschiedliche Meinungen",
        "Mangelnde Kommunikation",
        "Kulturelle Unterschiede",
        "Vergangene Verletzungen",
        "Unausgesprochene Erwartungen",
        "Unterschiedliche Werte und Prioritäten",
        "Mangelnder Respekt"
    ];

    const handleNext = () => {
        if (step < questions_full.length) {
            setStep(step + 1);
        } else {
            console.log('Form Data:', formData);
            // Handle form submission here
        }
    };

    const handleBack = () => {
        if (questions_full.length > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (value: string) => {
        setFormData({
            ...formData,
            [`step${step}`]: value,
        });
    };

    const handleStepClick = (stepNumber: number) => {
        setStep(stepNumber);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Dashboard />

            <div className="flex-grow p-4 bg-white rounded shadow-md">
                {/* Vertical Stepper */}
                <div className="flex items-center space-x-2 mb-4">
                    {questions_short.map((q, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                ${step === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
                            onClick={() => handleStepClick(index + 1)}
                        >
                            {index + 1}
                        </div>
                    ))}
                    <div className="text-sm font-semibold">{questions_short[step - 1]}</div>
                </div>

                {/* Form Section */}
                {questions_full && (
                    <Step
                        label={questions_full[step - 1]}
                        value={formData[`step${step}`]}
                        onChange={handleChange}
                        questionsHelp={questions_help}
                    />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className={`flex items-center px-3 py-1 text-sm font-semibold text-gray-600
              ${step === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={handleBack}
                        disabled={step === 1}
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back
                    </button>
                    <button
                        className={`flex items-center px-3 py-1 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded
              ${step === questions_full.length ? 'bg-green-500 hover:bg-green-600' : ''}`}
                        onClick={handleNext}
                    >
                        {step < questions_full.length ? 'Next' : 'Submit'}
                        {step < questions_full.length ? (
                            <ArrowRightIcon className="w-5 h-5 ml-1" />
                        ) : (
                            <CheckIcon className="w-5 h-5 ml-1" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
