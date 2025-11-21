// components/YayineviSay.jsx
import { useState } from 'react';
import { gorunenIsim } from "../utils/isimDuzeltme";
import '../style/yayineviFiltre.css'
import { useTranslation } from 'react-i18next';

export function YayinFiltre({ kitaplar }) {
  const [sonuclariGoster, setSonuclariGoster] = useState(false);
  const [yayineviIstatistikleri, setYayineviIstatistikleri] = useState([]);

  const { t } = useTranslation();
  
  const handleGoster = () => {
    // Eğer sonuçlar zaten gösteriliyorsa, gizle
    if (sonuclariGoster) {
      setSonuclariGoster(false);
      return;
    }

    // Kitaplar yoksa
    if (kitaplar.length === 0) {
      setYayineviIstatistikleri([]);
      setSonuclariGoster(true);
      return;
    }

    // Yayınevi istatistiklerini hesapla
    const yayineviSayilari = {};
    const yayineviSayfaToplam = {};

    kitaplar.forEach(kitap => {
      const yayinEvi = (kitap.yayinevi || "").trim().toLowerCase();

      yayineviSayilari[yayinEvi] = (yayineviSayilari[yayinEvi] || 0) + 1;
      yayineviSayfaToplam[yayinEvi] = (yayineviSayfaToplam[yayinEvi] || 0) + Number(kitap.sayfa || 0);
    });

    // Array'e çevir ve sırala
    const istatistikler = Object.keys(yayineviSayilari).map(yayinevi => ({
      yayineviAd: yayinevi,
      kitapSayisi: yayineviSayilari[yayinevi],
      toplamSayfa: yayineviSayfaToplam[yayinevi]
    })).sort((a, b) => b.kitapSayisi - a.kitapSayisi); // Kitap sayısına göre sırala

    setYayineviIstatistikleri(istatistikler);
    setSonuclariGoster(true);
  };

  return (
    <div className="yayin-div">
      <button onClick={handleGoster} className="yayinevi-btn" id="yayinevi-btn">
        {sonuclariGoster ? t("buttons.publisherListHide") : t("buttons.publisherList")}
      </button>

      {/* SONUÇLARI GÖSTERME */}
      {sonuclariGoster && (
        <div id="yayineviSayisi">
          {/* KİTAP YOKSA */}
          {kitaplar.length === 0 && (
            <p className="ortakstil">{t("warnings.addBook")}</p>
          )}

          {/* KİTAP VARSA VE YAYINEVİ İSTATİSTİKLERİ HESAPLANDIYSA */}
          {kitaplar.length > 0 && yayineviIstatistikleri.length > 0 && (
            <div>
              {yayineviIstatistikleri.map((istatistik, index) => (
                <div key={index} className="ortakstil">
                  <strong>{gorunenIsim(istatistik.yayineviAd)}</strong>: {istatistik.kitapSayisi} {istatistik.kitapSayisi > 1 ? t("books") : t("book")}
                  <br />{t("totalNum")}: {istatistik.toplamSayfa}
                </div>
              ))}
            </div>
          )}

          {/* KİTAP VAR AMA HESAPLAMA YAPILMADIYSA */}
          {kitaplar.length > 0 && yayineviIstatistikleri.length === 0 && (
            <p className="ortakstil">{t("warnings.publisherStats")}</p>
          )}
        </div>
      )}
    </div>
  );
}