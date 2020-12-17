import React from 'react';
import ProgressBar from "./progress-bar.component";
import {objectList} from './ExpObjectData';

  const emotionData = [
      {expOne: [], totVal: 0},
      {expTwo: [], totVal: 0},
      {expThree: [], totVal: 0}
  ]
  
  let summary = [];

  const imageStyle = {
    maxWidth: '300px'
  }

  const divInlineBlock = {
      display: 'inline-block'
  }

const epiResultWrapper = {
    display: 'flex'
}

const epiEmotionBar = {
    flex: '8'
}

const resultImageWrapper ={
    flex:'2', 
    width:'200px',
    height:'200px'
}

const resultImage = {
    width: '100%',
    height: '100%'
}

const summaryWrapper = {
    width: '100%'
}

const summaryImage = {
    maxWidth: '200px'
}

const summaryGuess = {
    display: 'inline-block'
}

const score = {
    display: 'inline-block',
    width: '50%',
    fontWeight: 'bold'
}

class Result extends React.Component {
    constructor(props){
        super();
    }

    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    // newExperiment = (event, path) => {
    //     this.props.callbackFromParent();
    //     this.props.history.push(path)
    // }

    newEmotion = (event, path) => {
        this.props.callbackSetNewEmotion();
        this.props.history.push(path);
    }

    componentDidMount(){
        console.log(this.props.guessResults);
    }

    roundOff = (num, places) => {
      const x = Math.pow(10,places);
      return Math.round(num * x) / x;
    }

    getHighestEmotion(faceRecEmotions){
        // const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);

        // const currImg = objectList.find(x => x.faceRecEmotion === max).resultImages[0].src;
        // return currImg;
        console.log({emotion: Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b), 
                     value: this.roundOff(faceRecEmotions[Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b)] * 100, 2)});
        // return Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
        return {emotion: Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b), 
            value: this.roundOff(faceRecEmotions[Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b)] * 100, 2)};
    }

    renderEpiResults(){
        const sum = Object.entries(this.props.guessResults);

        sum.forEach(([key, value]) => {
            summary.push({key: key, value: value});
        })

        let result = summary[summary.length -1];
        console.log(result);
        
        return(
            <div>
                <div>
                    <div style={summaryWrapper}>
                        <img style={summaryImage} src={result.value.selectedImage} />
                        <div style={summaryGuess}>Epi är {this.getHighestEmotion(result.value.faceRecEmotions).value}% säker på att du är {this.getHighestEmotion(result.value.faceRecEmotions).emotion} på den här bilden.</div>
                        <img style={summaryImage} src={result.value.epiEmotion.resultImages[0].src} />
                        <div style={summaryGuess}>Du gissade att Epi var {result.value.guesses[0].emotion}</div>
                        {/* <img src={item.value.selectedImage}/> */}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const expObject = this.props.expObject

        for (const [key, value] of Object.entries(expObject[0].expOne)) {            
            if(value.value > 0)
            {
                emotionData[0].expOne.push({'emotionCat': value.emotionCat, 'value': value.value})
                emotionData[0].totVal += value.value;
            }
        }

    return (
        <div className="result-wrapper">
            {/* <div>Epi är xxx% säker på att du är ***** på den här bilden!</div> */}
            {/* <div>
                <div style={epiResultWrapper}>
                    <div  style={resultImageWrapper}>
                        <img style={resultImage} src={this.getResultImage(this.props.faceRecEmotions)}/>
                    </div>
                    <div style={epiEmotionBar}>
                        {emotionData[2].expThree.map((item, id) => (
                            <div>
                            <div className="emotion-category">{item.emotionCat}</div>                    
                            <ProgressBar key={id} bgcolor={objectList.find(x => x.emotionCat === item.emotionCat).barColor} completed={item.value/emotionData[2].totVal*100} />
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            <div className="epiEmotionRec">
                <div>Hur epi analyserade dina känslor</div>
                {this.renderEpiResults()}
            </div>

            <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                <button  onClick={(e) => this.newEmotion(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Ny emotion</button>  
                <button  onClick={(e) => this.handleClick(e, '/Summary')} type="submit" className="btn btn-primary">Summary</button>  
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-primary">Avsluta</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;