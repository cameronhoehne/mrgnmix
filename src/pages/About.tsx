import { useNavigate } from "react-router-dom";
import morganImage from "../assets/images/morgan-profile.jpg"


function About() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/contact")

    }

    return (
        <>
            <section className="about-section">

                <h1>ABOUT</h1>
                <div className="about-side-by-side">
                    <img
                        src={morganImage}
                        className="about-image"
                    />
                    <div className="about-text-container">
                        <p className="about-text">
                            MRGNMUSIC started out as just a guy in his early 20’s wanting to record a few songs for his band. Starting out in GarageBand and then switching to Logic Pro, Morgan Hoehne has been fully self-taught in mixing and mastering from the get go. He has developed a unique sound over the past decade-plus in his recording and mixing, the latest of which can be heard in some of his solo works which are entirely self-written, recorded, mixed and mastered. Other artists he has worked with are:
                            <br />
                        </p>
                        <div className="about-text">
                            <ul>
                                <li>Steaksauce Mustache</li>
                                <li>Your Hands Write History</li>
                                <li>To Die Elsewhere</li>
                                <li>Archangel</li>
                                <li>Metaconcert</li>
                            </ul>
                        </div>

                        <p className="about-text">
                            MRGNMUSIC Mixing & Mastering offers budget-friendly, high-quality mixes to artists who are new to the scene and/or don’t have the knowhow and gear to create a great sounding mix, as well as artists who are just looking for a fresh take on their music. Services include mixing and leveling, ground-up mixing, mastering preparation, and final mastering for distribution on streaming or physical platforms.
                            <br />
                            <br />
                            For inquiries about pricing and services, please send an email to <a href="mailto: mrgnmusisc.mix@gmail.com">mrgnmusic.mix@gmail.com</a>
                        </p>
                    </div>
                </div>
                <button onClick={handleButtonClick} style={{ marginTop: "2rem" }} className="about-button">Learn More</button>
            </section >


        </>
    )
}

export default About;