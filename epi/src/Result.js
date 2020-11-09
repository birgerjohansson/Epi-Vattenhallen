import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import ExpEyeColor from './ExpEyeColor';
// import ReactWordcloud from 'react-wordcloud';

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
                <div>
                    <div>EmotionCat</div>
                    <ProgressBar now={now} label={`${now}%`}/>
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