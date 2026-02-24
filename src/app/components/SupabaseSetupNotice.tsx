import { motion } from "motion/react";
import { AlertTriangle, ExternalLink, CheckCircle } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-orange-600"
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">⚠️ Setup Required: Create Supabase Table</h2>
          <p className="text-lg mb-4 text-white/90">
            The <code className="bg-black/30 px-2 py-1 rounded">blog_posts</code> table has not been created in your Supabase database yet. 
            The blog system will not work until you complete this setup.
          </p>

          <div className="bg-black/20 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Quick Setup (5 minutes)
            </h3>
            <ol className="space-y-3 text-white/90">
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Supabase Dashboard</a></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Select your project: <code className="bg-black/30 px-2 py-1 rounded text-sm">jlkuwqkcblezanydjpzb</code></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>Navigate to <strong>SQL Editor</strong> in the left sidebar</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Click <strong>New query</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">5</span>
                <span>Copy the SQL from <code className="bg-black/30 px-2 py-1 rounded text-sm">/QUICK_START.md</code> and paste it</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">6</span>
                <span>Click <strong>Run</strong> (or press Ctrl+Enter)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">7</span>
                <span>Refresh this page and start creating blog posts!</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Open Supabase Dashboard
            </a>
            <button
              onClick={() => window.location.reload()}
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all"
            >
              I've Created the Table - Refresh Page
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20 text-sm text-white/80">
            <p className="mb-2">📚 <strong>Detailed Instructions:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code>/QUICK_START.md</code> - Fast setup guide with SQL</li>
              <li><code>/SUPABASE_BLOG_SETUP.md</code> - Complete setup documentation</li>
              <li><code>/TESTING_CHECKLIST.md</code> - Verify everything works</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
