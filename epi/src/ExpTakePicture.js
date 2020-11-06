import React from 'react';

class ExpTakePicture extends React.Component{
    constructor(props) {
        super()
    }
    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }
    //Trigger method takePicture() in parent
    takePicture = () => {
        this.props.callbackFromParent();
    }

    render() {

        return (
            <div>
                <div className= "jumbotron text-center"> 
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                    <button  onClick={(e) => this.handleClick(e, '/ExpPreGameInstruction')} type="submit" className="btn btn-primary">Nästa</button>
                    <button  onClick={(e) => this.takePicture(e)} type="submit" className="btn btn-primary">Ta bild</button>
                </div>
                
                <div className="form-group mt-20"></div>
            </div>
        );
    }
}

export default ExpTakePicture;