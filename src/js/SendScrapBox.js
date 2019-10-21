import env from './env.js'

class SendSB {
  constructor(){
    this.submitButton = document.getElementById(env.SELECTOR_CREATE_BUTTON);
    this.inputProjectId = "";
    this.inputTitle = "";
    this.inputText = "";
  }
  addOnClick(){
    this.submitButton.addEventListener('click',()=> {
      this.SendScrapBox();
    });
  }

  setProjectId(projectId) {
    if (!projectId) {
      return;
    }
    localStorage.setItem(env.LOCALSTORAGE_PROJECT_ID, projectId);
  }
  SendScrapBox(){
    this.inputProjectId = document.getElementById(env.SELECTOR_INPUT_PROJECT_ID).value;
    this.inputTitle = document.getElementById(env.SELECTOR_INPUT_TITLE).value;
    this.inputText = document.getElementById(env.SELECTOR_INPUT_TEXT).value;
      alert(`https://scrapbox.io/${this.inputProjectId}/${this.inputTitle}?body=${this.inputText}`);
      this.setProjectId(this.inputProjectId);
      open(
        `https://scrapbox.io/${this.inputProjectId}/${this.inputTitle}?body=${encodeURIComponent(this.inputText)}`
      );
  }

}
export default new SendSB()
