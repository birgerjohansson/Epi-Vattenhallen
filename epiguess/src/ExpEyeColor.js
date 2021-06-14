import React from 'react';
import ai_image from './images/abstract_ai.jpg';
import profilePic from './images/profilePic.jpg';
import { OverlayTrigger, Tooltip, Button, Container, Row, Col } from 'react-bootstrap';

var selectedCount = 0;

const chooseText = {
    color: 'black',
    width: '100%',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    paddingTop: '30px'
}

const choosewrapper = {
    textAlign: 'center'
}

const experimentOptions = {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '30px'
}

const buttonWrapper = {
    paddingTop: '20px',
    paddingBottom: '50px'
}

const chooseButton = {
    marginLeft: '25px',
    marginRight: '25px',
    width: '150px',
    height: '50px',
    fontSize: '22px'
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

class ExpEyeColor extends React.Component{
    constructor(props) {
        super();
    }

    componentDidMount() {
        selectedCount = 0;
    }


    disableButton = () => {
        // if(selectedCount <= 0 || selectedCount > 5)
        // console.log(selectedCount);
        if(selectedCount != 1)
            return true;
        else
            return false;
    }

    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    //If any emotion is chosen it will directly update the expObject param in this.state received from parent
    //Trigger parent method UpdateExp()
    //increasing the emotion category chosen by one
    // handleEmotionChange = (emotion, emotionId) => {
    //     console.log(emotion);
    //     // console.log(emotionId);
    //     // console.log(this.props.emotionsObject);
    //     // console.log(this.props.expObject);
    //     let tempEmotionsObj = [...this.props.emotionsObject];
    //     let tempExpObject = [...this.props.expObject[0].expOne];
    //     tempEmotionsObj.map(emObj =>{
    //         emObj.emotions.map(emotion=>{
    //             if (emotion.id === emotionId){
    //                 emotion.boolean = !emotion.boolean;
    //                 tempExpObject.map(expEmotion =>{
    //                     if (expEmotion.emotionCat == emObj.emotionCat){
    //                         debugger;
    //                         emotion.boolean ? expEmotion.value += 1 : expEmotion.value -= 1;
    //                         emotion.boolean ? selectedCount += 1 : selectedCount -= 1;
    //                         this.props.callbackFromParent(tempExpObject, emotion);
    //                     }
    //                 })
    //             }
    //         })
    //     })
    //     this.forceUpdate();
    // }

    handleEmotionChange = (emotion, emotionId) => {
        // console.log(emotion);
        // console.log(emotionId);
        // console.log(emotionId);
        // console.log(this.props.emotionsObject);
        // console.log(this.props.expObject);
        let tempEmotionsObj = [...this.props.emotionsObject];
        // console.log(tempEmotionsObj);
        let tempExpObject = [...this.props.expObject[0].expOne];
        // console.log(tempExpObject);
        tempEmotionsObj.map(emObj =>{
            emObj.emotions.map(emotion=>{
                if (emotion.id === emotionId){
                    emotion.boolean = !emotion.boolean;
                    tempExpObject.map(expEmotion =>{
                        if (expEmotion.emotionCat == emObj.emotionCat){
                            // debugger;
                            emotion.boolean ? emotion.value += 1 : emotion.value -= 1;
                            emotion.boolean ? selectedCount += 1 : selectedCount -= 1;
                            console.log('selectedCount ' + selectedCount);
                            this.props.callbackFromParent(tempExpObject, emotion);
                        }
                    })
                }
            })
        })
        // this.forceUpdate();
    }

    //Simply render the different emotionsObject received from the parent
    renderItems = () => {
        const data = this.props.emotionsObject;
        const mapRows = data.map(emotionObj => (
            emotionObj.emotions.map(emotion => (
                <React.Fragment key = {emotion.id}>
                    <button
                    onClick={() => this.handleEmotionChange(emotion, emotion.id)}
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
            // <Container>
            //     <Row>
            //         <Col xs={2}><img src={profilePic}/></Col>
            //         <Col xs={7}>
            //             <div  className="p-3 mb-2 bg-info text-white" style={{backgroundImage: `url(${ai_image}` }}>
            //                 <div required  multiple={true} id="emotionSelect"  type="button"  onClick={(e) => this.handleEmotionChange(e)}>
            //                     {this.renderItems()}
            //                 </div>
            //             </div>
            //         </Col>
            //         <Col xs={1}>
            //             <div className="">
            //                 <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-danger">Avbryt</button>
            //                 <button  onClick={(e) => this.handleClick(e, '/PrevResult')} type="submit" className="btn btn-success">Nästa</button>
            //             </div>
            //         </Col>
            //     </Row>
            // </Container>
            <div className="">
                <div style={choosewrapper}>
                    <div style={chooseText}>Gissa vilken känsla Epi försökte visa!</div>

                    <div  style={experimentOptions} >
                        <div onClick={(e) => this.handleEmotionChange(e)}>
                            {this.renderItems()}
                        </div>
                    </div>

                    <div style={buttonWrapper}>
                        <button style={buttonRed}  onClick={(e) => window.location.href = "http://localhost:3000/"} className="btn btn-primary">Avsluta</button>
                        <Button style={chooseButton} disabled={this.disableButton()} onClick={(e) => this.handleClick(e, '/Result')} type="submit" className="btn btn-primary button-next">Nästa</Button>
                    </div>
                    {/* <div className="experiment-image">
                        <img src={this.props.selectedImage}/>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default ExpEyeColor;