export interface Album {
  id: string;
  name: string;
  release_date: string;
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];

  artists?: { name: string }[];

  tracks?: {
    items?: {
      duration_ms: any;
      id: string;
      name: string;
      track_number: number;
    }[];
  };
}
