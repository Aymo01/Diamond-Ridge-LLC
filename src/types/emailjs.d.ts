// Global type declarations for EmailJS CDN

interface Window {
  emailjs: {
    init: (config: { publicKey: string }) => void;
    send: (
      serviceId: string,
      templateId: string,
      templateParams: Record<string, any>
    ) => Promise<{
      status: number;
      text: string;
    }>;
  };
}
