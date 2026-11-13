
import React from "react";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const email = "janardhankarampudi@gmail.com";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-[#222]">
     <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">        {/* Header */}
        <header className="mb-7 grid grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-2 sm:mb-10">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={21} />
            </button>
          ) : (
            <div />
          )}

          <h1 className="min-w-0 text-center font-serif text-2xl font-bold tracking-tight text-[#222] sm:text-3xl md:text-4xl">
            Privacy Policy
          </h1>

          <div />
        </header>

        {/* Privacy Policy Content */}
        <article className="mx-auto w-full max-w-4xl break-words font-serif text-[15px] leading-7 text-gray-800 sm:text-base sm:leading-8 lg:text-lg">

          <p className="mb-7 text-left">
            We respect your privacy and are committed to protecting your
            personal information. This Privacy Policy outlines how we
            collect, use, disclose, and safeguard your personal data when
            you use our Govinda Namalu application. It also explains your
            rights and choices regarding your personal information.
          </p>

          <section className="mb-6">
            <p className="text-left">
              <strong>1. ORGANIZATION AND SCOPE.</strong>{" "}
              Govinda Namalu is a devotional application dedicated to
              Sri Venkateswara Swamy. This Privacy Policy explains how
              information is handled when you use our application and
              its features.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>2. INFORMATION COLLECTED.</strong>{" "}
              Depending on the features you use, the application may
              process certain information, including:
            </p>

            <ul className="mt-3 list-disc space-y-3 pl-5 sm:pl-7">
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
            <p className="text-left">
              <strong>3. AUDIO AND LYRICS.</strong>{" "}
              The application provides devotional songs and Govinda
              Namalu lyrics for personal and devotional use.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>4. USE OF INFORMATION.</strong>{" "}
              Information, where collected, may be used to provide
              application features, improve performance, and respond
              to user enquiries.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>5. SHARING OF INFORMATION.</strong>{" "}
              We do not sell personal information. Information may be
              shared with service providers only where necessary to
              operate the application or comply with legal requirements.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>6. THIRD-PARTY SERVICES.</strong>{" "}
              The application may use third-party services for hosting,
              analytics, or other features. Their privacy practices are
              governed by their respective policies.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>7. CHILDREN'S PRIVACY.</strong>{" "}
              We do not knowingly collect personal information from
              children without appropriate consent.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>8. DATA SECURITY.</strong>{" "}
              Reasonable measures are taken to protect information.
              However, no electronic storage or transmission method
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section className="mb-6">
            <p className="text-left">
              <strong>9. POLICY UPDATES.</strong>{" "}
              This Privacy Policy may be updated from time to time.
              Changes will be reflected on this page.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-left">
              <strong>10. CONTACT US.</strong>{" "}
              If you have any questions regarding this Privacy Policy,
              contact us at:
            </p>

            <a
              href={`mailto:${email}`}
              className="mt-3 inline-block max-w-full break-all font-semibold text-blue-700 underline underline-offset-2"
            >
              {email}
            </a>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-300 pt-5 text-center">
            <p className="text-sm text-gray-600 sm:text-base">
              Effective Date: November 13, 2026
            </p>

            <p className="mt-3 pb-5 font-semibold text-base sm:text-lg">
              Govinda Govinda 🙏
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
