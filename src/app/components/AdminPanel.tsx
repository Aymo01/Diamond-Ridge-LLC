import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { supabaseClient as supabase } from "../utils/supabase/client";
import { 
  Star, Check, X, Trash2, Lock, Eye, EyeOff, 
  FileText, Plus, Save, Image as ImageIcon, 
  ChevronRight, LayoutDashboard, MessageSquare, 
  Trash, Edit3, Send, ExternalLink, Loader
} from "lucide-react";
import { 
  getAllPosts, createPost, updatePost, deletePost, 
  uploadBlogImage, generateSlug, type BlogPost 
} from "../utils/supabaseBlog";
import { 
  getAllReviews, approveReview, declineReview, 
  deleteReview, type Review 
} from "../utils/supabaseReviews";

// IMPORTANT: In production, this should be an environment variable or a more secure system
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

type Tab = "dashboard" | "blog" | "reviews";

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  
  // Blog State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);

  // Session Timeout Effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAuthenticated) {
      // Set a timer to logout after 15 minutes of being authenticated
      timeout = setTimeout(() => {
        setIsAuthenticated(false);
        setAdminSecret("");
        setPassword("");
        alert("Admin session expired. Please re-sign in.");
      }, SESSION_TIMEOUT);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    document.title = "Admin Portal | Diamond Ridge LLC";
    if (isAuthenticated && adminSecret) {
      loadData();
    }
  }, [isAuthenticated, activeTab, adminSecret]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "blog") {
        const data = await getAllPosts(adminSecret);
        setPosts(data);
      } else if (activeTab === "reviews") {
        const data = await getAllReviews(adminSecret);
        setReviews(data);
      } else {
        // Dashboard summary
        const [blogData, reviewData] = await Promise.all([
          getAllPosts(adminSecret),
          getAllReviews(adminSecret)
        ]);
        setPosts(blogData);
        setReviews(reviewData);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const { data, error: rpcError } = await supabase
    .rpc("check_admin_password", { p_password: password });

  if (rpcError) {
    console.error(rpcError);
    setError("Login service unavailable. Please try again.");
    return;
  }

  if (data === true) {
    setIsAuthenticated(true);
    setAdminSecret(password);
  } else {
    setError("Incorrect admin credentials");
  }
};


  // Blog Handlers
  const handleSavePost = async () => {
    if (!editingPost || !editingPost.title) return;
    setLoading(true);
    try {
      const postData = {
        title: editingPost.title,
        slug: editingPost.slug || generateSlug(editingPost.title),
        excerpt: editingPost.excerpt || "",
        content: editingPost.content || "",
        category: editingPost.category || "Maintenance tips",
        cover_image: editingPost.cover_image || null,
        author: editingPost.author || "Diamond Ridge Team",
        published: editingPost.published ?? false,
      };

      if (editingPost.id) {
        await updatePost(editingPost.id, postData, adminSecret);
      } else {
        await createPost(postData, adminSecret);
      }
      setEditingPost(null);
      loadData();
    } catch (err) {
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadBlogImage(file);
      if (url) {
        setEditingPost(prev => ({ ...prev, cover_image: url }));
      }
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // Review Handlers
  const handleApprove = async (id: string) => {
    await approveReview(id, adminSecret);
    loadData();
  };

  const handleDecline = async (id: string) => {
    await declineReview(id, adminSecret);
    loadData();
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm("Permanently delete this review?")) {
      await deleteReview(id, adminSecret);
      loadData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#D08700] p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="opacity-80">Secure Access Restricted</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Access Token</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#D08700] focus:ring-0 transition-all outline-none pr-12 font-mono"
                  placeholder="••••••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border-l-4 border-red-500 text-sm font-medium">{error}</div>}
            <button type="submit" className="w-full py-4 bg-[#D08700] text-white rounded-xl font-bold text-lg hover:bg-[#B07000] transition-all shadow-lg hover:shadow-[#D08700]/30 transform active:scale-[0.98]">
              Authorize Session
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2 text-[#D08700]">
            <LayoutDashboard size={28} />
            <span className="text-xl font-bold tracking-tight">Admin CMS</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Diamond Ridge LLC</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "blog", label: "Blog Posts", icon: FileText },
            { id: "reviews", label: "Reviews", icon: MessageSquare },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as Tab); setEditingPost(null); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === item.id ? "bg-[#D08700] text-white shadow-lg shadow-[#D08700]/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={22} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
            <X size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 capitalize tracking-tight">{activeTab}</h2>
            <p className="text-slate-500 mt-1">Management and moderation interface</p>
          </div>
          <div className="flex gap-4">
            {activeTab === "blog" && (
              <button 
                onClick={() => setEditingPost({ title: "", content: "", author: "Diamond Ridge Team", published: false, category: "Maintenance tips" })}
                className="flex items-center gap-2 px-6 py-3 bg-[#D08700] text-white rounded-xl font-bold hover:bg-[#B07000] shadow-lg shadow-[#D08700]/20 transition-all"
              >
                <Plus size={20} /> New Post
              </button>
            )}
            <button onClick={loadData} className="p-3 bg-white text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
              <ExternalLink size={20} />
            </button>
          </div>
        </header>

        {loading && !editingPost && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100">
            <Loader className="w-12 h-12 text-[#D08700] animate-spin mb-4" />
            <p className="text-slate-500 font-medium tracking-wide">Synchronizing data...</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <FileText size={32} />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Total Articles</p>
                  <p className="text-4xl font-black text-slate-900">{posts.length}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Total Reviews</p>
                  <p className="text-4xl font-black text-slate-900">{reviews.length}</p>
                </div>
              </div>
            </motion.div>
          )}

          {!loading && activeTab === "blog" && !editingPost && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow group">
                  {post.cover_image ? (
                    <img src={post.cover_image} className="w-24 h-24 object-cover rounded-xl" alt="" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.published ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-1">{post.excerpt || 'No excerpt provided...'}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-slate-400">
                      <span className="bg-slate-50 px-2 py-1 rounded">{post.category}</span>
                      <span>By {post.author}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingPost(post)} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <Edit3 size={20} />
                    </button>
                    <button onClick={async () => { if(confirm('Delete post?')) { await deletePost(post.id, adminSecret); loadData(); } }} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {!loading && activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className={`bg-white p-6 rounded-2xl shadow-sm border-l-8 ${review.approved ? 'border-emerald-500' : 'border-amber-500'} flex items-center gap-6 group`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{review.name}</h3>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">"{review.comment}"</p>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-xs font-bold text-[#D08700] uppercase tracking-wider">{review.service}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${review.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {review.approved ? 'Approved' : 'Pending Moderation'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {!review.approved ? (
                      <button onClick={() => handleApprove(review.id)} className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                        <Check size={20} />
                      </button>
                    ) : (
                      <button onClick={() => handleDecline(review.id)} className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all">
                        <X size={20} />
                      </button>
                    )}
                    <button onClick={() => handleDeleteReview(review.id)} className="p-3 bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {editingPost && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100 absolute inset-x-10 top-10 bottom-10 overflow-y-auto z-50">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                <h3 className="text-3xl font-black text-slate-900">{editingPost.id ? 'Edit Article' : 'Compose New Article'}</h3>
                <button onClick={() => setEditingPost(null)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400">
                  <X size={28} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Headline</label>
                    <input 
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                      className="w-full text-4xl font-extrabold text-slate-900 border-none focus:ring-0 p-0 placeholder:text-slate-200"
                      placeholder="Your article title here..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Content Body (Markdown Supported)</label>
                    <textarea 
                      rows={15}
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                      className="w-full p-6 bg-slate-50 rounded-2xl border-none focus:ring-0 text-lg text-slate-700 leading-relaxed placeholder:text-slate-300 min-h-[400px]"
                      placeholder="Start writing your story..."
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Featured Image</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#D08700] hover:bg-[#D08700]/5 transition-all group overflow-hidden relative"
                    >
                      {isUploading ? (
                        <Loader className="animate-spin text-[#D08700]" size={32} />
                      ) : editingPost.cover_image ? (
                        <img src={editingPost.cover_image} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <>
                          <Plus className="text-slate-300 group-hover:text-[#D08700]" size={32} />
                          <p className="text-slate-400 text-xs font-bold mt-2">Upload visual</p>
                        </>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Short Summary (Excerpt)</label>
                      <textarea 
                        value={editingPost.excerpt || ""}
                        onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                        className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-0 text-sm text-slate-600"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                        <select 
                          value={editingPost.category || "Maintenance tips"}
                          onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                          className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-0 text-sm font-bold text-slate-900"
                        >
                          <option value="Maintenance tips">Maintenance tips</option>
                          <option value="Industry news">Industry news</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Author</label>
                        <input 
                          type="text"
                          value={editingPost.author || "Diamond Ridge Team"}
                          onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                          className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-0 text-sm font-bold text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#D08700]/10 rounded-xl border border-[#D08700]/20">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#D08700] uppercase">Visibility</span>
                        <span className="text-sm font-medium text-slate-700">{editingPost.published ? 'Live on Site' : 'Private Draft'}</span>
                      </div>
                      <button 
                        onClick={() => setEditingPost({...editingPost, published: !editingPost.published})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${editingPost.published ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editingPost.published ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={handleSavePost}
                    disabled={loading}
                    className="w-full py-5 bg-[#D08700] text-white rounded-2xl font-black text-xl hover:bg-[#B07000] shadow-2xl shadow-[#D08700]/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-10"
                  >
                    {loading ? <Loader className="animate-spin" /> : <Save size={24} />}
                    {editingPost.id ? 'Push Updates' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
