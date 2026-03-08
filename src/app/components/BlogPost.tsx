import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Calendar, User, Tag, BookOpen, Clock } from "lucide-react";
import { getPostBySlug, BlogPost as BlogPostType } from "../utils/supabaseBlog";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    loadPost();
  }, [slug]);

  const loadPost = async () => {
    if (!slug) return;

    setLoading(true);
    const fetchedPost = await getPostBySlug(slug);
    
    if (fetchedPost) {
      setPost(fetchedPost);
      document.title = `${fetchedPost.title} | Diamond Ridge LLC`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && fetchedPost.excerpt) {
        metaDescription.setAttribute("content", fetchedPost.excerpt);
      }
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Maintenance Tips": "bg-blue-100 text-blue-700",
      "Case Studies": "bg-green-100 text-green-700",
      "Industry News": "bg-purple-100 text-purple-700",
      "Company Updates": "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Calculate estimated read time (average 200 words per minute)
  const calculateReadTime = (content: string | null) => {
    if (!content) return "5 min read";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="pb-20">
        {/* Hero Skeleton */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-6 w-32 bg-white/20 rounded animate-pulse mb-6" />
              <div className="h-10 w-3/4 bg-white/20 rounded animate-pulse mb-4" />
              <div className="h-16 w-full bg-white/20 rounded animate-pulse mb-6" />
              <div className="flex gap-6">
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 404 Not Found
  if (notFound || !post) {
    return (
      <div className="pb-20">
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] py-20 text-white min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-[#D08700]/20 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-[#D08700]" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Post Not Found</h1>
            <p className="text-xl text-gray-300 mb-8">
              Sorry, the blog post you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/handybook">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  View All Posts
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Go Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  // Post found - display content
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/handybook"
              className="inline-flex items-center gap-2 text-[#D08700] hover:text-[#B07000] mb-6 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to HandyBook
            </Link>

            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(post.category || "")}`}>
              <Tag className="w-4 h-4 inline mr-2" />
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{calculateReadTime(post.content)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Cover Image */}
            {post.cover_image && (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                src={post.cover_image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-12"
              />
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-[#D08700]/5 border-l-4 border-[#D08700] p-6 rounded-r-lg mb-12">
                <p className="text-xl text-gray-700 italic leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-gray-700 text-lg">No content available.</p>
              )}
            </div>

            {/* Back to HandyBook CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t-2 border-gray-200"
            >
              <Link to="/handybook">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-5 h-5" />
                  View All Posts
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
