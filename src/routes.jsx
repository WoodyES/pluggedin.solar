import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import QuizPage from "./pages/QuizPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import posts from "./data/posts";

const ukSlugs = posts.filter(p => p.market === "uk").map(p => `/blog/${p.slug}`);
const usSlugs = posts.filter(p => p.market === "us").map(p => `/us/blog/${p.slug}`);
const auSlugs = posts.filter(p => p.market === "au").map(p => `/au/blog/${p.slug}`);

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "calculator", element: <CalculatorPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "blog", element: <BlogIndex /> },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        getStaticPaths: () => ukSlugs,
      },
      { path: "us/blog", element: <BlogIndex market="us" /> },
      {
        path: "us/blog/:slug",
        element: <BlogPost market="us" />,
        getStaticPaths: () => usSlugs,
      },
      { path: "au/blog", element: <BlogIndex market="au" /> },
      {
        path: "au/blog/:slug",
        element: <BlogPost market="au" />,
        getStaticPaths: () => auSlugs,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
