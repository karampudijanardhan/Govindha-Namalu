
export interface Song {
  id: string;
  title: string;
  subtitle: string;
  audioUrl: string;
  lyrics: string[];
}

export const songs: Song[] = [
  {
    id: "govinda-namalu",
    title: "Govinda Namalu",
    subtitle: "Sri Venkateswara Swamy",
    audioUrl: "/audio/govinda-namalu.mp3",
    lyrics: [
      "ఓం నమో వేంకటేశాయ",
      "గోవిందా గోవిందా",
      "శ్రీనివాస గోవిందా",
      "వేంకటేశ గోవిందా"
    ]
  }
];
