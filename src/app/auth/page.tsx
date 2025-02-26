import AuthTabs from "../components/auth/AuthTabs";

export const metadata = {
  title: "Authentication | NextMap",
  description: "Sign in or create an account to access all features of NextMap",
};

export default function AuthPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Welcome to NextMap
            </h1>

            <AuthTabs />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-700">
          By signing in or creating an account, you agree to our{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
            aria-label="Read our Terms of Service"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
            aria-label="Read our Privacy Policy"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}
