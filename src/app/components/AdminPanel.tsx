import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Star, Check, X, Trash2, Lock, Eye, EyeOff } from "lucide-react";

interface StoredReview {
  id: number;
  name: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  approved: boolean;
}

// IMPORTANT: Change this password! Store in environment variable for production
const ADMIN_PASSWORD = "diamond2024";

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<StoredReview[]>([]);

  useEffect(() => {
    document.title = "Admin Panel | Diamond Ridge LLC";
    const c = document.querySelector('link[rel="canonical"]');
    if (c) c.setAttribute('href', 'https://diamondridgellc.us/admin');
    
    if (isAuthenticated) {
      loadReviews();
    }
  }, [isAuthenticated]);

  const loadReviews = () => {
    const stored = localStorage.getItem("diamondridge_reviews");
    if (stored) {
      try {
        const allReviews: StoredReview[] = JSON.parse(stored);
        // Sort by date, newest first
        const sortedReviews = allReviews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setReviews(sortedReviews);
      } catch (e) {
        console.error("Error loading reviews:", e);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleApprove = (id: number) => {
    const stored = localStorage.getItem("diamondridge_reviews");
    if (stored) {
      const allReviews: StoredReview[] = JSON.parse(stored);
      const updatedReviews = allReviews.map((review) =>
        review.id === id ? { ...review, approved: true } : review
      );
      localStorage.setItem("diamondridge_reviews", JSON.stringify(updatedReviews));
      loadReviews();
    }
  };

  const handleReject = (id: number) => {
    const stored = localStorage.getItem("diamondridge_reviews");
    if (stored) {
      const allReviews: StoredReview[] = JSON.parse(stored);
      const updatedReviews = allReviews.map((review) =>
        review.id === id ? { ...review, approved: false } : review
      );
      localStorage.setItem("diamondridge_reviews", JSON.stringify(updatedReviews));
      loadReviews();
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const stored = localStorage.getItem("diamondridge_reviews");
      if (stored) {
        const allReviews: StoredReview[] = JSON.parse(stored);
        const updatedReviews = allReviews.filter((review) => review.id !== id);
        localStorage.setItem("diamondridge_reviews", JSON.stringify(updatedReviews));
        loadReviews();
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#D08700] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Diamond Ridge LLC</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D08700] focus:border-transparent pr-12"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl mb-4">Admin Panel</h1>
            <p className="text-xl text-gray-300">Review Management</p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Management */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">All Reviews ({reviews.length})</h2>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all"
              >
                Logout
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-gray-100 rounded-2xl">
                <p className="text-xl text-gray-600">No reviews yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                      review.approved
                        ? "border-green-500"
                        : "border-yellow-500"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {review.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              review.approved
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {review.approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= review.rating
                                  ? "text-[#D08700] fill-[#D08700]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-2">"{review.comment}"</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span className="font-semibold">{review.service}</span>
                          <span>
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!review.approved && (
                          <button
                            onClick={() => handleApprove(review.id)}
                            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all"
                            title="Approve"
                          >
                            <Check size={20} />
                          </button>
                        )}
                        {review.approved && (
                          <button
                            onClick={() => handleReject(review.id)}
                            className="bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition-all"
                            title="Unapprove"
                          >
                            <X size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
