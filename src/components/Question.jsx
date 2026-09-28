// import { useState } from "react";

// const Question = ({ onYes }) => {
//   const [hits, setHits] = useState(0);

//   const handleHit = () => {
//     setHits((prev) => prev + 1);
//   };

//   return (
//     <div className="flex-1 flex flex-col items-center justify-center relative px-6 overflow-hidden pt-4">

//       {/* Main Card */}
//       <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] 
//                       shadow-2xl w-[280px] min-h-[170px] 
//                       flex flex-col items-center justify-center 
//                       px-6 py-7 text-center">

//         <p className="text-sm text-rose-300 font-medium mb-2">
//           agar abhi bhi udaas ho...
//         </p>

//         <h2 className="text-2xl font-bold text-[#8b3f58]">
//           toh mujhe maaro
//         </h2>

//         <div className="mt-6 flex items-center gap-4">
//           <span className="text-5xl font-bold text-rose-500">
//             {hits}
//           </span>

//           <span className="text-3xl text-rose-400">
//             ×
//           </span>

//           <span className="text-4xl">
//             👊
//           </span>
//         </div>
//       </div>

//       {/* Hit Button */}
//       <button
//         onClick={handleHit}
//         className="mt-5 w-[245px] py-4 rounded-full
//                    bg-gradient-to-r from-pink-500 to-rose-500
//                    text-white font-bold tracking-[0.15em]
//                    shadow-lg hover:scale-105 active:scale-95
//                    transition-all duration-200"
//       >
//         MUJHE MAARO 👊
//       </button>

//       {/* Cute Image */}
//       <div className="mt-5 w-20 h-20 flex items-center justify-center">
//         <div className="text-6xl">
//           🐼
//         </div>
//       </div>

//       {/* Message */}
//       <p className="mt-5 text-sm text-rose-400">
//         ab thoda kam gussa aaya kya mujh pe?
//       </p>

//       <p className="text-2xl text-rose-400 mt-2">
//         (｡•́︿•̀｡)
//       </p>

//       {/* Continue */}
//       <button
//         onClick={onYes}
//         className="mt-6 w-[245px] py-4 rounded-full
//                    bg-gradient-to-r from-pink-500 to-rose-500
//                    text-white font-bold tracking-[0.15em]
//                    shadow-lg hover:scale-105
//                    transition-all duration-300"
//       >
//         ✨ Next 🦋 ♡ ♡
//       </button>

//     </div>
//   );
// };

// export default Question;


import { useState } from "react";
import { logAction } from "../utils/logger";

const Question = ({ onYes }) => {
  const [hits, setHits] = useState(0);

  const handleHit = () => {
    setHits((prev) => prev + 1);
  };

  const handleNext = () => {
    logAction("question_result", {
      totalHits: hits,
    });

    onYes();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative px-6 overflow-hidden pt-4">

      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] 
                      shadow-2xl w-[280px] min-h-[170px] 
                      flex flex-col items-center justify-center 
                      px-6 py-7 text-center">

        <p className="text-sm text-rose-300 font-medium mb-2">
          agar abhi bhi udaas ho...
        </p>

        <h2 className="text-2xl font-bold text-[#8b3f58]">
          toh mujhe maaro
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-5xl font-bold text-rose-500">
            {hits}
          </span>

          <span className="text-3xl text-rose-400">
            ×
          </span>

          <span className="text-4xl">
            👊
          </span>
        </div>
      </div>

      {/* Hit Button */}
      <button
        onClick={handleHit}
        className="mt-5 w-[245px] py-4 rounded-full
                   bg-gradient-to-r from-pink-500 to-rose-500
                   text-white font-bold tracking-[0.15em]
                   shadow-lg hover:scale-105 active:scale-95
                   transition-all duration-200"
      >
        MUJHE MAARO 👊
      </button>

      {/* Cute Image */}
      <div className="mt-5 w-20 h-20 flex items-center justify-center">
        <div className="text-6xl">
          🐼
        </div>
      </div>

      {/* Message */}
      <p className="mt-5 text-sm text-rose-400">
        ab thoda kam gussa aaya kya mujh pe?
      </p>

      <p className="text-2xl text-rose-400 mt-2">
        (｡•́︿•̀｡)
      </p>

      {/* Continue */}
      <button
        onClick={handleNext}
        className="mt-6 w-[245px] py-4 rounded-full
                   bg-gradient-to-r from-pink-500 to-rose-500
                   text-white font-bold tracking-[0.15em]
                   shadow-lg hover:scale-105
                   transition-all duration-300"
      >
        ✨ Next 🦋 ♡ ♡
      </button>

    </div>
  );
};

export default Question;