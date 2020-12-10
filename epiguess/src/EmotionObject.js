class EmotionObject{
    constructor() {
        this.emotionsObject = [];
        
    }
    
    addEmotion(id, emotionCat, emotions, boolean, value, faceRecEmotion, barColor, resultImages){
        console.log('color: ' + barColor)
        let tempEmotionObject = {};
        tempEmotionObject.id = id;
        tempEmotionObject.emotionCat = emotionCat;
        tempEmotionObject.emotions = emotions;
        tempEmotionObject.boolean = boolean;
        tempEmotionObject.value = value;
        tempEmotionObject.faceRecEmotion = faceRecEmotion;
        tempEmotionObject.barColor = barColor;
        tempEmotionObject.resultImages = resultImages;
        this.emotionsObject.push(tempEmotionObject); 
    }
     
}

export default EmotionObject;