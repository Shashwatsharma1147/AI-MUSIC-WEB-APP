song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
status1 = "";
rightWristScore = 0;
status2 = 0;

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
    fill("red");
    stroke("red");
    status1 = song1.isPlaying();
    console.log("status1 = " + status1);

    if (leftWristScore >= 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2._stop();

        if (status1 == false) {
            song1.play();
            document.getElementById("songs").innerHTML = "Song: Harry Porter Theme";
        }
    }

    status2 = song2.isPlaying();
    console.log("status2 = " + status2);

    if (rightWristScore >= 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (status2 == false) {
            song2.play();
            document.getElementById("songs").innerHTML = "Song: Peter Pan Theme"
        }
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

        leftWristScore = result[0].pose.keypoints[9].score;
        console.log("leftWristScore = " + leftWristScore);

        rightWristScore = result[0].pose.keypoints[10].score;
        console.log("rightWristScore = " + rightWristScore);
    }
}

function stopSong(){
    song1.pause();
    song2.pause();
}