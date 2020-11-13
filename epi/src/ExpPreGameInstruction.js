import React from 'react';
// import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

const imageWrapper = {
    textAlign: 'center'
}

const imageStyle = {
    maxWidth: '300px'
}

class ExpPreGameInstruction extends React.Component{
    constructor(props) {
        super()
    }
    
    componentDidMount(){
        console.log(this.props.faceRecEmotions);
    }

    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    drawCanvas = () => {
        // document.body.append(canvas);

        // faceapi.draw.drawDetections(canvas, resizedDimensions);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);

    }

    render() {

        return (
            <div>
                <div style={imageWrapper}>
                    <img style={imageStyle} src={this.props.selectedImage}/>
                </div>
                <div className= "jumbotron text-center">
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                    <button  onClick={(e) => this.handleClick(e, '/ExpEyeColor')} type="submit" className="btn btn-primary">Starta spelet</button>
                </div>

                <div className="form-group mt-20">
                </div>
            </div>
        );
    }
}

export default ExpPreGameInstruction;