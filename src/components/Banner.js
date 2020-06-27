import React from 'react';
import golfballImage from "../images/golfball.png";

const Banner = () => {
    return (
        <div className="img-thumbnail" style={styles.imageDiv}>
            <div style={styles.bannerText}>
                <h1 style={{ fontSize: '6rem' }} className="text-center">00</h1>
                <h1 style={{ fontSize: '1.5rem' }} className="text-center">Player Handicap</h1>
            </div>

        </div>
    )
}

const styles = {
    imageDiv: {
        width: '100vw',
        height: "45vh",
        background:
            `linear-gradient(rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)),
    url(${golfballImage})`,
        backgroundRepeat: 'no - repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
    },
    bannerText: {
        color: 'white',
        position: 'absolute',
        top: '30%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}


export default Banner;