import React from 'react';
import ai_image from './images/abstract_ai.jpg';
import profilePic from './images/profilePic.jpg';

class ExpPupilOrientation extends React.Component{
    constructor(props) {
        super();
    }

    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    //If any emotion is chosen it will directly update the expObject param in this.state received from parent
    //Trigger parent method UpdateExp()
    //increasing the emotion category chosen by one
    handleEmotionChange = (emotionId) => {
        let tempEmotionsObj = [...this.props.emotionsObject];
        let tempExpObject = [...this.props.expObject[this.props.currentState].expThree];
        tempEmotionsObj.map(emObj =>{
            emObj.emotions.map(emotion=>{
                if (emotion.id === emotionId){
                    emotion.boolean = !emotion.boolean;
                    tempExpObject.map(expEmotion =>{
                        if (expEmotion.emotionCat == emObj.emotionCat){
                            emotion.boolean ? expEmotion.value += 1 : expEmotion.value -= 1;
                            this.props.callbackFromParent(tempExpObject);
                        }
                    })
                }
            })
        })
    }

    //Simply render the different emotionsObject received from the parent
    renderItems = () => {
        const data = this.props.emotionsObject;
        const mapRows = data.map(emotionObj => (
            emotionObj.emotions.map(emotion => (
                <React.Fragment key = {emotion.id}>
                    <button
                    onClick={() => this.handleEmotionChange(emotion.id)}
                    className={emotion.boolean ? 'btn btn-light btn-rounded selected' : 'btn btn-light btn-rounded deselected'}
                    value = {emotion.id}>
                        {emotion.emotion}
                    </button>
                </React.Fragment>
            ))
        ));
        return mapRows;
      };
    
    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParentExit();
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="experiment-wrapper" style={{backgroundImage: `url(${ai_image}` }}>
                <div className="experiment-buttons">
                    <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-danger">Avbryt</button>
                    <button  onClick={(e) => this.handleClick(e, '/PrevResult')} type="submit" className="btn btn-success button-next">Nästa</button>
                </div>
                <div  className="experiment-options" >
                    <div onClick={(e) => this.handleEmotionChange(e)}>
                        {this.renderItems()}
                    </div>
                </div>
                <div className="experiment-image">
                    <img src={profilePic}/>
                </div>
            </div> 
        );
    }
}

export default ExpPupilOrientation;