var socket = io();

var right_points = [];
var left_points = [];
socket.on("server:website", (data) => {
  var hands = data["hand"];
  if (typeof hands !== "undefined") {
    let hand_type = hands["hand_type"];
    if (hand_type == "right") {
      // Scale from [-300, 300] to [0, 600]
      // Canvas size is 400x400
      let x = (parseInt(hands["hand_pos"]["x"]) + 300);
      let z = (parseInt(hands["hand_pos"]["z"]) + 300);
      console.log(x, z);
      right_points.push([x, z]);

    } else if (hand_type== "left") {
      // Scale from [-300, 300] to [0, 600]
      // Canvas size is 400x400
      let x = (parseInt(hands["hand_pos"]["x"]) + 300);
      let z = (parseInt(hands["hand_pos"]["z"]) + 300);
      console.log(x, z);
      left_points.push([x, z]);
    }
  }
});

var opaque_black;
var canvas;
function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("frame_container");
}

function draw() {
  background(250);

  strokeWeight(10);
  stroke(0, 0, 0, 50);

  for( let i = 1; i < right_points.length; i++) {
    // point(points[i][0], points[i][1]);
    line(right_points[i-1][0], right_points[i-1][1], right_points[i][0], right_points[i][1]);
  }
  for (let i = 1; i < left_points.length; i++ ) {
    line(left_points[i-1][0], left_points[i-1][1], left_points[i][0], left_points[i][1]);
  }
}

function stringCoords(ob) {
  return "(" + ob["hand_pos"]["x"] + ", " + ob["hand_pos"]["y"] + ", " + ob["hand_pos"]["z"] + ")";
}
$("#title").click(function() {
  console.log("tittt");
});

$("#download").click(function () {
  console.log("clicked");
});

function download() {
  saveCanvas("BubblePicasso", "png");
}

function restart() {
  right_points = [];
  left_points = [];
}
