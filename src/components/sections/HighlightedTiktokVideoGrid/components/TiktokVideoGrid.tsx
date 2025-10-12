import { useEffect, useState } from "react";
import { GetHighlightedTiktokVideosService } from "../../../../services/getHighlightedTiktokVideos";
import type { ITiktokVideo } from "../../../../interfaces/tiktokVideo";
import TiktokVideoCard from "../../../elements/TiktokVideoCard/TiktokVideoCard";

export default function TiktokVideoGrid() {
  const [videos, setVideos] = useState<ITiktokVideo[]>([]);

  useEffect(() => {
    GetHighlightedTiktokVideosService.execute().then((videos) =>
      setVideos(videos)
    );
  }, []);

  return (
    <div className="px-2 md:px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {videos.map((video) => (
        <TiktokVideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
