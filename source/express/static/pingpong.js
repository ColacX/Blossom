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
  canvasElement.width = 160;
  canvasElement.height = 120;
  canvasContext.drawImage(videoElement, 0, 0, videoElement.offsetWidth, videoElement.offsetHeight, 0, 0, canvasElement.width, canvasElement.height);
  var dataUrl = canvasElement.toDataURL('image/jpeg');
  $("#downloadLink")[0].href = dataUrl;
}


// https://transcranial.github.io/keras-js-docs/usage/
// run trained models in your browser

console.log(KerasJS)

async function predictKeras() {
  try {
    // https://transcranial.github.io/keras-js-docs/conversion/
    // encoder.py is included in the kerasjs repo
    const model = new KerasJS.Model({
      gpu: false,
      filepath: 'kerasModel.bin',
      filesystem: true
    })

    await model.ready();
    const ctxScaled = $("#myCanvas")[0].getContext('2d');
    const rgba = ctxScaled.getImageData(0, 0, ctxScaled.canvas.width, ctxScaled.canvas.height);
    console.log(rgba);
    let data = new Float32Array(160 * 120 * 3);
    let next = 0;
    for (let i = 0; i < rgba.data.length; i += 4) {
      data[next++] = rgba.data[i + 0] / 255.0;
      data[next++] = rgba.data[i + 1] / 255.0;
      data[next++] = rgba.data[i + 2] / 255.0;
      //data[i] = rgba.data[i + 3] / 255.0; //skip alpha
    }

    const inputData = {
      input: data
    }

    console.log(inputData);
    const outputData = await model.predict(inputData)
    console.log('outputData', outputData);
    $('#predictText').text('Blue:' + outputData.output[0] + ' Orange:' + outputData.output[1] + ' White:' + outputData.output[2]);
  }
  catch (e) {
    console.error(e);
  }
}

function predictButton() {
  captureButton();
  predictKeras()
}
