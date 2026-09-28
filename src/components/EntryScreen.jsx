import { useState } from "react";
import { logAction } from "../utils/logger";

export default function EntryScreen({ onSuccess, verifyAccess }) {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logAction("access_attempt");

    if (!date) {
      setError("You forgot to enter your birthday 🥺");
      return;
    }

    setError("");
    setChecking(true);

    try {
      const isValid = await verifyAccess(date);

      if (isValid) {
          await logAction("access_granted");
        setSuccess(true);

        setTimeout(() => {
          onSuccess();
        }, 3000);
      } else {
         await logAction("access_denied");
        setError("Hmmmm... I don't think that's right 🥺");
        setDate("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again 🤍");
    } finally {
      setChecking(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-6">
        <div className="text-center animate-pulse">
          <div className="text-7xl mb-6">💗</div>

          <h1 className="text-4xl font-bold text-rose-500">
            I knew it was you 🥺
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Come in... I have something for you 🤍
            <br />
            plug in your headphones and get ready for a little surprise 🎶
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-6">

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[10%] left-[10%] text-3xl animate-bounce">
          💗
        </span>

        <span className="absolute top-[20%] right-[15%] text-2xl animate-pulse">
          🌹
        </span>

        <span className="absolute bottom-[20%] left-[15%] text-3xl animate-pulse">
          💕
        </span>

        <span className="absolute bottom-[15%] right-[10%] text-2xl animate-bounce">
          ✨
        </span>
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 sm:p-10 text-center">

          <div className="text-6xl mb-5">
            💌
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Wait a second...
          </h1>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Before I let you in,
            <br />
            I need to make sure it's really you 🥺
          </p>

          <div className="my-7">
            <div className="text-2xl">
              🌸
            </div>

            <p className="mt-2 text-sm text-gray-500">
              When is your birthday?
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border-2 border-pink-200
                         bg-pink-50 px-5 py-4 text-center text-lg
                         text-gray-700 outline-none
                         focus:border-pink-400 focus:ring-4
                         focus:ring-pink-100 transition"
            />

            {error && (
              <p className="mt-4 text-sm text-rose-500 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={checking}
              className="mt-6 w-full rounded-2xl
                         bg-gradient-to-r from-pink-400 to-rose-400
                         px-6 py-4 text-white font-bold text-lg
                         shadow-lg
                         hover:scale-[1.02]
                         active:scale-95
                         transition-all
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checking ? "Checking... 💗" : "ENTER 💌"}
            </button>
          </form>

          <p className="mt-7 text-sm text-gray-400 italic">
            "Only you were meant to see what's inside..." 🤍
          </p>

        </div>

        <p className="text-center mt-5 text-gray-500 text-sm">
          Made with a lot of overthinking and a little bit of love 💗
        </p>
      </div>
    </div>
  );
}