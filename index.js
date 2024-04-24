//modülü dosyaya çağırma
const http = require('http');
const fs = require('fs');
const url = require('url');

//farklı dosyadan export edilen fonksiyonu burayya çağırdım
const replaceTemplate = require('./modules/replaceTemplate');




//! API 

//gelen istekleri izler
//ve cevap gönderir


/* 

   *  createServer metoduna verdiğimiz dinleyici fonksiyon
   tetiklendiyse bir api isteği gelmiştir

   *bu dinleyici fonksiyon 2 parametre alır
   1) request > gelen istek
   2) response > gönderilecek cevap

   * biz gelen isteğe cevap göndermeliyiz 
   *res.end("") < client a cevap göndermeye yarar

*/



/* 
//ROUTİNG
*API a gelen isteğin hangi uç noktaya geldiğini tespit 
edip ona göre cevap gönderme 
*routing için client ın hangi yola istek aattığını ve
hangi http metodunu kullandığını bilmemiz gerekiyor

*/


// html şablon verilerine eriş
let tempOverview = fs.readFileSync(
   './templates/template-overview.html'
   , 'utf-8');

let tempProduct = fs.readFileSync(
   './templates/template-product.html'
   , 'utf-8');

let tempCard = fs.readFileSync(
   './templates/template-card.html'
   , 'utf-8');

//json formatında
let data = fs.readFileSync('./dev-data/data.json', 'utf-8');

//js formatına çevir
const dataObj = JSON.parse(data);




const server = http.createServer((req, res) => {
       //url li parçalara ayırdık
   const { pathname, query } = url.parse(req.url , true);

switch (pathname) {
      //ANASAYFA
      case '/overview':
         //meyveler dizisini dönecez ve her bir meyve için 
         //meveye özel bir kart html'i oluştur
         const cardHTML = dataObj.map((el) =>
            replaceTemplate(tempCard, el));
         //Anasayfa template 'indeki kartlar alanına kart html ini ekle
         // {%PRODUCT_CARDS%}  ile tanımlanan alanın yerine ürün kart html ini koy

         tempOverview = tempOverview.replace(
            '{%PRODUCT_CARDS%}',
            cardHTML
         );


         return res.end(tempOverview);


       // ürün detay sayfası
    case '/product':

      // 1) diziden doğru elemanı bul
      const item = dataObj.find((item) => item.id == query.id);

      // 2) template'i bulunan elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct, item);

      // 3) güncel template'i client'a gönder
      return res.end(output);

    default:
      return res.end('Aradaiginiz sayfa bulunamadi');
  }
});












/*
 bir dinleyici oluşturup  
 hangi adrese gelen istekleri 
 dinleyeceğimizi söylemeliyiz
*/


server.listen(4000, '127.0.0.1', () => {
   //dinleme işlemine başlandığı zaman tetiklenir
   console.log('4000. porta gelen istekler dinlenmeye başlandı');

});