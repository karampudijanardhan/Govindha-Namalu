
import { useState } from "react";
import GovindaLyrics from "./components/GovindaLyrics";
import PrivacyPolicy from "./components/PrivacyPolicy";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "privacy">("home");

  return (
    <div className="min-h-screen w-full">
      {/* Keep the music component mounted on every page */}
      <div
        style={{
          display: currentPage === "home" ? "block" : "none",
        }}
      >
        <GovindaLyrics
          onPrivacyClick={() => setCurrentPage("privacy")}
        />
      </div>

      {currentPage === "privacy" && (
        <PrivacyPolicy
          onBack={() => setCurrentPage("home")}
        />
      )}
    </div>
  );
}
