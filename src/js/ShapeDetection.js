import env from './env.js'
import GetApi from './GetApi.js'

class ShapeDetection {
  constructor() {
    this.startBtn = document.getElementById(env.VIDEO_START);
    this.stopBtn = document.getElementById(env.VIDEO_STOP);
    this.video = document.getElementById(env.VIDEO_PLAYER);
    this.inputText = document.getElementById(env.SELECTOR_INPUT_TEXT);
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

  addOnClick() {
    this.stopBtn.addEventListener('click', () => {
      this.stopVideo();
    });
    this.startBtn.addEventListener('click', () => {
      this.startBtnClick();
    });
  }


  startBtnClick() {
    document.getElementById('rawValue').innerHTML = "";

    navigator.mediaDevices.getUserMedia(this.medias).then((stream) => {
        this.video.srcObject = stream;
        this.localStream = stream;
        if (window.BarcodeDetector) {
          const detector = new BarcodeDetector();
          detector.formats = "ean_13"
          this.captureTimer = setInterval(() => {
            detector.detect(this.video).then((barcodes) => {
                let barcode = null;
                for (barcode of barcodes) {
                  //console.log(barcode);
                  document.getElementById('rawValue').innerHTML = this.convertLink(barcode.rawValue);
                  try {
                    document.getElementById(env.LOADING).style.display = "block";
                    GetApi.getgapi(barcode.rawValue).then((text) => {
                        this.inputText.value += text;
                        alert("書籍情報を自動入力しました")
                      })
                      .catch((err) => {
                        console.log(err)
                        alert("書籍情報の取得に失敗しました\n" + err)
                      })
                  } catch (err) {
                    console.log(err);
                  } finally {
                    document.getElementById(env.LOADING).style.display = "none";
                  }
                }
                if (barcode) this.stopVideo();
              }).catch((err) => {
              console.log(err);
            });
          }, 1000 / this.fps);
        } else {
          console.error('BarcodeDetection is not enable!');
        }
        this.switchButtoncondition();
      }).catch((err) => {
        console.log(err);
      });
  }

  switchButtoncondition() {
    this.startBtn.disabled = !this.startBtn.disabled;
    this.stopBtn.disabled = !this.stopBtn.disabled
  }

  stopVideo() {
    clearInterval(this.captureTimer);
    this.localStream.getTracks().forEach((track) => {
      track.stop();
    });
    this.localStream = null;
    this.video.srcObject = null;
    this.switchButtoncondition();
  };

  convertLink(str) {
    const regexpUrl =
      /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
    const regexpLink = (all, url, h, href) => {
      return '<a href="h' + href + '">' + url + '</a>';
    }
    return str.replace(regexpUrl, regexpLink);
  };

}

export default new ShapeDetection()
