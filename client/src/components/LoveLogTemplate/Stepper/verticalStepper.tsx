import React, { useContext } from "react";
import { LoveLogTemplate } from "../../../../../types/LoveLogTypes";
import { LoveLogContext } from "../../LoveLog";

interface Answer {
    questionId: number;
    response: string;
}

interface FormData {
    answers: Answer[];
}

type VerticalStepperProps = {
    template: LoveLogTemplate;
    formData: FormData;
    step: number;
    selectedStep: number;
    handleStepClick: (step: number) => void;
};

const VerticalStepper: React.FC<VerticalStepperProps> = () => {
    const { template, formData, step, selectedStep, setStep, setSelectedStep } = useContext(LoveLogContext);

    const handleStepClickInternal = (stepNumber: number) => {
        setStep(stepNumber);
        setSelectedStep(stepNumber);
    };

    return (
      <div className="space-y-2">
          <h3 className="text-lg font-bold mb-5 mt-1">Fragen</h3>
          {template && template.Question.map((q, index) => {
              const isAnswered = formData.answers.some(answer => answer.questionId === q.id);
              return (
                <div
                  key={index}
                  className={`flex items-center p-1 text-sm font-semibold cursor-pointer ${step === index + 1 ? "text-blue-500" : "text-gray-500"}`}
                  onClick={() => handleStepClickInternal(index + 1)}
                >
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center ${isAnswered ? "bg-green-500 text-white" : "bg-blue-500 text-white"} ${selectedStep === index + 1 ? "font-bold" : ""}`}
                    >
                        {index + 1}
                    </div>
                    <span className="ml-2">{q.text_short}</span>
                </div>
              );
          })}
      </div>
    );
};

export default VerticalStepper;
