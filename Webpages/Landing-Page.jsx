import React, { useRef } from 'react';
import '../CSS-folder/Landing-Page.css';
import { useState, useEffect } from 'react';
import MainBackground from './Main-Background';
import video1 from '../Assets/1-3D-game-preview.mp4';
import unityLogo from '../Assets/unityLogo.png';
import cSharpLogo from '../Assets/cSharpLogo.png';
import musicGameImage from '../Assets/music-game-image.png';
import website1Image from '../Assets/website1-image.png';
import CSSLogo from '../Assets/CSSLogo.png';
import viteLogo from '../Assets/viteLogo.png';
import JSLogo from '../Assets/JSLogo.png';
import reactLogo from '../Assets/reactLogo.png';
import helpMyImage from '../Assets/helpMyImage.png'
import TSLogo from '../Assets/TSLogo.png'
import expoLogo from '../Assets/expoLogo.png'


function LandingPage() {
    const [heading, setHeading] = useState("");
    const [fullText, setFullText] = useState("Hey There!");
    const indexRef = useRef(0);
    const [pauseIndex, setPauseIndex] = useState(0);
    const [ani1Protocol, setAni1Protocol] = useState(0);
    const [isAboutMeClicked, setIsAboutMeClicked] = useState(false);
    const [isMyStuffClicked, setIsMyStuffClicked] = useState(false);
    const [h1, setH1] = useState(["Hey There!", "Welcome!", "Greetings!", "Salutations!", "Howdy!", "Hiya!", "Hello!"]);
    const triggerRef = useRef(null);


    useEffect(() => {
        let interval = null;
        if (indexRef.current != 0) {
            interval = setInterval(() => {
                setHeading((prev) => prev.slice(0, -1));
                indexRef.current--;
                if (indexRef.current <= 0) {
                    clearInterval(interval);
                    indexRef.current = 0;
                    setAni1Protocol(0);




                }
            }, 50);
        }
        setPauseIndex(Math.floor(Math.random() * (fullText.length - 3)) + 2);
    }, [fullText]);

    // h1 animation -> typing effect part1 -> pause -> typing effect part2
    useEffect(() => {
        let interval = null;
        if (pauseIndex > 1 && ani1Protocol == 0 && indexRef.current < pauseIndex) {
            interval = setInterval(() => {
                setHeading(fullText.slice(0, indexRef.current + 1));
                indexRef.current++;
                if (indexRef.current === pauseIndex) {
                    clearInterval(interval);
                    setAni1Protocol(1);
                }
            }, 100);
        } else if (ani1Protocol == 2) {
            interval = setInterval(() => {
                setHeading(fullText.slice(0, indexRef.current + 1));
                indexRef.current++;
                if (indexRef.current === fullText.length) {
                    clearInterval(interval);
                    setAni1Protocol(3);
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [pauseIndex, ani1Protocol]);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            if (h1.length > 1) {
                console.log(h1)
                setFullText(h1[Math.floor(Math.random() * h1.length)]); // change text
            }
        }, 7000);
        return () => clearInterval(interval);
    }, [h1]);

    // add an "I" to make it look like it's thinking
    useEffect(() => {
        let interval = null;
        if (ani1Protocol == 1) {
            let val = 0;
            interval = setInterval(() => {
                setHeading(((prev) => prev.charAt(prev.length - 1) == "|" ? prev.slice(0, -1) : prev + "|"));
                val++;
                if (val == 4) { setAni1Protocol(2), clearInterval(interval) };
            }, 250);
        } else if (ani1Protocol == 3) {
            let val = 0;
            interval = setInterval(() => {
                setHeading(((prev) => prev.charAt(prev.length - 1) == "|" ? prev.slice(0, -1) : prev + "|"));
                val++;
                if (val == 10) { clearInterval(interval) };
            }, 250);
        }
        return () => clearInterval(interval);
    }, [ani1Protocol]);

    const aboutMeButton = document.getElementById("About-Me");
    const myStuffButton = document.getElementById("My-Stuff");
    const aboutMeMain = document.getElementById("AboutMeMain");
    const myStuffMain = document.getElementById("MyStuffMain");
    const scrollBar = document.getElementById("scrollBar");
    const indexRef2 = useRef(0);
    function handleClick(x) {
        if (x == 0 ? isAboutMeClicked : isMyStuffClicked) return;
        x == 0 ? setIsAboutMeClicked(true) : setIsMyStuffClicked(true);
        document.body.style.overflow = 'hidden';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setTimeout(() => {
            x == 0 ? (myStuffMain.style.display = "none") : (aboutMeMain.style.display = "none");
        }, 500);

        let interval = null;
        let interval2 = null;
        let topValue = 0; let reversedTopValue = -100;
        let widthValue = 3.5;
        let altValue = 1; let reversedAltValue = 1024;
        let phase1 = 10;
        let theButton = x == 0 ? aboutMeButton : myStuffButton;
        let theOtherButton = x == 0 ? myStuffButton : aboutMeButton;
        let theButtonText = x == 0 ? "Check out some of my stuff!" : "Discover more about me!";

        if (triggerRef.current) {
            x == 0 ?
                (setTimeout(() => { triggerRef.current(window.innerWidth / 4, window.innerHeight); }, 950))
                :
                (setTimeout(() => { triggerRef.current(window.innerWidth * 3 / 4, window.innerHeight); }, 950))

        }
        theOtherButton.innerHTML = theButtonText;
        setH1(x == 0 ? ["About Me"] : ["My Stuff"]);
        setAni1Protocol(-1);
        setFullText(x == 0 ? "About Me" : "My Stuff");
        interval2 = setInterval(() => {
            let prev = theButton.innerHTML;
            theButton.innerHTML = prev.slice(0, -1);
            if (theButton.innerHTML.length <= 0) {
                clearInterval(interval2);
                setTimeout(() => {
                    (x == 0 ? aboutMeMain : myStuffMain).style.display = "block";
                    document.body.style.overflow = 'auto';
                }, 800);

            }
        }, 15);

        interval = setInterval(() => {
            theOtherButton.style.opacity = 1;
            theButton.style.top = topValue + altValue + "px";
            if (isAboutMeClicked || isMyStuffClicked) {
                theOtherButton.style.top = reversedTopValue + reversedAltValue + "px";
                theOtherButton.style.width = 20 + "vw";
            }

            theButton.style.width = widthValue + "vw";
            altValue *= 2; reversedAltValue /= 2;
            topValue -= 10; reversedTopValue += 10;
            phase1--;
            if (phase1 <= 0) {
                x == 0 ? (setIsAboutMeClicked(true), setIsMyStuffClicked(false)) : (setIsAboutMeClicked(false), setIsMyStuffClicked(true));
                clearInterval(interval);
                theButton.style.opacity = 0;
                scrollBar.style.right = 1 + "vw";
                scrollBarCurrent.style.height = 46 + "vh";
            }
        }, 100);





    }
    const scrollBarCurrent = document.getElementById("scrollBarCurrent");
    const scrollBarTotal = document.getElementById("scrollBarTotal");
    function handleScroll() {

    }

    const handleMouseEnter = (e) => {
    const elements = Array.from(e.currentTarget.children);

    const imgElements = elements.filter(el => el.tagName === "IMG" && !el.classList.contains("doNotChange"));

    imgElements.forEach(img => {
      img.style.opacity = 1; 
    });
  };
  const handleMouseLeave = (e) => {
    // reset when leaving (optional)
    const elements = Array.from(e.currentTarget.children);
    elements.forEach(el => {
      if (el.tagName === "IMG" && !el.classList.contains("doNotChange")) el.style.opacity = 0;
    });
  };

  

    //You actually reading this?!?!?
    //Very cool! Lmk if theres any gapping inefficencies or if you have any suggestions!
    //You... probably know my email if you looking at this... :D
    //AI is the next step! hehehe
    //Or if you wanna play riot games, add me kazok101#5138


    return (
        <>
            <div id="mainBackgroundDiv">
                <MainBackground trigger={(fn) => (triggerRef.current = fn)} />
            </div>
            <div id="fullMain" onScroll={handleScroll}>

                <div className="landing-page">
                    <div id="backgroundCover01"></div>
                    <header className="header">
                        <h1>{heading}</h1>
                        <div className="AboutMeContainer" id="AboutMeContainer">
                            <button onClick={() => handleClick(0)} id="About-Me" className="actionButton" >Discover more about me!</button>
                        </div>
                        <div className="MyStuffContainer">
                            <button onClick={() => handleClick(1)} id="My-Stuff" className="actionButton" >Check out some of my stuff!</button>
                        </div>
                    </header>
                    <div className="AboutMeMain" id="AboutMeMain">
                        <div style={{ width: 50 + "vw", paddingLeft: 25 + "vw" }}>
                            <>
                                <img></img>
                                <h2>The name's Paul Ding.</h2>
                            </>
                            <p>I am currently a first year student at Mcmaster University. You will find I never back down from a challenge and always try to exceed my own expectations. My strength is backend development with Java and Python. For webdeveloping, I primarily use React.</p>
                            <p>Beyond work, I play chess, League, Valorant, 2XKO, and many other games. If you need to contact me, email me at paul2003mail@gmail.com</p>

                        </div>
                    </div>
                    <div className="MyStuffMain" id="MyStuffMain">
                        <h2>My Projects</h2>
                        <div className="ProjContainer" onClick={() => window.open("https://github.com/Paul-Ding-wastaken/Shooter-Game-1-3D")} onMouseEnter={(e) => handleMouseEnter(e) } onMouseLeave={(e) => handleMouseLeave(e)}>
                            <h2>1-3D shooter</h2>
                            <video controls={false} src={video1} loop={true} width="300vw" height="200vh" autoplay="" />
                            <p className = "moreInfo">Click to check it out on github!</p>
                            <img style={{marginLeft: "-10vw"}} className = "logos" src={unityLogo} height="65vh" width = {(65* 384/216) + "vh"}/>
                            <img style={{marginLeft: "2vw", marginTop: "-3vh"}} className = "logos" src={cSharpLogo} height="100vh" width = "100vh"  />
                        </div>
                        <div className="ProjContainer" onClick={() => window.open("https://github.com/Paul-Ding-wastaken/Music-rhythm-game")} onMouseEnter={(e) => handleMouseEnter(e) } onMouseLeave={(e) => handleMouseLeave(e)}>
                            <h2>Simple rhythm game</h2>
                            <img style={{opacity: '1', padding: '5vh'}} className="doNotChange" src={musicGameImage} width="300vw" height="auto"></img>
                            <p className = "moreInfo">Click to check it out on github!</p>
                            <img style={{marginLeft: "-10vw"}} className = "logos" src={unityLogo} height="65vh" width = {(65* 384/216) + "vh"}  />
                            <img style={{marginLeft: "2vw", marginTop: "-3vh"}} className = "logos" src={cSharpLogo} height="100vh" width = "100vh" />
                        </div>
                        <div className="ProjContainer" onClick={() => window.open("https://github.com/Paul-Ding-wastaken/Proj-5")} onMouseEnter={(e) => handleMouseEnter(e) } onMouseLeave={(e) => handleMouseLeave(e)}>
                            <h2>API + Google auth website</h2>
                            <img style={{opacity: '1', padding: '5vh'}} className="doNotChange" src={website1Image} width="300vw" height="auto"></img>
                            <p className = "moreInfo">Click to check it out on github!</p>
                            <img style={{marginLeft: "-11vw", marginTop: "0vh"}} className = "logos" src={CSSLogo} height="80vh" width = "60vh" />
                            <img style={{marginLeft: "-6vw", marginTop: "1vh"}} className = "logos" src={JSLogo} height="80vh" width = "80vh" />
                            <img style={{marginLeft: "0vw", marginTop: "2.5vh"}} className = "logos" src={reactLogo} height="60vh" width = "70vh" />
                            <img style={{marginLeft: "6vw", marginTop: "1vh"}} className = "logos" src={viteLogo} height="70vh" width = "70vh"  />
                        </div>
                        <div className="ProjContainer" onClick={() => window.open("https://github.com/Paul-Ding-wastaken/Native-React")} onMouseEnter={(e) => handleMouseEnter(e) } onMouseLeave={(e) => handleMouseLeave(e)}>
                            <h2>HelpMy App</h2>
                            <img style={{opacity: '1', padding: '5vh'}} className="doNotChange" src={helpMyImage} width="75vw" height="auto"></img>
                            <p className = "moreInfo">Click to check it out on github!</p>
                            <img style={{marginLeft: "-8vw"}} className = "logos" src={expoLogo} height="65vh" width = "65vh" alt="Unity Logo" />
                            <img style={{marginLeft: "3vw", marginTop: "0vh"}} className = "logos" src={TSLogo} height="65vh" width = "65vh" alt="C# Logo" />
                        </div>
                        
                
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;