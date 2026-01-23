import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <p className="text-3xl font-bold text-foreground mb-2">
              Page Not Found
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
