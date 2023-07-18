//https://teachablemachine.withgoogle.com/models/_UQ9QQ-D6/
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });
  camera = document.getElementById("camera");

  Webcam.attach('#camera');
  function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_UQ9QQ-D6/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');

  }
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      gesture = results[0].label;
      tospeak ="";
      if(results[0].label == "amazing")
      {
          tospeak ="this is looking amazing";
          document.getElementById("update_emoji").innerHTML = "&#128076;";
      }
      else if(results[0].label == "best")
      {
          tospeak="all the best";
          document.getElementById("update_emoji").innerHTML = "&#128077;";
      }
      else if(results[0].label == "victory")
      {
          tospeak ="that was marvelous victory"
          document.getElementById("update_emoji").innerHTML = "&#9996;";
      }
       speak();

      
        
    }
  }
  
  function speak(){
    var synth = window.speechSynthesis;
    speak_data = tospeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
  }
  
  