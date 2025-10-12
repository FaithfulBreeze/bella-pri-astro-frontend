import type { ITiktokVideo } from "../interfaces/tiktokVideo";

interface ResponseProps {
  tiktokVideos: ITiktokVideo[];
  count: number;
}

export class GetHighlightedTiktokVideosService {
  static async execute() {
    const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/tiktok-videos/highlighted`);
    const data: ResponseProps = await response.json();
    return data.tiktokVideos;
  }
}
