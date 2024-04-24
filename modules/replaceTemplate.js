// Card Htm'ini alacak ve ürün vilgilerini alacak ve 
// kart html'ine değişken olarak tanımlanan alanlara 
//ürünün bilgileriini ekliyecek ve ürüne özel oluşan 
//kartı göndericek

const replaceTemplate = (cardTemplate, data) => {
    // htmlde değişken olan alanları güncelle
    let output = cardTemplate.replace(
      /%PRODUCTNAME%/g,
      data.productName
    )

    

    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%QUANTITY%}/g, data.quantity);
    output = output.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%ID%}/g , data.id); 
    output = output.replace(/{%DESCRIPTION%}/g , data.description); 
    output = output.replace(/{%NUTRIENTS%}/g , data.nutrients); 
    output = output.replace(/{%FROM%}/g , data.from); 


    //eğer ürün organik değilse not organic değişkeni yerine not_organic classını koy
    if(data.organic === false) {
        output = output.replace('{%NOT_ORGANIC%}' , 'not-organic');

    }

    //oluşturduğumuz html'i fonksiyonu çağırdığımız yere gönderecez
    return output;
};

//replaceTemplate isimli fonksiyonu 
//projedejki diğer js dosyalarından erişebilir hale getiriyoruz

module.exports = replaceTemplate ;