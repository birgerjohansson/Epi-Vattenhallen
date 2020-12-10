import React from 'react';
import Webcam from 'react-webcam';

class ExpTakePicture extends React.Component{
    constructor(props) {
        super()
    }
    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }
    //Trigger method takePicture() in parent
    takePicture = () => {
        this.props.callbackFromParent();
    }

    state = {
        imageData: null,
        image_name: "",
        saveImage: false
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            iamgeData: imageSrc
        })
    };

    render() {

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user',
        };

        return (
            <div>

                <Webcam 
                    audio={false}
                    height={350}
                    ref ={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />

                <div>
                    <button onClick={this.capture}>Capture Photo</button>
                </div>

                <div className= "jumbotron text-center"> 
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                    <button  onClick={(e) => this.handleClick(e, '/ExpPreGameInstruction')} type="submit" className="btn btn-primary">Nästa</button>
                    <button  onClick={(e) => this.takePicture(e)} type="submit" className="btn btn-primary">Ta bild</button>
                </div>
                
                <div className="form-group mt-20"></div>
            </div>
        );
    }
}

export default ExpTakePicture;