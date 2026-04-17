import { useState, CSSProperties, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

// Spotify component props
type SpotifyProps = {
    urlFragment: string,
    isVisible: boolean;
};


// CSS override for BeatLoader
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    color: "#A3B18A",
};

// Spotify component
function Spotify({ urlFragment, isVisible = true }: SpotifyProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        if (isVisible && !isLoaded) {
            const timer = setTimeout(() => {
                setShowLoader(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, isLoaded]);

    return (
        <div className="spotify-iframe" style={{ display: isVisible ? "block" : "none" }}>
            {!isLoaded && showLoader && (
                <BeatLoader
                    loading={!isLoaded}
                    cssOverride={override}
                    color={"#A3B18A"}
                />
            )}
            <iframe
                style={{
                    borderRadius: "12px",
                    display: isLoaded ? "block" : "none",
                    width: "100%",
                    border: "none",
                    minHeight: "352px"
                }}
                src={`https://open.spotify.com/embed/album/${urlFragment}?utm_source=generator&theme=0`}
                width="100%"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                onLoad={handleLoad}
            />
        </div>
    );
}

export default Spotify