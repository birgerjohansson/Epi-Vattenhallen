import React from 'react';
// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import Spinner from 'react-bootstrap/Spinner'

const imageWrapper = {
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

    renderInstructions(){        
        return(
            <div>
                <div style={imageWrapper}>
                    <img style={imageStyle} src={this.props.selectedImage}/>
                </div>

                <div>
                    Epi kommer försöka lära sig känslan som du har demonstrerat (input), men eftersom att Epi inte har något självmedvetande måste han få en bedömning (feedback) på hur hans känslouttryck (output) uppdattas, dvs, hur han ser ut, så att han kan lära sig att försbättra sitt uttryck.
                </div>
                <div>
                    Epi kommer försöka uttrycka känslan fler gånger. Efter varje försök bedömer du Epis uttryck. Epi använder din bedömning för att justera sitt nästa försök.
                </div>
                
                <div className= "jumbotron text-center">
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                    <button  onClick={(e) => this.handleClick(e, '/ExpEyeColor')} type="submit" className="btn btn-primary">Starta spelet</button>
                </div>

                <div className="form-group mt-20">
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                { 
                    Object.entries(this.props.faceRecEmotions).length === 0 ? 
                        <div style={loaderWrapper}> 
                            <Spinner style={spinner} animation="border" variant="primary" />
                        </div>  
                    : this.renderInstructions()
                }
            </div>
        );
    }
}

export default ExpPreGameInstruction;