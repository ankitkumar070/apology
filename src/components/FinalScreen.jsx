// export default FinalScreen;
// import { useEffect, useState } from "react";
// import celebration from "../assets/images/celebration.png";

// const FinalScreen = ({ onReplay }) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setShow(true), 200);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="flex-1 flex items-center justify-center relative px-10 py-20">
//       <div
//         className={`bg-white/90 backdrop-blur-xl rounded-[3rem] p-14 shadow-2xl text-center max-w-2xl w-full transition-all duration-700 ${
//           show ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         {/* Celebration Image */}
//         <img
//           src={celebration}
//           alt="celebration"
//           className="w-full max-h-[300px] object-contain mb-10"
//         />

//         {/* Final Message */}
//         <h1 className="text-4xl font-semibold text-gray-700 mb-6">
//           Mujhe pata tha tum zyada der naraz nahi reh sakti 🥹💖
//         </h1>

//         <p className="text-2xl text-rose-600 mb-10">
//           Ab bas smiles hi smiles 🎉❤️
//         </p>

//         {/* Replay */}
//         <button
//           onClick={onReplay}
//           className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xl font-medium shadow-lg hover:scale-105 transition-all duration-300"
//         >
//           Replay 🔁
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FinalScreen;
import { useState } from "react";

const FinalScreen = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center relative px-6 overflow-hidden">

      {/* APOLOGY CARD */}
      <div
        className={`relative w-full max-w-[400px] bg-white/95 backdrop-blur-xl
                    rounded-[2.5rem] shadow-2xl overflow-hidden
                    transition-all duration-700 ${
                      isOpen ? "min-h-[470px]" : "min-h-[370px]"
                    }`}
      >

        {/* CARD HEADER */}
        <div className="text-center px-6 py-7 border-b border-pink-100">
          <h1 className="text-2xl font-semibold text-[#8b3f58]">
            Sorry.....
          </h1>

          <p className="text-sm italic text-[#c08a9e] mt-2">
            ye bas ek chhoti si maafi hai dil se 🤍
          </p>
        </div>

        {!isOpen ? (

          /* CLOSED STATE */
          <div className="flex flex-col items-center justify-center h-[270px]">

            <button
              onClick={() => setIsOpen(true)}
              className="group w-20 h-20 rounded-full
                         bg-white shadow-xl
                         flex flex-col items-center justify-center
                         hover:scale-110 active:scale-95
                         transition-all duration-300
                         ring-8 ring-pink-50"
            >
              <span className="text-3xl group-hover:scale-110 transition">
                💗
              </span>

              <span className="text-xs font-semibold tracking-widest
                               text-rose-400 mt-1">
                OPEN
              </span>
            </button>

          </div>

        ) : (

          /* OPEN STATE */
          <div className="px-7 py-6 animate-fadeIn">

            <h2 className="text-2xl font-semibold text-center text-[#8b3f58] mb-5">
              Please Forgive me 🤍
            </h2>

            {/* SCROLLABLE MESSAGE */}
            <div className="max-h-[230px] overflow-y-auto px-2 custom-scrollbar">

              <p className="text-[15px] leading-7 text-[#8f6876] text-center">
               It’s been 30 days since we’ve met or talked. And during these days, I’ve spent a lot of time looking at myself and trying to understand where I went wrong.... my anxiety, my overthinking, my attachment, and the things I did because I was scared of losing someone who meant so much to me.

I’ve talked to a few therapists and, more importantly, I’ve started working on myself. I’m trying harder to become a better person....not just for you, but for myself too. I don’t want my issues to ever become a reason for someone else to feel hurt, uncomfortable, or exhausted.

I won’t sit here and claim that I’ve completely changed. I haven’t. I still have a lot to work on.

But I can promise you that I’ll keep working on myself. I’ll keep learning, growing, and trying to become someone who handles things with more understanding, patience, and love.

I hope that someday you can forgive me.

I still remember when you once told me that everyone eventually gets fed up with me. And I remember promising you that I would never give up on you and that I would always take care of you.

I don’t know if we’ll ever talk again. I don’t know what the future holds for us.

But I do know that I’ll always care about you, and if you ever genuinely need me, I’ll be there.

And if I could ask you for just one promise, it would be this:

In our next life, please find me a little earlier than everyone else.

So that I can find you before all my fears, anxiety, and toxicity.
So that I can come to you as the person I wish I had been this time.

Maybe then I could have loved you without making you carry the weight of my problems.

Because somewhere along the way, you became my safe place.

And I’m sorry that I made my safe place feel unsafe.
❤️
              </p>

            </div>

            {/* NEXT BUTTON */}
            <div className="flex justify-center mt-6">

              <button
                onClick={onNext}
                className="px-12 py-4 rounded-full
                           bg-gradient-to-r from-pink-500 to-rose-500
                           text-white font-bold tracking-[0.15em]
                           shadow-lg hover:scale-105
                           transition-all duration-300"
              >
                ✨ Next 🦋 ♡ ♡
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FinalScreen;