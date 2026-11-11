
import { useEffect, useRef, useState } from "react";

import {
  Menu,
  Play,
  Square,
  Home,
  Share2,
  Star,
  LayoutGrid,
  LockKeyhole,
  Heart,
  ArrowLeft,
} from "lucide-react";

const names = [
  "శ్రీనివాస గోవిందా",
  "శ్రీ వేంకటేశా గోవిందా",
  "భక్తవత్సల గోవిందా",
  "భాగవతప్రియ గోవిందా",
  "నిత్య నిర్మల గోవిందా",
  "నీలమేఘ శ్యామ గోవిందా",
  "పురాణ పురుషా గోవిందా",
  "పుండరీకాక్ష గోవిందా",
  "నంద నందనా గోవిందా",
  "నవనీత చోరా గోవిందా",
  "పశుపాలక శ్రీ గోవిందా",
  "పాప విమోచన గోవిందా",
  "దుష్ట సంహార గోవిందా",
  "దురిత నివారణ గోవిందా",
  "శిష్ట పరిపాలక గోవిందా",
  "కష్ట నివారణ గోవిందా",
  "వజ్ర మకుటధర గోవిందా",
  "వరాహ మూర్తి గోవిందా",
  "గోపీజన లోల గోవిందా",
  "గోవర్ధనోద్ధార గోవిందా",
  "దశరథ నందన గోవిందా",
  "దశముఖ మర్ధన గోవిందా",
  "పక్షి వాహనా గోవిందా",
  "పాండవ ప్రియ గోవిందా",
  "మత్స్య కూర్మ గోవిందా",
  "మధుసూదన హరి గోవిందా",
  "వరాహ నృసింహ గోవిందా",
  "వామన భృగురామ గోవిందా",
  "బలరామానుజ గోవిందా",
  "బౌద్ధ కల్కిధర గోవిందా",
  "వేణుగాన ప్రియ గోవిందా",
  "వేంకట రమణా గోవిందా",
  "సీతా నాయక గోవిందా",
  "శ్రిత పరిపాలక గోవిందా",
  "దరిద్ర జనపోషక గోవిందా",
  "ధర్మ సంస్థాపక గోవిందా",
  "అనాథ రక్షక గోవిందా",
  "ఆపద్భాంధవ గోవిందా",
  "శరణాగత వత్సల గోవిందా",
  "కరుణా సాగర గోవిందా",
  "కమల దళాక్షా గోవిందా",
  "కామిత ఫలదాత గోవిందా",
  "పాప వినాశక గోవిందా",
  "పాహి మురారే గోవిందా",
  "శ్రీ ముద్రాంకిత గోవిందా",
  "శ్రీవత్సాంకిత గోవిందా",
  "ధరణీ నాయక గోవిందా",
  "దినకర తేజా గోవిందా",
  "పద్మావతీ ప్రియ గోవిందా",
  "ప్రసన్న మూర్తి గోవిందా",
  "అభయ హస్త గోవిందా",
  "అక్షయ వరద గోవిందా",
  "శంఖ చక్రధర గోవిందా",
  "శారంగధర గోవిందా",
  "విరాజతీర్థ గోవిందా",
  "విరోధి మర్ధన గోవిందా",
  "సాలగ్రామధర గోవిందా",
  "సహస్రనామ గోవిందా",
  "లక్ష్మీవల్లభ గోవిందా",
  "లక్ష్మణాగ్రజ గోవిందా",
  "కస్తూరి తిలక గోవిందా",
  "కాంచనాంబరధర గోవిందా",
  "గరుడ వాహనా గోవిందా",
  "గజరాజ రక్షక గోవిందా",
  "వానర సేవిత గోవిందా",
  "వారధి బంధన గోవిందా",
  "సప్తగిరీశ గోవిందా",
  "ఏక స్వరూపా గోవిందా",
  "శ్రీరామ కృష్ణ గోవిందా",
  "రఘుకుల నందన గోవిందా",
  "ప్రత్యక్ష దేవ గోవిందా",
  "పరమ దయాకర గోవిందా",
  "వజ్ర కవచధర గోవిందా",
  "వైజయంతి మాల గోవిందా",
  "వడ్డీకాసులవాడా గోవిందా",
  "వసుదేవ తనయ గోవిందా",
  "బిల్వపత్రార్చిత గోవిందా",
  "భిక్షుక సంస్తుత గోవిందా",
  "స్త్రీపుంరూపా గోవిందా",
  "శివకేశవ మూర్తి గోవిందా",
  "బ్రహ్మాండ రూప గోవిందా",
  "భక్త రక్షక గోవిందా",
  "నిత్య కళ్యాణ గోవిందా",
  "నీరజనాభా గోవిందా",
  "హతిరామ ప్రియ గోవిందా",
  "హరిసర్వోత్తమ గోవిందా",
  "జనార్దన మూర్తి గోవిందా",
  "జగత్సాక్షి రూపా గోవిందా",
  "అభిషేక ప్రియ గోవిందా",
  "ఆపన్నివారణ గోవిందా",
  "రత్న కిరీటా గోవిందా",
  "రామానుజ నుత గోవిందా",
  "స్వయం ప్రకాశ గోవిందా",
  "ఆశ్రిత పక్ష గోవిందా",
  "నిత్య శుభప్రద గోవిందా",
  "నిఖిల లోకేశా గోవిందా",
  "ఆనంద రూపా గోవిందా",
  "ఆద్యంత రహితా గోవిందా",
  "ఇహపర దాయక గోవిందా",
  "ఇభరాజ రక్షక గోవిందా",
  "పరమ దయాళో గోవిందా",
  "పద్మనాభ హరి గోవిందా",
  "తిరుమల వాసా గోవిందా",
  "తులసీవన మాలి గోవిందా",
  "శేషాద్రి నిలయ గోవిందా",
  "శేషశయన గోవిందా",
  "శ్రీ శ్రీనివాసా గోవిందా",
  "శ్రీ వేంకటేశా గోవిందా",
];

const chorus =
  "గోవిందా గోవిందా హరి గోవిందా గోకుల నందన గోవిందా";

const APP_URL = "https://your-actual-app-url.com";

const RATE_URL =
  "https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME";

const MORE_APPS_URL =
  "https://play.google.com/store/apps/developer?id=YOUR_DEVELOPER_ID";

const FAVORITES_STORAGE_KEY = "govinda-namalu-favorites";

function createStanzas() {
  const stanzas: string[][] = [];

  stanzas.push(names.slice(0, 4));

  for (let i = 4; i < names.length; i += 2) {
    stanzas.push(names.slice(i, i + 2));
  }

  return stanzas;
}

interface GovindaLyricsProps {
  onPrivacyClick?: () => void;
}

export default function GovindaLyrics({
  onPrivacyClick,
}: GovindaLyricsProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [setPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const stanzas = createStanzas();

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Add or remove a favorite
  const toggleFavorite = (name: string) => {
    setFavorites((previous) => {
      if (previous.includes(name)) {
        return previous.filter((item) => item !== name);
      }

      return [...previous, name];
    });
  };

  // Play song
  const playSong = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  // Stop song
  const stopSong = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  };

  // Share app
  const shareApp = async () => {
    const shareData = {
      title: "Govinda Namalu",
      text: "Listen to Sri Venkateswara Swamy Govinda Namalu.",
      url: APP_URL,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(APP_URL);
        alert("App link copied successfully!");
      } else {
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      console.log("Share cancelled or unavailable:", error);
    }
  };

  // Open external pages
  const openPage = (url: string) => {
    if (
      !url ||
      url.includes("YOUR_") ||
      url.includes("your-")
    ) {
      alert("Please configure this link first.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Open favorites page
  const openFavorites = () => {
    setShowFavorites(true);
    setMenuOpen(false);
  };

  // Open home page
  const openHome = () => {
    setShowFavorites(false);
    setMenuOpen(false);
  };

  return (
    <main className="govinda-app">
      <audio
        ref={audioRef}
        src="/audio/govinda-namalu.mp3"
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* App toolbar */}
      <header className="app-header">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={37} strokeWidth={2} />
        </button>

        <h1>
          {showFavorites ? "My Favorites" : "Govinda Namalu"}
        </h1>

        {showFavorites ? (
          <button
            className="circle-control"
            onClick={openHome}
            aria-label="Back to Home"
          >
            <ArrowLeft size={25} />
          </button>
        ) : (
          <>
            <button
              className="circle-control"
              onClick={playSong}
              aria-label="Play"
            >
              <Play size={27} fill="white" />
            </button>

            <button
              className="circle-control"
              onClick={stopSong}
              aria-label="Stop"
            >
              <Square size={21} fill="white" />
            </button>
          </>
        )}
      </header>

      {/* Navigation drawer */}
      {menuOpen && (
        <div className="drawer-layer">
          <div
            className="drawer-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="navigation-drawer">
            <div className="drawer-banner">
              <img
                src="/images/venkateswara-banner.jpg"
                alt="Lord Venkateswara Swamy"
              />
            </div>

            <nav className="drawer-menu">
              <button
                className={`drawer-item ${
                  !showFavorites ? "selected" : ""
                }`}
                onClick={openHome}
              >
                <Home size={35} fill="currentColor" />
                <span>Home</span>
              </button>

              <button
                className={`drawer-item ${
                  showFavorites ? "selected" : ""
                }`}
                onClick={openFavorites}
              >
                <Heart size={35} />
                <span>My Favorites ({favorites.length})</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => {
                  setMenuOpen(false);
                  shareApp();
                }}
              >
                <Share2 size={35} />
                <span>Share</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => openPage(RATE_URL)}
              >
                <Star size={35} fill="currentColor" />
                <span>Rate</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => openPage(MORE_APPS_URL)}
              >
                <LayoutGrid size={35} />
                <span>More Apps</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => {
                  setMenuOpen(false);
                  onPrivacyClick?.();
                }}
              >
                <LockKeyhole size={35} />
                <span>Privacy Policy</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Lyrics section */}
      <section className="lyrics-list">
        {showFavorites ? (
          favorites.length > 0 ? (
            favorites.map((name, index) => (
              <article className="lyrics-card" key={name}>
                <p className="names-lines">
                  <span>{name}</span>

                  <button
                    className="favorite-button active"
                    onClick={() => toggleFavorite(name)}
                    aria-label={`Remove ${name} from favorites`}
                  >
                    <Heart
                      size={23}
                      fill="currentColor"
                    />
                  </button>
                </p>

                <p className="chorus-line">{chorus}</p>
              </article>
            ))
          ) : (
            <div className="empty-favorites">
              <Heart size={55} />
              <h2>No Favorites Yet</h2>
              <p>
                Tap the heart icon beside any Govinda Namalu
                to save it here.
              </p>

              <button onClick={openHome}>
                Explore Govinda Namalu
              </button>
            </div>
          )
        ) : (
          stanzas.map((stanza, index) => (
            <article className="lyrics-card" key={index}>
              <p className="names-lines">
                {stanza.map((name) => (
                  <span
                    key={name}
                    className="namalu-item"
                  >
                    <span>{name}</span>

                    <button
                      className={`favorite-button ${
                        favorites.includes(name) ? "active" : ""
                      }`}
                      onClick={() => toggleFavorite(name)}
                      aria-label={
                        favorites.includes(name)
                          ? `Remove ${name} from favorites`
                          : `Add ${name} to favorites`
                      }
                    >
                      <Heart
                        size={21}
                        fill={
                          favorites.includes(name)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </span>
                ))}
              </p>

              <p className="chorus-line">{chorus}</p>
            </article>
          ))
        )}
      </section>

      {/* Android-style navigation bar */}
      <div className="android-navigation">
        <div className="navigation-handle" />
      </div>
    </main>
  );
}
