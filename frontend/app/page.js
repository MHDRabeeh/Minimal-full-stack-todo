"use client"
import Head from "next/head";
import { useRouter } from "next/navigation";
export default function TodoLandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Todo App | Organize Your Life</title>
        <meta
          name="description"
          content="The simplest way to organize your tasks"
        />
      </Head>

      <main className="text-center max-w-md w-full">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Get Things Done
          </h1>
          <p className="text-lg text-indigo-700">
            The simplest todo app to organize your work and life.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Start Organizing Today
          </h2>

          <div className="flex flex-col space-y-4">
            <button
              className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium
                            transition-all hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
                            onClick={()=>router.push("/login")}
            >
              Login
            </button>
            <button
              onClick={()=>router.push("/register")}
              className="px-6 py-3 rounded-full bg-white text-indigo-600 border-2 border-indigo-600
                            font-medium transition-all hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign Up Free
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3">FEATURES</h3>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="text-indigo-600">• Simple Interface</span>
              <span className="text-indigo-600">• Cross-Device Sync</span>
              <span className="text-indigo-600">• Reminders</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

