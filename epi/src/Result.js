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

class Result extends React.Component {
    constructor(props){
        super();
    }

    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }
    

    render() {
        const expObject = this.props.expObject
        console.log(expObject);
        console.log(typeof(expObject));
        console.log(expObject[0].expOne)
        let val = JSON.stringify(expObject);
        const now = 60;

    return (
        <div>
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
                <div>
                    <div>EmotionCat 2</div>
                    <div>
                        <Progress completed={75} />
                    </div>
                </div>
                <div>
                {testData.map((item, idx) => (
                    <div>
                    <div>emotionCat</div>                    
                    <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
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