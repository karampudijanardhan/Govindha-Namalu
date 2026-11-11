
import { useEffect, useState } from "react";
import { Download, Trash2, Music } from "lucide-react";
import { songs } from "../data/songs";
import {
  downloadAudio,
  deleteOfflineAudio,
  isAudioDownloaded
} from "../utils/offlineStorage";

export default function OfflineDownloads() {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function refreshDownloads() {
    const results = await Promise.all(
      songs.map(async song => ({
        id: song.id,
        saved: await isAudioDownloaded(song.id)
      }))
    );

    setDownloaded(
      results.filter(item => item.saved).map(item => item.id)
    );
  }

  useEffect(() => {
    void refreshDownloads();
  }, []);

  async function handleDownload(songId: string, audioUrl: string) {
    try {
      setLoadingId(songId);
      setMessage("");

      await downloadAudio(songId, audioUrl);
      await refreshDownloads();

      setMessage("Audio downloaded successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Download failed. Please try again."
      );
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(songId: string) {
    try {
      await deleteOfflineAudio(songId);
      await refreshDownloads();
      setMessage("Offline audio removed.");
    } catch {
      setMessage("Could not remove downloaded audio.");
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#afd0d2] p-4">
      <h1 className="mb-2 text-2xl font-bold">
        Offline Downloads
      </h1>

      <p className="mb-5 text-sm text-gray-700">
        Download your devotional songs to listen without internet.
      </p>

      {message && (
        <p role="status" className="mb-4 rounded-xl bg-white p-3">
          {message}
        </p>
      )}

      <div className="space-y-3">
        {songs.map(song => {
          const isDownloaded = downloaded.includes(song.id);
          const isLoading = loadingId === song.id;

          return (
            <div
              key={song.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Music />
                <div className="min-w-0">
                  <h2 className="truncate font-bold">
                    {song.title}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {isDownloaded ? "Available offline" : "Not downloaded"}
                  </p>
                </div>
              </div>

              {isDownloaded ? (
                <button
                  onClick={() => void handleDelete(song.id)}
                  aria-label={`Delete offline ${song.title}`}
                >
                  <Trash2 color="red" />
                </button>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={() => void handleDownload(song.id, song.audioUrl)}
                  className="rounded-lg bg-[#ffc107] p-3 disabled:opacity-50"
                  aria-label={`Download ${song.title}`}
                >
                  {isLoading ? "..." : <Download />}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
