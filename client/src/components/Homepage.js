import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import ScoreModal from './ScoreModal';
import axios from 'axios';
import moment from 'moment';


class Homepage extends React.Component {
    state = {
        show: false,
        scores: null,
        currentUser: {},
        isCurrentUser: false,
        handicapReached: false,
        tillHandicap: 0,
        isLoaded: false
    }

    componentDidMount() {
        // grabbing current user from localstorage
        // passing the signed in user token as a header
        axios.get(`/api/auth/user`, { 'headers': { 'x-auth-token': localStorage.getItem('token') } })
            .then(res => {
                // res.data is the the user object after being verified through the auth/user endpoint
                if (res.data) {
                    this.setState({ currentUser: res.data, isCurrentUser: true }, () => this.getUserScores());
                }
            })


    }

    getHandicap = () => {
        // getting the length of scores to make sure there is enough to calculate handicap
        if (this.state.scores.length < 3) {
            let tillHandicap = 3 - this.state.scores.length
            this.setState({ tillHandicap })
        }
        //has enough of a handicap and sorting scores from least to greatest
        else {
            let calcScores = [];
            this.setState({
                handicapReached: true,
                scores: this.state.scores.sort((a, b) => parseInt(a.totalScore) - parseInt(b.totalScore))
            })
            //calculating handicap per score and putting them in a score array
            this.state.scores.forEach(score => {
                console.log({
                    total: score.totalScore,
                    slope: score.courseSlope,
                    rating: score.courseRating
                })
                let calcHandicap = parseInt(score.totalScore) - parseInt(score.courseRating)
                calcHandicap = calcHandicap * 113
                calcHandicap = calcHandicap / score.courseSlope
                calcHandicap = calcHandicap.toFixed(2)
                calcScores.push(parseFloat(calcHandicap))

            })
            this.averageHandicap(calcScores)
        }
    }

    //helper function to average out scores to create handicap
    averageHandicap = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i]
        }
        let finalHandicap = Math.round(sum / array.length)
        //axios call to update user handicap
        axios.put('/api/users/' + this.state.currentUser._id, { totalHandicap: finalHandicap })
            .then(res => console.log(res.data));
    }
    //function to grab scores based on userId
    getUserScores = () => {
        let id = this.state.currentUser._id

        axios.get(`https://localhost:5000/api/scores/` + id)
            .then(res => {

                this.setState({
                    ...this.state,
                    isLoaded: true,
                    scores: res.data
                }, () => console.log(this.state.scores))
                this.getHandicap();
            })
            .catch(err => console.log(`Something failed: ${err.message}`))
    }

    userLogout = () => {
        //clearing localstorage when user signs out and redirecting to signin page
        localStorage.clear();
        this.setState({ isCurrentUser: false, currentUser: {} })
        this.props.history.push('/');

    }

    //Modal handel methods
    handleShow = () => { this.setState({ show: true }) };
    handleClose = () => { this.setState({ show: false }) };



    render() {
        return (
            <div>
                <Navbar
                    userLogout={this.userLogout}
                    isCurrentUser={this.state.isCurrentUser} />

                <Banner
                    handicapReached={this.state.handicapReached}
                    tillHandicap={this.state.tillHandicap}
                    currentUser={this.state.currentUser} />
                <div>
                    <div>
                        <h2 className="text-center">Recent Scores</h2>
                        <div className="col-md-2 offset-md-5">
                            <button style={{
                                marginBottom: '5px', fontFamily: 'Roboto, sans-serif'
                            }} onClick={this.handleShow} type="button" className="btn btn-success btn-block" data-toggle="modal" data-target="#exampleModal">
                                + New Score
                </button>
                            <ScoreModal
                                getScores={this.getUserScores}
                                currentUser={this.state.currentUser}
                                show={this.state.show}
                                onHide={this.handleClose} />
                        </div>

                    </div>
                    <table className="table" >
                        <thead>
                            <tr style={styles.tableHeaders}>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Front 9</th>
                                <th scope="col">Back 9</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoaded ? this.state.scores.map((score, i) => {
                                console.log(score)
                                return (
                                    <tr key={"uniqueKey" + i}>
                                        <th scope="row" style={{ width: '20%' }}>{moment(score.createdAt).format('MM-DD-YY')}</th>
                                        <td style={{ width: '10%' }}>{score.totalScore}</td>
                                        <td style={{ width: '40%' }}>{score.courseName}</td>
                                        <td style={{ width: '10%' }}>{score.frontNine}</td>
                                        <td style={{ width: '10%' }}>{score.backNine}</td>
                                    </tr>

                                )
                            })
                                :
                                <h1>Loading.....</h1>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const styles = {
    tableHeaders: {
        fontSize: '1rem'
    }
}


export default Homepage;