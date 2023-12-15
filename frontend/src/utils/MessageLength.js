
class MessageLength {
    getMessageCardLength(messageLength) {
        const minimumLength = 6;
        
        if(messageLength < 10){
            return minimumLength;
        } else if(messageLength < 20){
            return minimumLength + 1;
        } else if(messageLength < 30){
            return minimumLength + 3;
        } else if(messageLength < 40){
            return minimumLength + 7;
        } else if(messageLength < 50){
            return minimumLength + 10;
        } else if(messageLength < 60){
            return minimumLength + 15;
        } else {
            return 30;
        }
    }
}
const messageLength = new MessageLength();
export default messageLength;