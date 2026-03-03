import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import logo from '@/assets/logo.png';

export function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data, error: rpcError } = await supabase
        .rpc('check_admin_password', { p_password: password });
      if (rpcError) {
        setError('Login service unavailable. Please try again.');
        return;
      }
      if (data === true) {
        sessionStorage.setItem('dr_admin_secret', password);
        navigate('/admin');
      } else {
        setError('Incorrect admin credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#1a1a1a] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Diamond Ridge LLC" className="h-20 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Access your blog dashboard</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl border border-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent transition-all"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D08700] hover:bg-[#B07000] text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-[#D08700] transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
