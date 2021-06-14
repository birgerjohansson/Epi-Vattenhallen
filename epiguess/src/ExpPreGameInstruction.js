import React from 'react';
// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
// import Spinner from 'react-bootstrap/Spinner'
import {objectList} from './ExpObjectData';
import ProgressBar from "./progress-bar.component";
import { Button } from 'react-bootstrap';

const imageWrapper = {
    display: 'inline-block',
    float: 'left',
    textAlign: 'center',
    marginTop: '30px',
    //marginLeft: '100px',
}

const drawCanvas = {
    display: 'inline-block',
    float: 'right',
    textAlign: 'center',
    marginTop: '30px',
    //marginRight: '100px',
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
    // display: 'flex'
    flex: '8',
    textAlign: 'center',
    paddingTop: '50px'
}

const epiEmotionBar = {
    // flex: '8'
}

const epiGuessWrapper = {
    //display: 'float-left'
    height: '400px'
}

const buttonStyle = {
    marginLeft: '25px',
    marginRight: '25px',
    width: '150px',
    height: '50px',
    fontSize: '22px'
}

const guessText = {
    paddingTop: '50px',
    paddingBottom: '25px',
    fontSize: '30px'
}

const backgroundWhite = {
    backgroundColor: 'white'
}

const epiPoints = {
    fontSize: '22px',
    paddingBottom: '20px'
}

const buttonRed = {
    marginLeft: '25px',
    marginRight: '25px',
    width: '150px',
    height: '50px',
    fontSize: '22px',
    backgroundColor: '#f44336',
    color: 'white'
}

const emotionCategory = {
    fontSize: '20px'
}

const thinkingText = {
    textAlign: 'center',
    paddingTop: '200px',
    fontWeight: 'bold',  
    fontSize: '48px'
}

var emotions = {};
let epiResult = [];

var disableButton = true;
var feedbackGiven = false;

var hasAnswered = null;
var canvasReady = false;
var canvas = null;

var hasRenderedCanvas = false;

class ExpPreGameInstruction extends React.Component{
    constructor(props) {
        super()
    }
    
    componentDidMount(){
        emotions = {};
        epiResult = [];
        feedbackGiven = false;
        disableButton = true;
        hasAnswered = null;
        canvasReady = false;

        this.drawCanvas();
    }

    handleGuessFeedback = (correct) => {
        console.log("Correct " + correct);

        disableButton = false;
        feedbackGiven = correct;
        hasAnswered = correct;

        console.log("disableButton " + disableButton);
        console.log("feedbackGiven " + feedbackGiven);
        // this.props.callbackFromParentFeedback(feedbackGiven); 
        this.forceUpdate();
    }

    disableButton = () => {
        // console.log(feedbackGiven);
        console.log("disableButton " + disableButton);
        if(disableButton == true)
            return true;
        else
            return false;
    }

    renderEpiPoints = () => {
        if(hasAnswered != null){
            if(hasAnswered == true){
                return <div style={guessText}>Epi får 1 Poäng!</div>
            } 
            else if(hasAnswered == false)
            {
                return <div style={guessText}>Epi får 0 Poäng!</div>
            }
        }
    }

    renderEpiGuess = () => {
        
            if(hasAnswered){
                return null
            } 
            else if(hasAnswered == null)
            {
                return <div style={guessText}>Gissade Epi rätt?</div>
            }
    }

    renderEpiResults(){
        epiResult = [];
        console.log(this.props.guessResults);

        const eR = Object.entries(this.props.guessResults[this.props.guessResults.length -1].faceRecEmotions);
        eR.forEach(([key, value]) => {
            var emotionCatSV = objectList.find(x => x.faceRecEmotion === key).emotions[0].emotion;
            epiResult.push({emotionCat: key, emotionCatSV: emotionCatSV, value: value});
        })
        console.log(epiResult)
        return(
            <div>
                <div style={epiEmotionBar}>
                    <div style={emotionCategory}>Epi gissar:</div>
                    {epiResult.map((item) => (
                        <div>
                            { item.value * 100 > 5 ? <div style={emotionCategory} className="emotion-category">{item.emotionCatSV}</div> : null}
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
    

    renderCanvas = () => {
        // let div = document.getElementById('drawCanvas'); 
        if(!hasRenderedCanvas){
            window.requestAnimationFrame(function(){
                document.getElementById('drawCanvas').appendChild(canvas); 
                hasRenderedCanvas = true;
            });
        }
    }

    // componentDidUpdate(){
    //     this.renderCanvas();
    // }

    

    async drawCanvas() {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        // const image = await faceapi.fetchImage('/images/stock_disgusted2.jpg');

        const image = await faceapi.fetchImage(this.props.selectedImage);
        
        canvas = faceapi.createCanvasFromMedia(image);

        const detection = await faceapi.detectSingleFace(image)
                                        .withFaceLandmarks()
                                        .withFaceExpressions();
                                        
        //console.log(detection);
        // console.log(detection.expressions);
        
		if (detection !== undefined){
			emotions = {...detection.expressions};
			console.log(emotions);
			const dimensions = {
				width: image.width,
				height: image.height
			};

			const resizedDimensions = faceapi.resizeResults(detection, dimensions);


			canvasReady = true;

			faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);


		} else {
			emotions = {neutral: 1.0, happy: 0.0, sad: 0.0, angry: 0.0, fearful: 0.0, disgusted: 0.0, surprised: 0.0 }
			canvasReady = true;
		}
        this.props.callbackFromParent(emotions);
        // this.renderCanvas();
        // faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
    }

    continue = (event) => {
        this.props.callbackFromParentFeedback(feedbackGiven); //pass image
        // this.handleClick(event, '/PrevResult')
        this.handleClick(event, '/ExpEyeColor')
    }

    renderInstructions(){      
        return(
            <div>
                <div style={epiGuessWrapper}>
                    <div style={imageWrapper} id="faceImageWrapper">
                        <img id="faceImage" style={imageStyle} src={this.props.selectedImage}/>
                    </div>
                    <div id="drawCanvas" style={drawCanvas}>{this.renderCanvas()}</div>

                </div>
                <div style={epiResultWrapper}> 
                        {Object.keys(emotions).length != 0 ? this.renderEpiResults() : null}
                    </div>
                <div className= "text-center">
                    {this.renderEpiGuess()}
                    {this.renderEpiPoints()}
                    <button style={buttonRed} onClick={(e) => this.handleGuessFeedback(false)} type="submit" className="btn">Nej</button>
                    <button style={buttonStyle} onClick={(e) => this.handleGuessFeedback(true)} type="submit" className="btn btn-primary">Ja</button>
                </div>                
                <div className= "jumbotron text-right" style={backgroundWhite}>
                    {/* <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Ny bild</button> */}
                    <Button style={buttonStyle} disabled={this.disableButton()} onClick={(e) => this.continue(e)} type="submit" className="btn btn-primary">Epis tur</Button>
                    {/* <Button disabled={this.disableButton()} onClick={(e) => this.handleClick(e, '/Result')} type="submit" className="btn btn-success button-next">Nästa</Button> */}
                </div>
            </div>
        )

    }

    render() {
        if(canvasReady){
        return (
            <div>
                { 
                    this.renderInstructions()
                }
            </div>
            )
        }
        else{
            return(
                <div style={thinkingText}>
                    Epi tänker...
                </div>
            )
        };
    }
}

export default ExpPreGameInstruction;
