import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from './ui/InteractiveBackground';
import './performance.css';

// Define the structure for the prediction response from the API
interface PredictionResponse {
  prediction: string;
  survival_probability: number;
}

// A new component for the probability gauge
const SurvivalProbabilityGauge = ({ probability }: { probability: number | null }) => {
    const safeProbability = probability ?? 0;
    const circumference = 100 * Math.PI; // Circumference of a circle with radius 50
    const strokeDashoffset = circumference - (safeProbability / 100) * (circumference / 2);
    const needleRotation = safeProbability * 1.8 - 90; // Map 0-100% to -90 to 90 degrees

    return (
        <div className="relative w-64 h-32">
            <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Gauge Background Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#2D2D3A"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                {/* Gauge Filled Arc */}
                {probability !== null && (
                    <motion.path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    />
                )}
                <defs>
                    <linearGradient id="gaugeGradient">
                        <stop offset="0%" stopColor="#00B4BD" />
                        <stop offset="100%" stopColor="#00F6FF" />
                    </linearGradient>
                </defs>
                {/* Ticks */}
                <text x="20" y="85" fill="#8A8A93" fontSize="10" textAnchor="middle">0</text>
                <text x="60" y="30" fill="#8A8A93" fontSize="10" textAnchor="middle">25</text>
                <text x="100" y="15" fill="#8A8A93" fontSize="10" textAnchor="middle">50</text>
                <text x="140" y="30" fill="#8A8A93" fontSize="10" textAnchor="middle">75</text>
                <text x="180" y="85" fill="#8A8A93" fontSize="10" textAnchor="middle">100</text>

                {/* Needle */}
                {probability !== null && (
                    <motion.line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="30"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ rotate: -90, originX: '100px', originY: '100px' }}
                        animate={{ rotate: needleRotation, originX: '100px', originY: '100px' }}
                        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    />
                )}
                 {/* Center Circle */}
                <circle cx="100" cy="100" r="5" fill="#fff" />
            </svg>
            {/* Percentage Text */}
            <AnimatePresence>
            {probability !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
                >
                    <p className="text-3xl font-bold text-white">{(safeProbability).toFixed(0)}%</p>
                    <p className="text-sm text-text-muted">survival probability</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};


const TitanicPredictorPage: React.FC = () => {
  // State for form inputs
  const [pclass, setPclass] = useState(3);
  const [sex, setSex] = useState('female');
  const [age, setAge] = useState(29);
  const [fare, setFare] = useState(270);
  const [embarked, setEmbarked] = useState('S');
  const [familySize, setFamilySize] = useState(7);

  // State for API response and loading status
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    const passengerData = {
      Pclass: pclass,
      Sex: sex,
      Age: age,
      Fare: fare,
      Embarked: embarked,
      FamilySize: familySize, // Use the unified familySize state
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passengerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Network response was not ok');
      }

      const result: PredictionResponse = await response.json();
      setPredictionResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prediction. Please ensure the backend server is running correctly.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPassengerClassText = (pclass: number) => {
    if (pclass === 1) return 'First';
    if (pclass === 2) return 'Second';
    return 'Third';
  }

  return (
    <>
      <InteractiveBackground />
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-8 text-white font-sans">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] gap-8">
          
          {/* Column 1: Passenger Parameters */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-panel-dark backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6"
          >
            <h2 className="text-xl font-bold text-center text-white/90">Passenger Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                 <label className="block mb-2 text-sm font-medium text-text-muted">Age: {age} years</label>
                 <input type="range" min="1" max="100" value={age} onChange={(e) => setAge(Number(e.target.value))} />
              </div>
              <div>
                 <label className="block mb-2 text-sm font-medium text-text-muted">Fare: ${fare}</label>
                 <input type="range" min="0" max="512" value={fare} onChange={(e) => setFare(Number(e.target.value))} />
              </div>
              <div>
                 <label className="block mb-2 text-sm font-medium text-text-muted">Family Aboard: {familySize}</label>
                 <input type="range" min="1" max="11" value={familySize} onChange={(e) => setFamilySize(Number(e.target.value))} />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-text-muted">Passenger Class</label>
                <select value={pclass} onChange={(e) => setPclass(Number(e.target.value))} className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 focus:border-accent-teal focus:ring-accent-teal">
                  <option value={1}>First Class</option>
                  <option value={2}>Second Class</option>
                  <option value={3}>Third Class</option>
                </select>
              </div>
               <div>
                <label className="block mb-2 text-sm font-medium text-text-muted">Gender</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 focus:border-accent-teal focus:ring-accent-teal">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-text-muted">Port of Embarkation</label>
                <select value={embarked} onChange={(e) => setEmbarked(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 focus:border-accent-teal focus:ring-accent-teal">
                  <option value="S">Southampton</option>
                  <option value="C">Cherbourg</option>
                  <option value="Q">Queenstown</option>
                </select>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-accent-teal hover:bg-accent-teal-dark transition-colors text-black font-bold py-3 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed">
                {isLoading ? 'Predicting...' : 'Predict'}
              </button>
            </form>
          </motion.div>

          {/* Column 2: Prediction Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-between bg-panel-dark backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <div className='flex-grow flex items-center justify-center'>
                <AnimatePresence mode="wait">
                    {error && <motion.p key="error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="text-red-400">{error}</motion.p>}
                    {!predictionResult && !error && !isLoading && <motion.p key="awaiting" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="text-text-muted text-lg">Awaiting prediction...</motion.p>}
                    {isLoading && <motion.div key="loading" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="text-text-muted">Calculating...</motion.div>}
                    {predictionResult && (
                        <motion.div key="result" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} className="text-center">
                            <p className={`text-5xl font-bold ${predictionResult.prediction === 'Survived' ? 'text-green-400' : 'text-red-400'}`}>
                                {predictionResult.prediction}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-white/90 mb-4">Survival Probability</h3>
                <SurvivalProbabilityGauge probability={predictionResult ? predictionResult.survival_probability * 100 : null} />
            </div>
          </motion.div>

          {/* Column 3: Input Signature */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-panel-dark backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col"
          >
             <h2 className="text-xl font-bold text-center text-white/90 mb-6">Input Signature</h2>
             <div className="space-y-3 text-sm flex-grow">
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">AGE</span> <span className="font-semibold">{age} years</span></div>
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">FARE</span> <span className="font-semibold">${fare}</span></div>
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">KIN</span> <span className="font-semibold">{familySize} aboard</span></div>
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">CLASS</span> <span className="font-semibold">{getPassengerClassText(pclass)}</span></div>
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">SEX</span> <span className="font-semibold capitalize">{sex}</span></div>
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-md"><span className="text-text-muted">EMBARKED</span> <span className="font-semibold">{embarked === 'S' ? 'Southampton' : embarked === 'C' ? 'Cherbourg' : 'Queenstown'}</span></div>
             </div>
             <button className="w-full mt-6 bg-white/10 hover:bg-white/20 transition-colors text-white font-bold py-3 px-4 rounded-lg">Preview</button>
             <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                Data stream active
             </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default TitanicPredictorPage;