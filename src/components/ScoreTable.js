import React from 'react';
import ScoreModal from './ScoreModal';

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
        show: false
    }

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
                        {/* <tr>
                            <th scope="row">96</th>
                            <td>Waterchase Golf Course</td>
                            <td>48</td>
                            <td>48</td>
                        </tr>
                        <tr>
                            <th scope="row">100</th>
                            <td>Cowboys Golf Course</td>
                            <td>50</td>
                            <td>50</td>
                        </tr> */}
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