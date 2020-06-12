// Selecting Elements
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const animate = document.querySelector('#animate');
// const canvas = document.querySelector('#canvas');
// const context = canvas.getContext('2d');

// defining model Params for our Handtrack model
const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.8,    // confidence threshold for predictions.
}

// Adding Styles or Event Listeners
start.addEventListener('click',Start);
stop.addEventListener('click',Stop);
document.querySelector('.done').style='opacity:0.4';

let model=null;
let isVideo=null;

// Start the video
function Start(){
    handTrack.startVideo(video).then(status => {  // status is either true/false
        if(status){
            console.log('Video started');
            isVideo=true;
            runDetection();
        }else{
            console.log('Error starting the Video');
        }
    });
}

// Video is Stopped
function Stop(){
    handTrack.stopVideo(video);
    console.log('Video is Stopped');
    isVideo = false;
}

// Detection model
function runDetection(){
    model.detect(video).then(predictions=>{
    //model.renderPredictions(predictions, canvas, context, video);
        if( predictions.length !==0 ){
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            // console.log('General',x);
            if(x>5 && x<100){
                audio.src='./audio/audio1.mp3';
            }
            else if(x>105 && x<220){
                audio.src='./audio/audio2.mp3';
            }
            else if(x>221 && x<390){
                audio.src='./audio/audio3.mp3';
            }
            else if(x > 400){
                audio.src='./audio/audio4.mp3';
            }
            audio.play();   
        }
        if (isVideo) {
            setTimeout(() => {
                runDetection(video)
            }, 1000); // Video Playing with a second gap
        }
    });
}

// Load the Model
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
    console.log('model Loaded');
    document.querySelector('.done').style='opacity:1';
    animate.style='display:none';
});

