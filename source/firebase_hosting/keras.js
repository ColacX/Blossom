// https://transcranial.github.io/keras-js-docs/usage/
// run trained models in your browser

// console.log(KerasJS)

// async function main() {
//   try {
//     const model = new KerasJS.Model({
//       gpu: true,
//       filepath: 'kerasModel.bin',
//       filesystem: true
//     })

//     await model.ready()

//     const inputData = {
//       input_1: new Float32Array(data)
//     }

//     const outputData = await model.predict(inputData)
//   }
//   catch (e) {
//     console.error(e);
//   }

// }

// main()



// var app = new PIXI.Application(640, 360);
// document.body.appendChild(app.view);
// var circle = new PIXI.Graphics();
// circle.beginFill(0x5cafe2);
// circle.drawCircle(0, 0, 80);
// circle.x = 320;
// circle.y = 180;
// app.stage.addChild(circle);

var app = new PIXI.Application(32, 32, {
  backgroundColor: 0x1099bb,
  preserveDrawingBuffer: true
});
document.body.appendChild(app.view);

// var basicText = new PIXI.Text('1');
// basicText.x = 64;
// basicText.y = 64;

// app.stage.addChild(basicText);

var style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 20,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
});

var richText = new PIXI.Text('0', style);
richText.x = 4;
richText.y = 0;
app.stage.addChild(richText);

function downloadFunction() {
  var dataUrl = app.renderer.view.toDataURL("image/png", 1);
  document.getElementById("downloadLink").setAttribute("href", dataUrl);
}