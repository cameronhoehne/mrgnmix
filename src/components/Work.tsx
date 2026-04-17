import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "../data/data";
import Spotify from "./Spotify.tsx";

function Portfolio() {

    const [selectedItem, setSelectedItem] = useState<{
        id: number;
        image: string;
        title: string;
        spotify: string;
    } | null>(null);

    const handleClick = (item: {
        id: number;
        image: string;
        title: string;
        spotify: string;
    }) => {
        setSelectedItem(item);
    };


    const handleClose = () => {
        setSelectedItem(null);
    };

    const Block = ({
        item,
        style,
    }: {
        item: { id: number; image: string; title: string; spotify: string };
        style?: React.CSSProperties;
    }) => (
        <motion.div
            layoutId={`block-${item.id}`}
            onClick={() => handleClick(item)}
            className="portfolio-box-default"
            style={style}
        >
            <motion.div className="portfolio-card">
                <motion.div
                    className="portfolio-image-container"
                    layoutId={`card-${item.id}`}
                >
                    <motion.img
                        layoutId={`image-${item.id}`}
                        src={item.image}
                        alt={item.title}
                        style={{ borderRadius: 20, objectFit: "contain" }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="portfolio-container">

            <motion.div
                layout
                className="portfolio-content"
            >
                {portfolioItems.map((item) => (
                    <Block key={item.id} item={item} style={{ borderRadius: 20 }} />
                ))}
                <AnimatePresence>
                    {selectedItem !== null && (
                        <>
                            <motion.div
                                layoutId={`block-${selectedItem.id}`}
                                className="portfolio-box-active"
                                onClick={handleClose}
                                style={{ zIndex: 10002, borderRadius: 20 }}
                            >
                                <motion.div className="portfolio-card">
                                    <motion.div
                                        className="portfolio-image-container"
                                        layoutId={`card-${selectedItem.id}`}
                                    >
                                        <motion.img
                                            layoutId={`image-${selectedItem.id}`}
                                            src={selectedItem.image}
                                            alt={selectedItem.title}
                                            style={{
                                                width: "100%",
                                                position: "absolute",
                                                borderRadius: 20,
                                            }}
                                        />
                                    </motion.div>
                                    <motion.div className="portfolio-card-content">
                                        <Spotify urlFragment={selectedItem.spotify} isVisible={true} />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                style={{
                                    opacity: 0.5,
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    width: "100%",
                                    height: "100vh",
                                    backgroundColor: "black",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={handleClose}
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default memo(Portfolio);