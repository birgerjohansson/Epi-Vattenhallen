import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCoffee, faImage } from '@fortawesome/free-solid-svg-icons'

class ExpSelectApproach extends React.Component{
    constructor(props) {
        super()
    }

    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    //Trigger parent method exiExp() and return to home-page
    exitExperiment = (event) => {
        this.props.callbackFromParent();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className= "jumbotron text-center"> 
                    <div className="info-text">
                        Välj input
                    </div>
                    <div>
                        Epi försöker förstå och uttrycka känslor hon ser i människors ansiktsuttryck.
                    </div>
                    <div>
                        Låt Epi spara en bild av ditt ansikte i minnet (Epi har fotografiskt minne) eller välj en bild åt Epi från galleriet.
                    </div>
                    <div className="image-selects">
                        <div className="take">
                            {/* <FontAwesomeIcon icon={["fal", "coffee"]} /> */}
                            <FontAwesomeIcon icon={faCamera} />
                            <button  onClick={(e) => this.handleClick(e, '/ExpTakePicture')} type="submit" className="btn btn-primary">Ta bild</button>
                        </div>
                        <div className="choose">
                            <FontAwesomeIcon icon={faImage}/>
                            <button  onClick={(e) => this.handleClick(e, '/ExpChoosePicture')} type="submit" className="btn btn-primary">Välj bild</button>
                        </div>
                    </div>
                    
                    <button  onClick={(e) => this.exitExperiment(e, '/')} type="submit" className="btn btn-primary">Tillbaka</button>
                </div>
                
                <div className="form-group mt-20"> </div>
            </div>             
        );
    }
}

export default ExpSelectApproach;