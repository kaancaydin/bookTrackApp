import "./App.css";
import Swal from "sweetalert2";
import "./style/swallFire.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Inputs } from "./components/Inputs";
import { KitapListesi } from "./components/KitapListesi";
import { TarihFiltre } from "./components/TarihFiltre";
import { YazarFiltre } from "./components/YazarFiltre";
import { YayinFiltre } from "./components/YayinFiltre";
import { Searchbar } from "./components/Searchbar";
import { gorunenIsim } from "./utils/isimDuzeltme";
import { useTranslation } from "react-i18next";

function App() {
  const [kitaplar, setKitaplar] = useState([]);
  const [listeyiGoster, setListeyiGoster] = useState(false);

  const { t } = useTranslation();
  // Sayfa yüklendiğinde localStorage'dan kitapları al
  useEffect(() => {
    const kayitliKitaplar = localStorage.getItem("kitaplar");
    if (kayitliKitaplar) {
      setKitaplar(JSON.parse(kayitliKitaplar));
    }
  }, []);

  const kitapEkle = (yeniKitap) => {
    const yeniKitaplar = [...kitaplar, yeniKitap];
    setKitaplar(yeniKitaplar);
    localStorage.setItem("kitaplar", JSON.stringify(yeniKitaplar));
    Swal.fire({
      title: t("swallfire.added"),
      text: t("swallfire.bookAdded",{bookName: gorunenIsim(yeniKitap.kitapAdi)}),
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      position: "top-end",
      toast: true,
      background: "#074c18ff",
      customClass: {
        popup: "bildirim",
        title: "bildirim-yazisi",
      },
    });
  };
  const kitapSil = (silinecekKitap) => {
    const yeniKitaplar = kitaplar.filter(
      (kitap) =>
        !(
          kitap.kitapAdi === silinecekKitap.kitapAdi &&
          kitap.yazar === silinecekKitap.yazar
        )
    );
    setKitaplar(yeniKitaplar);
    localStorage.setItem("kitaplar", JSON.stringify(yeniKitaplar));
  };

  const kitapGuncelle = (eskiKitap, yeniBilgiler) => {
    const yeniKitaplar = kitaplar.map((kitap) => {
      if (
        kitap.kitapAdi === eskiKitap.kitapAdi &&
        kitap.yazar === eskiKitap.yazar
      ) {
        return {
          ...kitap,
          kitapAdi: yeniBilgiler.kitapAdi,
          yazar: yeniBilgiler.yazar,
          sayfa: yeniBilgiler.sayfa,
          yayinevi: yeniBilgiler.yayinevi,
        };
      }
      return kitap;
    });

    setKitaplar(yeniKitaplar);
    localStorage.setItem("kitaplar", JSON.stringify(yeniKitaplar));
  };

  const tumunuSil = () => {
    Swal.fire({
      title: t("swallfire.sure"),
      text: t("swallfire.sureText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2e76b8ff",
      confirmButtonText: t("swallfire.yes"),
      cancelButtonText: t("swallfire.no"),
      backdrop: true,
      padding: "2em",
      width: "500px",
      customClass: {
        popup: "my-swal-popup",
        title: "my-swal-title",
        confirmButton: "my-swal-confirm",
        cancelButton: "my-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("kitaplar");
        setKitaplar([]);
        Swal.fire({
          title: t("swallfire.deleted"),
          text: t("swallfire.deletedAll"),
          icon: "success",
          customClass: {
            popup: "temali-popup",
            title: "temali-baslik",
            htmlContainer: "temali-icerik",
            confirmButton: "temali-buton",
          },
          buttonsStyling: false, // Varsayılan stilleri kapat
        });
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="container-right">
          <Inputs onKitapEkle={kitapEkle} />
          <Searchbar kitaplar={kitaplar} />

          {/* Listeyi Göster/Gizle Butonu */}
          <div className="liste-div">
            <button
              onClick={() => setListeyiGoster(!listeyiGoster)}
              className="input-liste"
            >
              {listeyiGoster ? t("buttons.hideList") : t("buttons.showList")}
            </button>

            {/* Kitap Listesi */}
            {listeyiGoster && (
              <KitapListesi
                kitaplar={kitaplar}
                kitapSil={kitapSil}
                kitapGuncelle={kitapGuncelle}
                tumunuSil={tumunuSil}
              />
            )}
          </div>
        </div>
        <div className="container-left">
          <TarihFiltre kitaplar={kitaplar} />
          <YazarFiltre kitaplar={kitaplar} />
          <YayinFiltre kitaplar={kitaplar} />
        </div>
      </div>
    </div>
  );
}

export default App;
