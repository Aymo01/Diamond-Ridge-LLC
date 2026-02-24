import { motion } from "motion/react";
import { useEffect } from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Diamond Ridge LLC"; const c = document.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href','https://diamondridgellc.us/privacy-policy');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read Diamond Ridge LLC's privacy policy. Learn how we collect, use, and protect your personal information when you use our commercial maintenance services.");
    }
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-10 h-10 text-yellow-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl mb-6"
            >
              Privacy Policy & <span className="text-yellow-600">Terms of Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Your privacy and trust are important to us
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 mt-4"
            >
              Last Updated: February 19, 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold">Introduction</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Diamond Ridge LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold">Information We Collect</h2>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Personal Information</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                When you use our website or request our services, we may collect the following personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg mb-6 ml-4">
                <li><strong>Name:</strong> To identify you and personalize our communications</li>
                <li><strong>Email Address:</strong> To respond to your inquiries and send service updates</li>
                <li><strong>Phone Number:</strong> To contact you regarding your service requests</li>
                <li><strong>Business Name and Address:</strong> To provide accurate quotes and service delivery</li>
                <li><strong>Service Details:</strong> Information about the maintenance services you request</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Automatically Collected Information</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We may automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg ml-4">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg ml-4">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To provide accurate quotes for our maintenance services</li>
                <li>To schedule and deliver our services</li>
                <li>To send service updates, confirmations, and important notices</li>
                <li>To improve our website and services</li>
                <li>To communicate with you about promotions or services (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Information Sharing and Disclosure</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  We Do NOT Sell Your Information
                </p>
                <p className="text-gray-700">
                  Diamond Ridge LLC does not sell, trade, or rent your personal information to third parties.
                </p>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We may share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg ml-4">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our business (e.g., payment processors, scheduling software)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified)</li>
                <li><strong>Protection:</strong> To protect our rights, property, safety, or that of our customers</li>
              </ul>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Data Security</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Object:</strong> Object to processing of your personal information in certain circumstances</li>
              </ul>
            </motion.div>

            {/* Terms of Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Service Agreement</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                By requesting a quote or engaging our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg ml-4 mb-6">
                <li>Provide accurate and complete information</li>
                <li>Pay for services as agreed upon in quotes and invoices</li>
                <li>Allow access to your property for service delivery</li>
                <li>Comply with safety requirements during service delivery</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Limitation of Liability</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Diamond Ridge LLC provides services with professional care and expertise. While we maintain appropriate insurance and follow industry standards, our liability is limited to the amount paid for the specific service in question. We are not responsible for indirect, incidental, or consequential damages.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Cancellation Policy</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Service cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may be subject to a cancellation fee. Emergency services have different terms based on the specific situation.
              </p>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Cookies and Tracking</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookies through your browser settings.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Cookies help us understand how visitors use our site, remember your preferences, and improve our services.
              </p>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6">Changes to This Policy</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Contact Us</h2>
              </div>
              <p className="text-xl text-white/90 mb-6">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3 text-lg">
                <p>
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:info@diamondridgellc.us" 
                    className="underline hover:text-white/80 transition-colors"
                  >
                    info@diamondridgellc.us
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a 
                    href="tel:4648883930" 
                    className="underline hover:text-white/80 transition-colors"
                  >
                    (464) 888-3930
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> 16733 Vicky Lane, Orland Hills, IL 60487
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80">
                  Diamond Ridge LLC is committed to transparency and protecting your privacy. We will respond to all privacy-related inquiries within 48 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
