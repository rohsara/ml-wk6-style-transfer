let style, 
    video, 
    resultImg,
    isTransferring = false;

function setup(){
    createCanvas(320, 240).parent('canvasContainer');
    video = createCapture(VIDEO);
    video.hide();

    resultImg = createImg('');
    resultImg.hide();

    select('#startStop').mousePressed(startStop);

    style = ml5.styleTransfer('models/wave', video, modelLoaded);
}

function draw(){
    if(isTransferring) {
        image(resultImg, 0, 0, 320, 240);
    } else {
        image(video, 0, 0, 320, 240);
    }
}

function modelLoaded(){
    select('#status').html('Model Loaded');
}

function startStop(){
    if(isTransferring){
        select('#startStop').html('Start');
    } else {
        select('#startStop').html('Stop');
        style.transfer(gotResult);
    }
    isTransferring = !isTransferring;
}

function gotResult(err, img){
    resultImg.attribute('src', img.src);
    if(isTransferring){
        style.transfer(gotResult);
    }
}