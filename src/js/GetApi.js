import env from './env.js'
const axios = require('axios');

class GetApi {
  getgapi(isbn) {
    return new Promise((resolve,reject) => {

      let baseurl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
      let text = "";
      axios.get(baseurl + isbn).then(response => {
        if (!this.consistData(response.data.items)) {
          reject("Google Booksに登録されていないISBNです");
        } else {
          let item = response.data.items[0].volumeInfo;
          text = "タイトル:" + item.title + "\n著者:" + item.authors;

          if (this.consistData(item.publishedDate)) {
            //発行日あり
            text += "\n発行日:" + item.publishedDate;
          }
          if (this.consistData(item.description)) {
            //descriptionあり
            text += "\n説明:" + item.description;
          }
          if (this.consistData(item.industryIdentifiers[1].identifier)) {
            //ISBN13あり
            text += "\nISBN:" + item.industryIdentifiers[1].identifier;
          }
          if (this.consistData(item.description)) {
            //descriptionあり
            text += "\n説明:" + item.description;
          }
          if (this.consistData(item.imageLinks)) {
            if (this.consistData(item.imageLinks.thumbnail)) {
              //thumbnailあり
              text += "\n[" + item.imageLinks.thumbnail + ".png]";
            }
          }
        }
        resolve(text);
      })
    });
  }

  consistData(data) {
    if (data !== null && typeof(data) !== "undefined") return true;
  }
}
export default new GetApi()
