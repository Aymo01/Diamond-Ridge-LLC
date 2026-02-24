// EmailJS is loaded via CDN in index.html - available as window.emailjs
// No npm import needed

// EmailJS credentials (Vite env vars)
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";

export const TEMPLATES = {
  QUOTE: import.meta.env.VITE_EMAILJS_TEMPLATE_QUOTE ?? "",
  CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT ?? "",
  FEEDBACK: import.meta.env.VITE_EMAILJS_TEMPLATE_FEEDBACK ?? "",
  NEWSLETTER: import.meta.env.VITE_EMAILJS_TEMPLATE_NEWSLETTER ?? ""
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
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !templateId) {
      throw new Error("EmailJS is not configured. Missing env vars.");
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
    return { success: false, error };
  }
};