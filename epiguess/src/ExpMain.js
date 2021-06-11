import React from 'react';
// import ai_image from './images/bgtest.jpg';
// import _image from './images/bgtest.jpg';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'

const header = {
    fontSize: '40px',
    fontWeight: 'bold'
}

const infoWrapper = {
    paddingRight: '50px',
    paddingLeft: '50px',
    paddingTop: '30px'
}


const infoText = {
    textAlign: 'center' ,
    paddingBottom: '40px',
    fontSize: '20px'
}

const bold = {
    fontWeight: 'bold'
}

const startButton = {
    width: '150px',
    height: '50px',
    fontSize: '24px',
    marginTop: '50px'
}

class ExpMain extends React.Component{
    constructor(props) {
        super()
    }
    
    //Transition to the next path/state
    //Trigger the method startExp() in parent
    handleClick = (event, path) => {
        this.props.callbackFromParent();
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <div className= "jumbotron text-center">
                    <div style={header}>Emotion AI: Gissa känslan!</div>
                    <div></div>
                </div>
                <div className="start-info" style={infoWrapper}>
                    <div style={infoText}><span style={bold}>Syfte:</span> Maskiner som anpassar sig efter känslor är bättre på att möta människors behov.</div>
                    <div style={infoText}><span style={bold}>Uppdrag:</span> Du och Epi skall gissa på varandras emotionella uttryck.</div>
                    <div style={infoText}><span style={bold}>Mål:</span> Du och Epi har ett gemensamt mål; gissa rätt på så många av varandras emotionella uttryck som möjligt. Ni får poäng en av er gissar rätt, och målet är att få en så hög gemensam poäng som möjligt.</div>
                    <div style={infoText}><span style={bold}>Tips:</span> Tydligare uttryck är lättare för Epi att gissa rätt på och ni får därmed en högre gemensam poäng.</div>
                </div>
                <div className= " text-center"> 
                    <button style={startButton}  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Starta</button>
                </div>
                <div className="form-group mt-20">
                </div>
            </div>
        );
    }
}

export default ExpMain;
