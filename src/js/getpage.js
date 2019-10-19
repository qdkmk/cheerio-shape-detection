const axios = require('axios');
//let cheerio = require('cheerio');
//import client from '../../node_modules/cheerio-httpcli';

//let url = "https://webcatplus.nii.ac.jp/webcatplus/details/book/isbn/9784766108958.html";
let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:9784043636037"
let baseurl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
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

function getgapi(isbn){
  axios.get(baseurl + isbn).then(response=>{
    let items = response.data.items;
    let text = document.getElementById("js-shared-text");
    if(typeof(items[0].volumeInfo.description) === "undefined" || items[0].volumeInfo.description === null){
      text.innerHTML = "タイトル:" + items[0].volumeInfo.title + "\n著者:" + items[0].volumeInfo.authors[0];
    }else{
      text.innerHTML = "タイトル:" + items[0].volumeInfo.title + "\n著者:" + items[0].volumeInfo.authors[0] + "\n説明:" + items[0].volumeInfo.description;
    }

  })
}

window.getgapi = getgapi;

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
