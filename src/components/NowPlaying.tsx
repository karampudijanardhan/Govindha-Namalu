
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export interface PlayerSong {
  title: string;
  src: string;
}

interface NowPlayingProps {
  songs: PlayerSong[];
  initialIndex?: number;
  onBack: () => void;
}

export default function NowPlaying({
  songs,
  initialIndex = 0,
  onBack,
}: NowPlayingProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [songIndex, setSongIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const song = songs[songIndex];

  // Load selected song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    audio.pause();
    audio.src = song.src;
    audio.load();

    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song?.src]);

  // Play / Pause
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  // Previous / Next
  const changeSong = (direction: number) => {
    if (songs.length <= 1) return;

    setSongIndex((previous) =>
      (previous + direction + songs.length) % songs.length
    );
  };

  // Format audio time
  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // Seek audio
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  if (!song) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#00e5e5]">
        No songs available.
      </main>
    );
  }

  return (
    <main className="flex h-[100dvh] min-h-[500px] w-full flex-col overflow-hidden bg-[#00e5e5] text-black">

      {/* AUDIO */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current?.currentTime ?? 0)
        }
        onLoadedMetadata={() =>
          setDuration(audioRef.current?.duration ?? 0)
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          if (songs.length > 1) {
            changeSong(1);
          } else {
            setPlaying(false);
          }
        }}
      />

      {/* HEADER */}
      <header className="z-20 flex h-[64px] w-full shrink-0 items-center gap-3 bg-[#00796f] px-4 text-white shadow-md sm:h-[72px] sm:px-6">

        <button
          onClick={onBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={27} />
        </button>

        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold sm:text-2xl">
          {song.title}
        </h1>

        <span className="shrink-0 text-sm font-bold sm:text-lg">
          {songIndex + 1} / {songs.length}
        </span>
      </header>

      {/* MAIN SCREEN */}
      <section className="relative flex min-h-0 w-full flex-1 flex-col items-center">

        {/* BELLS */}
        <div className="flex w-full shrink-0 justify-between px-4 pt-3 sm:px-8 sm:pt-4 lg:px-12">
          <Bell
            size={44}
            fill="#ffd500"
            stroke="#ffd500"
            className="-rotate-[22deg] sm:h-[55px] sm:w-[55px]"
          />

          <Bell
            size={44}
            fill="#ffd500"
            stroke="#ffd500"
            className="rotate-[22deg] sm:h-[55px] sm:w-[55px]"
          />
        </div>

        {/* DEITY IMAGE AND NAVIGATION */}
        <div className="relative flex w-full min-h-0 flex-1 items-center justify-center">

          <img
            src="/images/venkateswara.png"
            alt="Lord Venkateswara Swamy"
            className="
              block h-auto w-auto
              max-h-[min(38dvh,330px)]
              max-w-[65vw]
              object-contain
              sm:max-h-[min(46dvh,420px)]
              sm:max-w-[400px]
              lg:max-h-[min(55dvh,470px)]
              lg:max-w-[440px]
            "
          />

          {/* PREVIOUS */}
          <button
            onClick={() => changeSong(-1)}
            disabled={songs.length <= 1}
            className="
              absolute left-3 top-1/2
              flex h-11 w-11 -translate-y-1/2
              items-center justify-center
              rounded-full border border-black
              bg-white shadow-md transition
              hover:bg-gray-100 active:scale-95
              disabled:opacity-40
              sm:left-[max(24px,calc(50%-300px))]
              sm:h-14 sm:w-14
              lg:left-[max(40px,calc(50%-360px))]
            "
            aria-label="Previous song"
          >
            <SkipBack size={25} fill="black" />
          </button>

          {/* NEXT */}
          <button
            onClick={() => changeSong(1)}
            disabled={songs.length <= 1}
            className="
              absolute right-3 top-1/2
              flex h-11 w-11 -translate-y-1/2
              items-center justify-center
              rounded-full border border-black
              bg-white shadow-md transition
              hover:bg-gray-100 active:scale-95
              disabled:opacity-40
              sm:right-[max(24px,calc(50%-300px))]
              sm:h-14 sm:w-14
              lg:right-[max(40px,calc(50%-360px))]
            "
            aria-label="Next song"
          >
            <SkipForward size={25} fill="black" />
          </button>
        </div>

        {/* OPEN BOOK IMAGE */}
        <div className="
          flex h-[90px] w-full shrink-0
          -translate-y-3
          items-center justify-center
          sm:h-[105px]
        ">
          <img
            src="/images/open-book.png"
            alt="Open devotional book"
            className="
              h-[75px] w-[115px]
              object-contain drop-shadow-sm
              sm:h-[90px] sm:w-[140px]
            "
          />
        </div>
      </section>

      {/* AUDIO PLAYER WITH EXTRA BOTTOM SPACE */}
      
<footer className="
  z-30 flex w-full shrink-0 justify-center
  px-3
  pt-3
  pb-[calc(env(safe-area-inset-bottom)+48px)]
  sm:px-6
  sm:pt-4
  sm:pb-[56px]
  lg:pb-[64px]
">


        <div className="
          flex h-[70px] w-full max-w-[500px]
          items-center gap-2
          rounded-full border border-white/70
          bg-[#f4f4f4] px-3 shadow-lg
          sm:h-[76px] sm:gap-3 sm:px-6
          lg:max-w-[540px]
        ">

          {/* PLAY / PAUSE */}
          <button
            onClick={togglePlay}
            className="flex h-10 w-8 shrink-0 items-center justify-center text-black transition active:scale-90"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <Pause size={23} fill="black" />
            ) : (
              <Play size={23} fill="black" />
            )}
          </button>

          {/* CURRENT TIME */}
          <span className="shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums sm:text-sm">
            {formatTime(currentTime)}
          </span>

          {/* PROGRESS */}
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={Math.min(currentTime, duration || 1)}
            onChange={handleSeek}
            className="h-[5px] min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-[#bdbdbd] accent-black"
            aria-label="Song progress"
          />

          {/* TOTAL DURATION */}
          <span className="shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums sm:text-sm">
            {formatTime(duration)}
          </span>

          {/* VOLUME */}
          <button
            onClick={() => setMuted((previous) => !previous)}
            className="flex h-10 w-8 shrink-0 items-center justify-center text-black transition active:scale-90"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX size={22} />
            ) : (
              <Volume2 size={22} />
            )}
          </button>

        </div>
      </footer>
    </main>
  );
}
