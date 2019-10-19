import env from './env.js'
import GetApi from './GetApi.js'

class ShapeDetection{
  constructor(){
    //this.startBtn = document.getElementById(env.VIDEO_START);
    //this.stopBtn = document.getElementById(env.VIDEO_STOP);
    //this.video = document.getElementById(env.VIDEO_PLAYER);
    //this.localStream = null;
    //this.captureTimer = null;
    //this.fps = 10;

  }

  addOnClick() {
    this.stopBtn.addEventListener('click', () => {
      this.stopVideo();
    });
    this.startBtn.addEventListener('click', () => {
      //this.startBtnClick();
      document.getElementById('rawValue').innerHTML = "";
      let startBtn = document.getElementById(env.VIDEO_START);
      let stopBtn = document.getElementById(env.VIDEO_STOP);
      let videoTracks;
      let video = document.getElementById(env.VIDEO_PLAYER);
      let localStream = null;
      let captureTimer = null;
      const fps = 10;
      let medias = {
        video: {
          width: 320,
          height: 240,
          facingMode: {
            exact: "environment"
          }
        },
        audio: false
      };
      let convertLink = this.convertLink;

      navigator.mediaDevices.getUserMedia(medias)
        .then(function(stream) {
          video.srcObject = stream;
          localStream = stream;
          if (window.BarcodeDetector) {
            const detector = new BarcodeDetector();
            detector.formats = "ean_13"
            captureTimer = setInterval(function() {
              detector.detect(video).then(
                function(barcodes) {
                  let barcode = null;
                  for (barcode of barcodes) {
                    console.log("value : " + barcode.rawValue);
                    //console.log(barcode);
                    document.getElementById('rawValue').innerHTML =
                      convertLink(barcode.rawValue);
                    alert("call g");
                    GetApi.getgapi(barcode.rawValue);
                    document.getElementById("js-create-button").disabled = false;
                  }
                  //if (barcode) stopVideo();
                  if(barcode){
                    clearInterval(captureTimer);
                    localStream.getTracks().forEach(function(track) {
                      track.stop();
                    });
                    localStream = null;
                    let video = document.getElementById(env.VIDEO_PLAYER);
                    video.srcObject = null;
                    startBtn.disabled = false;
                    stopBtn.disabled = true;
                  }
                }).catch(function(err) {
                console.log(err);
              });
            }, 1000 / fps);
          } else {
            console.error('BarcodeDetection is not enable!');
          }
          startBtn.disabled = true;
          stopBtn.disabled = false;
        }).catch(function(err) {
          console.log(err);
        });
    });
  }

  //startBtnClick() {

  //}

  setButtonconditionStop(){
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;
  }
  setButtonconditionStart(){
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  stopVideo() {
    clearInterval(this.captureTimer);
    this.localStream.getTracks().forEach(function(track) {
      track.stop();
    });
    this.localStream = null;
    let video = document.getElementById(env.VIDEO_PLAYER);
    this.video.srcObject = null;
    setButtonconditionStart();
  };


  convertLink(str) {
    const regexpUrl =
      /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
    const regexpLink = function(all, url, h, href) {
      return '<a href="h' + href + '">' + url + '</a>';
    }
    return str.replace(regexpUrl, regexpLink);
  };
  // load時にstart状態にする
  //startBtn.click();

}



export default new ShapeDetection()
