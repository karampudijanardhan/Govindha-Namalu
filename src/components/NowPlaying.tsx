
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
  requestId: number;
  onBack: () => void;
}

export default function NowPlaying({
  songs,
  initialIndex = 0,
  requestId,
  onBack,
}: NowPlayingProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [songIndex, setSongIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const song = songs[songIndex];

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // Load and play a newly selected song.
  const loadSong = (index: number, autoplay: boolean) => {
    const audio = audioRef.current;
    const selectedSong = songs[index];

    if (!audio || !selectedSong) return;

    setSongIndex(index);
    setCurrentTime(0);
    setDuration(0);

    audio.pause();
    audio.src = selectedSong.src;
    audio.load();

    if (autoplay) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setPlaying(false);
      });
    }
  };

  // A new request means the user selected another song/category.
  useEffect(() => {
    if (requestId === 0) return;

    loadSong(initialIndex, true);
    // requestId changes only when a new song is selected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

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

  const changeSong = (direction: number) => {
    if (songs.length <= 1) return;

    const nextIndex =
      (songIndex + direction + songs.length) % songs.length;

    loadSong(nextIndex, true);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(value)) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (!song) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#00e5e5]">
        No songs available.
      </main>
    );
  }

  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main className="flex h-[100dvh] min-h-[420px] w-full flex-col overflow-hidden bg-[#00e5e5] text-black">
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current?.currentTime ?? 0);
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current?.duration ?? 0);
        }}
        onDurationChange={() => {
          setDuration(audioRef.current?.duration ?? 0);
        }}
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

      <header className="z-20 flex h-16 w-full shrink-0 items-center gap-3 bg-[#00796f] px-4 text-white shadow-md sm:h-[72px] sm:px-6">
        <button
          onClick={onBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
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

      <section className="relative flex min-h-0 w-full flex-1 flex-col items-center">
        <div className="flex w-full shrink-0 justify-between px-4 pt-3 sm:px-8 sm:pt-4">
          <Bell
            size={42}
            fill="#ffd500"
            stroke="#ffd500"
            className="-rotate-[22deg] sm:h-[55px] sm:w-[55px]"
          />

          <Bell
            size={42}
            fill="#ffd500"
            stroke="#ffd500"
            className="rotate-[22deg] sm:h-[55px] sm:w-[55px]"
          />
        </div>

        <div className="relative flex w-full min-h-0 flex-1 items-center justify-center">
          <img
            src="/images/venkateswara.png"
            alt="Lord Venkateswara Swamy"
            className="block h-auto w-auto max-h-[min(38dvh,330px)] max-w-[65vw] object-contain sm:max-h-[min(46dvh,420px)] sm:max-w-[400px] lg:max-h-[min(55dvh,470px)] lg:max-w-[440px]"
          />

          <button
            onClick={() => changeSong(-1)}
            disabled={songs.length <= 1}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white shadow-md transition hover:bg-gray-100 active:scale-95 disabled:opacity-40 sm:left-[max(24px,calc(50%-300px))] sm:h-14 sm:w-14"
            aria-label="Previous song"
          >
            <SkipBack size={25} fill="black" />
          </button>

          <button
            onClick={() => changeSong(1)}
            disabled={songs.length <= 1}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white shadow-md transition hover:bg-gray-100 active:scale-95 disabled:opacity-40 sm:right-[max(24px,calc(50%-300px))] sm:h-14 sm:w-14"
            aria-label="Next song"
          >
            <SkipForward size={25} fill="black" />
          </button>
        </div>

        <div className="flex h-[75px] w-full shrink-0 -translate-y-2 items-center justify-center sm:h-[100px]">
          <img
            src="/images/open-book.png"
            alt="Open devotional book"
            className="h-[65px] w-[105px] object-contain drop-shadow-sm sm:h-[90px] sm:w-[140px]"
          />
        </div>
      </section>

      <footer className="z-30 flex w-full shrink-0 justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-2 sm:px-6 sm:pb-7">
        <div className="flex min-h-[68px] w-full max-w-[540px] items-center gap-2 rounded-full border border-white/70 bg-[#f4f4f4] px-3 shadow-xl sm:min-h-[76px] sm:gap-3 sm:px-5">
          <button
            onClick={togglePlay}
            className="flex h-10 w-9 shrink-0 items-center justify-center text-black transition active:scale-90"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <Pause size={24} fill="black" />
            ) : (
              <Play size={24} fill="black" />
            )}
          </button>

          <span className="shrink-0 whitespace-nowrap text-[11px] font-medium tabular-nums sm:text-sm">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={Math.min(currentTime, duration || 1)}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #00796f ${progress}%, #bdbdbd ${progress}%)`,
            }}
            className="h-[6px] min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-[#00796f]"
            aria-label="Song progress"
          />

          <span className="shrink-0 whitespace-nowrap text-[11px] font-medium tabular-nums sm:text-sm">
            {formatTime(duration)}
          </span>

          <button
            onClick={handleMute}
            className="flex h-10 w-8 shrink-0 items-center justify-center text-black transition active:scale-90"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>
      </footer>
    </main>
  );
}
