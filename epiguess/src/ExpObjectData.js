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
            {id: 11, catId: 1,  emotion: 'arg', boolean: false}//,
            // {id: 12, catId: 1,  emotion: 'Hotad', boolean: false},
            // {id: 13, catId: 1,  emotion: 'Stött', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Arg3.jpg', emVidSrc: '/videos/Arg3.mp4'}
        ],
        epiRecID: 1
    },
    { 
        id: 2, 
        emotionCat: "Happiness", 
        faceRecEmotion: 'happy',
        boolean: false,
        barColor: "#FFD65D",
        value: 0,
        emotions: [
            {id: 14, catId: 2, emotion: 'glad', boolean: false}//,
            // {id: 15, catId: 2, emotion: 'Begeistrad', boolean: false},
            // {id: 16, catId: 2, emotion: 'Självsäker', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Glad3.jpg', emVidSrc: './videos/Glad3.mp4'}
        ],
        epiRecID: 3
    },
    { 
        id: 3, 
        emotionCat: "Sadness", 
        faceRecEmotion: 'sad',
        boolean: false,
        value: 0,
        barColor: "#2884C6",
        emotions: [
            {id: 17, catId: 3,  emotion: 'ledsen', boolean: false}//,
            // {id: 18, catId: 3,  emotion: 'Sårad', boolean: false},
            // {id: 19, catId: 3,  emotion: 'Ensam', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Ledsen3.jpg', emVidSrc: '/videos/Ledsen3.mp4'},
        ],
        epiRecID: 2
    },
    { 
        id: 4, 
        emotionCat: "Surprise", 
        faceRecEmotion: 'surprised',
        boolean: false,
        value: 0,
        barColor: "#67F4D8",
        emotions: [
            {id: 20, catId: 4,  emotion: 'överraskad', boolean: false}//,
            // {id: 21, catId: 4,  emotion: 'Förvånad', boolean: false},
            // {id: 22, catId: 4,  emotion: 'Uppskrämd', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Överaskad3.jpg', emVidSrc: '/videos/Överaskad3.mp4'}
        ],
        epiRecID: 6
    },
    { 
        id: 5, 
        emotionCat: "Fear", 
        faceRecEmotion: 'fearful',
        boolean: false,
        value: 0,
        barColor: "#784DA3",
        emotions: [
            {id: 23, catId: 5,  emotion: 'rädd', boolean: false}//,
            // {id: 24, catId: 5,  emotion: 'Orolig', boolean: false},
            // {id: 25, catId: 5,  emotion: 'Osäker', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Rädd3.jpg', emVidSrc: '/videos/Rädd3.mp4'}
        ],
        epiRecID: 4
    },
    { 
        id: 6, 
        emotionCat: "Disgust", 
        faceRecEmotion: 'disgusted',
        boolean: false,
        value: 0,
        barColor: "#3CA938",
        emotions: [
            {id: 26, catId: 6,  emotion: 'äcklad', boolean: false}//,
            // {id: 27, catId: 6,  emotion: 'Förnärmad', boolean: false},
            // {id: 28, catId: 6,  emotion: 'Motvillig', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Äcklad3.jpg', emVidSrc: '/videos/Äcklad3.mp4'}
        ],
        epiRecID: 5
    },
    { 
        id: 7, 
        emotionCat: "Neutral", 
        faceRecEmotion: 'neutral',
        boolean: false,
        value: 0,
        barColor: "#FFFFFF",
        emotions: [
            {id: 29, catId: 7,  emotion: 'neutral', boolean: false}//,
            // {id: 30, catId: 7,  emotion: 'Likgiltig', boolean: false}
        ],
        resultImages: [
            {id: 1, order: 1, src: '/images/Neutral.jpg', emVidSrc: '/videos/Neutral3.mp4'}
        ],
        epiRecID: 0
    }      
]

export default {
    objectList,
}