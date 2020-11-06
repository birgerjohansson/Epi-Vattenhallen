import React from 'react';
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
    {
      id: 1,
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
      legend: 'bild 1',
    },
    {
      id: 2,
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
      legend: 'bild 2',
    },
    {
      id: 3,
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
      legend: 'bild 3',
    },
  ];

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

    render() {

        return (
            <div>
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
                    <button  onClick={(e) => this.handleClick(e, '/ExpSelectApproach')} type="submit" className="btn btn-primary">Tillbaka</button>
                    <button  onClick={(e) => this.handleClick(e, '/ExpPreGameInstruction')} type="submit" className="btn btn-primary">Nästa</button>
                </div>
                <div className="form-group mt-20"></div>
            </div>
        );
    }
}

export default ExpChoosePicture;