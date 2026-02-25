# Commercial Maintenance Website

This is a code bundle for Commercial Maintenance Website. The original project is available at https://www.figma.com/design/PRg2WOQoHLhbLgPmPI1lWq/Commercial-Maintenance-Website.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Environment Variables

1. Copy `.env.example` to `.env`.
2. Fill in your EmailJS values from the EmailJS dashboard.

Required variables:

- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_QUOTE`
- `VITE_EMAILJS_TEMPLATE_CONTACT`
- `VITE_EMAILJS_TEMPLATE_FEEDBACK`
- `VITE_EMAILJS_TEMPLATE_NEWSLETTER` (optional; falls back to contact template)

## EmailJS Setup (Dashboard)

1. Create an EmailJS account and add your email service.
2. Create four templates in EmailJS:
   - quote template
   - contact template
   - feedback template
   - newsletter template
3. Copy the template IDs into your `.env` file.
4. Restart `npm run dev` after changing environment variables.
