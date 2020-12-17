import React from 'react';

let summary = [];

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

class Summary extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount(){
        console.log(this.props.guessResults);
    }

    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    getHighestEmotion(faceRecEmotions){
        // const max = Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
        // // const currImg = objectList.find(x => x.faceRecEmotion === max).resultImages[0].src;
        // return max;
        return Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
    }

    renderResultSummary(){
        const sum = Object.entries(this.props.guessResults);

        sum.forEach(([key, value]) => {
            summary.push({key: key, value: value});
        })

        return(
            <div>
                <div>
                    {summary.map((item) => ( 
                        <div style={summaryWrapper}>
                            <img style={summaryImage} src={item.value.selectedImage} />
                            <div style={summaryGuess}>Epi gissade att du var {this.getHighestEmotion(item.value.faceRecEmotions)}</div>
                            <img style={summaryImage} src={item.value.epiEmotion.resultImages[0].src} />
                            <div style={summaryGuess}>Du gissade att Epi var {item.value.guesses[0].emotion}</div>
                            {/* <img src={item.value.selectedImage}/> */}
                        </div>
                    ))}
                </div>
                <div>
                    <div style={score}>Epi gissade rätt på 4 av 4 emotioner</div>
                    <div style={score}>Du gissade rätt på 3 av 4 emotioner</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                Summary
                <div>
                    {this.renderResultSummary()}
                </div>
                <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                    <button  onClick={(e) => this.exitExperiment(e)} type="submit" className="btn btn-primary">Avsluta</button>  
                </div>
            </div>
            );
        }
    }

export default Summary;