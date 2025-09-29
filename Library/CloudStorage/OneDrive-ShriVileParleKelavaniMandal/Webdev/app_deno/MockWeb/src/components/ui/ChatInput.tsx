import React, { useState, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import { useNavigate } from 'react-router-dom';

const placeholderStrings = [
  "Enter your thought here...",
  "Chat with us here...",
  "Question Me...",
];

const ChatInput: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const shouldShow = useScrollVisibility(100);

  // Placeholder typing animation effect
  useEffect(() => {
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentString = placeholderStrings[currentStringIndex];
      
      if (isDeleting) {
        setPlaceholder(currentString.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setPlaceholder(currentString.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentString.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, 2000); // Pause before deleting
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % placeholderStrings.length;
        timeoutId = setTimeout(type, 500); // Pause before typing next string
      } else {
        timeoutId = setTimeout(type, isDeleting ? 75 : 150);
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, []);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Navigate to the predictor page on submit
      navigate('/titanic-predictor');
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className="w-full max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-4 w-full px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-chat hover:shadow-navbar-glow transition-all duration-500 ease-in-out"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-neutral-200 placeholder:text-neutral-400 placeholder:text-sm"
              />
              <button
                type="submit"
                className="text-white flex-shrink-0 transition-colors duration-300 hover:text-neutral-300 disabled:text-neutral-500"
                disabled={!inputValue.trim()}
                aria-label={inputValue.trim() ? "Send message" : "Voice input"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={inputValue.trim() ? 'send' : 'mic'}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {inputValue.trim() ? <Send size={20} /> : <Mic size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatInput;