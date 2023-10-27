function displayResult() {
    // 현재 페이지 URL에서 쿼리 문자열을 가져옵니다.
    const queryString = window.location.search;

    // URLSearchParams 객체를 사용하여 쿼리 문자열에서 매개변수를 추출합니다.
    const urlParams = new URLSearchParams(queryString);

    // "result" 및 "probability" 매개변수를 추출합니다.
    const result = urlParams.get("result");
    const probability = urlParams.get("probability");

    if (result) {
        // 결과가 있는 경우 결과를 표시할 컨테이너 요소를 가져옵니다.
        const resultContainer = document.getElementById("result-container");

        // 결과 메시지를 설정합니다.
        resultContainer.innerHTML = `${probability}% ${result} 선수와 닮았습니다!`;

        // 결과 이미지 요소를 가져오고, 결과 이미지 경로를 정의합니다.
        const resultImage = document.getElementById("result-image");
        const resultImages = {
            "서장훈_농구": "images/1.jpg",
            "서태웅_농구": "images/2.jpg",
            "허재_농구": "images/3.jpg",

            "제카_롤": "images/4.jpg",
            "데프트_롤": "images/5.jpg",
            "페이커_롤": "images/6.jpg",

            "류현진_야구": "images/7.jpg",
            "이대호_야구": "images/8.jpg",
            "추신수_야구": "images/9.jpg",

            "김우진_양궁": "images/10.jpg",
            "김재덕_양궁": "images/11.jpg",
            "오진혁_양궁": "images/12.jpg",

            "박지성_축구": "images/14.jpg",
            "손흥민_축구": "images/13.jpg",
            "이강인_축구": "images/15.jpg",
        };

        if (resultImages[result]) {
            // 결과 이미지가 있는 경우 해당 이미지를 표시하고 블록으로 설정합니다.
            resultImage.src = resultImages[result];
            resultImage.style.display = "block";
        } else {
            // 결과 이미지가 없는 경우 이미지를 숨깁니다.
            resultImage.style.display = "none;
        }
    } else {
        // 결과가 없는 경우 결과를 찾을 수 없다는 메시지를 표시합니다.
        const resultContainer = document.getElementById("result-container");
        resultContainer.textContent = "결과를 찾을 수 없습니다.";
    }
}

// displayResult 함수를 외부로 내보냅니다.
export { displayResult };
