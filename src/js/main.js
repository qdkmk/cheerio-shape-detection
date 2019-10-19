if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function() {
    console.log('サービスワーカーの登録成功');
  }).catch(function(err) {
    console.log('サービスワーカーの登録ができませんでした：', err);
  });
}
