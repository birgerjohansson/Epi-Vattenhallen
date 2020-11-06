class EmotionObject{
    constructor() {
        this.emotionsObject = [];
        
    }
    
    addEmotion(id, emotionCat, emotions, boolean, value){
        let tempEmotionObject = {};
        tempEmotionObject.id = id;
        tempEmotionObject.emotionCat = emotionCat;
        tempEmotionObject.emotions = emotions;
        tempEmotionObject.boolean = boolean;
        tempEmotionObject.value = value;
        this.emotionsObject.push(tempEmotionObject); 
    }
     
}

export default EmotionObject;