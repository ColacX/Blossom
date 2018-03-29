navigator.getUserMedia(
  {
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480
      }
    },
    audio: false
  },
  (localMediaStream) => {

    var videoElement = $("#myVideo")[0];
    videoElement.src = window.URL.createObjectURL(localMediaStream);
    videoElement.muted = true;
    videoElement.onloadedmetadata = (e) => {
      console.log(e);
    };

  },
  (e) => {
    console.error("video and audio failed", e);
  }
);

function captureButton() {
  var videoElement = $("#myVideo")[0];
  var canvasElement = $("#myCanvas")[0];
  var canvasContext = canvasElement.getContext("2d");
  canvasElement.width = videoElement.offsetWidth;
  canvasElement.height = videoElement.offsetHeight;
  canvasContext.drawImage(videoElement, 0, 0, videoElement.offsetWidth, videoElement.offsetHeight, 0, 0, canvasElement.width, canvasElement.height);
  var dataUrl = canvasElement.toDataURL('image/jpeg');
  $("#downloadLink")[0].href = dataUrl;
}

function paintButton() {
  console.log($("#myX").val(), $("#myY").val());
}