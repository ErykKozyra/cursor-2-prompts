"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import SavedLocations from "../components/profile/SavedLocations";

export default function ProfilePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"
          aria-hidden="true"
        ></div>
        <span className="sr-only">Loading your profile information...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Profile</h1>

      <section
        className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200"
        aria-labelledby="user-info-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="bg-blue-100 rounded-full p-4 w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-blue-700"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div>
            <h2
              id="user-info-heading"
              className="text-xl font-semibold text-gray-900"
            >
              {user?.email}
            </h2>
            <p className="text-gray-800 text-sm">
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Account Information
          </h3>
          <dl className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <dt className="text-gray-800 font-medium">Email:</dt>
              <dd className="text-gray-900">{user?.email}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <dt className="text-gray-800 font-medium">User ID:</dt>
              <dd className="text-gray-900 font-mono text-sm break-all">
                {user?.id}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <SavedLocations />
      </section>
    </main>
  );
}
