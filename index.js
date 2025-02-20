// 초기 QR 코드 생성 (기본 크기 지정)
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 128,
    height: 128
});
    
// QR 코드 재생성을 위한 함수
function generateQRCode(url) {
    // 기존 QR 코드 제거 후 새로 생성
    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 128,
        height: 128,
    });
}
    
// "생성" 버튼 클릭 시 이벤트 핸들러
document.getElementById("generateBtn").addEventListener("click", function() {
    var url = document.getElementById("urlInput").value;

    if(url) {
        generateQRCode(url);
        // QR 코드가 생성되었으므로 다운로드 버튼 활성화
        document.getElementById("downloadBtn").disabled = false;
    } else {
        alert("주소를 입력하세요.");
    }
});
    
// "이미지 다운로드" 버튼 클릭 시 이벤트 핸들러
document.getElementById("downloadBtn").addEventListener("click", function() {
// QR 코드 영역 내 canvas 또는 img 요소를 확인
    var canvas = document.querySelector("#qrcode canvas");
    var dataUrl;

    if (canvas) {
        dataUrl = canvas.toDataURL("image/png");
    } else {
        var img = document.querySelector("#qrcode img");
        if (img) {
        dataUrl = img.src;
        }
    }
    
    if (dataUrl) {
        var link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("QR 코드가 생성되지 않았습니다.");
    }
});