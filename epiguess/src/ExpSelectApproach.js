import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCoffee, faImage } from '@fortawesome/free-solid-svg-icons'

const infoText1 = {
    paddingBottom: '25px',
    fontSize: '32px'
}
const infoText2 = {
    paddingBottom: '25px'
}

const imageSelects = {
    paddingTop: '100px',
    paddingBottom: '100px'
}

const background = {
    backgroundColor: 'white'
}

const button = {
    marginLeft: '25px',
    marginRight: '25px',
    width: '150px',
    height: '50px',
    fontSize: '22px'
}

const buttonRed = {
    marginLeft: '25px',
    marginRight: '25px',
    width: '150px',
    height: '50px',
    fontSize: '22px',
    backgroundColor: '#f44336',
    color: 'white'
}

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
                <div className= "jumbotron text-center" style={background}> 
                    <div className="info-text" style={infoText1}>
                        Visa en känsla som Epi kan gissa på.
                    </div>
                    <div style={infoText2}>
                        Låt Epi spara en bild av ditt ansiktsuttryck i minnet (Epi har fotografiskt minne) eller välj en bild åt Epi från galleriet.
                    </div>
                    <div className="image-selects" style={imageSelects}>
                        <div className="take">
                            <FontAwesomeIcon icon={faCamera} />
                            <button style={button} onClick={(e) => this.handleClick(e, '/ExpTakePicture')} type="submit" className="btn btn-primary">Ta bild</button>
                        </div>
                        <div className="choose">
                            <FontAwesomeIcon icon={faImage}/>
                            <button style={button} onClick={(e) => this.handleClick(e, '/ExpChoosePicture')} type="submit" className="btn btn-primary">Välj bild</button>
                        </div>
                    </div>
                    <button  onClick={(e) => window.location.href = "http://localhost:3000/"} className="btn btn-primary">Avsluta</button>
                </div>
                <div className="form-group mt-20"> </div>
            </div>             
        );
    }
}

export default ExpSelectApproach;