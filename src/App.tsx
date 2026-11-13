
import { useState, useEffect } from "react";
import GovindaLyrics from "./components/GovindaLyrics";
import PrivacyPolicy from "./components/PrivacyPolicy";

const isPrivacyPath = () =>
  window.location.pathname.replace(/\/+$/, "") === "/privacy-policy";

const isWebBrowser = () =>
  window.location.protocol === "http:" ||
  window.location.protocol === "https:";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "privacy">(
    () => (isPrivacyPath() ? "privacy" : "home")
  );

  const [showSplash, setShowSplash] = useState(() => !isPrivacyPath());

  // Show splash screen only when opening the Home page
  useEffect(() => {
    if (currentPage === "privacy") return;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Support browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(isPrivacyPath() ? "privacy" : "home");
      setShowSplash(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Open Privacy Policy page
  const navigateToPrivacy = () => {
    if (isWebBrowser()) {
      window.history.pushState({}, "", "/privacy-policy");
    }

    setCurrentPage("privacy");
    setShowSplash(false);
  };

  // Return to Home page
  const navigateHome = () => {
    if (isWebBrowser()) {
      window.history.pushState({}, "", "/");
    }

    setCurrentPage("home");
    setShowSplash(false);
  };

  // Full-screen Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-black">
        <img
          src="/splash.png"
          alt="Lord Venkateswara Swamy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Privacy Policy Page
  if (currentPage === "privacy") {
    return <PrivacyPolicy onBack={navigateHome} />;
  }

  // Main Home Page
  return (
    <div className="min-h-screen w-full">
      <GovindaLyrics onPrivacyClick={navigateToPrivacy} />
    </div>
  );
}
