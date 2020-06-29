import React from "react";
import Modal from "react-bootstrap/Modal";



class ScoreModal extends React.Component {

    state = {
        golfCourse: "",
        front9: parseInt(0),
        back9: parseInt(0),
        courseRating: parseInt(0),
        courseSlope: parseInt(0),
        totalScore: parseInt(0)
    }


    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ totalScore: Number(this.state.front9) + Number(this.state.back9) })

    }



    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter text-center">
                        <div className="text-center">
                            <h1>Insert New Score</h1>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div id="leftDiv" className="col">
                            <label>Golf Course</label>
                            <div className="input-group mb-3">
                                <input type="text" placeholder="ex. Cowboys Golf Course" name="golfCourse" value={this.state.golfCourse} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                            </div>
                            <label>Front 9</label>
                            <div className="input-group mb-3">
                                <input type="number" name="front9" min={0} value={this.state.front9} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                            </div>
                            <label>Back 9</label>
                            <div className="input-group mb-3">
                                <input type="number" name="back9" min={0} value={this.state.back9} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                            </div>
                        </div>
                        <div id="rightDiv" className="col">
                            <label>Course Rating</label>
                            <div className="input-group mb-3">
                                <input type="number" name="courseRating" min={0} value={this.state.courseRating} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                            </div>
                            <label>Slope</label>
                            <div className="input-group mb-3">
                                <input type="number" name="courseSlope" min={0} value={this.state.courseSlope} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2>{parseInt(this.state.front9) + parseInt(this.state.back9)}</h2>
                        <p>Total Score</p>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success btn-block">Submit Score</button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    };
};



export default ScoreModal;