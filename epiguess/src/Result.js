import React from 'react';
import ProgressBar from "./progress-bar.component";
import {objectList} from './ExpObjectData';

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

    handleClick = (event, path) => {
        this.props.history.push(path);
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
        console.log(this.props.guessResults);
    }

    getResultImage(faceRecEmotions){
        const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);

        const currImg = objectList.find(x => x.faceRecEmotion === max).resultImages[0].src;
        return currImg;
    }

    renderEpiResults(){
        const eR = Object.entries(this.props.faceRecEmotions);

        eR.forEach(([key, value]) => {
            epiResult.push({emotionCat: key, value: value});
        })
        
        return(
            <div style={epiResultWrapper}>
                <div style={resultImageWrapper}>
                    <img style={resultImage} src={this.props.selectedImage}/>
                </div>  
                <div style={epiEmotionBar}>
                    {epiResult.map((item) => (
                        <div>
                            { item.value * 100 > 5 ? <div className="emotion-category">{item.emotionCat}</div> : null}
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

    return (
        <div className="result-wrapper">
            <div>Epi är xxx% säker på att du är ***** på den här bilden!</div>
            <div>
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
            </div>

            <div className="epiEmotionRec">
                <div>Hur epi analyserade dina känslor</div>
                {this.renderEpiResults()}
            </div>

            <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                <button  onClick={(e) => this.newExperiment(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Ny emotion</button>  
                <button  onClick={(e) => this.handleClick(e, '/Summary')} type="submit" className="btn btn-primary">Summary</button>  
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-primary">Avsluta</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;