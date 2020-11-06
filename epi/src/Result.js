import React from 'react';
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
        let val = JSON.stringify(expObject);
    return (
        <div>
            <div className="jumbotron text-center" >
                {val}
            </div>
            <div className="jumbotron text-center" style={{backgroundColor: 'white'}}>
                <button  onClick={(e) => this.exitExperiment(e)} type="submit" class="btn btn-primary">Exit</button>  
            </div>

        </div>
        
    );
    }
}

export default Result;