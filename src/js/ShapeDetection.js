import env from './env.js'
import GetApi from './GetApi.js'

class ShapeDetection {
  constructor() {
    this.startBtn = document.getElementById(env.VIDEO_START);
    this.stopBtn = document.getElementById(env.VIDEO_STOP);
    this.video = document.getElementById(env.VIDEO_PLAYER);
    this.localStream = null;
    this.captureTimer = null;
    this.fps = 10;
    this.medias = {
      video: {
        width: 320,
        height: 240,
        facingMode: {
          exact: "environment"
        }
      },
      audio: false
    };
  }

  startBtnClick() {
    document.getElementById('rawValue').innerHTML = "";

    navigator.mediaDevices.getUserMedia(this.medias)
      .then((stream) => {
        this.video.srcObject = stream;
        this.localStream = stream;
        if (window.BarcodeDetector) {
          const detector = new BarcodeDetector();
          detector.formats = "ean_13"
          this.captureTimer = setInterval(() => {
            detector.detect(this.video).then(
              (barcodes) => {
                let barcode = null;
                for (barcode of barcodes) {
                  console.log("value : " + barcode.rawValue);
                  //console.log(barcode);
                  document.getElementById('rawValue').innerHTML =
                    this.convertLink(barcode.rawValue);
                  alert("call g");
                  GetApi.getgapi(barcode.rawValue);
                  document.getElementById("js-create-button").disabled = false;
                }
                if (barcode) this.stopVideo();
              }).catch((err) => {
              console.log(err);
            });
          }, 1000 / this.fps);
        } else {
          console.error('BarcodeDetection is not enable!');
        }
        this.setButtonconditionStop();
      }).catch((err) => {
        console.log(err);
      });
  }


//startBtnClick() {

//}

setButtonconditionStop() {
  this.startBtn.disabled = true;
  this.stopBtn.disabled = false;
}
setButtonconditionStart() {
  this.startBtn.disabled = false;
  this.stopBtn.disabled = true;
}

stopVideo() {
  clearInterval(this.captureTimer);
  this.localStream.getTracks().forEach((track) => {
    track.stop();
  });
  this.localStream = null;
  this.video.srcObject = null;
  this.setButtonconditionStart();
};


convertLink(str) {
  const regexpUrl =
    /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
  const regexpLink = (all, url, h, href) => {
    return '<a href="h' + href + '">' + url + '</a>';
  }
  return str.replace(regexpUrl, regexpLink);
};
// load時にstart状態にする
//startBtn.click();

}

export default new ShapeDetection()
