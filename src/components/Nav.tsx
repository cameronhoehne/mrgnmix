import { motion } from "framer-motion"
import { NavLink } from 'react-router-dom'
import { useState } from "react"
import Hamburger from "hamburger-react"
import { FaInstagram, FaSpotify } from "react-icons/fa";
import img from "../assets/images/logo-black.png"

function Nav() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [ShouldRender, setShouldRender] = useState<boolean>(false);

    const handleToggle = () => {
        if (isOpen) {
            setIsOpen(false);
            document.body.style.overflow = "auto";
        } else {
            setShouldRender(true);
            setIsOpen(true);
            document.body.style.overflow = "hidden";

        }
    };

    return (
        <>
            <nav>
                <div className="nav-img-div">
                    <a href="/">
                        <img src={img} className="nav-img" />
                    </a>
                </div>
                <ul id='desktop-nav'>
                    {[
                        { to: "/", label: "HOME" },
                        { to: "/about", label: "ABOUT" },
                        { to: "/discography", label: "DISCOGRAPHY" },
                        { to: "/contact", label: "CONTACT" }

                    ].map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                                {({ isActive }) => (
                                    <div className="nav-link-wrapper" style={{ position: "relative", display: "inline-block" }}>
                                        {label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="underline"
                                                className="underline"
                                                transition={{ type: 'spring', duration: .3, bounce: .1 }}
                                            >
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className='social-icons'>
                    <a href="https://www.instagram.com/mrgnmusic.mix" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://open.spotify.com/artist/7m0nr7m8iIat6PvCeeL8Oc" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                        <FaSpotify />
                    </a>
                </div>
                <div id='hamburger-menu' onClick={handleToggle}>
                    <Hamburger
                        toggled={isOpen}
                        toggle={setIsOpen}

                    />
                </div>


            </nav>

            {ShouldRender && (
                <>
                    <motion.div id="hamburger-menu-links"
                        initial={{ x: "100%" }}
                        animate={{ x: isOpen ? "0%" : "100%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", bounce: .1, duration: 0.5, ease: "easeInOut", repeatType: "reverse" }}

                        onAnimationComplete={() => {
                            if (!isOpen) {
                                setShouldRender(false);
                            }
                        }}
                    >
                        <ul id="hamburger-nav">
                            <li>
                                <NavLink to="/" onClick={() => handleToggle()} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} >HOME</NavLink>

                            </li>
                            <li>
                                <NavLink to="/about" onClick={() => handleToggle()}>ABOUT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/discography" onClick={() => handleToggle()}>DISCOGRAPHY</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" onClick={() => handleToggle()}>CONTACT</NavLink>
                            </li>
                            <div className='social-icons-m'>
                                <a href="https://www.instagram.com/mrgnmusic.mix" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="https://open.spotify.com/artist/7m0nr7m8iIat6PvCeeL8Oc" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                                    <FaSpotify />
                                </a>
                            </div>
                        </ul>

                    </motion.div>
                    <motion.div className="overlay" onClick={() => handleToggle()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? "30%" : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .5, ease: "easeInOut" }}


                    ></motion.div>
                </>
            )}

        </>



    )
}

export default Nav