'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';

export default function TeamStatusPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Team Status</h1>
      
      <div className="w-full max-w-4xl space-y-8">
        <section className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Team: [Team Name]</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Player/Character status cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-800 border border-gray-700 rounded shadow-lg">
                <h3 className="font-bold mb-2">Player {i}</h3>
                <p className="text-sm text-gray-400 mb-1">Character: [Character Name]</p>
                <p className="text-sm text-gray-400">Level: 1</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
