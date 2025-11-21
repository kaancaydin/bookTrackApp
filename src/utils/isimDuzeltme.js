// utils/isimDuzeltme.js
export const gorunenIsim = (isim) => {
  if (!isim) return '-';
  
  // Önce hepsini küçük harf yap
  const kucukIsim = isim.toLowerCase();
  
  // Şimdi her kelimenin ilk harfini büyüt (Türkçe özel)
  return kucukIsim
    .split(' ')
    .map(kelime => {
      if (kelime.length === 0) return '';
      
      let ilkHarf = kelime.charAt(0);
      let geriKalan = kelime.slice(1);
      
      // Türkçe karakterler için özel dönüşüm
      const turkceBuyuk = {
        'i': 'İ',  // küçük i → İ
        'ı': 'I',  // küçük ı → I
        'ğ': 'Ğ',
        'ü': 'Ü', 
        'ş': 'Ş',
        'ö': 'Ö',
        'ç': 'Ç'
      };
      
      // İlk harfi Türkçe'ye uygun büyüt
      ilkHarf = turkceBuyuk[ilkHarf] || ilkHarf.toUpperCase();
      
      return ilkHarf + geriKalan;
    })
    .join(' ');
};

// İlk harfleri büyük gösterme
/*const gorunenIsim1 = yayin
    .split(" ")
    .map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1))
    .join(" "); */

/*const gorunenIsim = yayin.replace(/(^|[\s.])([a-z])/g, (match, onceki, harf) => {
    return onceki + harf.toUpperCase();});*/