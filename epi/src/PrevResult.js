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

    // playEmotion = () => {
    //   fetch('http://127.0.0.1:8000/control/MotionTrigger.data/0/0/1 ')
    //       .then(response => response.json());
    // }

    //Based on the current state, currentState will be changed
    //also introduce a timeout before moving to the next path/state
    componentDidMount(){
        // this.state.tempStateValue = this.props.currentState;
        // console.log(this.props.history);
        // curr = this.props.currentState;

        // // this.timeoutHandle = setTimeout(()=>{
        //     if (this.state.tempStateValue == 0){
        //         this.state.tempPath = '/ExpPupilSize';
        //         this.props.callbackFromParent(1);
        //     }else if (this.state.tempStateValue == 1){
        //         this.state.tempPath = '/ExpPupilOrientation'
        //         this.props.callbackFromParent(2);
        //     }else if (this.state.tempStateValue == 2){
        //         this.state.tempPath = '/Result'
        //         this.props.callbackFromParent(3);
        //     }else{
        //         this.state.tempPath = 0
        //     }
            // this.setState({ })}, 12000);
            // this.setState({ })}, 20000);
        }

        getRecording = () =>{
          let faceRecEmotions = this.props.faceRecEmotions;

          const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);

          const currRec = objectList.find(x => x.faceRecEmotion === max).resultImages[this.props.currentState].emVidSrc;
          console.log()

          console.log(currRec);
          return currRec;
        }
            
    //Transition to the next path/state
    // componentWillUnmount(){
    //     if (this.state.tempPath != 0){
    //         this.props.history.push(this.state.tempPath);
    //     }
    //     clearTimeout(this.timeoutHandle);
    // }

    videoEnded = () => {
        // if (this.props.currentState === 0){
        //     tempPath = '/ExpPupilSize';
        //     this.props.callbackFromParent(1);
        // }
        // else if (this.props.currentState === 1){
        //     tempPath = '/ExpPupilOrientation'
        //     this.props.callbackFromParent(2);
        // }
        // else if (this.props.currentState === 2){
        //     tempPath = '/Result'
        //     this.props.callbackFromParent(3);
        // }
        // else
        //     tempPath = 0
        
        console.log('this.props.currentState');
        console.log(this.props.currentState);

        let curr = 0;
        this.props.currentState > 0? curr = this.props.currentState + 1 : curr = this.props.currentState;
        
        console.log('curr');
        console.log(curr);

        if (this.props.currentState === 0){
            tempPath = '/ExpEyeColor';
            this.props.callbackFromParent(0);
        }
        else if (this.props.currentState === 1){
            tempPath = '/ExpPupilSize'
            this.props.callbackFromParent(1);
        }
        else if (this.props.currentState === 2){
            tempPath = '/ExpPupilOrientation'
            this.props.callbackFromParent(2);
        }
        else if (this.props.currentState === 3){
            tempPath = '/Result'
            this.props.callbackFromParent(3);
        }
        else
            tempPath = 0

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