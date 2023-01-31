export interface NoteConfig {
  title: string;
  sidebar: {
    text: string;
    items: {
      text: string;
      link: string;
    }[];
  }[];
}
