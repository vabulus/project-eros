import React, { FC, ChangeEvent } from 'react';

interface StepProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    questionsHelp: string[];
}

const Step: FC<StepProps> = ({ label, value, onChange, questionsHelp }) => {

    const handleButtonClick = (buttonValue: string) => {
        const newValue = value ? `${value}, ${buttonValue}` : buttonValue;
        onChange(newValue);
    };

    return (
        <div>
            <h3 className="text-3xl font-bold mb-5">{label}</h3>
            <textarea
                value={value}
                placeholder={"Write your text here..."}
                rows={5}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            />
            <div className="mb-2">
                {questionsHelp.map((question, index) => (
                    <button
                        key={index}
                        className="text-sm px-2 py-1 mr-1 border rounded-md p-5 m-1"
                        onClick={() => handleButtonClick(question)}
                    >
                        {question}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Step;
