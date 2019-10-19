import env from './env.js'
const axios = require('axios');
//let cheerio = require('cheerio');
//import client from '../../node_modules/cheerio-httpcli';
class GetApi{
  //let url = "https://webcatplus.nii.ac.jp/webcatplus/details/book/isbn/9784766108958.html";
  //let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:9784043636037"

  //const TARGET_SELECTOR = "td.mcl-mainPart .wcp-sElements-002 div.table-C td";

  /*
  axios.get(url).then(response=>{
    console.log(response.data);
    console.log(response.data.items);
    let items = response.data.items;
    console.log("タイトル" + items[0].volumeInfo.title);
    console.log("著者" + items[0].volumeInfo.authors[0]);
    console.log("pubdate" + items[0].volumeInfo.publishedDate);
    console.log("desc" + items[0].volumeInfo.description);
    let title = document.getElementsByClassName("title")[0];
    title.innerHTML = "タイトル" + items[0].volumeInfo.title
  })
  */


  getgapi(isbn){
    let baseurl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
    let text = document.getElementById(env.SELECTOR_INPUT_TEXT);
    axios.get(baseurl + isbn).then(response=>{
      let items = response.data.items;
      alert("getgapi内部から")
      //let text = document.getElementById(env.SELECTOR_INPUT_TEXT);
      if(typeof(items[0].volumeInfo.description) === "undefined" || items[0].volumeInfo.description === null){
        text.value = "タイトル:" + items[0].volumeInfo.title + "\n著者:" + items[0].volumeInfo.authors[0];
        alert("getgapi内部からif:" + env.SELECTOR_INPUT_TEXT)
        alert(items[0].volumeInfo.title)
      }else{
        text.value = "タイトル:" + items[0].volumeInfo.title + "\n著者:" + items[0].volumeInfo.authors[0] + "\n説明:" + items[0].volumeInfo.description;
        alert("getgapi内部からelse")
      }

    })
  }



  /*
  axios(url)
    .then(({ data }) => {
        const content = getContent(data);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ content: content })
        });
    })
    */

  //function getContent(html) {
      //const $ = cheerio.load(html);
      //const content = $('{TARGET_SELECTOR}').text();
      //console.log('Content: ', content);
      //return content;
  //}

}
export default new GetApi()
