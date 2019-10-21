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
    this.stopBtn.disabled = true;
    this.startBtn.addEventListener('click', () => {
      this.startBtnClick();
    });
    this.startBtn.disabled = false;
  }


  startBtnClick() {
    document.getElementById('rawValue').innerHTML = "";
    navigator.mediaDevices.getUserMedia(this.medias).then(async(stream) => {
      this.video.srcObject = stream;
      this.localStream = stream;
      this.switchButtoncondition();
      if (window.BarcodeDetector) {
        let result;
        //正しいisbnを読み取れるまでスキャンし続ける
        while(true){
          result = await this.findIsbn();
          if(/\d{13}/.test(result)){
            this.callGetApi(result);
            break;
          }
        }
      } else {
        console.error('BarcodeDetection is not enable!');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  findIsbn() {
    return new Promise((resolve, reject) => {
      const detector = new BarcodeDetector();
      detector.formats = "ean_13"

      this.captureTimer = setInterval(() => {
        detector.detect(this.video).then((barcodes) => {
          let barcode = null;
          barcodes.some((barcode) => {
            console.log(barcode.rawValue);
            if (this.isValidISBN13(barcode.rawValue)) {
              this.stopVideo();
              return resolve(barcode.rawValue);
            }else{
              console.log("not isbn")
            }
          });
        }).catch((err) => {
          console.log(err);
        });
      }, 1000 / this.fps);
    })
  }
  //Google Books APIの呼び出し
  callGetApi(code) {
    GetApi.getgapi(code).then((text) => {
        this.inputText.value += text;
        alert("書籍情報を自動入力しました")
      })
      .catch((err) => {
        console.log(err)
        alert("書籍情報の取得に失敗しました\n" + err)
      })
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
//isbnが9784からはじまることの確認（日本の書籍）とチェックデジットの検算
  isValidISBN13(code) {
    if (!code) return false;
    if (13 != code.length) return false;
    if(Number(code.charAt(0)) !== 9) return false;
    if(Number(code.charAt(1)) !== 7) return false;
    if(Number(code.charAt(2)) !== 8) return false;
    if(Number(code.charAt(3)) !== 4) return false;
    var sum = 0;
    for (var i = 0; i < code.length; i++) {
      var num = Number(code.charAt(i));

      if (0 == (i % 2)) {
        sum += num;
      } else {
        sum += (num * 3);
      }
    }
    return (0 == (sum % 10));
  }

}

export default new ShapeDetection()
