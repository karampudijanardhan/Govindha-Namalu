
import type { Song } from "../data/songs";

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

const FAVORITES_KEY = "govinda_favorites";
const PLAYLISTS_KEY = "govinda_playlists";

export function getFavorites(): string[] {
  try {
    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function toggleFavorite(songId: string): string[] {
  const current = getFavorites();

  const updated = current.includes(songId)
    ? current.filter(id => id !== songId)
    : [...current, songId];

  saveFavorites(updated);
  return updated;
}

export function getPlaylists(): Playlist[] {
  try {
    return JSON.parse(
      localStorage.getItem(PLAYLISTS_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function savePlaylists(playlists: Playlist[]) {
  localStorage.setItem(
    PLAYLISTS_KEY,
    JSON.stringify(playlists)
  );
}

export function createPlaylist(name: string): Playlist[] {
  const current = getPlaylists();

  const playlist: Playlist = {
    id: crypto.randomUUID(),
    name: name.trim(),
    songIds: []
  };

  const updated = [...current, playlist];
  savePlaylists(updated);

  return updated;
}

export function addSongToPlaylist(
  playlistId: string,
  songId: string
): Playlist[] {
  const updated = getPlaylists().map(playlist =>
    playlist.id === playlistId
      ? {
          ...playlist,
          songIds: playlist.songIds.includes(songId)
            ? playlist.songIds
            : [...playlist.songIds, songId]
        }
      : playlist
  );

  savePlaylists(updated);
  return updated;
}

export function removeSongFromPlaylist(
  playlistId: string,
  songId: string
): Playlist[] {
  const updated = getPlaylists().map(playlist =>
    playlist.id === playlistId
      ? {
          ...playlist,
          songIds: playlist.songIds.filter(id => id !== songId)
        }
      : playlist
  );

  savePlaylists(updated);
  return updated;
}
