"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type TabType = "signin" | "signup";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("signin");

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 ${
            activeTab === "signin"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("signin")}
          aria-selected={activeTab === "signin"}
          role="tab"
          aria-controls="signin-panel"
          id="signin-tab"
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 ${
            activeTab === "signup"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("signup")}
          aria-selected={activeTab === "signup"}
          role="tab"
          aria-controls="signup-panel"
          id="signup-tab"
        >
          Create Account
        </button>
      </div>

      <div
        id="signin-panel"
        role="tabpanel"
        aria-labelledby="signin-tab"
        hidden={activeTab !== "signin"}
      >
        {activeTab === "signin" && <SignInForm />}
      </div>

      <div
        id="signup-panel"
        role="tabpanel"
        aria-labelledby="signup-tab"
        hidden={activeTab !== "signup"}
      >
        {activeTab === "signup" && <SignUpForm />}
      </div>
    </div>
  );
}
