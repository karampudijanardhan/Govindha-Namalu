
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
  songIndex: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  onBack: () => void;
  onTogglePlay: () => void;
  onChangeSong: (direction: number) => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
}

export default function NowPlaying({
  songs,
  songIndex,
  playing,
  currentTime,
  duration,
  muted,
  onBack,
  onTogglePlay,
  onChangeSong,
  onSeek,
  onToggleMute,
}: NowPlayingProps) {
  const song = songs[songIndex];

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  if (!song) {
    return (
      <main className="flex h-dvh items-center justify-center bg-[#00e5e5]">
        No songs available.
      </main>
    );
  }

  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main
      className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#00e5e5] text-black"
      style={{
        minHeight: "320px",
        boxSizing: "border-box",
      }}
    >
      {/* Responsive Header */}
      <header className="z-20 flex h-[clamp(54px,8dvh,72px)] w-full shrink-0 items-center gap-2 bg-[#00796f] px-3 text-white shadow-md sm:gap-3 sm:px-5">
        <button
          onClick={onBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft size={27} />
        </button>

        <h1 className="min-w-0 flex-1 truncate text-base font-semibold sm:text-xl md:text-2xl">
          {song.title}
        </h1>

        <span className="shrink-0 text-xs font-bold sm:text-base">
          {songIndex + 1} / {songs.length}
        </span>
      </header>

      {/* Responsive Main Content */}
      <section className="relative flex min-h-0 w-full flex-1 flex-col items-center">
        {/* Decorative Bells */}
        <div className="flex w-full shrink-0 justify-between px-4 py-2 sm:px-8">
          <Bell
            className="-rotate-[22deg]"
            size={36}
            fill="#ffd500"
            stroke="#ffd500"
          />

          <Bell
            className="rotate-[22deg]"
            size={36}
            fill="#ffd500"
            stroke="#ffd500"
          />
        </div>

        {/* Main Image and Song Navigation */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-14 sm:px-20">
          <img
            src="/images/venkateswara.png"
            alt="Lord Venkateswara Swamy"
            className="max-h-full max-w-full object-contain"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "min(100%, 43dvh)",
              maxWidth: "min(100%, 420px)",
            }}
          />

          <button
            onClick={() => onChangeSong(-1)}
            disabled={songs.length <= 1}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white shadow-md active:scale-95 disabled:opacity-40 sm:left-5 sm:h-14 sm:w-14"
            aria-label="Previous song"
          >
            <SkipBack size={24} fill="black" />
          </button>

          <button
            onClick={() => onChangeSong(1)}
            disabled={songs.length <= 1}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white shadow-md active:scale-95 disabled:opacity-40 sm:right-5 sm:h-14 sm:w-14"
            aria-label="Next song"
          >
            <SkipForward size={24} fill="black" />
          </button>
        </div>

        {/* Responsive Book Image */}
        <div className="flex h-[clamp(45px,9dvh,85px)] w-full shrink-0 items-center justify-center">
          <img
            src="/images/open-book.png"
            alt="Open devotional book"
            className="h-full max-w-[120px] object-contain sm:max-w-[145px]"
          />
        </div>
      </section>

      {/* Responsive Music Controls */}
      <footer
        className="z-30 w-full shrink-0 px-2 pt-2 sm:px-5 sm:pt-3"
        style={{
          paddingBottom:
            "calc(max(env(safe-area-inset-bottom), 24px) + 10px)",
        }}
      >
        <div className="mx-auto flex min-h-[62px] w-full max-w-[650px] items-center gap-1.5 rounded-2xl border border-white/70 bg-[#f4f4f4] px-2 shadow-xl sm:min-h-[76px] sm:gap-3 sm:rounded-full sm:px-5">
          <button
            onClick={onTogglePlay}
            className="flex h-10 w-9 shrink-0 items-center justify-center text-black active:scale-90 sm:w-11"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <Pause size={25} fill="black" />
            ) : (
              <Play size={25} fill="black" />
            )}
          </button>

          <span className="shrink-0 whitespace-nowrap text-[10px] font-medium tabular-nums sm:text-sm">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={Math.min(currentTime, duration || 1)}
            onChange={(event) => onSeek(Number(event.target.value))}
            style={{
              background: `linear-gradient(to right, #00796f ${progress}%, #bdbdbd ${progress}%)`,
            }}
            className="h-2 min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-[#00796f]"
            aria-label="Song progress"
          />

          <span className="shrink-0 whitespace-nowrap text-[10px] font-medium tabular-nums sm:text-sm">
            {formatTime(duration)}
          </span>

          <button
            onClick={onToggleMute}
            className="flex h-10 w-9 shrink-0 items-center justify-center text-black active:scale-90 sm:w-11"
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
