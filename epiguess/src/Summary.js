import React from 'react';

class Summary extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount(){
        console.log(this.props.guessResults);
    }

    render() {
    return (
        <div>
            Summary
        </div>
        
        );
    }
}

export default Summary;