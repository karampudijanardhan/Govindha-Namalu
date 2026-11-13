
import { useEffect, useState } from "react";
import { Heart, Play } from "lucide-react";
import { songs } from "../data/songs";
import {
  getFavorites,
  toggleFavorite
} from "../utils/libraryStorage";

interface FavoritesProps {
  onPlay: (songId: string) => void;
}

export default function Favorites({ onPlay }: FavoritesProps) {
  const [favorites, setFavorites] = useState<string[]>(
    () => getFavorites()
  );

  // Listen for favorite changes from another browser tab
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "govinda_favorites") {
        setFavorites(getFavorites());
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const favoriteSongs = songs.filter(song =>
    favorites.includes(song.id)
  );

  function removeFavorite(songId: string) {
    setFavorites(toggleFavorite(songId));
  }

  return (
    <main className="min-h-screen w-full bg-[#afd0d2] p-4">
      <h1 className="mb-5 text-2xl font-bold text-gray-900">
        My Favorites
      </h1>

      {favoriteSongs.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <Heart
            size={40}
            className="mx-auto mb-3 text-red-500"
          />

          <p className="font-semibold text-gray-900">
            No favorite songs yet
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Add your favorite devotional songs here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteSongs.map(song => (
            <div
              key={song.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="min-w-0">
                <h2 className="truncate font-bold text-gray-900">
                  {song.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {song.subtitle}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => onPlay(song.id)}
                  aria-label={`Play ${song.title}`}
                  className="rounded-full bg-[#afd0d2] p-3 text-gray-900"
                >
                  <Play size={20} />
                </button>

                <button
                  onClick={() => removeFavorite(song.id)}
                  aria-label={`Remove ${song.title} from favorites`}
                  className="rounded-full p-2"
                >
                  <Heart
                    size={23}
                    fill="red"
                    color="red"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
