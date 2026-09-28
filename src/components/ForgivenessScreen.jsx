import { useEffect, useRef, useState } from "react";
import { logAction } from "../utils/logger";

const sorryMessages = [
    "I'm really sorry ❤️<br/>Please forgive me 🥺",
    "I promise I'll never do it again 😢💕",
    "You mean the world to me 🌍💖",
    "I can't stop thinking about how sorry I am 😭",
    "Please give me another chance 🙏❤️",
    "I'll do anything to make it up to you 💝",
    "You're the most important person to me 🥰",
    "I messed up, but I love you so much 💕😔",
    "Life isn't the same without your smile 😢💖",
    "I promise to be better for you 🌟❤️",
    "Forgive me please? I'll buy you mint chocolate and ice cream 🍦💕",
    "I'm so so so sorry  😭❤️",
    "You deserve the world and I'll give it to you 🌹💖",
    "Pretty please with a cherry on top? 🍒🥺",
    "I'll never let you down again, I promise ❤️",
];

const heartEmojis = ["❤️", "💖", "💕", "💗", "💝", "🥰", "😍"];

const NO_CLICK_LIMIT = 15;

const ForgivenessScreen = ({ onNext }) => {
    const containerRef = useRef(null);
    const buttonsRef = useRef(null);
    const yesBtnRef = useRef(null);
    const noBtnRef = useRef(null);
    const mainTextRef = useRef(null);
    const clickCountRef = useRef(null);

    const noClickCountRef = useRef(0);
    const isForgivenRef = useRef(false);
    const isDoneRef = useRef(false); // true once either ending fires

    // ending: null (still playing) | "yes" | "givenUp"
    const [ending, setEnding] = useState(null);

    const isMobile =
        typeof navigator !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

    // -------------------------------------------------
    // Sparkle
    // -------------------------------------------------
    const createSparkle = (x, y) => {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement("div");
            sparkle.className = "apology-sparkle";
            sparkle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
            sparkle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    };

    // -------------------------------------------------
    // Floating heart
    // -------------------------------------------------
    const createHeart = () => {
        const heart = document.createElement("div");
        heart.className = "apology-heart";
        heart.textContent =
            heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${window.innerHeight}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    };

    // -------------------------------------------------
    // Move the No button to a non-overlapping spot
    // -------------------------------------------------
    const moveNoButton = () => {
        const buttonsContainer = buttonsRef.current;
        const noBtn = noBtnRef.current;
        const yesBtn = yesBtnRef.current;
        if (!buttonsContainer || !noBtn || !yesBtn) return noClickCountRef.current;

        const rect = buttonsContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();

        const maxX = Math.max(10, rect.width - btnRect.width - 20);
        const maxY = Math.max(10, rect.height - btnRect.height - 20);

        let newX, newY;
        let attempts = 0;
        const maxAttempts = 50;

        do {
            newX = Math.random() * maxX + 10;
            newY = Math.random() * maxY + 10;
            attempts++;

            const noLeft = rect.left + newX;
            const noRight = noLeft + btnRect.width;
            const noTop = rect.top + newY;
            const noBottom = noTop + btnRect.height;

            const padding = 30;

            const overlaps = !(
                noRight + padding < yesRect.left ||
                noLeft - padding > yesRect.right ||
                noBottom + padding < yesRect.top ||
                noTop - padding > yesRect.bottom
            );

            if (!overlaps || attempts >= maxAttempts) break;
        } while (true);

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        createSparkle(
            btnRect.left + btnRect.width / 2,
            btnRect.top + btnRect.height / 2
        );

        noClickCountRef.current += 1;
        const newScale = Math.max(0.3, 1 - noClickCountRef.current * 0.1);
        noBtn.style.transform = `scale(${newScale})`;

        return noClickCountRef.current;
    };

    const registerAttempt = (count) => {
        // she's exceeded the limit — stop the game gracefully
        if (count > NO_CLICK_LIMIT) {
            logAction("forgiveness_result", {
                answer: "no",
                noAttempts: count,
            });
            isDoneRef.current = true;
            setEnding("givenUp");
            return;
        }

        const mainText = mainTextRef.current;
        if (mainText) {
            const idx = count % sorryMessages.length;
            mainText.innerHTML = sorryMessages[idx];
            mainText.classList.remove("forgiveness-shake");
            // eslint-disable-next-line no-unused-expressions
            mainText.offsetWidth;
            mainText.classList.add("forgiveness-shake");
            setTimeout(() => mainText.classList.remove("forgiveness-shake"), 500);
        }

        const clickCount = clickCountRef.current;
        if (clickCount) {
            if (count <= 5) {
                clickCount.innerHTML = `Come on... just click YES! 🥺 (Attempts: ${count})`;
            } else if (count <= 15) {
                clickCount.innerHTML = `Please Tanu! I'm begging you! 😭 (Attempts: ${count})`;
            }
        }

        createHeart();
    };

    // -------------------------------------------------
    // Initial position + resize handling
    // -------------------------------------------------
    useEffect(() => {
        const initNoButton = () => {
            const noBtn = noBtnRef.current;
            if (!noBtn || isDoneRef.current) return;

            const mobileView = window.innerWidth <= 768;
            noBtn.style.left = mobileView ? "50%" : "70%";
            noBtn.style.top = mobileView ? "70%" : "50%";
            noBtn.style.transform = "translate(-50%, -50%) scale(1)";
        };

        initNoButton();
        window.addEventListener("resize", initNoButton);
        return () => window.removeEventListener("resize", initNoButton);
    }, []);

    // -------------------------------------------------
    // Desktop hover handler
    // -------------------------------------------------
    const handleNoMouseEnter = () => {
        if (isMobile || isDoneRef.current) return;
        const count = moveNoButton();
        registerAttempt(count);
    };

    // -------------------------------------------------
    // Click handler
    // -------------------------------------------------
    const handleNoClick = (e) => {
        e.preventDefault();
        if (isDoneRef.current) return;
        const count = moveNoButton();
        registerAttempt(count);
    };

    // -------------------------------------------------
    // Yes button grows the longer she resists
    // -------------------------------------------------
    useEffect(() => {
        const id = setInterval(() => {
            const yesBtn = yesBtnRef.current;
            if (!yesBtn || isDoneRef.current) return;
            if (noClickCountRef.current > 3) {
                yesBtn.style.transform = `translateY(-8px) scale(${1.1 + noClickCountRef.current * 0.05
                    })`;
            }
        }, 100);
        return () => clearInterval(id);
    }, []);

    // -------------------------------------------------
    // Yes button click -> "Just kidding" ending
    // -------------------------------------------------
    const handleYes = () => {
        logAction("forgiveness_result", {
            answer: "yes",
            noAttempts: noClickCountRef.current,
        });
        isForgivenRef.current = true;
        isDoneRef.current = true;
        setEnding("yes");
    };

    // -------------------------------------------------
    // Ending: gave up after too many No's
    // -------------------------------------------------
    if (ending === "givenUp") {
        return (
            <div className="forgiveness-screen" ref={containerRef}>
                <div className="forgiveness-container">
                    <div className="animate-fadeIn">
                        <div className="text-6xl mb-6">🥺🌹</div>
                        <h2 className="text-3xl font-bold text-rose-500 mb-6">Okay...</h2>
                        <p className="text-xl leading-relaxed text-gray-600">
                            I think I got my answer. 🥺
                            <br />
                            <br />
                            I'm not going to keep asking you to forgive me.
                            <br />
                            <br />
                            I just wanted you to know that I'm genuinely sorry for what I
                            did.
                            <br />
                            <br />
                            You don't owe me forgiveness, an explanation, or even a reply.
                            <br />
                            <br />
                            Take all the time you need but please comeback. 🤍
                        </p>
                        <button
                            onClick={onNext}
                            className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Replay 🦋
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------
    // Ending: Yes clicked -> "Just kidding"
    // -------------------------------------------------
    if (ending === "yes") {
        return (
            <div className="forgiveness-screen" ref={containerRef}>
                <div className="forgiveness-container">
                    <div className="animate-fadeIn">
                        <div className="text-6xl mb-6">🤍🦋</div>
                        <h2 className="text-3xl font-bold text-rose-500 mb-6">
                            Thankyou so muchhhh...
                        </h2>
                        <p className="text-xl leading-relaxed text-gray-600">
                            But I want u to take your time.
                            <br />
                            <br />
                            I don't want to force you to forgive me.
                            <br />
                            <br />
                            You don't have to forgive me just because I asked. Take care, I miss you so much🤍
                        </p>
                        <button
                            onClick={onNext}
                            className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                        >
                            Replay 🦋
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------
    // Default: the game
    // -------------------------------------------------
    return (
        <div className="forgiveness-screen" ref={containerRef}>
            {/* Background floating hearts */}
            <div className="forgiveness-bg-heart" style={{ top: "10%", left: "10%", animationDelay: "0s" }}>❤️</div>
            <div className="forgiveness-bg-heart" style={{ top: "70%", left: "80%", animationDelay: "2s" }}>💖</div>
            <div className="forgiveness-bg-heart" style={{ top: "30%", left: "85%", animationDelay: "4s" }}>💕</div>
            <div className="forgiveness-bg-heart" style={{ top: "60%", left: "15%", animationDelay: "6s" }}>💗</div>
            <div className="forgiveness-bg-heart" style={{ top: "20%", left: "50%", animationDelay: "8s" }}>💝</div>

            <div className="forgiveness-container">
                <div
                    ref={mainTextRef}
                    className="forgiveness-main-text"
                    dangerouslySetInnerHTML={{ __html: sorryMessages[0] }}
                />

                <div className="forgiveness-buttons" ref={buttonsRef}>
                    <button ref={yesBtnRef} className="forgiveness-yes" onClick={handleYes}>
                        Okay, I forgive you 💖
                    </button>

                    <button
                        ref={noBtnRef}
                        className="forgiveness-no"
                        onMouseEnter={handleNoMouseEnter}
                        onClick={handleNoClick}
                    >
                        No, I'm still angry 😠
                    </button>
                </div>

                <div ref={clickCountRef} className="forgiveness-click-count" />
            </div>
        </div>
    );
};

export default ForgivenessScreen;