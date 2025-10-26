import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TabProps {
  tabs: {
    icon?: React.ReactNode;
    label: string;
    content: React.ReactNode;
  }[];
  initialTab?: number;
}

const TabSelector: React.FC<TabProps> = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // Use initialTab to set the initial state

  // Update activeTab when initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Function to handle previous tab
  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }
  };

  // Function to handle next tab
  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab((prev) => prev + 1);
    }
  };

  return (
    <div className="mt-4 gap-4">
      {/* === Desktop Tab Selector === */}
      <div className="hidden w-full bg-white rounded-xl md:flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 p-5 ${
              activeTab === index
                ? "bg-[#DB18CE] text-white"
                : "text-gray-800 bg-[#f3c9f0]"
            } flex items-center justify-center gap-2`} 
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* === Mobile Tab Selector === */}
      <div className="mb-2 mt-4 flex items-center justify-between md:hidden">
        {/* Left Arrow with conditional color */}
        <button
          onClick={handlePrevious}
          className={`p-2 ${
            activeTab === 0
              ? "text-gray-300"
              : "text-gray-800 hover:text-primary"
          }`}
          aria-label="Previous Tab"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Active Tab Label */}
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
          {tabs[activeTab].icon} {tabs[activeTab].label}
        </div>

        {/* Right Arrow with conditional color */}
        <button
          onClick={handleNext}
          className={`p-2 ${
            activeTab === tabs.length - 1
              ? "text-gray-300"
              : "text-gray-800 hover:text-primary"
          }`}
          aria-label="Next Tab"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* === Active Tab Content === */}
      <div className="w-full overflow-hidden">
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: activeTab === index ? 1 : 0,
              y: activeTab === index ? 0 : 50,
            }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`inset-0 ${activeTab === index ? "block" : "hidden"}`}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { TabSelector };
