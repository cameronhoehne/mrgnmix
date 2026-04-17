import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import version1 from "../assets/music/unmixed.wav";
import version2 from "../assets/music/mixed.wav";

function Player() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [fadeValue, setFadeValue] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    // Create refs for audio context and gain nodes
    const audioCtx = useRef<AudioContext | null>(null);
    const gainNode1 = useRef<GainNode | null>(null);
    const gainNode2 = useRef<GainNode | null>(null);

    // Create refs for audio tracks
    const track1 = useRef<HTMLAudioElement | null>(null);
    const track2 = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize AudioContext and nodes only once on mount
        audioCtx.current = new AudioContext();
        gainNode1.current = audioCtx.current.createGain();
        gainNode2.current = audioCtx.current.createGain();

        // Initialize the audio tracks
        track1.current = new Audio(version1);
        track2.current = new Audio(version2);

        track1.current.loop = true;
        track2.current.loop = true;

        // Create MediaElementSourceNode only once
        const source1 = audioCtx.current.createMediaElementSource(track1.current);
        const source2 = audioCtx.current.createMediaElementSource(track2.current);

        source1.connect(gainNode1.current).connect(audioCtx.current.destination);
        source2.connect(gainNode2.current).connect(audioCtx.current.destination);

        gainNode1.current.gain.value = 1; // Initial volume of track1
        gainNode2.current.gain.value = 0; // Initial volume of track2

        // Cleanup on component unmount
        return () => {
            audioCtx.current?.close();
        };
    }, []);

    // Handle slider input to control crossfade
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setFadeValue(value);

        if (gainNode1.current && gainNode2.current) {
            gainNode1.current.gain.value = 1 - value; // Fade out track1
            gainNode2.current.gain.value = value;    // Fade in track2
        }
    };

    const handleClick = (isPlaying: boolean): void => {
        setIsOpen(!isOpen)
        if (!isPlaying) {
            handleStart();
            setIsPlaying(!isPlaying);
        } else if (isPlaying) {
            handleStop();
            setIsPlaying(!isPlaying);
        }
    }
    // Start the audio when button is clicked
    const handleStart = () => {
        audioCtx.current?.resume().then(() => {
            const now = audioCtx.current!.currentTime;

            gainNode1.current!.gain.setValueAtTime(0, now);
            gainNode2.current!.gain.setValueAtTime(0, now);

            gainNode1.current!.gain.linearRampToValueAtTime(1 - fadeValue, now + 0.05);
            gainNode2.current!.gain.linearRampToValueAtTime(fadeValue, now + 0.05);

            track1.current?.play();
            track2.current?.play();
        });
    };

    const handleStop = () => {
        const now = audioCtx.current!.currentTime;
        const fadeDuration = 0.2;

        gainNode1.current!.gain.cancelScheduledValues(now);
        gainNode2.current!.gain.cancelScheduledValues(now);
        gainNode1.current!.gain.setValueAtTime(gainNode1.current!.gain.value, now);
        gainNode2.current!.gain.setValueAtTime(gainNode2.current!.gain.value, now);
        gainNode1.current!.gain.linearRampToValueAtTime(0, now + fadeDuration);
        gainNode2.current!.gain.linearRampToValueAtTime(0, now + fadeDuration);

        setTimeout(() => {
            track1.current?.pause();
            track2.current?.pause();
        }, fadeDuration * 1000);
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
            >
                <motion.button
                    layout
                    className="player-box"
                    data-isOpen={isOpen}
                    onClick={() => handleClick(isPlaying)}
                    initial={{ borderRadius: 50 }}

                >
                    <motion.div layout="size"
                        animate={{ scale: isOpen ? 1.2 : 1 }}
                        data-isOpen={isOpen}
                        onClick={(event) => { event.stopPropagation(); handleClick(isPlaying) }}>
                        {!isOpen && <svg width="50" height="50" viewBox="0 0 24 24">
                            <polygon points="6,4 20,12 6,20" fill="black" />
                        </svg>}
                        {isOpen && (
                            <>
                                <motion.div style={{ display: "flex", flexDirection: "row" }}>
                                    <motion.div>
                                        <svg width="50" height="50" viewBox="0 0 24 24">
                                            <g >
                                                <rect x="6" y="5" width="4" height="14" fill="black" />
                                                <rect x="14" y="5" width="4" height="14" fill="black" />
                                            </g>
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            </>
                        )}

                    </motion.div>

                    {isOpen &&

                        <motion.div >
                            <motion.div
                                initial={{ opacity: 0, y: "4rem" }}
                                animate={{ opacity: 1, y: "0" }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0 }}
                                style={{ paddingBottom: "4rem", fontSize: "1.4rem", fontWeight: "400", color: "black" }}
                            >Drag the slider to hear the difference</motion.div>
                            <motion.input
                                type="range"
                                id="crossfade"
                                className="player-slider"
                                min="0"
                                max="1"
                                step="0.01"
                                value={fadeValue}
                                onChange={handleSliderChange}
                                onClick={(event) => event.stopPropagation()}

                            />

                        </motion.div>

                    }
                </motion.button >


            </motion.div >
        </>
    );
}

export default Player;