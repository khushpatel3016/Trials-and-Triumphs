export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Join the Trials</h1>
        <p className="text-gray-400 mb-8 text-center">Sign in to begin or resume your adventure.</p>
        
        {/* Supabase Auth UI or custom form will go here */}
        <div className="space-y-4">
           <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors">
            Sign In / Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
