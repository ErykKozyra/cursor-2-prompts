"use client";

import { useState } from "react";

interface LearnMoreButtonProps {
  topic: string;
  children?: React.ReactNode;
}

export default function LearnMoreButton({
  topic,
  children,
}: LearnMoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const detailsId = `${topic.toLowerCase().replace(/\s+/g, "-")}-details`;

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={toggleDetails}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-expanded={isOpen}
        aria-controls={detailsId}
      >
        {isOpen ? "Hide Details" : "Learn More"}
      </button>

      {isOpen && (
        <div
          id={detailsId}
          className="p-4 mt-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800"
        >
          {children || (
            <div className="space-y-2">
              <p>
                <strong>{topic}</strong> is an important feature of our
                application.
              </p>
              <p>
                This component provides additional information about {topic}{" "}
                when requested, improving the user experience by showing details
                on demand.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
