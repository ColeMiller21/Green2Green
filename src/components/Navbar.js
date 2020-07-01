import React from 'react';


const Navbar = () => {

    return (

        <nav style={styles.navStyle} className="navbar navbar-light bg-light">
            <span style={{ color: 'white', fontFamily: 'Rock Salt, cursive', fontSize: '1.5rem' }} className="navbar-brand mb-0 mx-auto h1">Green 2 Green</span>
        </nav>
    )

}

const styles = {
    navStyle: {
        background: 'linear-gradient(226deg, rgb(15, 114, 68) 48%, rgb(17, 97, 73) 100%)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }

}


export default Navbar;