function displayResult() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const result = urlParams.get("result");
    const probability = urlParams.get("probability");
    
    if (result) {
        const resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = `${probability}% ${result} 선수와 닮았습니다!`;
        
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
            resultImage.src = resultImages[result];
            resultImage.style.display = "block";
        } else {
            resultImage.style.display = "none";
        }
    } else {
        const resultContainer = document.getElementById("result-container");
        resultContainer.textContent = "결과를 찾을 수 없습니다.";
    }
    
}

export { displayResult };
