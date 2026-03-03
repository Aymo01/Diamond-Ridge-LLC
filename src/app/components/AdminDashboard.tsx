import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Plus, Trash2, Calendar, Camera, X, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.png';
import { getAllPosts, createPost, deletePost, uploadBlogImage, generateSlug, type BlogPost } from '../utils/supabaseBlog';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Maintenance tips');
  const [author, setAuthor] = useState('Diamond Ridge Team');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [adminSecret, setAdminSecret] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const secret = sessionStorage.getItem('dr_admin_secret');
    if (!secret) {
      navigate('/admin-login');
      return;
    }
    setAdminSecret(secret);
    loadPosts(secret);
  }, [navigate]);

  const loadPosts = async (secret: string) => {
    const data = await getAllPosts(secret);
    setPosts(data);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dr_admin_secret');
    navigate('/admin-login');
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSecret) return;
    setIsPublishing(true);
    setPublishError('');
    
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadBlogImage(imageFile) || '';
      }

      const postData = {
        title,
        slug: generateSlug(title),
        excerpt: excerpt || '',
        content: content || '',
        category: category || 'Maintenance tips',
        cover_image: imageUrl || null,
        author,
        published: true,
      };

      const result = await createPost(postData, adminSecret);
      if (!result) {
        throw new Error('Failed to create post');
      }

      await loadPosts(adminSecret);
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory('Maintenance tips');
      setImageFile(null);
      setImagePreview('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      setPublishError('Failed to publish: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!adminSecret || !window.confirm('Are you sure you want to delete this blog post?')) return;
    await deletePost(id, adminSecret);
    await loadPosts(adminSecret);
  };

  const categories = ['Maintenance tips', 'Industry news'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Diamond Ridge LLC" className="h-12 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your blog posts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/handybook')} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all">View Blog</button>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Form */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-6 h-6 text-[#D08700]" />
            <h2 className="text-2xl font-bold text-white">Create New Post</h2>
          </div>
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              ✓ Blog post published successfully!
            </div>
          )}
          {publishError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {publishError}
            </div>
          )}
          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Post Title *</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent"
                placeholder="Enter blog post title" required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent" required>
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">Author *</label>
              <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent"
                placeholder="Author name" required />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">Short Excerpt *</label>
              <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent resize-none"
                placeholder="Brief description for the blog card (2-3 sentences)" required />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">Full Content *</label>
              <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent resize-none"
                placeholder="Write your full blog post content here..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
              {!imagePreview ? (
                <label htmlFor="image" className="cursor-pointer block w-full h-40 bg-black border-2 border-dashed border-gray-700 rounded-lg hover:border-[#D08700] transition-colors">
                  <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Camera className="w-12 h-12 mb-2" />
                    <span className="text-sm">No image selected</span>
                    <span className="text-xs mt-1">Click to upload</span>
                  </div>
                </label>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  <button type="button" onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <button type="submit" disabled={isPublishing}
              className="w-full bg-[#D08700] hover:bg-[#B07000] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              {isPublishing ? <><Loader2 className="w-4 h-4 animate-spin" />Publishing...</> : 'Publish Blog Post'}
            </button>
          </form>
        </div>

        {/* Published Posts */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Published Posts</h2>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No blog posts yet.</p>
              <p className="text-sm mt-2">Create your first post to get started!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {posts.map((post) => (
                <div key={post.id} className="bg-black border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        <span className="bg-[#D08700]/20 text-[#D08700] px-2 py-1 rounded">{post.category}</span>
                        <span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete post">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
