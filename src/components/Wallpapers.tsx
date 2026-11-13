
import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface WallpapersProps {
  onBack?: () => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

interface Wallpaper {
  id: number;
  title: string;
  src: string;
}

const WALLPAPER_COUNT = 21;

const wallpapers: Wallpaper[] = Array.from(
  { length: WALLPAPER_COUNT },
  (_, index) => ({
    id: index + 1,
    title: `Balaji Wallpaper ${index + 1}`,
    src: `/images/wallpapers/balaji-${index + 1}.png`,
  })
);

const Wallpapers: React.FC<WallpapersProps> = ({
  onBack,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedWallpaper, setSelectedWallpaper] =
    useState<Wallpaper | null>(null);

  const isFavorite = (id: number) => favorites.includes(id);

  // Download wallpaper
  const downloadWallpaper = async (wallpaper: Wallpaper) => {
    try {
      const response = await fetch(wallpaper.src);

      if (!response.ok) {
        throw new Error("Wallpaper not found");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `Govinda-Namalu-${wallpaper.id}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Unable to download wallpaper. Please try again.");
    }
  };

  // Share wallpaper
  const shareWallpaper = async (wallpaper: Wallpaper) => {
    try {
      const response = await fetch(wallpaper.src);

      if (!response.ok) {
        throw new Error("Wallpaper not found");
      }

      const blob = await response.blob();

      const file = new File(
        [blob],
        `Govinda-Namalu-${wallpaper.id}.png`,
        { type: blob.type || "image/png" }
      );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "Govinda Namalu Wallpaper",
          text: "Govinda Govinda 🙏",
          files: [file],
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Govinda Namalu Wallpaper",
          text: "Govinda Govinda 🙏",
          url: window.location.origin + wallpaper.src,
        });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.origin + wallpaper.src
        );
        alert("Wallpaper link copied!");
        return;
      }

      alert("Sharing is not supported on this device.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("Share error:", error);
      alert("Unable to share wallpaper. Please try again.");
    }
  };

  // Previous wallpaper
  const showPrevious = () => {
    if (!selectedWallpaper) return;

    const index = wallpapers.findIndex(
      (item) => item.id === selectedWallpaper.id
    );

    const previousIndex =
      (index - 1 + wallpapers.length) % wallpapers.length;

    setSelectedWallpaper(wallpapers[previousIndex]);
  };

  // Next wallpaper
  const showNext = () => {
    if (!selectedWallpaper) return;

    const index = wallpapers.findIndex(
      (item) => item.id === selectedWallpaper.id
    );

    const nextIndex = (index + 1) % wallpapers.length;

    setSelectedWallpaper(wallpapers[nextIndex]);
  };

  // =====================================
  // FULL-SCREEN IMAGE PREVIEW
  // =====================================

  if (selectedWallpaper) {
    return (
      <main className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-[#afd0d2] text-[#292929]">
        <header className="flex shrink-0 items-center gap-3 bg-[#ffc107] px-3 py-3 shadow-md sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={() => setSelectedWallpaper(null)}
            aria-label="Back to wallpapers"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-100 active:scale-95"
          >
            <ArrowLeft size={21} />
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold sm:text-xl">
              {selectedWallpaper.title}
            </h2>

            <p className="text-xs text-gray-700 sm:text-sm">
              Wallpaper {selectedWallpaper.id} of {wallpapers.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onToggleFavorite(selectedWallpaper.id)
            }
            aria-label={
              isFavorite(selectedWallpaper.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-pressed={isFavorite(selectedWallpaper.id)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition active:scale-90"
          >
            <Heart
              size={21}
              fill={
                isFavorite(selectedWallpaper.id)
                  ? "#e53935"
                  : "none"
              }
              color={
                isFavorite(selectedWallpaper.id)
                  ? "#e53935"
                  : "#333333"
              }
            />
          </button>
        </header>

        <section className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-2 sm:p-5">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous wallpaper"
            className="absolute left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md sm:left-5 sm:h-11 sm:w-11"
          >
            <ChevronLeft size={23} />
          </button>

          <img
            src={selectedWallpaper.src}
            alt={selectedWallpaper.title}
            className="h-full w-full rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={showNext}
            aria-label="Next wallpaper"
            className="absolute right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md sm:right-5 sm:h-11 sm:w-11"
          >
            <ChevronRight size={23} />
          </button>
        </section>

        <footer className="shrink-0 bg-white px-3 py-3 shadow-[0_-4px_15px_rgba(0,0,0,0.08)] sm:px-8 sm:py-5">
          <div className="mx-auto flex w-full max-w-lg gap-3">
            <button
              type="button"
              onClick={() => shareWallpaper(selectedWallpaper)}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffc107] px-3 py-3 text-sm font-bold text-black transition hover:bg-yellow-500 active:scale-95 sm:text-base"
            >
              <Share2 size={20} />
              Share
            </button>

            <button
              type="button"
              onClick={() => downloadWallpaper(selectedWallpaper)}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#00796f] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#005f56] active:scale-95 sm:text-base"
            >
              <Download size={20} />
              Download
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-gray-500">
            Govinda Govinda 🙏
          </p>
        </footer>
      </main>
    );
  }

  // =====================================
  // MAIN WALLPAPER GALLERY
  // =====================================

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#afd0d2] text-[#292929]">
      <header className="sticky top-0 z-30 w-full bg-[#ffc107] shadow-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-100 active:scale-95 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={21} />
            </button>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-extrabold leading-tight sm:text-2xl lg:text-3xl">
              Divine Wallpapers
            </h1>

            <p className="mt-1 truncate text-[11px] font-medium text-gray-800 sm:text-sm">
              Sri Venkateswara Swamy Blessings 🙏
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold sm:text-xl">
              Wallpaper Collection
            </h2>

            <p className="mt-1 text-xs text-gray-700 sm:text-sm">
              Choose your favourite Swamy wallpaper
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-sm">
            {wallpapers.length} Images
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {wallpapers.map((wallpaper) => (
            <article
              key={wallpaper.id}
              className="group min-w-0 overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="relative aspect-[9/14] cursor-pointer overflow-hidden bg-gray-200"
                onClick={() => setSelectedWallpaper(wallpaper)}
                role="button"
                tabIndex={0}
                aria-label={`View ${wallpaper.title}`}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setSelectedWallpaper(wallpaper);
                  }
                }}
              >
                <img
                  src={wallpaper.src}
                  alt={wallpaper.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* FAVORITE BUTTON */}

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite(wallpaper.id);
                  }}
                  aria-label={
                    isFavorite(wallpaper.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  aria-pressed={isFavorite(wallpaper.id)}
                  className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 active:scale-90"
                >
                  <Heart
                    size={20}
                    fill={
                      isFavorite(wallpaper.id)
                        ? "#e53935"
                        : "none"
                    }
                    color={
                      isFavorite(wallpaper.id)
                        ? "#e53935"
                        : "#333333"
                    }
                  />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white sm:p-3">
                  <p className="truncate text-xs font-bold sm:text-sm">
                    {wallpaper.title}
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-white/90 sm:text-xs">
                    Tap to view
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-7 rounded-xl bg-white p-5 text-center shadow-sm sm:mt-9">
          <p className="text-base font-extrabold sm:text-lg">
            Govinda Govinda 🙏
          </p>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-600 sm:text-sm">
            May Lord Sri Venkateswara Swamy bless everyone
            with good health, happiness and peace.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Wallpapers;
