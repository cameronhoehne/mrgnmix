import { motion, LayoutGroup } from "framer-motion"
import Player from "../components/Player"
import Work from "../components/Work";

import { useEffect, useState } from "react";

function Home() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <h1>MRGNMUSIC</h1>
            <p className="hero-p">Affordable, reliable mixing and mastering that lets your tracks speak clearly.</p>
            <LayoutGroup>
                {isLoaded &&
                    <motion.div layout>
                        <Player />
                    </motion.div>
                }

                {isLoaded &&
                    <motion.div layout>
                        <Work />
                    </motion.div>
                }

            </LayoutGroup>

        </>
    )
}

export default Home;