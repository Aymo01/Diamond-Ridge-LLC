import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Calendar, Tag, Search, BookOpen, User, Clock } from "lucide-react";
import { getPublishedPosts, BlogPost } from "../utils/supabaseBlog";

// Dummy posts for when no real posts exist yet
const dummyPosts = [
  {
    id: "dummy-1",
    title: "HVAC Maintenance Best Practices",
    slug: "hvac-maintenance-best-practices",
    excerpt: "Learn essential tips for keeping your commercial HVAC system running efficiently year-round.",
    content: null,
    category: "Maintenance Tips",
    cover_image: null,
    author: "Diamond Ridge LLC",
    published: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    title: "5 Signs Your Plumbing Needs Attention",
    slug: "5-signs-plumbing-needs-attention",
    excerpt: "Discover warning signs that indicate your commercial plumbing system requires professional service.",
    content: null,
    category: "Maintenance Tips",
    cover_image: null,
    author: "Diamond Ridge LLC",
    published: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "dummy-3",
    title: "Commercial Landscaping Tips for Spring",
    slug: "commercial-landscaping-tips-spring",
    excerpt: "Get your commercial property's landscape ready for spring with these expert maintenance tips.",
    content: null,
    category: "Maintenance Tips",
    cover_image: null,
    author: "Diamond Ridge LLC",
    published: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog & Resources | Diamond Ridge LLC - Maintenance Tips & News";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read our blog for maintenance tips, case studies, industry news, and company updates from Diamond Ridge LLC commercial maintenance experts.");
    }
  }, []);

  // Load posts from Supabase
  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    setLoading(true);
    const fetchedPosts = await getPublishedPosts(selectedCategory);
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const categories = ["All", "Maintenance Tips", "Case Studies", "Industry News", "Company Updates"];

  // Filter posts by search term
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Maintenance Tips": "bg-blue-100 text-blue-700",
      "Case Studies": "bg-green-100 text-green-700",
      "Industry News": "bg-purple-100 text-purple-700",
      "Company Updates": "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Skeleton loading card
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
        <div className="h-8 bg-gray-300 rounded animate-pulse w-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        <div className="h-10 bg-gradient-to-r from-[#D08700]/30 to-[#B07000]/30 rounded-lg animate-pulse" />
      </div>
    </div>
  );

  // Dummy post card with "Coming Soon" badge
  const DummyPostCard = ({ post, index }: { post: typeof dummyPosts[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden relative"
    >
      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4 z-10 bg-[#D08700] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
        Coming Soon
      </div>

      {/* Gradient Placeholder Image */}
      <div className="h-48 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#D08700]/30 flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-white/30" />
      </div>

      <div className="p-6">
        {/* Category Tag */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(post.category || "")}`}>
          {post.category}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#D08700] to-[#B07000] text-white py-20 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl mb-6 font-bold"
            >
              Blog & Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90"
            >
              Expert insights, tips, and updates from Diamond Ridge LLC
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#D08700] focus:outline-none text-lg"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-[#D08700] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            // Loading skeletons
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredPosts.length === 0 && posts.length === 0 ? (
            // No posts yet - show coming soon with dummy cards
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-12 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl shadow-2xl border-2 border-[#D08700]/30"
              >
                <div className="bg-[#D08700]/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[#D08700]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Coming Soon
                </h3>
                <p className="text-gray-300 text-lg">
                  Our expert team is preparing valuable maintenance tips and insights for you!
                </p>
              </motion.div>

              {/* Dummy posts preview */}
              <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  What's Coming
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dummyPosts.map((post, index) => (
                    <DummyPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            // Search returned no results
            <div className="text-center py-20">
              <h3 className="text-2xl text-gray-600 mb-4">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            // Display real posts
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#D08700] cursor-pointer"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {/* Cover Image */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-[#D08700]/10 text-[#D08700] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-[#D08700] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt || "Read more to discover valuable insights..."}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#D08700] to-[#B07000] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
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
