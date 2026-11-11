
import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Heart,
  Music,
  Database,
  Share2,
  Baby,
  Lock,
  RefreshCw,
  Mail,
} from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content:
      "You do not need to create an account or provide personal details to use Govinda Namalu.",
  },
  {
    icon: Music,
    title: "2. Audio and Lyrics",
    content:
      "You can read Govinda Namalu lyrics and listen to devotional songs directly in the app.",
  },
  {
    icon: Share2,
    title: "3. Sharing",
    content:
      "When you share our app, your device opens its sharing options. You choose how to share it.",
  },
  {
    icon: Lock,
    title: "4. Third-Party Services",
    content:
      "External websites or services may have their own privacy policies. Please check them before using them.",
  },
  {
    icon: Baby,
    title: "5. Children's Privacy",
    content:
      "We do not intentionally collect children's personal information through this app.",
  },
  {
    icon: ShieldCheck,
    title: "6. Data Security",
    content:
      "We aim to provide a simple and privacy-conscious experience. Please keep your device updated.",
  },
  {
    icon: RefreshCw,
    title: "7. Policy Updates",
    content:
      "We may update this policy when our app or privacy practices change. Please check this page for updates.",
  },
];

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#afd0d2] text-[#292929]">

      {/* Header */}
      <header className="relative w-full bg-[#ffc107] px-5 py-10 text-center shadow-md sm:py-14">

        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#333333] shadow-sm transition hover:bg-[#fff4c2]"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#fff4c2]">
          <ShieldCheck size={34} className="text-[#A87900]" />
        </div>

        <h1 className="mt-5 text-3xl font-extrabold text-[#292929] sm:text-5xl">
          Privacy Policy
        </h1>

        <h2 className="mt-2 text-lg font-bold text-[#4D3B0A] sm:text-xl">
          Govinda Namalu
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#4D3B0A] sm:text-base">
          Your privacy is important to us. Read how we handle
          information while you enjoy devotional songs and lyrics.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#574515] shadow-sm">
          <Lock size={15} />
          Privacy & Security
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10 lg:px-12">

        {/* Welcome Card */}
        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff4c2]">
              <Heart size={25} className="text-[#A87900]" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#292929] sm:text-2xl">
                Welcome Devotees
              </h2>
              <p className="text-sm text-gray-500">
                A simple devotional experience
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-gray-700 sm:text-base">
            Welcome to Govinda Namalu. This app helps you read
            Sri Venkateswara Swamy Govinda Namalu and listen to
            devotional songs. We respect your privacy.
          </p>

          <div className="mt-5 rounded-xl bg-[#e5ffff] p-4">
            <p className="text-sm font-bold text-[#574515]">
              Effective Date: November 11, 2026
            </p>
          </div>
        </section>

        {/* Policy Heading */}
        <section className="mb-6 mt-10">
          <h2 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">
            Privacy Information
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Here is how we protect your privacy.
          </p>
        </section>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-2xl border border-[#d5e5e5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5ffff]">
                  <Icon size={24} className="text-[#A87900]" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#292929]">
                  {section.title}
                </h3>

                <div className="mt-3 h-1 w-10 rounded-full bg-[#ffc107]" />

                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                  {section.content}
                </p>
              </article>
            );
          })}
        </div>

        {/* Contact */}
        <section className="mt-10 rounded-2xl bg-[#ffc107] p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Mail size={24} className="text-[#A87900]" />
            </div>

            <h2 className="text-xl font-extrabold text-[#292929] sm:text-2xl">
              Contact Us
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-[#4D3B0A] sm:text-base">
            Have questions about our Privacy Policy? Contact us
            through the email below.
          </p>

          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="mt-5 inline-flex max-w-full items-center gap-2 break-all rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#292929] shadow-sm transition hover:bg-[#fff4c2]"
          >
            <Mail size={18} />
            YOUR_EMAIL@gmail.com
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-10 rounded-2xl bg-white px-5 py-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4c2]">
            <Heart size={24} className="text-[#A87900]" />
          </div>

          <h3 className="mt-4 text-xl font-extrabold text-[#292929]">
            Govinda Namalu
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Thank you for being part of our devotional journey.
          </p>

          <p className="mt-4 text-xl font-bold text-[#A87900]">
            గోవిందా! గోవిందా!
          </p>

          <p className="mt-5 border-t border-gray-100 pt-4 text-xs text-gray-500">
            © 2026 Govinda Namalu. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
