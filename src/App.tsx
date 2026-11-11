import { useState } from "react";
import GovindaLyrics from "./components/GovindaLyrics";
import PrivacyPolicy from "./components/PrivacyPolicy";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      {currentPage === "home" && (
        <GovindaLyrics
          onPrivacyClick={() => setCurrentPage("privacy")}
        />
      )}

      {currentPage === "privacy" && (
        <PrivacyPolicy
          onBack={() => setCurrentPage("home")}
        />
      )}
    </>
  );
}