import React from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ExpEyeColor from './ExpEyeColor';
import Progress from 'react-progressbar';
// import ReactWordcloud from 'react-wordcloud';
import ProgressBar from "./progress-bar.component";

const barColors = [
    { emotion: 'Anger', faceRecEmotion: 'angry' ,bgcolor: "#FB525A"},
    { emotion: 'Sadness', faceRecEmotion: 'sad' ,bgcolor: "#2884C6"},
    { emotion: 'Happiness', faceRecEmotion: 'happy' ,bgcolor: "#FFD65D"},
    { emotion: 'Surprise', faceRecEmotion: 'surprised' ,bgcolor: "#67F4D8"},
    { emotion: 'Disgust', faceRecEmotion: 'disgusted' ,bgcolor: "#3CA938"},
    { emotion: 'Fear', faceRecEmotion: 'fearful' ,bgcolor: "#784DA3"},
    { emotion: 'Neutral', faceRecEmotion: 'neutral' ,bgcolor: "#FFFFFF"},
  ];

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

  const epiEmotionBarWrapper = {
    display: 'inline-block',
    width: '70%'
}

  const epiEmotionBar = {
    display: 'inline-block',
    width: '70%'
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

    componentDidMount(){
        const eR = Object.entries(this.props.faceRecEmotions);

        eR.forEach(([key, value]) => {
            console.log(key)
            // epiResult.push({[key]: value})
            epiResult.push({emotionCat: key, value: value});
        })

        console.log('epiResult');
        console.log(epiResult);
    }

    renderEpiResults(){
        return(
            <div>
                <div style={divInlineBlock}>
                    <img style={imageStyle} src={this.props.selectedImage}/>
                </div>  
                <div style={epiEmotionBarWrapper}>
                    {epiResult.map((item) => (
                        <div>
                         {/* <div style={({display: item.value * 100 > 5  ? 'inline-block' : 'none', width: '70%'})}> */}
                        {/* <div style={epiEmotionBar} style={({display: item.value * 100 > 5  ? 'inline-block' : 'none', width: '70%'})}> */}
                            { item.value * 100 > 5 ? <div className="emotion-category">{item.emotionCat}</div> : null}
                            {/* { item.value * 100 > 5 ?<ProgressBar bgcolor={"#6a1b9a"} completed={item.value * 100} /> : null} */}
                            { item.value * 100 > 5 ?<ProgressBar bgcolor={barColors.find(x => x.faceRecEmotion === item.emotionCat).bgcolor} completed={item.value * 100} /> : null}
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

        console.log(emotionData);

    return (
        <div className="result-wrapper">
            <div>Dina bedömningar / Vad epi har lärt sig</div>
            <div>
                <img />
                {/* <div>
                    <div>EmotionCat</div>
                    <ProgressBar now={now} label={`${now}%`}/>
                </div> */}
                {/* <div>
                    <div>EmotionCat 2</div>
                    <div>
                        <Progress completed={75} />
                    </div>
                </div> */}
                <div>
                {/* {testData.map((item, idx) => (
                    <div>
                    <div className="emotion-category">emotionCat</div>                    
                    <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    </div>
                ))} */}
                {emotionData[0].expOne.map((item, idx) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={idx} bgcolor={barColors.find(x => x.emotion === item.emotionCat).bgcolor} completed={item.value/emotionData[0].totVal*100} />
                    </div>
                ))}

                {emotionData[1].expTwo.map((item, ids) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={ids} bgcolor={barColors.find(x => x.emotion === item.emotionCat).bgcolor} completed={item.value/emotionData[1].totVal*100} />
                    </div>
                ))}

                {emotionData[2].expThree.map((item, id) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={id} bgcolor={barColors.find(x => x.emotion === item.emotionCat).bgcolor} completed={item.value/emotionData[2].totVal*100} />
                    </div>
                ))}
            
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
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-primary">Exit</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;