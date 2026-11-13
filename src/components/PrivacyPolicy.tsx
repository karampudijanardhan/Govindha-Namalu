
import React from "react";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const email = "janardhankarampudi@gmail.com";

  return (
    <main className="min-h-screen w-full bg-white text-[#222]">
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-5 sm:px-8 sm:py-8 lg:px-14 lg:py-10">

        {/* Header */}
        <header className="relative mb-8 flex min-h-12 items-center justify-center sm:mb-10">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>
          )}

          <h1 className="px-12 text-center font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Privacy Policy
          </h1>

          <span
            role="img"
            aria-label="Indian flag"
            className="absolute right-0 text-2xl sm:text-3xl"
          >
            Indian
          </span>
        </header>

        {/* Policy content */}
        <article className="mx-auto w-full max-w-4xl font-serif text-[14px] leading-7 text-gray-800 sm:text-[15px] sm:leading-8 lg:text-base">

          <p className="mb-7 text-justify">
            We respect your privacy and are committed to protecting your
            personal information. This Privacy Policy outlines how we
            collect, use, disclose, and safeguard your personal data when
            you use our Govinda Namalu application. It also explains your
            rights and choices regarding your personal information.
          </p>

          <section className="mb-6">
            <p className="text-justify">
              <strong>1. ORGANIZATION AND SCOPE.</strong>{" "}
              Govinda Namalu is a devotional application dedicated to
              Sri Venkateswara Swamy. This Privacy Policy explains how
              information is handled when you use our application and
              its features.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>2. INFORMATION COLLECTED.</strong>{" "}
              Depending on the features you use, the application may
              process certain information, including:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6 sm:pl-8">
              <li>
                <strong>Personal information:</strong> Information you
                voluntarily provide, such as your name or email address.
              </li>
              <li>
                <strong>Device information:</strong> Basic device and
                application information where applicable.
              </li>
              <li>
                <strong>Usage information:</strong> Information about
                how you interact with application features, where collected.
              </li>
              <li>
                <strong>Favorites:</strong> Your saved favorite songs,
                stored locally on your device if local storage is used.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>3. AUDIO AND LYRICS.</strong>{" "}
              The application provides devotional songs and Govinda
              Namalu lyrics for personal and devotional use.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>4. USE OF INFORMATION.</strong>{" "}
              Information, where collected, may be used to provide
              application features, improve performance, and respond
              to user enquiries.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>5. SHARING OF INFORMATION.</strong>{" "}
              We do not sell personal information. Information may be
              shared with service providers only where necessary to
              operate the application or comply with legal requirements.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>6. THIRD-PARTY SERVICES.</strong>{" "}
              The application may use third-party services for hosting,
              analytics, or other features. Their privacy practices are
              governed by their respective policies.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>7. CHILDREN'S PRIVACY.</strong>{" "}
              We do not knowingly collect personal information from
              children without appropriate consent.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>8. DATA SECURITY.</strong>{" "}
              Reasonable measures are taken to protect information.
              However, no electronic storage or transmission method
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-justify">
              <strong>9. POLICY UPDATES.</strong>{" "}
              This Privacy Policy may be updated from time to time.
              Changes will be reflected on this page.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-justify">
              <strong>10. CONTACT US.</strong>{" "}
              If you have any questions regarding this Privacy Policy,
              contact us at:
            </p>

            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block break-all font-semibold text-blue-700 underline underline-offset-2"
            >
              {email}
            </a>
          </section>

          <footer className="border-t border-gray-300 pt-5 text-center">
            <p className="text-sm text-gray-600">
              Effective Date: November 13, 2026
            </p>
            <p className="mt-3 pb-5 font-semibold">
              Govinda Govinda 🙏
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
