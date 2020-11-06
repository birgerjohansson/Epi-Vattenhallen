import React from 'react';
import ai_image from './images/abstract_ai.jpg'

class ExpPupilSize extends React.Component{
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
        let tempExpObject = [...this.props.expObject[this.props.currentState].expTwo];
        tempEmotionsObj.map(emObj =>{
            emObj.emotions.map(emotion=>{
                if (emotion.id === emotionId){
                    emotion.boolean = !emotion.boolean;
                    tempExpObject.map(expEmotion =>{
                        if (expEmotion.emotionCat == emObj.emotionCat){
                            expEmotion.value += 1;
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

        let val = JSON.stringify(this.state);
        return (
            
            <div  className="jumbotron text-center">
            <div  className="p-3 mb-2 bg-info text-white" style={{backgroundImage: `url(${ai_image}` }}>
                    
            <div className="container"></div>
            {/*             
            <div className="form-group">
            <div className="form-group mr-5"> */}
            <div required  multiple={true} id="emotionSelect"  type="button"  onClick={(e) => this.handleEmotionChange(e)}>
                {this.renderItems()}
            </div>
            {/* </div>
            </div> */}
            <div className="row">
            <button  onClick={(e) => this.exitExperiment(e)} type="submit" class="btn btn-primary">Exit</button>
            <button  onClick={(e) => this.handleClick(e,'/PrevResult')} type="submit" className="btn btn-primary">Next</button>
            </div>
        
            </div>
            <div className="form-group mt-20"> 
                
            </div>
            </div>
            
             
            );
    }
}

export default ExpPupilSize;