import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { WhyUs } from "./components/WhyUs";
import { RequestQuote } from "./components/RequestQuote";
import { Contact } from "./components/Contact";
import { Feedback } from "./components/Feedback";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { HandyBook } from "./components/HandyBook";
import { NotFound } from "./components/NotFound";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "why-us", Component: WhyUs },
      { path: "handybook", Component: HandyBook },
      { path: "handybook/:id", Component: HandyBook },
      { path: "quote", Component: RequestQuote },
      { path: "contact", Component: Contact },
      { path: "feedback", Component: Feedback },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "admin-login", Component: AdminLogin },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
