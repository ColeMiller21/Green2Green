import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import ScoreTable from './ScoreTable';

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <ScoreTable />
        </div>
    )
}


export default Homepage;