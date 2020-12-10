import React from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ExpEyeColor from './ExpEyeColor';
import Progress from 'react-progressbar';
// import ReactWordcloud from 'react-wordcloud';
import ProgressBar from "./progress-bar.component";
import ai_image from './images/robot_illu.png';
import {objectList} from './ExpObjectData';

// const barColors = [
//     { emotion: 'Anger', faceRecEmotion: 'angry' ,bgcolor: "#FB525A"},
//     { emotion: 'Sadness', faceRecEmotion: 'sad' ,bgcolor: "#2884C6"},
//     { emotion: 'Happiness', faceRecEmotion: 'happy' ,bgcolor: "#FFD65D"},
//     { emotion: 'Surprise', faceRecEmotion: 'surprised' ,bgcolor: "#67F4D8"},
//     { emotion: 'Disgust', faceRecEmotion: 'disgusted' ,bgcolor: "#3CA938"},
//     { emotion: 'Fear', faceRecEmotion: 'fearful' ,bgcolor: "#784DA3"},
//     { emotion: 'Neutral', faceRecEmotion: 'neutral' ,bgcolor: "#FFFFFF"},
//   ];

  const emotionData = [
      {expOne: [], totVal: 0},
      {expTwo: [], totVal: 0},
      {expThree: [], totVal: 0}
  ]
  
  let epiResult = [];

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

class Result extends React.Component {
    constructor(props){
        super();
    }

    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    newExperiment = (event, path) => {
        this.props.callbackFromParent();
        this.props.history.push(path)
    }

    componentDidMount(){
        //console.log(this.props.faceRecEmotions);
        // console.log(this.props.emotionsObject);
        // this.getResultImage(0, this.props.faceRecEmotions);
        // this.getResultImage(1, this.props.faceRecEmotions);
        // this.getResultImage(2, this.props.faceRecEmotions);
    }

    getResultImage(curr, faceRecEmotions){
        // console.log(faceRecEmotions)

        // const sortable = Object.fromEntries(
        //     Object.entries(faceRecEmotions).sort(([,a],[,b]) => a-b)
        // );
        
        // console.log(sortable);
        //flytta till en global constant, då det endast behövs beräknas en gång per experiment
        const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
        // console.log(max);

        const currImg = objectList.find(x => x.faceRecEmotion === max).resultImages[curr].src;
        return currImg;
    }

    renderEpiResults(){
        const eR = Object.entries(this.props.faceRecEmotions);

        eR.forEach(([key, value]) => {
            epiResult.push({emotionCat: key, value: value});
        })

        // epiResult.map((item) => (
        //     console.log(item.value)
        // ))
        
        return(
            <div style={epiResultWrapper}>
                <div style={resultImageWrapper}>
                    <img style={resultImage} src={this.props.selectedImage}/>
                </div>  
                <div style={epiEmotionBar}>
                    {epiResult.map((item) => (
                        <div>
                         {/* <div style={({display: item.value * 100 > 5  ? 'inline-block' : 'none', width: '70%'})}> */}
                        {/* <div style={epiEmotionBar} style={({display: item.value * 100 > 5  ? 'inline-block' : 'none', width: '70%'})}> */}
                            { item.value * 100 > 5 ? <div className="emotion-category">{item.emotionCat}</div> : null}
                            {/* { item.value * 100 > 5 ?<ProgressBar bgcolor={"#6a1b9a"} completed={item.value * 100} /> : null} */}
                            { item.value * 100 > 5 ?<ProgressBar bgcolor={objectList.find(x => x.faceRecEmotion === item.emotionCat).barColor} completed={item.value * 100} /> : null}
                        </div>
                    ))}
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

        for (const [key, value] of Object.entries(expObject[1].expTwo)) {
            emotionData[1].totVal += value.value;
            if(value.value > 0)
                emotionData[1].expTwo.push({'emotionCat': value.emotionCat, 'value': value.value})
        }

        for (const [key, value] of Object.entries(expObject[2].expThree)) {
            emotionData[2].totVal += value.value;
            if(value.value > 0)
                emotionData[2].expThree.push({'emotionCat': value.emotionCat, 'value': value.value})
        }

    return (
        <div className="result-wrapper">
            <div>Dina bedömningar / Vad epi har lärt sig</div>
            <div>
                <div style={epiResultWrapper}>
                    <div style={resultImageWrapper}>
                        <img style={resultImage} src={this.getResultImage(0, this.props.faceRecEmotions)}/>
                    </div>
                    <div style={epiEmotionBar}>
                        {emotionData[0].expOne.map((item, idx) => (
                            <div>
                            <div className="emotion-category">{item.emotionCat}</div>                    
                            <ProgressBar key={idx} bgcolor={objectList.find(x => x.emotionCat === item.emotionCat).barColor} completed={item.value/emotionData[0].totVal*100} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={epiResultWrapper}>
                    <div  style={resultImageWrapper}>
                        <img style={resultImage} src={this.getResultImage(1, this.props.faceRecEmotions)}/>
                    </div>
                    <div style={epiEmotionBar}>
                        {emotionData[1].expTwo.map((item, ids) => (
                            <div>
                            <div className="emotion-category">{item.emotionCat}</div>                    
                            <ProgressBar key={ids} bgcolor={objectList.find(x => x.emotionCat === item.emotionCat).barColor} completed={item.value/emotionData[1].totVal*100} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={epiResultWrapper}>
                    <div  style={resultImageWrapper}>
                        <img style={resultImage} src={this.getResultImage(2, this.props.faceRecEmotions)}/>
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
            

            </div>

            <div className="epiEmotionRec">
                {/* <div>
                    <img style={imageStyle} src={this.props.selectedImage}/>
                </div> */}
                <div>Hur epi analyserade dina känslor</div>
                {this.renderEpiResults()}
                {/* {epiResult.map((item, idx) => (
                    <div>
                        <div className="emotion-category">{item.emotionCat}</div>                    
                        <ProgressBar key={idx} bgcolor={"#6a1b9a"} completed={item.value * 100} />
                    </div>
                ))} */}
            </div>

            <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                <button  onClick={(e) => this.newExperiment(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Ny emotion</button>  
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-primary">Exit</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;