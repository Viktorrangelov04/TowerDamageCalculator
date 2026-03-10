import { useState } from 'react';
import { X, Info } from 'lucide-react'; 

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative w-full">
      {/* The Banner */}
      {isVisible ? (
        <div className="bg-amber-50 border-b border-amber-200 p-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-start justify-between">
            <div className="flex gap-3">
              {/* <Info className="h-5 w-5 text-amber-600 mt-0.5" /> */}
              <div className="text-sm text-amber-800">
                <span className="font-bold">App still in development. If you find any issues message @vics80_ in Discord.</span> 
                There are no upgrade costs just damage comparison from different upgrades. For upgrade costs you can check out 
                <a href="https://thetower.tools/" className="text-blue-400 hover:underline"> thetower.tools</a>
                
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-amber-500 hover:text-amber-700 p-1"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed top-4 right-4 bg-white shadow-md border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all z-50 flex items-center gap-2 text-xs font-medium text-gray-600"
        >
          <Info className="h-4 w-4" />
          Show Info
        </button>
      )}
    </div>
  );
};

export default DisclaimerBanner;