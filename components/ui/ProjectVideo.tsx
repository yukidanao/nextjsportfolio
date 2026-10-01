"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { assetPath } from "@/lib/assets";
import type { ProjectVideo as ProjectVideoData } from "@/data/portfolio";

type Props = {
  video: ProjectVideoData;
  className?: string;
};

/**
 * Renders a project's showcase player.
 *
 * A direct MP4 gets a native <video> with `preload="none"`, so nothing is
 * fetched until the visitor presses play. External hosts (MEGA, YouTube,
 * Vimeo) can't be streamed via a plain <video> tag — their files are encrypted
 * or proxied — so those load in an <iframe>. To keep an embed from costing a
 * download on first paint, an iframe is only mounted once the visitor asks
 * for it by activating the poster.
 */
export default function ProjectVideo({ video, className = "" }: Props) {
  const [activated, setActivated] = useState(false);
  const frame = `relative overflow-hidden bg-black/5 dark:bg-black/40 ${className}`;

  const fallback = video.fallbackUrl && (
    <a
      href={video.fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-gray-500 dark:text-text-secondary hover:text-accent transition-colors"
    >
      Open the showcase on {video.fallbackLabel ?? "the host"}
    </a>
  );

  if (video.src) {
    return (
      <div className={frame}>
        <video
          className="h-full w-full"
          src={assetPath(video.src)}
          poster={video.poster ? assetPath(video.poster) : undefined}
          controls
          preload="none"
          playsInline
          aria-label={video.label}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (!video.embedUrl) return null;

  if (activated) {
    return (
      <div>
        <div className={frame}>
          <iframe
            className="h-full w-full"
            src={video.embedUrl}
            title={video.label}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {fallback && <div className="mt-3">{fallback}</div>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play ${video.label}`}
      className="group/play relative block h-full w-full text-left"
    >
      {video.poster ? (
        <img
          src={assetPath(video.poster)}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="block h-full w-full bg-gradient-to-br from-accent/15 to-accent-secondary/15" />
      )}

      <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent">
        <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-transform duration-200 group-hover/play:scale-105">
          <Play className="h-3.5 w-3.5 fill-current" />
          Play showcase
        </span>
      </span>
    </button>
  );
}