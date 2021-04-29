import React from 'react';
// import ReactWordcloud from 'react-wordcloud';
import {objectList} from './ExpObjectData';
import vid from './videos/Överaskad3.MOV';
 
let tempPath = 0;

class PrevResult extends React.Component {
    constructor(props){
        super()
        this.state = {tempStateValue : '', tempPath : ''}
    }

    startEmotion = () => {
    }

    playEmotion = () => {
    var currEmotion = this.props.currentEmotion.epiRecID;
      fetch('http://127.0.0.1:8000/control/MotionTrigger.data/'+currEmotion+'/0/1 ')
          .then(response => response.json());
    }

    //Based on the current state, currentState will be changed
    //also introduce a timeout before moving to the next path/state
    componentDidMount(){
        console.log(this.props.currentEmotion);
    }

    getRecording = () =>{
    //   let faceRecEmotions = this.props.faceRecEmotions;

    //   const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);

    //   const currRec = objectList.find(x => x.faceRecEmotion === max).resultImages[this.props.currentState].emVidSrc;
    //   console.log()

    //   console.log(currRec);
        return this.props.currentEmotion.resultImages[0].emVidSrc;
    }
        
    //Transition to the next path/state
    // componentWillUnmount(){
    //     if (this.state.tempPath != 0){
    //         this.props.history.push(this.state.tempPath);
    //     }
    //     clearTimeout(this.timeoutHandle);
    // }

    videoEnded = () => {
        // tempPath = '/Result'
        tempPath = '/ExpEyeColor';
        this.props.callbackFromParent(3);


        console.log('Video Ended');
        console.log(this.props.currentState);
        console.log(tempPath);

        if (tempPath != 0)
            this.props.history.push(tempPath);
    }

    render() {
      return (
          <div>
              <video onEnded={this.videoEnded} src={this.getRecording()} width="1224" height="768" controls autoPlay type="video/mp4"></video>
          </div>
      );
    }
}

export default PrevResult;