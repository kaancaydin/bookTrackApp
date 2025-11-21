// components/TarihFiltre.jsx
import { useState } from 'react';
import { gorunenIsim } from "../utils/isimDuzeltme";
import { tarihFormat } from "../utils/tarihFormati";
import '../style/tarihFiltre.css'
import { useTranslation } from 'react-i18next';

export function TarihFiltre({ kitaplar }) {
  const [baslangic, setBaslangic] = useState('');
  const [bitis, setBitis] = useState('');
  const [filtrelenmisKitaplar, setFiltrelenmisKitaplar] = useState([]);
  const [istatistikler, setIstatistikler] = useState(null);
  const [sonuclariGoster, setSonuclariGoster] = useState(false);

  const { t } = useTranslation();

  const handleGoster = () => {    
    // Eğer sonuçlar zaten gösteriliyorsa, gizle
    if (sonuclariGoster) {
      setSonuclariGoster(false);
      setIstatistikler(null);
      setFiltrelenmisKitaplar([]);
      return;
    }

    // Sonuçlar gizliyse, filtreleme yap ve göster
    if (!baslangic || !bitis) {
      setIstatistikler({ hata: t("warnings.missingDate")});
      setSonuclariGoster(true);
      return;
    }

    const secilenKitaplar = kitaplar.filter(kitap => {
      return kitap.tarih >= baslangic && kitap.tarih <= bitis;
    });

    const toplamSayfa = secilenKitaplar.reduce((toplam, kitap) => {
      return toplam + Number(kitap.sayfa || 0);
    }, 0);

    const basTarih = new Date(baslangic);
    const bitTarih = new Date(bitis);
    const gunFarki = Math.ceil((bitTarih - basTarih) / (1000 * 60 * 60 * 24));
    const ortSayfa = gunFarki > 0 ? (toplamSayfa / gunFarki).toFixed(1) : 0;

    setFiltrelenmisKitaplar(secilenKitaplar);
    setIstatistikler({
      kitapSayisi: secilenKitaplar.length,
      toplamSayfa,
      gunFarki,
      ortSayfa
    });
    
    setSonuclariGoster(true);
    setBaslangic('');
    setBitis('');
  };

  return (
    <div className="tarih-div">
      <p className='baslikTarih'>{t("filterDate")}</p>
      
      <input 
        type="date" 
        className="date-input" 
        value={baslangic}
        onChange={(e) => setBaslangic(e.target.value)}
      />
      <input 
        type="date" 
        className="date-input" 
        value={bitis}
        onChange={(e) => setBitis(e.target.value)}
      />
      
      {/* TOGGLE BUTONU */}
      <button onClick={handleGoster} id="dateFilter">
        {sonuclariGoster ? t("buttons.hideList") : t("buttons.showList")}
      </button>

      {/* SONUÇLARI GÖSTERME - SADECE sonuclariGoster true ise göster */}
      {sonuclariGoster && (
        <div className="zaman-goster">
          {/* HATA MESAJI */}
          {istatistikler?.hata && (
            <div className='hataTarih'>{istatistikler.hata}</div>
          )}

          {/* İSTATİSTİKLER */}
          {istatistikler && !istatistikler.hata && (
            <div>
              <p className='bilgiTarih'>
                {t("totalBooks")}: {istatistikler.kitapSayisi}<br />
                {t("totalNum")}: {istatistikler.toplamSayfa} <br />
                {t("readTime")}: {istatistikler.gunFarki} {istatistikler.gunFarki > 1 ? t("days") : t("day")} <br />
                {t("avg")}: {istatistikler.ortSayfa} {t("page")}/{t("day")}
              </p>
              <hr />

              {/* FİLTRELENMİŞ KİTAPLAR */}
              {filtrelenmisKitaplar.map((kitap, index) => (
                <div key={index} className="zamanaGore">
                  <strong>{t("book")}:</strong> {gorunenIsim(kitap.kitapAdi)} <br />
                  <strong>{t("author")}:</strong> {gorunenIsim(kitap.yazar)} <br />
                  <strong>{t("totalNum")}:</strong> {kitap.sayfa} <br />
                  <strong>{t("date")}:</strong> {tarihFormat(kitap.tarih)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}