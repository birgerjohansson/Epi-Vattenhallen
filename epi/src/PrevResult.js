import React from 'react';
// import ReactWordcloud from 'react-wordcloud';

 
const words = [
    {
      text: 'Angry',
      value: 64,
    },
    {
      text: 'Happy',
      value: 11,
    },
    {
      text: 'Sad',
      value: 16,
    },
    {
      text: 'Surprised',
      value: 17,
    },
  ]

class PrevResult extends React.Component {
    constructor(props){
        super()
        this.state = {tempStateValue : '', tempPath : ''}
    }

    //Based on the current state, currentState will be changed
    //also introduce a timeout before moving to the next path/state
    componentDidMount(){
        this.state.tempStateValue = this.props.currentState;

        this.timeoutHandle = setTimeout(()=>{
            if (this.state.tempStateValue == 0){
                this.state.tempPath = '/ExpPupilSize';
                this.props.callbackFromParent(1);
            }else if (this.state.tempStateValue == 1){
                this.state.tempPath = '/ExpPupilOrientation'
                this.props.callbackFromParent(2);
            }else if (this.state.tempStateValue == 2){
                this.state.tempPath = '/Result'
                this.props.callbackFromParent(3);
            }else{
                this.state.tempPath = 0
            }
            this.setState({ })}, 2000);
        }
    
    //Transition to the next path/state
    componentWillUnmount(){
        if (this.state.tempPath != 0){
            this.props.history.push(this.state.tempPath);
        }
        clearTimeout(this.timeoutHandle);
         
    }


    render() {
        const words = [
            {
              text: 'Angry',
              value: 178,
            },
            {
              text: 'Happy',
              value: 44,
            },
            {
              text: 'Sad',
              value: 87,
            },
            {
              text: 'Surprised',
              value: 66,
            },
          ]

    return (
        <div>
            {/* <ReactWordcloud words={words} /> */}
        </div>
    );
    }
}

export default PrevResult;