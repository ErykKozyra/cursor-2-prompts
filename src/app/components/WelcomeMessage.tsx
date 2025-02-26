"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function WelcomeMessage() {
  const { isAuthenticated, user, loading } = useAuth();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to NextMap
      </h2>

      {loading ? (
        <div
          className="p-4 bg-gray-50 rounded-md animate-pulse"
          aria-live="polite"
          aria-busy="true"
        >
          <span className="sr-only">Loading user information</span>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : isAuthenticated && user ? (
        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-gray-800 mb-2">
            Welcome back, <strong>{user.email}</strong>! It&apos;s great to see
            you again.
          </p>
          <p className="text-gray-700">
            Continue exploring your saved locations or discover new places on
            the map.
          </p>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-gray-800 mb-2">
            Discover and save your favorite locations from around the world.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Sign in to your account"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Create a new account"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
