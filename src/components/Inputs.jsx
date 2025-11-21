import { useState } from "react";
import Swal from "sweetalert2";
import "../style/swallFire.css";
import { useTranslation } from "react-i18next";
export function Inputs({ onKitapEkle }) {
  const { t } = useTranslation();
  // State'leri tanımla
  const [kitapAdi, setKitapAdi] = useState("");
  const [yazar, setYazar] = useState("");
  const [sayfa, setSayfa] = useState("");
  const [yayinevi, setYayinevi] = useState("");
  const [tarih, setTarih] = useState("");

  // Ekleme fonksiyonu
  const handleEkle = () => {
    if (
      kitapAdi === "" ||
      yazar === "" ||
      tarih === "" ||
      sayfa === "" ||
      yayinevi === "" || sayfa < 1
    ) {
      Swal.fire({
        title: t("swallfire.incompInfo"),
        text: t("swallfire.fillFields"),
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
        background: "#710d0dff",
        customClass: {
          popup: "bildirim",
          title: "bildirim-yazisi",
        },
      });
      return;
    }
    // State'lerden değerleri al
    const yeniKitap = {
      kitapAdi: kitapAdi,
      yazar: yazar,
      sayfa: sayfa,
      yayinevi: yayinevi,
      tarih: tarih,
    };

    // Ana componente gönder
    onKitapEkle(yeniKitap);

    // Inputları temizle
    setKitapAdi("");
    setYazar("");
    setSayfa("");
    setYayinevi("");
    setTarih("");
  };

  return (
    <div className="input-div">
      <input
        type="text"
        className="input-kitap text-input"
        value={kitapAdi}
        onChange={(e) => setKitapAdi(e.target.value)}
        placeholder={t("placeholders.bookName")}
      />
      <input
        type="text"
        className="input-yazar text-input"
        value={yazar}
        onChange={(e) => setYazar(e.target.value)}
        placeholder={t("placeholders.authorName")}
      />
      <input
        type="number"
        className="input-sayfa text-input"
        value={sayfa}
        onChange={(e) => setSayfa(e.target.value)}
        placeholder={t("placeholders.pageNum")}
      />
      <input
        type="text"
        className="input-yayinevi text-input"
        value={yayinevi}
        onChange={(e) => setYayinevi(e.target.value)}
        placeholder={t("placeholders.publisher")}
      />
      <input
        type="date"
        className="input-tarih date-input"
        value={tarih}
        onChange={(e) => setTarih(e.target.value)}
      />
      <button className="input-ekle" onClick={handleEkle}>
        {t("buttons.add")}
      </button>
    </div>
  );
}
