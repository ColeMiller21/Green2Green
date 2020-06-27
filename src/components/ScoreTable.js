import React from 'react';


const ScoreTable = () => {
    return (
        <div>
            <div>
                <h2 className="text-center">Recent Scores</h2>
                <div className="col-md-2 offset-md-5">
                    <button style={{ marginBottom: '5px' }} type="button" className="btn btn-success btn-block" data-toggle="modal" data-target="#exampleModal">
                        + New Score
                </button>
                </div>

            </div>
            <table class="table">
                <thead>
                    <tr style={styles.tableHeaders}>
                        <th scope="col">Total</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Front 9</th>
                        <th scope="col">Back 9</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">92</th>
                        <td>Riverside Golf Course</td>
                        <td>46</td>
                        <td>46</td>
                    </tr>
                    <tr>
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
                    </tr>
                </tbody>
            </table>
        </div>
    )


}

const styles = {
    tableHeaders: {
        fontSize: '1rem'
    }
}



export default ScoreTable;