/* Make room for more extensive data collection */

export const objectList = [
    { 
        id: 1, 
        emotionCat: "Anger", 
        faceRecEmotion: 'angry',
        boolean: false,
        value: 0,
        barColor: "#FB525A",
        emotions: [
            {id: 11, emotion: 'Angry', boolean: false},
            {id: 12, emotion: 'Threatened', boolean: false},
            {id: 13, emotion: 'Offended', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Arg3.jpg', emVidSrc: '/videos/Arg3.mp4'}
        ]
    },
    { 
        id: 2, 
        emotionCat: "Happiness", 
        faceRecEmotion: 'happy',
        boolean: false,
        barColor: "#FFD65D",
        value: 0,
        emotions: [
            {id: 14, emotion: 'Happy', boolean: false},
            {id: 15, emotion: 'Excited', boolean: false},
            {id: 16, emotion: 'Confident', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Glad3.jpg', emVidSrc: './videos/Glad3.mp4'}
        ]
    },
    { 
        id: 3, 
        emotionCat: "Sadness", 
        faceRecEmotion: 'sad',
        boolean: false,
        value: 0,
        barColor: "#2884C6",
        emotions: [
            {id: 17, emotion: 'Sad', boolean: false},
            {id: 18, emotion: 'Hurt', boolean: false},
            {id: 19, emotion: 'Lonely', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Ledsen3.jpg', emVidSrc: '/videos/Ledsen3.mp4'},
        ]
    },
    { 
        id: 4, 
        emotionCat: "Surprise", 
        faceRecEmotion: 'surprised',
        boolean: false,
        value: 0,
        barColor: "#67F4D8",
        emotions: [
            {id: 20, emotion: 'Surprised', boolean: false},
            {id: 21, emotion: 'Amazed', boolean: false},
            {id: 22, emotion: 'Startled', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Överaskad3.jpg', emVidSrc: '/videos/Överaskad3.mp4'}
        ]
    },
    { 
        id: 5, 
        emotionCat: "Fear", 
        faceRecEmotion: 'fearful',
        boolean: false,
        value: 0,
        barColor: "#784DA3",
        emotions: [
            {id: 23, emotion: 'Scared', boolean: false},
            {id: 24, emotion: 'Worried', boolean: false},
            {id: 25, emotion: 'Insecure', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Rädd3.jpg', emVidSrc: '/videos/Rädd3.mp4'}
        ]
    },
    { 
        id: 6, 
        emotionCat: "Disgust", 
        faceRecEmotion: 'disgusted',
        boolean: false,
        value: 0,
        barColor: "#3CA938",
        emotions: [
            {id: 26, emotion: 'Disgusted', boolean: false},
            {id: 27, emotion: 'Resentful', boolean: false},
            {id: 28, emotion: 'Averse', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Äcklad3.jpg', emVidSrc: '/videos/Äcklad3.mp4'}
        ]
    },
    { 
        id: 7, 
        emotionCat: "Neutral", 
        faceRecEmotion: 'neutral',
        boolean: false,
        value: 0,
        barColor: "#FFFFFF",
        emotions: [
            {id: 29, emotion: 'Neutral', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '', emVidSrc: '/videos/Neutral3.mp4'}
        ]
    }      
]

export default {
    objectList,
}