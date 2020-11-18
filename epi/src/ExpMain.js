import React from 'react';import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

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
                <Loader type="Grid" color="#00BFFF" height={80} width={80} />
                <Loader type="Circles" color="#00BFFF" height={80} width={80}/> 
                <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
                <Loader type="Oval" color="#00BFFF" height={80} width={80} />
                <Loader type="Puff" color="#00BFFF" height={80} width={80} />
                <Loader type="Rings" color="#00BFFF" height={80} width={80} />
                <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                <div className= "jumbotron text-center">
                    <div>Emotion AI:</div>
                    <div>Träningsprogram</div>
                </div>

                <div className="start-info">
                    <div>Syfte: Maskiner som anpassar sig efter känslor är bättre på att möta människors behov.</div>
                    <div> Ditt uppdrag: Hjälp Epi att utveckla en grundläggande emotionell intelligens.</div>
                    <div>Mål: Epi ska lära sig att förstå din känsla och att uttrycka samma känsla själv.</div>
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
