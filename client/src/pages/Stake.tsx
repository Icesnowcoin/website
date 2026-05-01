/**
 * ISC Staking Page
 * Redirects to the standalone staking interface
 */
import { useEffect } from 'react';

export default function Stake() {
  useEffect(() => {
    // Redirect to the staking interface
    window.location.href = '/staking.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Redirecting to Staking...</h1>
        <p className="text-foreground/70">If you are not redirected automatically, <a href="/staking.html" className="text-cyan-400 hover:underline">click here</a>.</p>
      </div>
    </div>
  );
}
