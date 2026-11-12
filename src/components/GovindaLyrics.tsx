import { useEffect, useState } from "react";

import {
  Menu,
  Play,
  Home,
  LayoutGrid,
  LockKeyhole,
  Heart,
  ArrowLeft,
} from "lucide-react";

import NowPlaying from "./NowPlaying";

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

type Song = {
  title: string;
  src: string;
};

type SongCategory =
  | "govinda"
  | "suprabhatam"
  | "stotram"
  | "annamacharya";

const songCategories: {
  id: SongCategory;
  title: string;
  songs: Song[];
}[] = [
  {
    id: "govinda",
    title: "Govinda Namalu",
    songs: [
      {
        title: "Govinda Namalu",
        src: "/audio/govinda-namalu.mp3",
      },
    ],
  },
  {
    id: "suprabhatam",
    title: "Sri Venkateswara Suprabhatam",
    songs: [
      {
        title: "Sri Venkateswara Suprabhatham",
        src: "/audio/MS Subbulakshmi Sri Venkateswara Suprabhatham Lyrical Video.mp3",
      },
    ],
  },
  {
    id: "stotram",
    title: "Venkateswara Stotram",
    songs: [
      {
        title: "Sri Venkatesha Stotram",
        src: "/audio/Sri Venkatesha Stotram - Invoking the Lord's Mercy - ISKCON Bangalore Music.mp3",
      },
    ],
  },
  {
    id: "annamacharya",
    title: "Annamacharya Keerthanalu",
    songs: [
      {
        title: "Adigo Alladigo",
        src: "/audio/Annamacharya-Keerthanalu/Adigo Alladigo - SenSongsMp3.Co.mp3",
      },
      {
        title: "Antaryami Alasithi",
        src: "/audio/Annamacharya-Keerthanalu/Antaryami Alasithi- SenSongsMp3.Co.mp3",
      },
      {
        title: "Ee Mako",
        src: "/audio/Annamacharya-Keerthanalu/Ee Mako - SenSongsMp3.Co.mp3",
      },
      {
        title: "Govindasritha",
        src: "/audio/Annamacharya-Keerthanalu/Govindasritha - SenSongsMp3.Co.mp3",
      },
      {
        title: "Kalaganti Kalaganti",
        src: "/audio/Annamacharya-Keerthanalu/Kalaganti Kalaganti - SenSongsMp3.Co.mp3",
      },
      {
        title: "Kondalalo Nelakonna",
        src: "/audio/Annamacharya-Keerthanalu/Kondalalo Nelakonna - SenSongsMp3.Co.mp3",
      },
      {
        title: "Nigama Nagamanta",
        src: "/audio/Annamacharya-Keerthanalu/Nigama Nagamanta - SenSongsMp3.Co (1).mp3",
      },
      {
        title: "Podagantimayya Purusothama",
        src: "/audio/Annamacharya-Keerthanalu/Podagantimayya Purusothama - SenSongsMp3.Co.mp3",
      },
      {
        title: "Telugu Padaniki",
        src: "/audio/Annamacharya-Keerthanalu/Telugu Padaniki - SenSongsMp3.Co.mp3",
      },
      {
        title: "Tirumala Konda",
        src: "/audio/Annamacharya-Keerthanalu/Tirumala konda Video song - Annamayya - Volga Devotional.mp3",
      },
      {
        title: "Vinaro Bhagyamu",
        src: "/audio/Annamacharya-Keerthanalu/Vinaro Bhagyamu - SenSongsMp3.Co.mp3",
      },
      {
        title: "Vinnapalu Vinavale",
        src: "/audio/Annamacharya-Keerthanalu/Vinnapalu Vinavale- SenSongsMp3.Co.mp3",
      },
    ],
  },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [activeCategory, setActiveCategory] =
    useState<SongCategory>("govinda");

  const [nowPlayingIndex, setNowPlayingIndex] =
    useState<number | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const stanzas = createStanzas();

  const currentCategory = songCategories.find(
    (category) => category.id === activeCategory
  );

  const currentSongs = currentCategory?.songs ?? [];

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Unable to save favorites:", error);
    }
  }, [favorites]);

  // Add or remove favorites
  const toggleFavorite = (name: string) => {
    setFavorites((previous) => {
      if (previous.includes(name)) {
        return previous.filter((item) => item !== name);
      }

      return [...previous, name];
    });
  };

  // Menu category navigation
  const selectCategory = (category: SongCategory) => {
    const selected = songCategories.find(
      (item) => item.id === category
    );

    if (!selected) return;

    setActiveCategory(category);
    setShowFavorites(false);
    setMenuOpen(false);

    if (category === "govinda") {
      setNowPlayingIndex(null);
    } else {
      setNowPlayingIndex(0);
    }
  };

  // Open a selected song from the song list
  const openSongPlayer = (index: number) => {
    if (index < 0 || index >= currentSongs.length) return;

    setNowPlayingIndex(index);
    setShowFavorites(false);
    setMenuOpen(false);
  };

  // Open external page
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

  // Favorites page
  const openFavorites = () => {
    setShowFavorites(true);
    setMenuOpen(false);
    setNowPlayingIndex(null);
  };

  // Home page
  const openHome = () => {
    selectCategory("govinda");
  };

  // Dedicated Now Playing screen
  if (nowPlayingIndex !== null) {
    return (
      <NowPlaying
        songs={currentSongs}
        initialIndex={nowPlayingIndex}
        onBack={() => {
          setNowPlayingIndex(null);
          setActiveCategory("govinda");
          setShowFavorites(false);
          setMenuOpen(false);
        }}
      />
    );
  }

  return (
    <main className="govinda-app">
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
          {showFavorites
            ? "My Favorites"
            : currentCategory?.title}
        </h1>

        {showFavorites ? (
          <button
            className="circle-control"
            onClick={openHome}
            aria-label="Back to Home"
          >
            <ArrowLeft size={25} />
          </button>
        ) : activeCategory === "govinda" ? (
          <button
            className="circle-control"
            onClick={() => openSongPlayer(0)}
            aria-label="Play Govinda Namalu"
          >
            <Play size={27} fill="white" />
          </button>
        ) : null}
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
              {songCategories.map((category) => (
                <button
                  key={category.id}
                  className={`drawer-item ${
                    !showFavorites &&
                    activeCategory === category.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => selectCategory(category.id)}
                >
                  <Home size={30} />
                  <span>{category.title}</span>
                </button>
              ))}

              <button
                className={`drawer-item ${
                  showFavorites ? "selected" : ""
                }`}
                onClick={openFavorites}
              >
                <Heart size={30} />
                <span>My Favorites ({favorites.length})</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => openPage(MORE_APPS_URL)}
              >
                <LayoutGrid size={30} />
                <span>More Apps</span>
              </button>

              <button
                className="drawer-item"
                onClick={() => {
                  setMenuOpen(false);
                  onPrivacyClick?.();
                }}
              >
                <LockKeyhole size={30} />
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
            favorites.map((name) => (
              <article className="lyrics-card" key={name}>
                <p className="names-lines">
                  <span>{name}</span>

                  <button
                    className="favorite-button active"
                    onClick={() => toggleFavorite(name)}
                    aria-label={`Remove ${name} from favorites`}
                  >
                    <Heart size={23} fill="currentColor" />
                  </button>
                </p>

                <p className="chorus-line">{chorus}</p>
              </article>
            ))
          ) : (
            <div className="empty-favorites">
              <Heart size={55} />
              <h2>No Favorites Yet</h2>
              <p>No favorite Govinda Namalu have been saved yet.</p>

              <button onClick={openHome}>
                Explore Govinda Namalu
              </button>
            </div>
          )
        ) : activeCategory === "govinda" ? (
          stanzas.map((stanza, index) => (
            <article className="lyrics-card" key={index}>
              <p className="names-lines">
                {stanza.map((name) => (
                  <span key={name} className="namalu-item">
                    <span>{name}</span>
                  </span>
                ))}
              </p>

              <p className="chorus-line">{chorus}</p>
            </article>
          ))
        ) : null}
      </section>

      {/* Android-style navigation bar */}
      <div className="android-navigation">
        <div className="navigation-handle" />
      </div>
    </main>
  );
}