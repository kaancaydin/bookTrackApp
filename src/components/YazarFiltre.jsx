import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gorunenIsim } from "../utils/isimDuzeltme";

export function YazarFiltre({ kitaplar }) {
  const [sonuclariGoster, setSonuclariGoster] = useState(false);
  const [yazarIstatistikleri, setYazarIstatistikleri] = useState([]);

  const { t } = useTranslation();
  const handleGoster = () => {
    // Eğer sonuçlar zaten gösteriliyorsa, gizle
    if (sonuclariGoster) {
      setSonuclariGoster(false);
      return;
    }

    // Kitaplar yoksa
    if (kitaplar.length === 0) {
      setYazarIstatistikleri([]);
      setSonuclariGoster(true);
      return;
    }

    // Yazar istatistiklerini hesapla
    const yazarSayilari = {};
    const yazarSayfaSayilari = {};

    kitaplar.forEach(kitap => {
      const yazarAd = (kitap.yazar || "").trim().toLowerCase();

      yazarSayilari[yazarAd] = (yazarSayilari[yazarAd] || 0) + 1;
      yazarSayfaSayilari[yazarAd] = (yazarSayfaSayilari[yazarAd] || 0) + Number(kitap.sayfa || 0);
    });

    // Array'e çevir ve sırala
    const istatistikler = Object.keys(yazarSayilari).map(yazar => ({
      yazarAd: yazar,
      kitapSayisi: yazarSayilari[yazar],
      toplamSayfa: yazarSayfaSayilari[yazar]
    })).sort((a, b) => b.kitapSayisi - a.kitapSayisi); // Kitap sayısına göre sırala

    setYazarIstatistikleri(istatistikler);
    setSonuclariGoster(true);
  };

  return (
    <div className="yazar-div">
      <button onClick={handleGoster} id="yazarSay">
        {sonuclariGoster ? t("buttons.authorListHide") : t("buttons.authorList")}
      </button>

      {/* SONUÇLARI GÖSTERME */}
      {sonuclariGoster && (
        <div id="yazarSayilari">
          {/* KİTAP YOKSA */}
          {kitaplar.length === 0 && (
            <p className="ortakstil">{t("warnings.addBook")}</p>
          )}

          {/* KİTAP VARSA VE YAZAR İSTATİSTİKLERİ HESAPLANDIYSA */}
          {kitaplar.length > 0 && yazarIstatistikleri.length > 0 && (
            <div>
              {yazarIstatistikleri.map((istatistik, index) => (
                <div key={index} className="ortakstil">
                  <strong>{gorunenIsim(istatistik.yazarAd)}</strong>: {istatistik.kitapSayisi} {istatistik.kitapSayisi > 1 ? t("books") : t("book")}
                  <br />{t("totalNum")}: {istatistik.toplamSayfa}
                </div>
              ))}
            </div>
          )}

          {/* KİTAP VAR AMA HESAPLAMA YAPILMADIYSA */}
          {kitaplar.length > 0 && yazarIstatistikleri.length === 0 && (
            <p className="ortakstil">{t("warnings.authorStats")}</p>
          )}
        </div>
      )}
    </div>
  );
}