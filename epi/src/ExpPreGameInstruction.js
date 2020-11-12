import React from 'react';
// import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

class ExpPreGameInstruction extends React.Component{
    constructor(props) {
        super()
    }

    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    // async componentDidMount() {
    //     console.log('Component did mount');
    //     await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    //     await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    //     await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    //     // const image = document.querySelector('img');
    //     const image = await faceapi.fetchImage('/images/stock_disgusted2.jpg');
    //     const canvas = faceapi.createCanvasFromMedia(image);
    //     // const detection = await faceapi.detectAllFaces(image)
    //     //                                 .withFaceLandmarks()
    //     //                                 .withFaceExpressions();
    //     const detection = await faceapi.detectSingleFace(image)
    //                                     .withFaceLandmarks()
    //                                     .withFaceExpressions();


    //     // console.log(detection);
    //     // console.log(detection.expressions);

    //     let emotions = {...detection.expressions};
    //     console.log(emotions);
    //     // console.log(this.props.currentState);
    //     // console.log(image.width);

    //     // const dimensions = {
    //     //     width: image.width,
    //     //     height: image.height
    //     // };

    //     // const resizedDimensions = faceapi.resizeResults(detection, dimensions);

    //     // document.body.append(canvas);

    //     // faceapi.draw.drawDetections(canvas, resizedDimensions);
    //     // faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
    //     // faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
    // }

    render() {

        return (
            <div>
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