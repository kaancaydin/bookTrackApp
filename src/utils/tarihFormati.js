/*export function tarihFormat(tarih){
    const [ y,m,d ] = tarih.split("-");
    return `${d}.${m}.${y}`;
}*/

import i18n from "../i18n"

const localeMap = {
  tr : "tr-TR",
  en : "en-GB"
  //gelecekte eklenecek diller buraya gelecek
}

export function tarihFormat(tarihStr) {
  const tarih = new Date(tarihStr);
  const  locale = localeMap[i18n.language] || "tr-TR"; //falback TR
  return tarih.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
/*
export function formatKayit(tarih) {
  const [d, m, y] = tarih.split(".");
  return `${y}-${m}-${d}`;
} */

// tarihFormatla.js
/*export function tarihFormat(tarih, tip = "goster") {
    if (!tarih) return "";

    if (tip === "goster") {
        const dt = new Date(tarih);
        return dt.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
    } else if (tip === "kayit") {
        // Eğer güncelleme sırasında dolu metin gelirse yyyy-mm-dd formatına çevir
        const dt = new Date(tarih);
        return dt.toISOString().slice(0, 10);
    }
}*/

