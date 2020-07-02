import React from 'react';
import ScoreModal from './ScoreModal';
import axios from 'axios';

const scores = [
    {
        "course_name": "Riverside Golf Course",
        "frontNine": 46,
        "backNine": 46,
        "totalScore": 92
    },
    {
        "course_name": "Waterchase Golf Course",
        "frontNine": 48,
        "backNine": 48,
        "totalScore": 96
    },
    {
        "course_name": "Cowboys Golf Course",
        "frontNine": 50,
        "backNine": 50,
        "totalScore": 100
    }
]


class ScoreTable extends React.Component {

    state = {
        show: false,
        scores: [],
        currentUser: {},
        isCurrentUser: false
    }

    componentDidMount() {

        // grabbing current user from localstorage
        // passing the signed in user token as a header
        axios.get(`/api/auth/user`, { 'headers': { 'x-auth-token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                // res.data is the the user object after being verified through the auth/user endpoint
                if (res.data) {
                    this.setState({ currentUser: res.data }, () => this.getUserScores());
                }
            })

    }

    //function to grab scores based on userId
    getUserScores = () => {
        let id = this.state.currentUser._id
        console.log(id)
        axios.get(`/api/scores/` + id)
            .then(res => {
                console.log(res.data)
                this.setState({ scores: res.data })

            })
            .catch(err => console.log(err))
    }

    //Modal handel methods
    handleShow = () => { this.setState({ show: true }) };
    handleClose = () => { this.setState({ show: false }) };


    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">Recent Scores</h2>
                    <div className="col-md-2 offset-md-5">
                        <button style={{ marginBottom: '5px' }} onClick={this.handleShow} type="button" className="btn btn-success btn-block" data-toggle="modal" data-target="#exampleModal">
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
                            <th scope="col">Total</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Front 9</th>
                            <th scope="col">Back 9</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, i) => {
                            return (
                                <tr key={score.course_name + i}>
                                    <th scope="row">{score.totalScore}</th>
                                    <td>{score.course_name}</td>
                                    <td>{score.frontNine}</td>
                                    <td>{score.backNine}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        )

    }
}

const styles = {
    tableHeaders: {
        fontSize: '1rem'
    }
}



export default ScoreTable;