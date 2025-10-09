import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import robot_image from './images/robot_illu3.png';
import './App.css';
import EmotionObject from './EmotionObject';
import ExpObject from './ExpObject';
import ExpEyeColor from './ExpEyeColor';
import ExpPupilSize from './ExpPupilSize';
import ExpPupilOrientation from './ExpPupilOrientation';
import { objectList } from './ExpObjectData';
import ExpMain from './ExpMain';
import PrevResult from './PrevResult';
import Result from './Result';
import Summary from './Summary';
import ExpChoosePicture from './ExpChoosePicture';
import ExpPreGameInstruction from './ExpPreGameInstruction';
import ExpTakePicture from './ExpTakePicture';
import ExpSelectApproach from './ExpSelectApproach';
import { ConsoleWriter } from 'istanbul-lib-report';
import { zeros } from '@tensorflow/tfjs-core';



// import * as faceapi from 'face-api.js';

//expObject will hold the result of all the different views/state
//emotionsObject will store the importen emotionsObject
//emotionDisplay will store the emotion category acting as basis for the interaction
//counter only necessary if DB
//currentState will keep track on the view/state

class App extends React.Component {
  constructor(props) {
    super();
    this.state = { expObject: [], emotionsObject: [], emotionDisplay: '', counter: 1, currentState: 0, selectedImage: '', faceRecEmotions: {}, currentEmotion: {}, guessResults: [] };
    this.faceRec = this.faceRec.bind(this)
  }

  faceRec(imgSrc) {
    this.setState({ selectedImage: imgSrc });
  }

  //Application mount and the emotionObjects is imported and set this.state (emotionsObject)
  componentDidMount() {
    let emotionsObject = new EmotionObject();
    const data = objectList;
    const mapRows = data.map(emotion => (
      emotionsObject.addEmotion(emotion.id, emotion.emotionCat, emotion.emotions, emotion.boolean, emotion.value, emotion.faceRecEmotion, emotion.barColor, emotion.resultImages)
    ));

    //set list of emotions, select on at random and remove it from the original list so that it
    //wont be chosen again.
    var emotionsList = [...objectList];
    var emotion = emotionsList[Math.floor(Math.random() * emotionsList.length)];
    emotionsList.splice(emotionsList.indexOf(emotion), 1);

    var guessResults = [{ selectedImage: '', faceRecEmotions: {}, epiEmotion: {}, guesses: [] }] //guesses = tempExp?

    this.setState({ emotionsObject: emotionsObject.emotionsObject, currentEmotion: emotion, emotionsList: emotionsList, guessResults: guessResults });
  }

  initData = () => {

  }

  //skall anropas från resultatlistan
  setNewEmotion = () => {

    let newExpObject = new ExpObject();
    const data = this.state.emotionsObject;
    const mapRows = data.map(emotion => (
      newExpObject.addEmotionObject(1, ({ id: emotion.id, emotionCat: emotion.emotionCat, boolean: emotion.boolean, value: emotion.value, emotions: [] }))
    ));


    var emotionsList = [...this.state.emotionsList];
    console.log('setNewEmotion emotionsList');
    console.log(emotionsList);
    var emotion = emotionsList[Math.floor(Math.random() * emotionsList.length)];
    console.log('setNewEmotion emotion');
    console.log(emotion);
    emotionsList.splice(emotionsList.indexOf(emotion), 1);

    var guessResults = [...this.state.guessResults];
    guessResults.push({ selectedImage: '', faceRecEmotions: {}, epiEmotion: {}, guesses: [] });

    this.setState({ expObject: newExpObject.expObject, emotionsObject: this.state.emotionsObject, faceRecEmotions: {}, currentEmotion: emotion, emotionsList: emotionsList, guessResults: guessResults });

    // console.log(this.state);

  }

  //Trigger an Image from IKAROS and the response is converted to json if the repsonse is to be used
  takePicture = () => {
    fetch('http://192.168.1.140:8000/control/ImageTrigger.data/0/0/1', {
      method: 'POST',
      mode: 'CORS',
      body: ' ',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res;
    }).catch(err => console.log(err));
    // fetch('http://192.168.1.140:8000/control/ImageTrigger.data/0/0/1')
    //     .then(response => response.json());
    // fetch('http://192.168.1.140:8000/control/ImageTrigger.data/0/0/0')
    //     .then(response => response.json());
  }

  getPicture = () => {

  }

  playEmotion = () => {
    var currEmotion = this.state.currentEmotion.epiRecID;
    console.log('Trigger emotion')
    console.log(currEmotion)
    console.log('http://127.0.0.1:8000/control/MotionTrigger.data/' + currEmotion + '/0/1 ')
    fetch('http://127.0.0.1:8000/control/MotionTrigger.data/' + currEmotion + '/0/1 ')
      .then(response => response.json());



  }
  stopEmotion = () => {

    var currEmotion = this.state.currentEmotion.epiRecID;
    console.log('Trigger emotion STOP')

    var i;
    for (i = 0; i < 7; i++)
    {
      console.log("Reset motions")
      console.log(i)
      fetch('http://127.0.0.1:8000/control/MotionTrigger.data/' + i + '/0/0 ')
      .then(response => response.json());
    }


  }
  // We have to wait until motion is done and then start next set motion to zeros.


  //Start experiment -> create an ExpObject, generate a random number to be chosen as basis for the interaction
  // the random number represent an emotion category. Set this.state (expObject and emotionDisplay)
  // in this method if DB were to used the counter would also be increased
  startExp = () => {
    let newExpObject = new ExpObject();
    const data = this.state.emotionsObject;
    const mapRows = data.map(emotion => (
      newExpObject.addEmotionObject(1, ({ id: emotion.id, emotionCat: emotion.emotionCat, boolean: emotion.boolean, value: emotion.value, emotions: [] }))
    ));

    let randomEmotion = Math.floor((Math.random() * objectList.length) + 1);
    this.setState({ expObject: newExpObject.expObject, emotionDisplay: randomEmotion });
  }

  //Change the current state and reset all emotions chosen by click
  changeCurrentState = (stateValue) => {
    this.stopEmotion();
    let tempEmotionsObj = [...this.state.emotionsObject];
    tempEmotionsObj.map(emObj => {
      emObj.emotions.map(emotion => {
        if (emotion.boolean) {
          emotion.boolean = !emotion.boolean;
        }
      })
    })
    this.setState({ currentState: stateValue, emotionsObject: tempEmotionsObj, faceRecEmotions: this.state.faceRecEmotions });
  }

  //Update the current experiment-state and set this.state
  updateExp = (expNumberObject, selectedEmotion) => {
    let tempExp = [...this.state.expObject];
    if (this.state.currentState == 0) {
      tempExp[this.state.currentState].expOne = expNumberObject;
    }// else if (this.state.currentState == 1){
    //     tempExp[this.state.currentState].expTwo = expNumberObject;
    // } else if (this.state.currentState == 2){
    //     tempExp[this.state.currentState].expThree = expNumberObject;
    // }

    var guessResults = [...this.state.guessResults];


    console.log(guessResults);
    console.log(guessResults[guessResults.length - 1].guesses);
    console.log(selectedEmotion);

    // var selectedGuess = expNumberObject.filter(obj => {
    //   return obj.value > 0
    // })    
    // console.log(selectedGuess);

    // guessResults[guessResults.length -1].guess = selectedGuess[0]; //ev ändra om man skall kunna gissa på flera
    selectedEmotion.boolean ? guessResults[guessResults.length - 1].guesses.push(selectedEmotion) : guessResults[guessResults.length - 1].guesses.splice(guessResults[guessResults.length - 1].guesses.indexOf(selectedEmotion), 1);

    this.setState(prevState => ({
      expObject: tempExp,
      emotionsObject: this.state.emotionsObject,
      faceRecEmotions: this.state.faceRecEmotions,
      guessResults: guessResults
    }))
  }

  setFaceRecEmotions = (emotions) => {
    var guessResults = [...this.state.guessResults];
    guessResults[guessResults.length - 1].faceRecEmotions = emotions;
    guessResults[guessResults.length - 1].selectedImage = this.state.selectedImage;
    guessResults[guessResults.length - 1].epiEmotion = this.state.currentEmotion;

    if (Object.keys(this.state.faceRecEmotions).length === 0)
      this.setState({
        expObject: this.state.expObject,
        emotionsObject: this.state.emotionsObject,
        faceRecEmotions: emotions,
        guessResults: guessResults
      });
  }

  
  setUserFeedback = (feedback) => {
    var guessResults = [...this.state.guessResults];
    // guessResults[guessResults.length -1].faceRecEmotions = emotions;
    // guessResults[guessResults.length -1].selectedImage = this.state.selectedImage;
    // guessResults[guessResults.length -1].epiEmotion = this.state.currentEmotion;
    // console.log("callbackfromparentsetfeedback");
    // console.log(feedback);
    // console.log(guessResults);
    guessResults[guessResults.length - 1].epiGuess = feedback;
    this.setState(
      {
        expObject: this.state.expObject,
        emotionsObject: this.state.emotionsObject,
        faceRecEmotions: this.state.faceRexEmotions,
        guessResults: guessResults
      });
    console.log(this.state.guessResults);
    this.changeCurrentState(3);
    this.playEmotion();
    }

  //If exit from experiment -> clear the states. If DB were to be used you would need to handle it in this method
  exitExp = () => {
    // this.setState({expObject : [], emotionDisplay: '', counter : 1, currentState: 0});
    this.setState({ emotionsObject: {}, currentEmotion: {}, emotionsList: [], guessResults: [] });
    console.log(this.state);
  };

  render() {
    let emotions = this.state.emotionsObject;
    let emDisplay = this.state.emotionDisplay;
    let stateValue = this.state.currentState;
    let experiment = this.state.expObject;
    let selectedImage = this.state.selectedImage;
    let faceRecEmotions = this.state.faceRecEmotions;
    //let landmarks = this.state.landmarks; // kolla om används, annars ta bort
    //this.setState({emotionsObject: emotionsObject.emotionsObject, currentEmotion: emotion, emotionsList: emotionsList});
    let emotionsList = this.state.emotionsList;

    let currentEmotion = this.state.currentEmotion;
    let guessResults = this.state.guessResults;

    const expEyeColorElem = (params) => <ExpEyeColor {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp} />;
    // const expPupilSizeElem = (params) => <ExpPupilSize {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp}/>;
    // const expPupilOrientationElem = (params) => <ExpPupilOrientation {...params} expObject={experiment} emotionsObject={emotions} currentState={stateValue} emotionDisplay={emDisplay} callbackFromParent={this.updateExp} callbackFromParentExit={this.exitExp}/>;
    //const prevResultElem = (params) => <PrevResult {...params} currentState={stateValue} faceRecEmotions = {faceRecEmotions} currentEmotion = {currentEmotion} callbackFromParent={this.changeCurrentState}/>;
    const resultElem = (params) => <Result {...params} expObject={experiment} emotionsList={emotionsList} faceRecEmotions={faceRecEmotions} selectedImage={selectedImage} emotionsObject={emotions} guessResults={guessResults} callbackSetNewEmotion={this.setNewEmotion} callbackFromParent={this.exitExp} />;
    const summaryElem = (params) => <Summary {...params} guessResults={guessResults} callbackFromParent={this.exitExp} />;
    const expMainElem = (params) => <ExpMain {...params} callbackFromParent={this.startExp} />;
    const expSelectApproachElem = (params) => <ExpSelectApproach {...params} callbackFromParent={this.exitExp} />;
    const expChoosePictureElem = (params) => <ExpChoosePicture {...params} callbackFromParent={this.faceRec} />;
    const expTakePictureElem = (params) => <ExpTakePicture {...params} callbackFromParent={this.faceRec} />;
    const expPreGameInstructionElem = (params) => <ExpPreGameInstruction {...params} selectedImage={selectedImage} guessResults={guessResults} callbackFromParent={this.setFaceRecEmotions} callbackFromParentFeedback={this.setUserFeedback} />;

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
              <Route path='/ExpChoosePicture' component={expChoosePictureElem} />
              <Route path='/ExpSelectApproach' component={expSelectApproachElem} />
              <Route path='/ExpPreGameInstruction' component={expPreGameInstructionElem} />
              <Route path='/ExpTakePicture' component={expTakePictureElem} />
              <Route path='/ExpMain' component={expMainElem} />
              <Route path='/ExpEyeColor' component={expEyeColorElem} />
              {/* <Route path='/ExpPupilSize' component={expPupilSizeElem}/>
                    <Route path='/ExpPupilOrientation' component={expPupilOrientationElem}/> */}
              {/* <Route path='/PrevResult' component={prevResultElem}/> */}
              <Route path='/Result' component={resultElem} />
              <Route path='/Summary' component={summaryElem} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;