
import { useEffect, useState } from "react";
import { ListMusic, Plus, Trash2 } from "lucide-react";
import { songs } from "../data/songs";
import {
  getPlaylists,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  savePlaylists,
  type Playlist
} from "../utils/libraryStorage";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    setPlaylists(getPlaylists());
  }, []);

  function handleCreate() {
    if (!playlistName.trim()) return;

    setPlaylists(createPlaylist(playlistName));
    setPlaylistName("");
  }

  function handleAdd(playlistId: string, songId: string) {
    setPlaylists(addSongToPlaylist(playlistId, songId));
  }

  function handleRemove(playlistId: string, songId: string) {
    setPlaylists(removeSongFromPlaylist(playlistId, songId));
  }

  function handleDelete(playlistId: string) {
    const updated = playlists.filter(p => p.id !== playlistId);
    savePlaylists(updated);
    setPlaylists(updated);
  }

  return (
    <main className="min-h-screen w-full bg-[#afd0d2] p-4">
      <h1 className="mb-5 text-2xl font-bold">
        My Playlists
      </h1>

      <div className="mb-5 flex gap-2">
        <input
          value={playlistName}
          onChange={e => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
          className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 outline-none"
        />

        <button
          onClick={handleCreate}
          className="rounded-xl bg-[#ffc107] px-4 font-bold"
        >
          <Plus />
        </button>
      </div>

      {playlists.length === 0 && (
        <div className="rounded-2xl bg-white p-6 text-center">
          <ListMusic className="mx-auto mb-2" size={36} />
          <p>Create your first devotional playlist.</p>
        </div>
      )}

      <div className="space-y-4">
        {playlists.map(playlist => (
          <section
            key={playlist.id}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold">{playlist.name}</h2>

              <button
                onClick={() => handleDelete(playlist.id)}
                aria-label={`Delete ${playlist.name}`}
              >
                <Trash2 color="red" />
              </button>
            </div>

            <p className="mb-3 text-sm text-gray-500">
              {playlist.songIds.length} songs
            </p>

            <select
              className="w-full rounded-lg border p-2"
              value=""
              onChange={e => {
                if (e.target.value) {
                  handleAdd(playlist.id, e.target.value);
                }
              }}
            >
              <option value="">Add a song...</option>
              {songs
                .filter(song => !playlist.songIds.includes(song.id))
                .map(song => (
                  <option key={song.id} value={song.id}>
                    {song.title}
                  </option>
                ))}
            </select>

            <div className="mt-3 space-y-2">
              {playlist.songIds.map(songId => {
                const song = songs.find(s => s.id === songId);
                if (!song) return null;

                return (
                  <div
                    key={songId}
                    className="flex items-center justify-between rounded-lg bg-[#e5ffff] p-3"
                  >
                    <span>{song.title}</span>
                    <button
                      onClick={() => handleRemove(playlist.id, songId)}
                      aria-label={`Remove ${song.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
