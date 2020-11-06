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
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Start</button>
                </div>
                
                <div className="form-group mt-20">
                
                
                </div>
            </div>
          
             
            );
    }
}

export default ExpMain;
