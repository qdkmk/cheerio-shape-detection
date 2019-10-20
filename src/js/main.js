import SendSB from './SendScrapBox.js'
import GetApi from './GetApi.js'
import ShareTarget from './ShareTarget.js'
import ShapeDetection from './ShapeDetection.js'
import env from './env.js'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function() {
    console.log('サービスワーカーの登録成功');
  }).catch(function(err) {
    console.log('サービスワーカーの登録ができませんでした：', err);
  });
}
ShareTarget.setInputValue();
SendSB.addOnClick();

document.getElementById(env.VIDEO_STOP).addEventListener('click', () => {
  ShapeDetection.stopVideo();
});
document.getElementById(env.VIDEO_START).addEventListener('click', () => {
  ShapeDetection.startBtnClick();
});
