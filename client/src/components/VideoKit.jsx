import { Video } from "@imagekit/react";

const VideoKit = ({ src, w, h, className }) => {
  return (
    <div className="video-container">
      <Video
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        src={src}
        controls={true}
        className={className}
        autoPlay
        muted
        loop
        width={w}
        height={h}
        transformation={[{ width: 900 }]}
      />
    </div>
  );
};

export default VideoKit;
