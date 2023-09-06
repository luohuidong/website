export interface NotebookConfig {
  title: string;
  sidebar: {
    text: string;
    items: {
      text: string;
      link: string;
    }[];
  }[];
}
