import React from 'react';

class ExpPreGameInstruction extends React.Component{
    constructor(props) {
        super()
    }

    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    render() {

        return (
            
        
            <div>
                <div className= "jumbotron text-center"> 
                <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                <button  onClick={(e) => this.handleClick(e, '/ExpEyeColor')} type="submit" className="btn btn-primary">Starta spelet</button>
                </div>
                
                <div className="form-group mt-20">
                
                
                </div>
            </div>
          
             
            );
    }
}

export default ExpPreGameInstruction;