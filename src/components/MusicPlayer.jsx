// import { useEffect, useRef, useState } from "react";

// export default function MusicPlayer({
//   src,
//   title = "Kichchu Chaini Aami",
//   subtitle = "♡ a little song for you",
//   cover = null,
//   startTime = 0,
//   endTime = null,
// }) {
//   const audioRef = useRef(null);

//   const [open, setOpen] = useState(false);
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(startTime);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const loaded = () => {
//       const actualEnd =  audio.duration;
//       setDuration(actualEnd);
//       audio.currentTime = startTime;
//       setCurrentTime(startTime);
//     };

//     const update = () => {
//       setCurrentTime(audio.currentTime);

//       if (endTime && audio.currentTime >= endTime) {
//         audio.pause();
//         audio.currentTime = startTime;
//         setCurrentTime(startTime);
//         setPlaying(false);
//       }
//     };

//     const ended = () => {
//       audio.currentTime = startTime;
//       setCurrentTime(startTime);
//       setPlaying(false);
//     };

//     audio.addEventListener("loadedmetadata", loaded);
//     audio.addEventListener("timeupdate", update);
//     audio.addEventListener("ended", ended);

//     return () => {
//       audio.removeEventListener("loadedmetadata", loaded);
//       audio.removeEventListener("timeupdate", update);
//       audio.removeEventListener("ended", ended);
//     };
//   }, [startTime, endTime]);

//   const togglePlay = async () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (playing) {
//       audio.pause();
//       setPlaying(false);
//       return;
//     }

//     if (endTime && audio.currentTime >= endTime) {
//       audio.currentTime = startTime;
//     }

//     try {
//       await audio.play();
//       setPlaying(true);
//       setOpen(true);
//     } catch (error) {
//       console.error("Audio playback failed:", error);
//     }
//   };

//   const handleSeek = (e) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const value = Number(e.target.value);

//     audio.currentTime = value;
//     setCurrentTime(value);
//   };

//   const formatTime = (seconds) => {
//     if (!Number.isFinite(seconds)) return "0:00";

//     const min = Math.floor(seconds / 60);
//     const sec = Math.floor(seconds % 60);

//     return `${min}:${sec.toString().padStart(2, "0")}`;
//   };

//   const progress =
//     duration > startTime
//       ? ((currentTime - startTime) / (duration - startTime)) * 100
//       : 0;

//   return (
//     <>
//       <audio ref={audioRef} src={src} preload="metadata" />

//       {/* Small floating button */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           aria-label="Open music player"
//           className="
//             fixed bottom-5 left-1/2 -translate-x-1/2
//             z-50
//             w-12 h-12
//             rounded-full
//             bg-white/55
//             backdrop-blur-xl
//             border border-white/70
//             shadow-[0_8px_30px_rgba(236,72,153,0.22)]
//             flex items-center justify-center
//             text-lg
//             hover:scale-105
//             active:scale-95
//             transition-all duration-300
//           "
//         >
//           🎵
//         </button>
//       )}

//       {/* Compact player */}
//       {open && (
//         <div
//           className="
//             fixed bottom-5 left-1/2 -translate-x-1/2
//             z-50

//             w-[calc(100%-40px)]
//             max-w-[330px]

//             rounded-[28px]

//             bg-white/50
//             backdrop-blur-2xl

//             border border-white/75

//             shadow-[0_12px_40px_rgba(236,72,153,0.20)]

//             px-3 py-2.5

//             animate-music-in
//           "
//         >
//           <div className="flex items-center gap-2.5">

//             {/* Album artwork */}
//             <div
//               className={`
//                 flex-shrink-0
//                 w-10 h-10
//                 rounded-xl
//                 overflow-hidden
//                 border border-white/80
//                 shadow-sm
//                 transition-transform duration-500
//                 ${playing ? "scale-105" : "scale-100"}
//               `}
//             >
//               {cover ? (
//                 <img
//                   src={cover}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div
//                   className="
//                     w-full h-full
//                     bg-gradient-to-br
//                     from-pink-200
//                     via-rose-300
//                     to-pink-400
//                     flex items-center justify-center
//                     text-base
//                   "
//                 >
//                   💗
//                 </div>
//               )}
//             </div>

//             {/* Song information */}
//             <div className="min-w-0 flex-1">

//               <p
//                 className="
//                   text-[13px]
//                   font-semibold
//                   text-rose-700
//                   truncate
//                 "
//               >
//                 {title}
//               </p>

//               <p
//                 className="
//                   text-[10px]
//                   text-pink-500
//                   truncate
//                   mt-[1px]
//                 "
//               >
//                 {subtitle}
//               </p>

//               {/* Progress */}
//               <div className="flex items-center gap-1.5 mt-1.5">

//                 <input
//                   type="range"
//                   min={startTime}
//                   max={duration || startTime + 1}
//                   value={Math.min(currentTime, duration || startTime)}
//                   onChange={handleSeek}
//                   className="music-progress flex-1"
//                   style={{
//                     "--progress": `${Math.max(
//                       0,
//                       Math.min(100, progress)
//                     )}%`,
//                   }}
//                 />

//                 <span className="text-[9px] text-rose-400 w-7 text-right">
//                   {formatTime(currentTime - startTime)}
//                 </span>

//               </div>
//             </div>

//             {/* Play */}
//             <button
//               onClick={togglePlay}
//               aria-label={playing ? "Pause" : "Play"}
//               className="
//                 flex-shrink-0
//                 w-9 h-9
//                 rounded-full

//                 bg-gradient-to-br
//                 from-pink-400
//                 to-rose-500

//                 text-white
//                 text-[11px]

//                 flex items-center justify-center

//                 shadow-[0_5px_15px_rgba(236,72,153,0.28)]

//                 hover:scale-105
//                 active:scale-90

//                 transition-all duration-200
//               "
//             >
//               {playing ? "❚❚" : "▶"}
//             </button>

//             {/* Close */}
//             <button
//               onClick={() => setOpen(false)}
//               aria-label="Close music player"
//               className="
//                 flex-shrink-0
//                 text-pink-300
//                 text-xs
//                 hover:text-pink-500
//                 transition-colors
//               "
//             >
//               ×
//             </button>

//           </div>
//         </div>
//       )}

//       <style>{`
//         .animate-music-in {
//           animation: musicIn 0.35s cubic-bezier(.22,1,.36,1);
//         }

//         @keyframes musicIn {
//           from {
//             opacity: 0;
//             transform: translate(-50%, 12px) scale(0.94);
//           }

//           to {
//             opacity: 1;
//             transform: translate(-50%, 0) scale(1);
//           }
//         }

//         .music-progress {
//           appearance: none;
//           width: 100%;
//           height: 3px;
//           border-radius: 999px;
//           cursor: pointer;
//           outline: none;

//           background:
//             linear-gradient(
//               to right,
//               #ec4899 var(--progress),
//               rgba(244, 114, 182, 0.20) var(--progress)
//             );
//         }

//         .music-progress::-webkit-slider-thumb {
//           appearance: none;
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: #ec4899;
//           border: 1.5px solid white;
//           cursor: pointer;
//         }

//         .music-progress::-moz-range-thumb {
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: #ec4899;
//           border: 1.5px solid white;
//           cursor: pointer;
//         }
//       `}</style>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({
  src,
  title = "Kichchu Chaini Aami",
  subtitle = "♡ a little song for you",
  cover = null,
  startTime = 0,
  endTime = null,
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(startTime);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = async () => {
      const actualDuration = endTime || audio.duration;

      setDuration(actualDuration);
      audio.currentTime = startTime;
      setCurrentTime(startTime);

      // Try autoplay
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        // Browser may block audible autoplay.
        console.log("Autoplay blocked. User can press play.");
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (endTime && audio.currentTime >= endTime) {
        audio.pause();
        audio.currentTime = startTime;
        setCurrentTime(startTime);
        setPlaying(false);
      }
    };

    const handleEnded = () => {
      audio.currentTime = startTime;
      setCurrentTime(startTime);
      setPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [startTime, endTime]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Number(e.target.value);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);

    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  const progress =
    duration > startTime
      ? ((currentTime - startTime) / (duration - startTime)) * 100
      : 0;

  return (
    <div className="w-full flex justify-center mt-5 mb-2">
      <div
        className="
          w-full max-w-[300px]
          rounded-[24px]
          px-3 py-2.5

          bg-white/45
          backdrop-blur-xl

          border border-white/70

          shadow-[0_8px_25px_rgba(236,72,153,0.15)]
        "
      >
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex items-center gap-2.5">
          {/* Album art */}
          <div
            className={`
              flex-shrink-0
              w-10 h-10
              rounded-xl
              overflow-hidden
              border border-white/80
              shadow-sm
              ${playing ? "animate-pulse" : ""}
            `}
          >
            {cover ? (
              <img
                src={cover}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="
                  w-full h-full
                  bg-gradient-to-br
                  from-pink-200
                  via-rose-300
                  to-pink-400
                  flex items-center justify-center
                "
              >
                💗
              </div>
            )}
          </div>

          {/* Song information */}
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-rose-700 truncate">
              {title}
            </p>

            <p className="text-[10px] text-pink-500 truncate">
              {subtitle}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <input
                type="range"
                min={startTime}
                max={duration || startTime + 1}
                value={Math.min(currentTime, duration || startTime)}
                onChange={handleSeek}
                className="music-progress flex-1"
                style={{
                  "--progress": `${Math.max(
                    0,
                    Math.min(100, progress)
                  )}%`,
                }}
              />

              <span className="text-[9px] text-rose-400">
                {formatTime(currentTime - startTime)}
              </span>
            </div>
          </div>

          {/* Play / pause */}
          <button
            onClick={togglePlay}
            className="
              flex-shrink-0
              w-9 h-9
              rounded-full

              bg-gradient-to-br
              from-pink-400
              to-rose-500

              text-white
              text-[10px]

              flex items-center justify-center

              shadow-[0_4px_12px_rgba(236,72,153,0.25)]

              hover:scale-105
              active:scale-95

              transition-all
            "
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
      </div>

      <style>{`
        .music-progress {
          appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;

          background: linear-gradient(
            to right,
            #ec4899 var(--progress),
            rgba(244, 114, 182, 0.2) var(--progress)
          );
        }

        .music-progress::-webkit-slider-thumb {
          appearance: none;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ec4899;
          border: 1px solid white;
          cursor: pointer;
        }

        .music-progress::-moz-range-thumb {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ec4899;
          border: 1px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}