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

const MultiStepForm2: FC = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({});
    const [selectedStep, setSelectedStep] = useState<number>(1);
    const [showMissingStepsModal, setShowMissingStepsModal] = useState<boolean>(false); // State for modal

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
            // Check for missing steps
            const missingSteps = questions_full.filter((_, index) => !formData[`step${index + 1}`]);

            if (missingSteps.length > 0) {
                // Show the missing steps modal
                setShowMissingStepsModal(true);
            } else {
                // Handle form submission here if all steps are complete
                console.log('Form Data:', formData);
            }
        }
    };

    const handleBack = () => {
        if (questions_full.length > 1 && step > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (value: string) => {
        // Update the data for the current step
        setFormData({
            ...formData,
            [`step${step}`]: value,
        });
    };

    const handleStepClick = (stepNumber: number) => {
        setStep(stepNumber);
        setSelectedStep(stepNumber); // Update the selected step
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Dashboard />
            <div className="flex-grow flex">
                <div className="w-72 p-4 bg-white shadow-md flex flex-col">


                    {/* Vertical Stepper */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold mb-5 mt-1 ">Fragen</h3>
                        {questions_short.map((q, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-1 text-sm font-semibold cursor-pointer ${
                                    step === index + 1 ? 'text-blue-500' : 'text-gray-500'
                                }`}
                                onClick={() => handleStepClick(index + 1)}
                            >
                                <div
                                    className={`w-6 h-6 rounded flex items-center justify-center ${
                                        formData[`step${index + 1}`] ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                                    } ${selectedStep === index + 1 ? 'font-bold' : ''}`}
                                >
                                    {index + 1}
                                </div>
                                <span className="ml-2">{q}</span>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex-grow" />
                    <div className="flex justify-between mt-auto">
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
                            className={`flex items-c2:05 PM
px-3 py-1 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded
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

                <div className="flex-grow p-4 bg-white rounded shadow-md overflow-auto">
                    {questions_full && (
                        <Step
                            label={questions_full[step - 1]}
                            value={formData[`step${step}`] || ''}
                            onChange={handleChange}
                            questionsHelp={questions_help}
                        />
                    )}
                </div>
            </div>

            {/* Missing Steps Modal */}
            {showMissingStepsModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    {/* Background backdrop */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg
                                                className="h-6 w-6 text-red-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            {/* Your existing text */}
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                                You missed some steps:
                                            </h3>
                                            <ul>
                                                {questions_full.map((_, index) => (
                                                    !formData[`step${index + 1}`] && (
                                                        <li key={index}>
                                                            <a
                                                                href={`#step${index + 1}`}
                                                                onClick={() => {
                                                                    setShowMissingStepsModal(false); // Close the modal
                                                                    handleStepClick(index + 1); // Navigate to the missing step
                                                                }}
                                                                className="text-blue-500 hover:underline cursor-pointer"
                                                            >
                                                                Step {index + 1}
                                                            </a>
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setShowMissingStepsModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setShowMissingStepsModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiStepForm2;
