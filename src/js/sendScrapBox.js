import env from './env.js'

function sendScrapBox(){
  let SBprojectId = document.getElementById(env.SELECTOR_INPUT_PROJECT_ID).value;
  let SBtitle = document.getElementById(env.SELECTOR_INPUT_TITLE).value;
  let SBbody = document.getElementById(env.SELECTOR_INPUT_TEXT).value;
  alert(`https://scrapbox.io/${SBprojectId}/${SBtitle}?body=${SBbody}`);
  open(
  `https://scrapbox.io/${SBprojectId}/${SBtitle}?body=${encodeURIComponent(SBbody)}`
);
}
window.sendScrapBox = sendScrapBox;
