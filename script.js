let isImageUploaded = false;

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide(); // 이미지 업로드 영역 숨기기

      $('.file-upload-image').attr('src', e.target.result); // 파일 업로드 이미지 설정
      $('.file-upload-content').show(); // 파일 업로드 콘텐츠 표시

      $('.image-title').html(input.files[0].name); // 이미지 제목 설정
    };

    reader.readAsDataURL(input.files[0]); // 데이터 URL로 변환하여 이미지 읽기
    isImageUploaded = true; // 이미지 업로드 여부 설정
  } else {
    removeUpload(); // 업로드 제거
    isImageUploaded = false; // 이미지 업로드 여부 설정
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone()); // 파일 업로드 입력 재설정
  $('.file-upload-content').hide(); // 파일 업로드 콘텐츠 숨기기
  $('.image-upload-wrap').show(); // 이미지 업로드 영역 표시
}

const URL = 'https://teachablemachine.withgoogle.com/models/HsPtWtP0z/';
let model, labelContainer, maxPredictions;

async function init() {
  const predictButton = document.getElementById("predict-button");
  predictButton.disabled = true;
  predictButton.innerHTML = '예측 모델 불러오는 중';

  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  try {
    model = await tmImage.load(modelURL, metadataURL); // 모델 및 메타데이터 로드
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement('div'));
    }
    
    predictButton.disabled = false;
    predictButton.innerHTML = '예측하기';
  } catch (error) {
    console.error('모델 로딩 오류:', error);
  }
}

function predict() {
  if (!isImageUploaded) {
    alert("이미지를 먼저 업로드해주세요.");
    return;
  }

  const predictButton = document.getElementById('predict-button');
  predictButton.innerHTML = '예측 중...';

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
      const probabilityPercentage = (maxProbability * 100).toFixed(2);

      labelContainer.innerHTML = `${probabilityPercentage}% ${maxClassLabel} 선수와 닮았습니다!`;

      $('.result-box').slideUp(500, function() {
        setTimeout(function() {
          $('.result-box').slideDown(500);
        }, 500);
      }); 
      
      const resultPageUrl = `result.html?result=${maxClassLabel}&probability=${probabilityPercentage}`;
      window.open(resultPageUrl, '_blank');

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
  init(); // 초기화 함수 호출
}); 
