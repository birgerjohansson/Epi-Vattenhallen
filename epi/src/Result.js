import React from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ExpEyeColor from './ExpEyeColor';
import Progress from 'react-progressbar';
// import ReactWordcloud from 'react-wordcloud';
import ProgressBar from "./progress-bar.component";

const testData = [
    { bgcolor: "#6a1b9a", completed: 60 },
    { bgcolor: "#00695c", completed: 30 },
    { bgcolor: "#ef6c00", completed: 53 },
  ];

  const emotionData = [
      {expOne: [], totVal: 0},
      {expTwo: [], totVal: 0},
      {expThree: [], totVal: 0}
  ]

class Result extends React.Component {
    constructor(props){
        super();
    }

    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    calculateResult = (expobject) => {

    }
    

    render() {
        const expObject = this.props.expObject
        // console.log(expObject);
        // console.log(typeof(expObject));
        // console.log(expObject[0].expOne);
        let val = JSON.stringify(expObject);

        // console.log(expObject);
        console.log(expObject[0].expOne);

        // let expOneTotVal = 0;
        // let expTwoTotVal = 0;
        // let expThreeTotVal = 0;

        
        for (const [key, value] of Object.entries(expObject[0].expOne)) {            
            if(value.value > 0)
            {
                emotionData.[0].expOne.push({'emotionCat': value.emotionCat, 'value': value.value})
                emotionData.[0].totVal += value.value;
            }
        }

        for (const [key, value] of Object.entries(expObject[1].expTwo)) {
            emotionData.[1].totVal += value.value;
            if(value.value > 0)
                emotionData.[1].expTwo.push({'emotionCat': value.emotionCat, 'value': value.value})
        }

        for (const [key, value] of Object.entries(expObject[2].expThree)) {
            emotionData.[2].totVal += value.value;
            if(value.value > 0)
                emotionData.[2].expThree.push({'emotionCat': value.emotionCat, 'value': value.value})
        }

        console.log(emotionData);

    return (
        <div className="result-wrapper">
            {/* <div className="jumbotron text-center" >
                {val}
            </div> */}
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
                {emotionData.[0].expOne.map((item, idx) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={idx} bgcolor={"#6a1b9a"} completed={item.value/emotionData.[0].totVal*100} />
                    </div>
                ))}

                {emotionData.[1].expTwo.map((item, ids) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={ids} bgcolor={"#6a1b9a"} completed={item.value/emotionData.[1].totVal*100} />
                    </div>
                ))}

                {emotionData.[2].expThree.map((item, id) => (
                    <div>
                    <div className="emotion-category">{item.emotionCat}</div>                    
                    <ProgressBar key={id} bgcolor={"#6a1b9a"} completed={item.value/emotionData.[2].totVal*100} />
                    </div>
                ))}
            
                </div>
            </div>

            <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" class="btn btn-primary">Exit</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;