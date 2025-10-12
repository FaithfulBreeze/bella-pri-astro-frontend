interface TiktokVideoCardProps {
  videoId: string;
}

export default function TiktokVideoCard({ videoId }: TiktokVideoCardProps) {
  return (
    <div className="aspect-[9/16] rounded-lg shadow-md overflow-hidden">
      <iframe
        src={`https://www.tiktok.com/player/v1/${videoId}?loop=1&autoplay=1&muted=1&controls=0`}
        frameBorder="0"
        className="aspect-[9/16]"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
