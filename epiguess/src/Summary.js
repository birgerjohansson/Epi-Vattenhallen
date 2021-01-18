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

const finalScore = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    paddingTop: '50px'
}

var epiResultCount = 0;
var userResultCount = 0;
var totalCount = 0;

class Summary extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount(){
        console.log(this.props.guessResults);
    }

    calcEpiResults = () =>{
        
    }

    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    getHighestEmotion(faceRecEmotions){
        return Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
    }

    renderResultSummary(){
        const sum = Object.entries(this.props.guessResults);

        sum.forEach(([key, value]) => {
            summary.push({key: key, value: value});
        })

        this.props.guessResults.forEach(result => {
            console.log(result.epiGuess);
            if(result.epiGuess == true) epiResultCount += 1;
            if(result.guesses[0].catId == result.epiEmotion.id) userResultCount += 1;
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
                        </div>
                    ))}
                </div>
                <div>
                    <div style={score}>Epi gissade rätt på {epiResultCount} av {this.props.guessResults.length} emotioner</div>
                    <div style={score}>Du gissade rätt på {userResultCount} av {this.props.guessResults.length} emotioner</div>
                    <div style={finalScore}>Tillsammans fick ni {epiResultCount + userResultCount} av {this.props.guessResults.length * 2} poäng, bra jobbat!</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                Sammanfattning av dina och Epi´s gissningar:
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