import React from 'react';

let summary = [];

const summaryMainWrapper = {
    textAlign: 'center'
}

const summaryHeader = {
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '50px'
}

const summaryWrapper = {
    width: '100%',
    paddingBottom: '20px'
}

const summaryImage = {
    maxWidth: '200px'
}

const summaryImageEpi = {
    maxWidth: '200px',
    marginLeft: '50px'
}

const summaryGuess = {
    //display: 'inline-block'
}

const score = {
    //display: 'inline-block',
    //width: '50%',
    fontWeight: 'bold',
    //textAlign: 'left',
    paddingBottom: '30px',
}

const finalScore = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    paddingTop: '20px',
    paddingBottom: '20px'
}

const answerWrapper = {
    display: 'inline-block',
    maxWidth: '250px',
    textAlign: 'left',
    paddingLeft: '25px'
}

const exitButton = {
    display: 'inline-block',
    position: 'sticky',
    bottom: '0',
    float: 'right',
    backgroundColor: 'white',
    paddingTop: '0px',
    paddingBottom: '20px',
    width: '100%'
}

var epiResultCount = 0;
var userResultCount = 0;
var totalCount = 0;

class Summary extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        // console.log(this.props.guessResults);
    }

    calcEpiResults = () => {

    }

    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    getHighestEmotion(faceRecEmotions) {
        return Object.keys(faceRecEmotions).reduce((a, b) => faceRecEmotions[a] > faceRecEmotions[b] ? a : b);
    }

    getSwedishName(e) {

        switch (e) {
            case "neutral":
                return ("neutral")
            case "happy":
                return ("glad")
            case "sad":
                return ("ledsen")
            case "angry":
                return ("arg")
            case "fearful":
                return ("rädd")
            case "disgusted":
                return ("äklad")
            case "surprised":
                return ("överraskad")
                break;
            default:
                return ("neutral")
        }
    }
    renderEpiResult = (epiGuess) => {
        // console.log(epiGuess);
        if (epiGuess == true) {
            return <div>Du angav: rätt!<div>Poäng: 1</div></div>
        } else {
            return <div>Du angav: fel!<div>Poäng: 0</div></div>
        }
    }

    renderUserResult = (userGuess) => {
        console.log(userGuess);
        if (userGuess.value.guesses[0].catId == userGuess.value.epiEmotion.id) {
            return <div>Poäng: 1</div>
        } else {
            return <div><div>men Epi försökte vara <b>{this.getSwedishName(userGuess.value.epiEmotion.faceRecEmotion)}</b></div>Poäng: 0</div>
        }
    }

    renderResultSummary() {
        const sum = Object.entries(this.props.guessResults);

        sum.forEach(([key, value]) => {
            summary.push({ key: key, value: value });
        })

        this.props.guessResults.forEach(result => {
            // console.log(result.epiGuess);
            if (result.epiGuess == true) epiResultCount += 1;
            if (result.guesses[0].catId == result.epiEmotion.id) userResultCount += 1;
        })

        return (
            <div>
                <div>
                    {summary.map((item) => (
                        <div style={summaryWrapper}>
                            <img style={summaryImage} src={item.value.selectedImage} />
                            <div style={answerWrapper}>
                                <div style={summaryGuess}>Epi gissade på <b>{this.getSwedishName(this.getHighestEmotion(item.value.faceRecEmotions))}</b></div>
                                <div style={summaryGuess}>{this.renderEpiResult(item.value.epiGuess)}</div>
                            </div>
                            <img style={summaryImageEpi} src={item.value.epiEmotion.resultImages[0].src} />
                            <div style={answerWrapper}>
                                <div style={summaryGuess}>Du gissade på <b>{item.value.guesses[0].emotion}</b></div>
                                <div style={summaryGuess}>{this.renderUserResult(item)}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={score} >
                    Epi gissade rätt på {epiResultCount} av {this.props.guessResults.length} emotioner
                    och du gissade rätt på {userResultCount} av {this.props.guessResults.length} emotioner
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={summaryMainWrapper}>
                <div style={summaryHeader}>
                    Sammanfattning av dina och Epis gissningar:
                </div>
                <div>
                    {this.renderResultSummary()}
                </div>
                <div className="jumbotron text-center stickyfooter" style={exitButton}>
                    <div style={finalScore}>Tillsammans fick ni {epiResultCount + userResultCount} av {this.props.guessResults.length * 2} poäng, bra jobbat!</div>
                    <button onClick={(e) => window.location.href = "http://localhost:3000/"} className="btn btn-primary">Avsluta</button>
                </div>
            </div>
        );
    }
}

export default Summary;