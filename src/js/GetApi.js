import env from './env.js'
const axios = require('axios');

class GetApi {
  getgapi(isbn) {
    let baseurl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
    let text = document.getElementById(env.SELECTOR_INPUT_TEXT);
    axios.get(baseurl + isbn).then(response => {
        let item = response.data.items[0].volumeInfo;
        text.value = "タイトル:" + item.title + "\n著者:" + item.authors;

        if (this.consistData(item.publishedDate)) {
          //発行日あり
          text.value += "\n発行日:" + item.publishedDate;
        }
        if (this.consistData(item.description)) {
          //descriptionあり
          text.value += "\n説明:" + item.description;
        }
        if (this.consistData(item.industryIdentifiers[1].identifier)) {
          //ISBN13あり
          text.value += "\nISBN:" + item.industryIdentifiers[1].identifier;
        }
        if (this.consistData(item.description)) {
          //descriptionあり
          text.value += "\n説明:" + item.description;
        }
        if (this.consistData(item.imageLinks)) {
          if (this.consistData(item.imageLinks.thumbnail)) {
              //thumbnailあり
              text.value += "\n[" + item.imageLinks.thumbnail + ".png]";
            }
          }
        })
    }

    consistData(data) {
      if (data !== null && typeof(data) !== "undefined") return true;
    }
  }
  export default new GetApi()
