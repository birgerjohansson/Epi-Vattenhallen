import React from 'react';

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
