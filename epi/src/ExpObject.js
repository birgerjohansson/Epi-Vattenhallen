class ExpObject{
    constructor() {
        this.expObject = [{expOne: []}, {expTwo: []}, {expThree: []}];
        
    }
    
    addEmotionObject(expNumber, emotionObject){
        if (expNumber == 1){
            this.expObject[0].expOne.push(emotionObject);

        }else if (expNumber == 2){
            this.expObject[1].expTwo.push(emotionObject);

        }else if (expNumber == 3){
            this.expObject[2].expThree.push(emotionObject);

        }
    }
     
}

export default ExpObject;