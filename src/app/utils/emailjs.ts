// EmailJS is loaded via CDN in index.html - available as window.emailjs
// Credentials are public-facing keys (safe to expose in frontend)
const EMAILJS_PUBLIC_KEY = "vO_FcsFZz7ixzIKCx";
const EMAILJS_SERVICE_ID = "service_ainymgg";

export const TEMPLATES = {
  QUOTE: "template_au816lt",
  CONTACT: "template_h9h83ha",
  FEEDBACK: "template_cb2iv4k",
  NEWSLETTER: ""
};

// Initialize EmailJS once
let isInitialized = false;

const initializeEmailJS = () => {
  if (!isInitialized && typeof window !== 'undefined' && window.emailjs?.init) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    isInitialized = true;
  }
};

// Send email function
export const sendEmail = async (templateId: string, templateParams: Record<string, any>) => {
  try {
    if (!templateId) {
      throw new Error("EmailJS template ID is missing.");
    }

    // Ensure EmailJS is initialized
    initializeEmailJS();

    // Check if emailjs is available
    if (typeof window === 'undefined' || !window.emailjs) {
      throw new Error('EmailJS CDN not loaded. Please check your internet connection.');
    }

    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );

    return { success: true, response };
  } catch (error: any) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
};
