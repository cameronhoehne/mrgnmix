



function Contact() {

    return (
        <>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1>CONTACT</h1>
                <p className="contact-text">Big or small, new or experienced — your music deserves to sound its best.</p>
                <br /><p className="contact-text second">Reach out and let’s talk about what you need.</p>
                <div className="form-container">
                    <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="form-content">
                        <input type="hidden" name="form-name" value="contact" />
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" name="name" placeholder="Name" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" required />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="How can I help?" required></textarea>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button type="submit" className="form-submit">Send</button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Contact;