
import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
            1
          </div>
          <span className="text-sm mt-1">Account</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-bcircle-blue' : 'bg-gray-300'}`}></div>
        
        <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
            2
          </div>
          <span className="text-sm mt-1">Business</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-bcircle-blue' : 'bg-gray-300'}`}></div>
        
        <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
            3
          </div>
          <span className="text-sm mt-1">Details</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
