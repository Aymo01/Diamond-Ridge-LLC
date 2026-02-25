import emailjs from "@emailjs/browser";

// Credentials are public-facing keys (safe to expose in frontend)
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "vO_FcsFZz7ixzIKCx";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_ainymgg";

export const TEMPLATES = {
  QUOTE: import.meta.env.VITE_EMAILJS_TEMPLATE_QUOTE ?? "template_au816lt",
  CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT ?? "template_h9h83ha",
  FEEDBACK: import.meta.env.VITE_EMAILJS_TEMPLATE_FEEDBACK ?? "template_cb2iv4k",
  NEWSLETTER: import.meta.env.VITE_EMAILJS_TEMPLATE_NEWSLETTER ?? import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT ?? "template_h9h83ha"
};

// Initialize EmailJS once
let isInitialized = false;

const initializeEmailJS = () => {
  if (!isInitialized) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    isInitialized = true;
  }
};

// Send email function
export const sendEmail = async (templateId: string, templateParams: Record<string, any>) => {
  try {
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID) {
      throw new Error("EmailJS key/service is missing.");
    }

    if (!templateId) {
      throw new Error("EmailJS template ID is missing.");
    }

    // Ensure EmailJS is initialized
    initializeEmailJS();

    const response = await emailjs.send(
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
