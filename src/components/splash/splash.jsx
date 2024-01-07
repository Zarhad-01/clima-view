import "./splash.css"


const Splash = () => {

  
    return (
        <>
        <div className="logo">
            <img src="src/assets/logo.png" alt="ClimaView Logo" />
        </div>

        <div className="message-body">
            <h1>Welcome to ClimaView!</h1>
            <p>To get started please search for a city of your choosing within the search box above.</p>
            <p>Should you find any bugs please don't be a stranger and post it in the issues board of my github, and it shall be fixed.</p>
            <p>Thank you for using the application!</p>

            <div className="socials">
                <a className="social-link git" href="https://github.com/Zarhad-01/clima-view">
                    <img src="src/assets/socials/GitHub_Logo.png" alt="Link to Github" />
                </a>
                <a className="social-link linkedin" href="https://www.linkedin.com/in/zahid-awan-38a571232/">
                    <img src="src/assets/socials/LI-Logo.png" alt="Link to LinkedIn" />
                </a>
            </div>
        </div>
        </>
    )
  }
  
  export default Splash;
  