
export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

const FAVORITES_KEY = "govinda_favorites";
const PLAYLISTS_KEY = "govinda_playlists";

// Get favorite song IDs
export function getFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

// Save favorite song IDs
export function saveFavorites(ids: string[]): void {
  try {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify([...new Set(ids)])
    );
  } catch (error) {
    console.error("Unable to save favorites:", error);
  }
}

// Add or remove a favorite
export function toggleFavorite(songId: string): string[] {
  const current = getFavorites();

  const updated = current.includes(songId)
    ? current.filter(id => id !== songId)
    : [...current, songId];

  saveFavorites(updated);
  return updated;
}

// Check whether a song is a favorite
export function isFavorite(songId: string): boolean {
  return getFavorites().includes(songId);
}

// Get playlists
export function getPlaylists(): Playlist[] {
  try {
    const stored = localStorage.getItem(PLAYLISTS_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is Playlist =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        Array.isArray(item.songIds) &&
        item.songIds.every(
          (id: unknown) => typeof id === "string"
        )
    );
  } catch {
    return [];
  }
}

// Save playlists
export function savePlaylists(playlists: Playlist[]): void {
  try {
    localStorage.setItem(
      PLAYLISTS_KEY,
      JSON.stringify(playlists)
    );
  } catch (error) {
    console.error("Unable to save playlists:", error);
  }
}

// Create playlist
export function createPlaylist(name: string): Playlist[] {
  const trimmedName = name.trim();

  if (!trimmedName) return getPlaylists();

  const current = getPlaylists();

  const playlist: Playlist = {
    id: crypto.randomUUID(),
    name: trimmedName,
    songIds: []
  };

  const updated = [...current, playlist];

  savePlaylists(updated);
  return updated;
}

// Add song to playlist
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

// Remove song from playlist
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

// Delete playlist
export function deletePlaylist(playlistId: string): Playlist[] {
  const updated = getPlaylists().filter(
    playlist => playlist.id !== playlistId
  );

  savePlaylists(updated);
  return updated;
}
