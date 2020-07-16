import React from 'react';
import golfballImage from "../images/golfball.png";

const Banner = (props) => {
    let handicapText;
    if (props.tillHandicap === 1) {
        handicapText = <h1 style={{ fontSize: '1.5rem' }} className="text-center">Still need {props.tillHandicap} more score!</h1>
    } else {
        handicapText = <h1 style={{ fontSize: '1.5rem' }} className="text-center">Still need {props.tillHandicap} more scores!</h1>
    }

    return (
        <div className="img-thumbnail" style={styles.imageDiv}>
            <div style={styles.bannerText}>

                {props.handicapReached ?
                    <div>
                        <h1 style={{ fontSize: '6rem' }} className="text-center">{props.currentUser.totalHandicap}</h1>
                        <h1 style={{ fontSize: '1.5rem' }} className="text-center">Handicap</h1>
                    </div>
                    : <div><h1 style={{ fontSize: '6rem' }} className="text-center">00</h1>
                        {handicapText}</div>}
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