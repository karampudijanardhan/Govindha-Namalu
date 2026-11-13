import { useEffect, useRef, useState } from "react";
import {
  getFavorites,
  toggleFavorite as toggleStoredFavorite,
} from "../utils/libraryStorage";

import {
  Menu,
  Play,
  LockKeyhole,
  Heart,
  ArrowLeft,
  BookHeart,
  Sunrise,
  ScrollText,
  Music2,
  AudioLines,
  Sparkles,
  BookOpenText,
  Bird,
  Flower2,
  Image as ImageIcon,
} from "lucide-react";

import NowPlaying from "./NowPlaying";
import Wallpapers from "./Wallpapers";

// =========================================
// GOVINDA NAMALU - TELUGU LYRICS
// =========================================

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

// =========================================
// TYPES
// =========================================

type Song = {
  title: string;
  src: string;
};

type SongCategory =
  | "govinda"
  | "suprabhatam"
  | "stotram"
  | "annamacharya"
  | "ghantasala"
  | "om-namo"
  | "vishnu-sahasranamam"
  | "garuda-gamana"
  | "narayana-govinda";

// =========================================
// CATEGORY ICONS
// =========================================

const getCategoryIcon = (category: SongCategory) => {
  const iconProps = {
    size: 30,
    strokeWidth: 2,
  };

  switch (category) {
    case "govinda":
      return <BookHeart {...iconProps} />;
    case "suprabhatam":
      return <Sunrise {...iconProps} />;
    case "stotram":
      return <ScrollText {...iconProps} />;
    case "annamacharya":
      return <Music2 {...iconProps} />;
    case "ghantasala":
      return <AudioLines {...iconProps} />;
    case "om-namo":
      return <Sparkles {...iconProps} />;
    case "vishnu-sahasranamam":
      return <BookOpenText {...iconProps} />;
    case "garuda-gamana":
      return <Bird {...iconProps} />;
    case "narayana-govinda":
      return <Flower2 {...iconProps} />;
    default:
      return <Music2 {...iconProps} />;
  }
};

const chorus = "గోవిందా హరి గోవిందా గోకుల నందన గోవిందా";

// =========================================
// SONG CATEGORIES
// =========================================

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
        src: "/audio/Annamacharya-Keerthanalu/Nigama Nagamamta - SenSongsMp3.Co (1).mp3",
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
  {
    id: "ghantasala",
    title: "Ghantasala Venkateswara Swamy Songs",
    songs: [
      {
        title: "Nama Venkatesha",
        src: "/audio/GANTASALA ALL TIME Hits.mp3",
      },
    ],
  },
  {
    id: "om-namo",
    title: "Om Namo Venkateshaya",
    songs: [
      {
        title: "Om Namo Venkateshaya",
        src: "/audio/Om Namo Venkateshaya.mp3",
      },
    ],
  },
  {
    id: "vishnu-sahasranamam",
    title: "Vishnu Sahasranamam",
    songs: [
      {
        title: "Vishnu Sahasranamam",
        src: "/audio/Vishnu Sahasranamam.mp3",
      },
    ],
  },
  {
    id: "garuda-gamana",
    title: "Garuda Gamana Tava",
    songs: [
      {
        title: "Garuda Gamana Tava",
        src: "/audio/Garuda Gamana Tava.mp3",
      },
    ],
  },
  {
    id: "narayana-govinda",
    title: "Narayana Narayana Jaya Govinda Hare",
    songs: [
      {
        title: "Narayana Narayana Jaya Govinda Hare",
        src: "/audio/Narayana Narayana Jaya Govinda Hare.mp3",
      },
    ],
  },
];

// =========================================
// LYRICS CARD CREATION
// =========================================

function createStanzas() {
  const stanzas: string[][] = [];

  stanzas.push(names.slice(0, 4));

  for (let i = 4; i < names.length; i += 2) {
    stanzas.push(names.slice(i, i + 2));
  }

  return stanzas;
}

// =========================================
// COMPONENT PROPS
// =========================================

interface GovindaLyricsProps {
  onPrivacyClick?: () => void;
}

// =========================================
// MAIN COMPONENT
// =========================================

export default function GovindaLyrics({
  onPrivacyClick,
}: GovindaLyricsProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestRef = useRef(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWallpapers, setShowWallpapers] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);

  const [activeCategory, setActiveCategory] =
    useState<SongCategory>("govinda");

  const [playerSongs, setPlayerSongs] = useState<Song[]>(
    songCategories[0].songs
  );

  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [requestId, setRequestId] = useState(0);

  // =========================================
  // AUDIO SONG FAVORITES
  // =========================================

  const [favorites, setFavorites] = useState<string[]>(() =>
    getFavorites()
  );

  // =========================================
  // WALLPAPER FAVORITES
  // =========================================

  const [wallpaperFavorites, setWallpaperFavorites] = useState<number[]>(
    () => {
      try {
        const saved = localStorage.getItem(
          "govinda_wallpaper_favorites"
        );

        const parsed: unknown = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed)
          ? parsed.filter(
              (id): id is number =>
                Number.isInteger(id) && id > 0
            )
          : [];
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        "govinda_wallpaper_favorites",
        JSON.stringify(wallpaperFavorites)
      );
    } catch (error) {
      console.error("Unable to save wallpaper favorites:", error);
    }
  }, [wallpaperFavorites]);

  const handleWallpaperFavorite = (id: number) => {
    setWallpaperFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const stanzas = createStanzas();

  const currentCategory = songCategories.find(
    (item) => item.id === activeCategory
  );

  const currentSong = playerSongs[songIndex];

  // =========================================
  // FAVORITE SONGS LIST
  // =========================================

  const favoriteSongs = songCategories.flatMap((category) =>
    category.songs
      .filter((song) => favorites.includes(song.src))
      .map((song) => ({
        ...song,
        categoryId: category.id,
        categoryTitle: category.title,
      }))
  );

  const handleSongFavorite = () => {
    if (!currentSong) return;

    const updated = toggleStoredFavorite(currentSong.src);
    setFavorites(updated);
  };

  // =========================================
  // AUDIO PLAYBACK
  // =========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong || requestId === 0) {
      return;
    }

    const attempt = ++playRequestRef.current;

    audio.pause();
    audio.src = currentSong.src;
    audio.load();

    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);

    audio
      .play()
      .then(() => {
        if (attempt === playRequestRef.current) {
          setPlaying(true);
        }
      })
      .catch((error: unknown) => {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (attempt !== playRequestRef.current) {
          return;
        }

        setPlaying(false);

        console.error("Audio playback failed:", {
          title: currentSong.title,
          src: currentSong.src,
          error,
        });
      });

    // Keep audio playing when switching screens.
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

  // =========================================
  // SELECT CATEGORY
  // =========================================

  const selectCategory = (category: SongCategory) => {
    const selected = songCategories.find(
      (item) => item.id === category
    );

    if (!selected) return;

    setActiveCategory(category);
    setShowFavorites(false);
    setShowWallpapers(false);
    setMenuOpen(false);

    if (category === "govinda") {
      setPlayerVisible(false);
      return;
    }

    setPlayerSongs(selected.songs);
    setSongIndex(0);
    setPlayerVisible(true);

    setRequestId((previous) => previous + 1);
  };

  // =========================================
  // OPEN SONG PLAYER
  // =========================================

  const openSongPlayer = (songs: Song[], index: number) => {
    if (index < 0 || index >= songs.length) return;

    setPlayerSongs(songs);
    setSongIndex(index);
    setPlayerVisible(true);
    setShowFavorites(false);
    setShowWallpapers(false);
    setMenuOpen(false);

    setRequestId((previous) => previous + 1);
  };

  // =========================================
  // NEXT / PREVIOUS SONG
  // =========================================

  const changeSong = (direction: number) => {
    if (playerSongs.length <= 1) return;

    const next =
      (songIndex + direction + playerSongs.length) %
      playerSongs.length;

    setSongIndex(next);
    setRequestId((previous) => previous + 1);
  };

  // =========================================
  // PLAY / PAUSE
  // =========================================

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      const attempt = ++playRequestRef.current;

      try {
        await audio.play();

        if (attempt === playRequestRef.current) {
          setPlaying(true);
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Unable to play audio:", error);
        setPlaying(false);
      }
    } else {
      playRequestRef.current++;

      audio.pause();
      setPlaying(false);
    }
  };

  // =========================================
  // SEEK AUDIO
  // =========================================

  const handleSeek = (time: number) => {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(time)) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  // =========================================
  // MUTE / UNMUTE
  // =========================================

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  // =========================================
  // FAVORITES SCREEN
  // =========================================

  const openFavorites = () => {
    setShowFavorites(true);
    setShowWallpapers(false);
    setPlayerVisible(false);
    setMenuOpen(false);
  };

  // =========================================
  // HOME SCREEN
  // =========================================

  const openHome = () => {
    setActiveCategory("govinda");
    setShowFavorites(false);
    setShowWallpapers(false);
    setPlayerVisible(false);
    setMenuOpen(false);
  };

  // =========================================
  // OPEN EXTERNAL PAGE
  // =========================================

  
  // =========================================
  // WHEN SONG ENDS
  // =========================================

  const handleAudioEnded = () => {
    if (playerSongs.length > 1) {
      changeSong(1);
    } else {
      setPlaying(false);
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* PERSISTENT AUDIO ELEMENT */}

      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current?.currentTime ?? 0)
        }
        onLoadedMetadata={() =>
          setDuration(audioRef.current?.duration ?? 0)
        }
        onDurationChange={() =>
          setDuration(audioRef.current?.duration ?? 0)
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleAudioEnded}
        onError={() => {
          const audio = audioRef.current;

          if (audio?.error) {
            console.error(
              "Audio file error:",
              audio.currentSrc,
              audio.error.code,
              audio.error.message
            );
          }
        }}
      />

      {/* WALLPAPERS / PLAYER / LYRICS */}

      {showWallpapers ? (
        <Wallpapers
          onBack={() => setShowWallpapers(false)}
          favorites={wallpaperFavorites}
          onToggleFavorite={handleWallpaperFavorite}
        />
      ) : playerVisible && currentSong ? (
        <NowPlaying
          songs={playerSongs}
          songIndex={songIndex}
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          muted={muted}
          isFavorite={favorites.includes(currentSong.src)}
          onToggleFavorite={handleSongFavorite}
          onBack={() => setMenuOpen(true)}
          onTogglePlay={togglePlay}
          onChangeSong={changeSong}
          onSeek={handleSeek}
          onToggleMute={toggleMute}
        />
      ) : (
        <main className="govinda-app">
          {/* HEADER */}

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
                onClick={() =>
                  openSongPlayer(songCategories[0].songs, 0)
                }
                aria-label="Play Govinda Namalu"
              >
                <Play size={27} fill="white" />
              </button>
            ) : null}
          </header>

          {/* LYRICS AND FAVORITES */}

          <section className="lyrics-list">
            {showFavorites ? (
              favoriteSongs.length > 0 ||
              wallpaperFavorites.length > 0 ? (
                <>
                  {/* FAVORITE AUDIO SONGS */}

                  {favoriteSongs.map((song) => (
                    <article
                      className="lyrics-card"
                      key={song.src}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h2 className="font-semibold">
                            {song.title}
                          </h2>

                          <p className="text-sm opacity-70">
                            {song.categoryTitle}
                          </p>
                        </div>

                        <button
                          className="favorite-button active"
                          onClick={() => {
                            const updated = toggleStoredFavorite(
                              song.src
                            );

                            setFavorites(updated);
                          }}
                          aria-label={`Remove ${song.title} from favorites`}
                          title="Remove from Favorites"
                        >
                          <Heart
                            size={23}
                            fill="currentColor"
                          />
                        </button>

                        <button
                          onClick={() => {
                            const category = songCategories.find(
                              (item) =>
                                item.id === song.categoryId
                            );

                            if (!category) return;

                            const index = category.songs.findIndex(
                              (item) => item.src === song.src
                            );

                            openSongPlayer(category.songs, index);
                          }}
                          aria-label={`Play ${song.title}`}
                          title="Play song"
                        >
                          <Play
                            size={24}
                            fill="currentColor"
                          />
                        </button>
                      </div>
                    </article>
                  ))}

                  {/* FAVORITE WALLPAPERS */}

                  {wallpaperFavorites.map((id) => (
                    <article
                      className="lyrics-card"
                      key={`wallpaper-${id}`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`/images/wallpapers/balaji-${id}.png`}
                          alt={`Balaji Wallpaper ${id}`}
                          className="h-24 w-16 rounded-lg object-cover"
                          loading="lazy"
                        />

                        <div className="min-w-0 flex-1">
                          <h2 className="font-semibold">
                            Balaji Wallpaper {id}
                          </h2>

                          <p className="text-sm opacity-70">
                            Sri Venkateswara Swamy Wallpaper
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setShowFavorites(false);
                              setShowWallpapers(true);
                              setMenuOpen(false);
                            }}
                            className="mt-2 text-sm font-semibold text-[#00796f]"
                          >
                            Open Wallpapers
                          </button>
                        </div>

                        <button
                          type="button"
                          className="favorite-button active"
                          onClick={() =>
                            handleWallpaperFavorite(id)
                          }
                          aria-label={`Remove wallpaper ${id} from favorites`}
                          title="Remove from Favorites"
                        >
                          <Heart
                            size={23}
                            fill="currentColor"
                          />
                        </button>
                      </div>
                    </article>
                  ))}
                </>
              ) : (
                <div className="empty-favorites">
                  <Heart size={55} />

                  <h2>No Favorites Yet</h2>

                  <p>
                    Tap the heart on a song or wallpaper to save it here.
                  </p>

                  <button onClick={openHome}>
                    Explore Songs
                  </button>
                </div>
              )
            ) : activeCategory === "govinda" ? (
              stanzas.map((stanza, index) => (
                <article
                  className="lyrics-card"
                  key={index}
                >
                  <p className="names-lines">
                    {stanza.map((name, nameIndex) => (
                      <span
                        key={nameIndex}
                        className="namalu-item"
                      >
                        {name}
                      </span>
                    ))}
                  </p>

                  <p className="chorus-line">
                    {chorus}
                  </p>
                </article>
              ))
            ) : null}
          </section>

          <div className="android-navigation">
            <div className="navigation-handle" />
          </div>
        </main>
      )}

      {/* NAVIGATION DRAWER */}

      {menuOpen && (
        <div
          className="drawer-layer"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
          }}
        >
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
                    !showWallpapers &&
                    activeCategory === category.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    selectCategory(category.id)
                  }
                >
                  {getCategoryIcon(category.id)}
                  <span>{category.title}</span>
                </button>
              ))}

              {/* MY FAVORITES */}

              <button
                className={`drawer-item ${
                  showFavorites ? "selected" : ""
                }`}
                onClick={openFavorites}
              >
                <Heart size={30} />

                <span>
                  My Favorites (
                  {favorites.length + wallpaperFavorites.length})
                </span>
              </button>

              {/* WALLPAPERS */}

              <button
                className={`drawer-item ${
                  showWallpapers ? "selected" : ""
                }`}
                onClick={() => {
                  setShowWallpapers(true);
                  setShowFavorites(false);
                  setMenuOpen(false);
                }}
              >
                <ImageIcon size={30} />
                <span>Wallpapers</span>
              </button>

              {/* PRIVACY POLICY */}

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

              {/* RETURN TO PLAYER */}

              {playerVisible && (
                <button
                  className="drawer-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <Play size={30} />
                  <span>Return to Now Playing</span>
                </button>
              )}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}