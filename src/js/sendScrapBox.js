function sendScrapBox(){
  let SBprojectId = document.getElementById('js-shared-projectId').value;
  let SBtitle = document.getElementById('js-shared-title').value;
  let SBbody = document.getElementById('js-shared-text').value;
  alert(`https://scrapbox.io/${SBprojectId}/${SBtitle}?body=${SBbody}`);
  open(
  `https://scrapbox.io/${SBprojectId}/${SBtitle}?body=${encodeURIComponent(SBbody)}`
);
}
window.sendScrapBox = sendScrapBox;
