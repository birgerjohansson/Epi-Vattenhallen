import React from 'react';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'

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
                    <div>Emotion AI:</div>
                    <div>Gissa känslan!</div>
                </div>
                <div className="start-info">
                    <div>Syfte: Maskiner som anpassar sig efter känslor är bättre på att möta människors behov.</div>
                    <div> Uppdrag: Du och Epi skall gissa på varandras emotionella uttryck.</div>
                    <div>Mål: Du och Epi har ett gemensamt mål, nämnligen att gissa rätt på så många av varandras emotionella uttryck som möjligt. Ni får poäng både om du eller Epi gissar rätt, och målet är att få en så hög gemensam poäng som möjligt.</div>
                    <div>Tips: Det är därför viktigt att visa ett så tydligt emotionellt uttryck för Epi som du kan (ju tydligare ditt uttryck är desto lättare blir det för Epi att gissa rätt och ni får därmed en högre gemensamt poäng).</div>
                </div>
                <div className= "jumbotron text-center"> 
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Starta</button>
                </div>
                <div className="form-group mt-20">
                </div>
            </div>
        );
    }
}

export default ExpMain;
