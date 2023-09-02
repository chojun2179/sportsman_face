let isImageUploaded = false;

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
    isImageUploaded = true;
  } else {
    removeUpload();
    isImageUploaded = false;
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}

const URL = 'https://teachablemachine.withgoogle.com/models/HsPtWtP0z/';
let model, labelContainer, maxPredictions;

async function init() {
  // const startButton = document.getElementById('start-button');
  // startButton.disabled = true;
  // startButton.innerHTML = 'Loading...';
  const predictButton = document.getElementById("predict-button");
  predictButton.disabled = true;
  predictButton.innerHTML = '예측 모델 불러오는 중';

  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  try {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement('div'));
    }
    
    predictButton.disabled = false;
    predictButton.innerHTML = '예측하기';
    // startButton.style.display = 'none';
  } catch (error) {
    console.error('Error loading model:', error);
    // startButton.innerHTML = 'Failed';
  }
}

function predict() {
  if (!isImageUploaded) {
    alert("이미지를 먼저 업로드해주세요.");
    return;
  }

  const predictButton = document.getElementById('predict-button');
  predictButton.innerHTML = 'Predicting...';

  var originalImage = document.getElementById('face-image');

  var grayImage = new Image();
  grayImage.onload = function() {
    model.predict(grayImage, false).then((prediction) => {
      let maxIndex = 0;
      let maxProbability = prediction[0].probability;
      for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > maxProbability) {
          maxIndex = i;
          maxProbability = prediction[i].probability;
        }
      }

      const maxClassLabel = prediction[maxIndex].className;

      labelContainer.innerHTML = `${(maxProbability).toFixed(2)*100}% ${maxClassLabel} 선수와 닮았습니다!`;

      $('.result-box').slideUp(500, function() {
        setTimeout(function() {
          $('.result-box').slideDown(500);
        }, 500);
      }); 

      predictButton.innerHTML = '예측 완료';
    });
  };
  makeGray(originalImage, grayImage); 
}

function makeGray(originalImage, grayImage) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);

  grayImage.src = canvas.toDataURL();
}

$(function() {
init();
});