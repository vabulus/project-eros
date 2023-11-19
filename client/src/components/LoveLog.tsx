import React, { useState, FC, useEffect } from "react";
import QuestionStep from "./LoveLogTemplate/Stepper/questionStep";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import Dashboard from "./dashboard";
import axios from "axios";

import VerticalStepper from "./LoveLogTemplate/Stepper/verticalStepper";
import {LoveLogTemplate} from "../../../types/LoveLogTypes";
import MissingStepsModal from "./LoveLogTemplate/Modals/MissingStepsModal";
import { useContext } from 'react';
import missingStepsModal from "./LoveLogTemplate/Modals/MissingStepsModal";


interface FormData {
  answers: Array<{ questionId: number; response: string }>;
}

interface AxiosResponse {
  response?: {
    status: number;
    data: any;
  };
  message: string;
}
interface LoveLogContextProps {
  template: LoveLogTemplate;
  step: number;
  selectedStep: number;
  formData: FormData;
  showMissingStepsModal: boolean;
  setStep: (step: number) => void;
  setSelectedStep: (selectedStep: number) => void;
  setFormData: (formData: FormData) => void;
  setShowMissingStepsModal: (showMissingStepsModal: boolean) => void;
  setTemplate: (template: LoveLogTemplate) => void;
}
export const LoveLogContext = React.createContext<LoveLogContextProps>({
  template: {
    id: 0,
    name: "",
    description: "",
    Question: []
  },
  step: 1,
  selectedStep: 1,
  formData: {
    answers: []
  },
  showMissingStepsModal: false,
  setStep: () => {},
  setSelectedStep: () => {},
  setFormData: () => {},
  setShowMissingStepsModal: () => {},
  setTemplate: () => {},
});
export const LoveLogProvider = ({ children } : {children : React.ReactNode}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>( {answers: []});
  const [template, setTemplate] = useState<LoveLogTemplate>();

  const [showMissingStepsModal, setShowMissingStepsModal] =
    useState<boolean>(false);

  return (
    <LoveLogContext.Provider
      value={{
        template : template!,
        step,
        selectedStep,
        formData,
        showMissingStepsModal,
        setStep,
        setSelectedStep,
        setFormData,
        setShowMissingStepsModal,
        setTemplate
      }}
    >
      {children}
    </LoveLogContext.Provider>
  );
};


function LoveLog () {
  const loveLogContext = useContext(LoveLogContext);

  const {
    step,
    selectedStep,
    formData,
    setStep,
    setSelectedStep,
    setFormData,
    setShowMissingStepsModal,
    showMissingStepsModal,
    template,
    setTemplate
  } = loveLogContext!;

  const handleSubmit = async () => {
    let response = undefined;
    const token = localStorage.getItem("token");

    const data = {
      "templateId": template?.id,
      "answers": formData.answers
    }

    try {
      response = await axios.post(
        "http://localhost:3001/api/lovelog",
        data,
        {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosResponse;
      if (axiosError.response) {
        alert(JSON.stringify(axiosError.response.data));

      } else {
        console.error("An unknown error occurred:", axiosError.message);
      }
    }
  };

  const handleNext = () => {
    if (template !== undefined) {
      if (step < template.Question.length) {
        setStep(step + 1);
      } else {
        // Check for missing steps
        const missingSteps = template.Question.filter(
          question => !formData.answers.some(answer => answer.questionId === question.id)
        );

        if (missingSteps.length > 0) {
          setShowMissingStepsModal(true);
        } else {
          handleSubmit();
        }
      }
    } else {
      alert('here');
    }
  };
  const handleBack = () => {
    if(template !== undefined){
      if (template.Question.length > 1 && step > 1) {
        setStep(step - 1);
      }
    }
    else {
      // implement a empty template
    }
  };
  const handleChange = (value: string) => {
    const currentQuestionId = template?.Question[step - 1]?.id;

    if (currentQuestionId !== undefined) {
      const newAnswers = formData.answers.filter(
        answer => answer.questionId !== currentQuestionId
      );
      newAnswers.push({ questionId: currentQuestionId, response: value });
      setFormData({ answers: newAnswers });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setStep(stepNumber);
    setSelectedStep(stepNumber);
  };

  // retrieve the template from the database
  useEffect(() => {
    const token = localStorage.getItem("token");

    const currentQuestionId = template?.Question[step - 1]?.id;
    const currentAnswer = formData.answers.find(answer => answer.questionId === currentQuestionId)?.response || "";

    const getLoveLogTemplate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/template/1",
          {
            params: {
              templateID: 1,
            },
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setTemplate(response.data);


      } catch (error) {
        const axiosError = error as AxiosResponse;
        if (axiosError.response) {
          alert(axiosError.response);
        } else {
          console.error("An unknown error occurred:", axiosError.message);
        }
      }
    };
    getLoveLogTemplate();
  }, []);

  const currentQuestionId = template?.Question[step - 1]?.id;
  const currentAnswer = formData.answers.find(answer => answer.questionId === currentQuestionId)?.response || "";



  return(
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Dashboard />
      <div className="flex-grow flex">
        <div className="w-72 p-4 bg-white shadow-md flex flex-col">

          {/* Vertical Stepper */}
          {template &&
              <VerticalStepper
                  template={template}
                  formData={formData}
                  step={step}
                  selectedStep={selectedStep}
                  handleStepClick={handleStepClick}
              />
          }

          {/* Navigation Buttons */}
          <div className="flex-grow" />
          <div className="flex justify-between mt-auto">
            <button
              className={`flex items-center px-3 py-1 text-sm font-semibold text-gray-600
              ${
                step === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              Back
            </button>
            <button
              className={`flex items-c2:05 PM
            px-3 py-1 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded
              ${
                step === template?.Question.length
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }`}

              onClick={handleNext}
            >
              {template && step < template.Question.length ? "Next" : "Submit"}
              {template && step < template.Question.length ? <ArrowRightIcon className="w-5 h-5 ml-1" /> : <CheckIcon className="w-5 h-5 ml-1" />}
            </button>
          </div>
        </div>

        <div className="flex-grow p-4 bg-white rounded shadow-md overflow-auto">
          {template && <QuestionStep
              label={template.Question[step - 1].text}
              value={currentAnswer}
              onChange={handleChange}
              questionsHelp={template.Question[step - 1].QuestionHelp}
          />}
        </div>
      </div>

      {showMissingStepsModal && template &&
          <MissingStepsModal
              template={template}
              setShowMissingStepsModal={setShowMissingStepsModal}
              formData={currentAnswer}
              handleStepClick={handleStepClick}
          />
      }
    </div>

  )
}

export default LoveLog;
