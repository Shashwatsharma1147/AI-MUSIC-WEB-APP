song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
Status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    stroke("red");

    Status = song1.isPlaying();
    console.log("Status = " + Status);

    if (leftWristScore >= 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2._stop();
    }

    if(Status = false){
        song1.play();
    }

}
function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        console.log(" leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        console.log(" rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        result[0].pose.keypoints[9].score;
        leftWristScore = 1;
    }
}