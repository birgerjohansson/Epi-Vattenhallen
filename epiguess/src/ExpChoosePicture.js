import React from 'react';
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import $ from 'jquery';


const images = [
    {
      id: 1,
      original: '/images/anger1.jpg',
      thumbnail: '/images/anger1.jpg',
    },
    {
      id: 2,
      original: '/images/anger2.jpg',
      thumbnail: '/images/anger2.jpg',
    //   legend: 'bild 2',
    },
    {
        id: 3,
        original: '/images/anger3.jpg',
        thumbnail: '/images/anger3.jpg',
    },
    {
        id: 4,
        original: '/images/anger4.jpg',
        thumbnail: '/images/anger4.jpg',
    },
    // {
    //     id: 5,
    //     original: '/images/stock_disgusted2.jpg',
    //     thumbnail: '/images/stock_disgusted2.jpg',
    // },
    {
        id: 6,
        original: '/images/disgust1.jpg',
        thumbnail: '/images/disgust1.jpg',
    },
    {
        id: 7,
        original: '/images/disgust2.jpg',
        thumbnail: '/images/disgust2.jpg',
    },
    {
        id: 8,
        original: '/images/disgust4.jpg',
        thumbnail: '/images/disgust4.jpg',
    },
    {
        id: 9,
        original: '/images/fear1.jpg',
        thumbnail: '/images/fear1.jpg',
    },
    {
        id: 10,
        original: '/images/fear2.jpg',
        thumbnail: '/images/fear2.jpg',
    },
    {
        id: 12,
        original: '/images/joy2.jpg',
        thumbnail: '/images/joy2.jpg',
        legend: 'joy2',
    },
    {
        id: 13,
        original: '/images/joy3.jpg',
        thumbnail: '/images/joy3.jpg',
    },
    {
        id: 14,
        original: '/images/joy4.jpg',
        thumbnail: '/images/joy4.jpg',
    },
    {
        id: 15,
        original: '/images/sad1.jpg',
        thumbnail: '/images/sad1.jpg',
    },
    {
        id: 16,
        original: '/images/sad2.jpg',
        thumbnail: '/images/sad2.jpg',
    },
    {
        id: 16,
        original: '/images/surprise1.jpg',
        thumbnail: '/images/surprise1.jpg',
    },
    // {
    //     id: 16,
    //     original: '/images/surprise2.jpg',
    //     thumbnail: '/images/surprise2.jpg',
    // },
    {
        id: 16,
        original: '/images/surprise3.jpg',
        thumbnail: '/images/surprise3.jpg',
    },
  ];

  const buttonStyle = {
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

class ExpChoosePicture extends React.Component{
    constructor(props) {
        super()
    }

    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }

    clickedThisBitch = (id) => {
        console.log("clickedThisBitch" + id);
    }

    choosePicture = (event) => {
        let image = $('.selected img').attr('src');
        console.log(image);
        this.props.callbackFromParent(image); //pass image
        this.handleClick(event, '/ExpPreGameInstruction')
    }

    render() {
        return (
            <div style={{maxWidth : '80%', marginLeft : 'auto',marginRight : 'auto' }} >
                <div className="CarouselWrapper">
                    <Carousel swipeable={true} showArrows={true}>
                        {images.map((image, index) => {
                            return <div
                                        onClick={() => this.clickedThisBitch(image.id)}
                                        key={image.id}
                                    >
                                    <img src={image.original} />
                                    <p className="legend">{image.legend}</p>
                                    </div>
                            })
                        }
                    </Carousel>
                </div>
                {/* Removed class jumbotron */}
                <div className= "text-center"> 
                    <button style={buttonRed} onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn">Tillbaka</button>
                    <button style={buttonStyle} onClick={(e) => this.choosePicture(e)} type="submit" className="btn btn-primary">Nästa</button>
                </div>
                <div className="form-group mt-20"></div>
            </div>
        );
    }
}

export default ExpChoosePicture;