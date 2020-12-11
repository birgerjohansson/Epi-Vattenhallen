import React from 'react';
// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
// import Spinner from 'react-bootstrap/Spinner'
import {objectList} from './ExpObjectData';
import ProgressBar from "./progress-bar.component";

const imageWrapper = {
    display: 'inline-block',
    textAlign: 'center'
}

const drawCanvas = {
    display: 'inline-block',
    float: 'right',
    textAlign: 'center'
}

const imageStyle = {
    maxWidth: '300px'
}

const loaderWrapper = {
    textAlign: 'center'
}

const spinner = {
    width: '300px',
    height: '300px'
}

const epiResultWrapper = {
    display: 'flex'
}

const epiEmotionBar = {
    flex: '8'
}


var emotions = {};
let epiResult = [];

class ExpPreGameInstruction extends React.Component{
    constructor(props) {
        super()
    }
    
    componentDidMount(){
        // console.log(this.props.faceRecEmotions);
        this.drawCanvas();
    }

    renderEpiResults(){
        const eR = Object.entries(emotions);

        eR.forEach(([key, value]) => {
            epiResult.push({emotionCat: key, value: value});
        })
        
        return(
            <div style={epiResultWrapper}>
                <div>Epi gissning</div>
                {/* <div style={resultImageWrapper}>
                    <img style={resultImage} src={this.props.selectedImage}/>
                </div>   */}
                <div style={epiEmotionBar}>
                    {epiResult.map((item) => (
                        <div>
                            { item.value * 100 > 5 ? <div className="emotion-category">{item.emotionCat}</div> : null}
                            { item.value * 100 > 5 ?<ProgressBar bgcolor={objectList.find(x => x.faceRecEmotion === item.emotionCat).barColor} completed={item.value * 100} /> : null}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    async drawCanvas() {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        // const image = await faceapi.fetchImage('/images/stock_disgusted2.jpg');

        const image = await faceapi.fetchImage(this.props.selectedImage);
        
        const canvas = faceapi.createCanvasFromMedia(image);

        // const detection = await faceapi.detectAllFaces(image)
        //                                 .withFaceLandmarks()
        //                                 .withFaceExpressions();
        const detection = await faceapi.detectSingleFace(image)
                                        .withFaceLandmarks()
                                        .withFaceExpressions();
                                        
        // console.log(detection);
        // console.log(detection.expressions);
    
        emotions = {...detection.expressions};
        console.log(emotions);
         const dimensions = {
             width: image.width,
             height: image.height
         };
    
         const resizedDimensions = faceapi.resizeResults(detection, dimensions);
    
        // document.body.append(canvas);
        // document.getElementById("faceImageWrapper").append(canvas);
        // var c = document.getElementById("faceImageWrapper");
        // console.log(c);

        // this.setState({faceRecEmotions: emotions});

        let div = document.getElementById('drawCanvas'); 

        div.appendChild(canvas)
    
        // faceapi.draw.drawDetections(canvas, resizedDimensions);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);


        this.props.callbackFromParent(emotions);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
        // console.log(this.state);
    }

    renderInstructions(){        
        return(
            <div>
                <div id="drawCanvas" style={drawCanvas}></div>
                <div style={imageWrapper} id="faceImageWrapper">
                    <img id="faceImage" style={imageStyle} src={this.props.selectedImage}/>
                </div>
                <div>
                    {Object.keys(emotions).length != 0 ? this.renderEpiResults() : null}
                </div>

                <div>
                    Epi kommer försöka lära sig känslan som du har demonstrerat (input), men eftersom att Epi inte har något självmedvetande måste han få en bedömning (feedback) på hur hans känslouttryck (output) uppfattas, dvs, hur han ser ut, så att han kan lära sig att försbättra sitt uttryck.
                </div>
                <div>
                    Epi kommer försöka uttrycka känslan fler gånger. Efter varje försök bedömer du Epis uttryck. Epi använder din bedömning för att justera sitt nästa försök.
                </div>
                
                <div className= "jumbotron text-center">
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Ny bild</button>
                    {/* <button  onClick={(e) => this.handleClick(e, '/ExpEyeColor')} type="submit" className="btn btn-primary">Starta spelet</button> */}
                    <button  onClick={(e) => this.handleClick(e, '/PrevResult')} type="submit" className="btn btn-primary">Starta spelet</button>
                    
                </div>

                <div className="form-group mt-20">
                </div>
            </div>
        )
    }

    render() {
        return (
            // <div>
            //     { 
            //         Object.entries(this.props.faceRecEmotions).length === 0 ? 
            //             <div style={loaderWrapper}> 
            //                 <Spinner style={spinner} animation="border" variant="primary" />
            //             </div>  
            //         : this.renderInstructions()
            //     }
            // </div>
        //     <div>
        //     { 
        //         Object.entries(emotions).length === 0 ? 
        //             <div style={loaderWrapper}> 
        //                 <Spinner style={spinner} animation="border" variant="primary" />
        //             </div>  
        //         : this.renderInstructions()
        //     }
        // </div>
        <div>
        { 
            this.renderInstructions()
        }
    </div>
        );
    }
}

export default ExpPreGameInstruction;