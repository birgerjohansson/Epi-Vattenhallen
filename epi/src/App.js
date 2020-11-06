import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router-dom";
import robot_image from './images/robot_illu3.png';
import './App.css';
import EmotionObject from './EmotionObject';
import ExpObject from './ExpObject';
import ExpEyeColor from './ExpEyeColor';
import ExpPupilSize from './ExpPupilSize';
import ExpPupilOrientation from './ExpPupilOrientation';
import {objectList} from './ExpObjectData';
import ExpMain from './ExpMain';
import PrevResult from './PrevResult';
import Result from './Result';
import ExpChoosePicture from './ExpChoosePicture';
import ExpPreGameInstruction from './ExpPreGameInstruction';
import ExpTakePicture from './ExpTakePicture';
import ExpSelectApproach from './ExpSelectApproach';

//expObject will hold the result of all the different views/state
//emotionsObject will store the importen emotionsObject
//emotionDisplay will store the emotion category acting as basis for the interaction
//counter only necessary if DB
//currentState will keep track on the view/state

class App extends React.Component{
  constructor(props) {
    super();
    this.state = {expObject : [], emotionsObject : [], emotionDisplay: '', counter : 1, currentState: 0};
  }


  //Application mount and the emotionObjects is imported and set this.state (emotionsObject)
  componentDidMount() {

    let emotionsObject = new EmotionObject();
    const data = objectList;
    const mapRows = data.map(emotion => (
          emotionsObject.addEmotion(emotion.id, emotion.emotionCat, emotion.emotions, emotion.boolean, emotion.value)
    ));
    this.setState({emotionsObject: emotionsObject.emotionsObject});
  }

  //Trigger an Image from IKAROS and the response is converted to json if the repsonse is to be used
  takePicture = () => {
    fetch('http://127.0.0.1:8000/control/ImageTrigger.data/0/0/1')
        .then(response => response.json());
    fetch('http://127.0.0.1:8000/control/ImageTrigger.data/0/0/0')
        .then(response => response.json());
  }

  //Start experiment -> create an ExpObject, generate a random number to be chosen as basis for the interaction
  // the random number represent an emotion category. Set this.state (expObject and emotionDisplay)
  // in this method if DB were to used the counter would also be increased
  startExp = () => {
    let newExpObject = new ExpObject();
    const data = this.state.emotionsObject;
    const mapRows = data.map(emotion => (
          newExpObject.addEmotionObject(1, ({id: emotion.id, emotionCat: emotion.emotionCat, boolean: emotion.boolean, value: emotion.value, emotions: []})),
          newExpObject.addEmotionObject(2, ({id: emotion.id, emotionCat: emotion.emotionCat, boolean: emotion.boolean, value: emotion.value, emotions: []})),
          newExpObject.addEmotionObject(3, ({id: emotion.id, emotionCat: emotion.emotionCat, boolean: emotion.boolean, value: emotion.value, emotions: []}))
    ));

    let randomEmotion = Math.floor((Math.random() * objectList.length ) + 1);
    this.setState({expObject: newExpObject.expObject, emotionDisplay:  randomEmotion});
  }
  

  //Change the current state and reset all emotions chosen by click
  changeCurrentState = (stateValue) => {
    let tempEmotionsObj = [...this.state.emotionsObject];
    tempEmotionsObj.map(emObj =>{
        emObj.emotions.map(emotion=>{
            if (emotion.boolean){
                emotion.boolean = !emotion.boolean;
            }
        })
    })
    this.setState({currentState : stateValue, emotionsObject : tempEmotionsObj});
  }

  //Update the current experiment-state and set this.state
  updateExp = (expNumberObject) => {
    let tempExp = [...this.state.expObject];
    if (this.state.currentState == 0){
      tempExp[this.state.currentState].expOne = expNumberObject;
  } else if (this.state.currentState == 1){
      tempExp[this.state.currentState].expTwo = expNumberObject;
  } else if (this.state.currentState == 2){
      tempExp[this.state.currentState].expThree = expNumberObject;
  }
    this.setState(prevState => ({
        expObject: tempExp
      }))
  }

  //If exit from experiment -> clear the states. If DB were to be used you would need to handle it in this method
  exitExp = () => {
    this.setState({expObject : [], emotionDisplay: '', counter : 1, currentState: 0});
  };

  render() {

    let emotions = this.state.emotionsObject;
    let emDisplay = this.state.emotionDisplay;
    let stateValue = this.state.currentState;
    let experiment = this.state.expObject;


    const expEyeColorElem = (params) => <ExpEyeColor {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp}/>;
    const expPupilSizeElem = (params) => <ExpPupilSize {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp}/>;
    const expPupilOrientationElem = (params) => <ExpPupilOrientation {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp}/>;
    const prevResultElem = (params) => <PrevResult {...params} currentState={stateValue} callbackFromParent={this.changeCurrentState}/>;
    const resultElem = (params) => <Result {...params} expObject={experiment} callbackFromParent={this.exitExp}/>;
    const expMainElem = (params) => <ExpMain {...params}  callbackFromParent={this.startExp}/>;
    const expSelectApproachElem = (params) => <ExpSelectApproach {...params}  callbackFromParent={this.exitExp}/>;
    const expChoosePictureElem = (params) => <ExpChoosePicture {...params}  />;
    const expTakePictureElem = (params) => <ExpTakePicture {...params}  callbackFromParent={this.takePicture}/>;
    const expPreGameInstructionElem = (params) => <ExpPreGameInstruction {...params}  />;

    let val = JSON.stringify(this.state.expObject);

        return (
          <Router>
          <div>
            {/* <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
              <img src={robot_image} />
              <spam>{val}</spam>
              <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
            </div>
            </div> */}
            
            
              
              
            <div className="form-group mt-20"> 
            <Switch>
              <Route exact path="/">
                <Redirect to="/ExpMain" />
              </Route>
              <Route path='/ExpChoosePicture' component = {expChoosePictureElem}/>
              <Route path='/ExpSelectApproach' component = {expSelectApproachElem}/>
              <Route path='/ExpPreGameInstruction' component = {expPreGameInstructionElem}/>
              <Route path='/ExpTakePicture' component = {expTakePictureElem}/>
              <Route path='/ExpMain' component = {expMainElem}/>
              <Route path='/ExpEyeColor' component={expEyeColorElem}/>
              <Route path='/ExpPupilSize' component={expPupilSizeElem}/>
              <Route path='/ExpPupilOrientation' component={expPupilOrientationElem}/>
              <Route path='/PrevResult' component={prevResultElem}/>
              <Route path='/Result' component={resultElem}/>
            </Switch>
               
            </div>
            <div>
          

            </div>
          </div>
          
          </Router>

        );    
  } 
}


export default App;
