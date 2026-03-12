import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { BookOpen, Calendar, User, Clock, Search } from "lucide-react";
import { getPublishedPosts, BlogPost } from "../utils/supabaseBlog";

export function HandyBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "HandyBook - Expert Tips & Maintenance Insights | Diamond Ridge LLC";
    const c = document.querySelector('link[rel="canonical"]');
    if (c) c.setAttribute('href', 'https://diamondridgellc.us/handybook');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Expert tips, insights, and guides from Diamond Ridge LLC professionals. Learn about HVAC, plumbing, electrical, and more.");
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const fetchedPosts = await getPublishedPosts();
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex-shrink-0" />
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="h-8 bg-gray-300 rounded animate-pulse w-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        <div className="h-10 bg-gradient-to-r from-[#D08700]/30 to-[#B07000]/30 rounded-lg animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-20 h-20 bg-[#D08700]/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <BookOpen className="w-10 h-10 text-[#D08700]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#D08700] focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredPosts.length === 0 && posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-[#D08700]/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-[#D08700]" />
              </div>
              <p className="text-gray-500 text-lg">Our expert team is preparing valuable insights for you!</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl text-gray-600 mb-4">No articles found</h3>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {/* Fixed-height cover image */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex-shrink-0">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                  </div>
                  {/* Card body stretches to fill remaining height */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D08700] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt || "Read more to discover valuable insights..."}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#D08700] to-[#B07000] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all mt-auto"
                    >
                      Read More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
