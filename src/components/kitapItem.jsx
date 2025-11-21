// components/KitapItem.jsx
import { useState } from "react";
import { gorunenIsim } from "../utils/isimDuzeltme";
import { tarihFormat } from "../utils/tarihFormati";
import Swal from "sweetalert2";
import "../style/swallFire.css";
import '../style/kitapDuzenleme.css'

import { useTranslation } from "react-i18next";

export function KitapItem({ kitap, kitapSil, kitapGuncelle }) {
  const { t } = useTranslation(); 

  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [guncelVeri, setGuncelVeri] = useState({ ...kitap });

  const handleGuncelle = () => {
    // Boş alan kontrolü
    if (
      !guncelVeri.kitapAdi ||
      !guncelVeri.yazar ||
      !guncelVeri.sayfa ||
      !guncelVeri.yayinevi ||guncelVeri.sayfa < 1
    ) {
      Swal.fire({
        title: t("swallfire.incompInfo"),
        text: t("swallfire.fillFields"),
        icon: "error",
        showConfirmButton: false,
        timer: 4000,
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

    // Değişiklik kontrolü
    if (
      guncelVeri.kitapAdi === kitap.kitapAdi &&
      guncelVeri.yazar === kitap.yazar &&
      guncelVeri.sayfa === kitap.sayfa &&
      guncelVeri.yayinevi === kitap.yayinevi
    ) {
      Swal.fire({
        title: t("swallfire.noChange"),
        text: t("swallfire.noChangeText"),
        icon: "question",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
        background: "#d9cd21ff",
        customClass: {
          popup: "bildirim",
          title: "bildirim-yazisi",
        },
      });
      return;
    }

    Swal.fire({
      title: t("swallfire.updated"),
      text: t("swallfire.updatedText",{bookName: gorunenIsim(guncelVeri.kitapAdi)}),
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      position: "top-end",
      toast: true,
      background: "#2e76b8ff",
      customClass: {
        popup: "my-swal-popup",
        title: "my-swal-title",
      },
    });

    kitapGuncelle(kitap, guncelVeri);
    setDuzenlemeModu(false);
  };

  const handleSil = () => {
    Swal.fire({
      title: t("swallfire.sure"),
      text: t("swallfire.deleteOne",{bookName:gorunenIsim(kitap.kitapAdi)}),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2e76b8ff",
      confirmButtonText: t("swallfire.yes"),
      cancelButtonText: t("swallfire.sure"),
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
        kitapSil(kitap);
        Swal.fire({
          title: t("swallfire.deleted"),
          text: t("swallfire.deletedOne",{bookName:gorunenIsim(kitap.kitapAdi)}),
          icon: "success",
          customClass: {
            popup: "temali-popup",
            title: "temali-baslik",
            htmlContainer: "temali-icerik",
            confirmButton: "temali-buton",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  if (duzenlemeModu) {
    return (
      <div className="kitap duzenleme-modu">
        <input
          value={guncelVeri.kitapAdi}
          onChange={(e) =>
            setGuncelVeri({ ...guncelVeri, kitapAdi: e.target.value })
          }
          className="kitap-adi"
        />
        <input
          value={guncelVeri.yazar}
          onChange={(e) =>
            setGuncelVeri({ ...guncelVeri, yazar: e.target.value })
          }
          className="yazar-adi"
        />
        <div className="kitap-sayfa">
          <input
            type="number"
            value={guncelVeri.sayfa}
            onChange={(e) =>
              setGuncelVeri({ ...guncelVeri, sayfa: e.target.value })
            }
            className="sayfa-sayi sayfa-duzen"
          />
          <span>{kitap.sayfa > 1 ? t("pages") : t("page")}</span>
        </div>
        <input
          value={guncelVeri.yayinevi}
          onChange={(e) =>
            setGuncelVeri({ ...guncelVeri, yayinevi: e.target.value })
          }
          className="yayin-evi yayin-duzen"
        />
        <div className="tarih kitap-kisim">{tarihFormat(kitap.tarih)}</div>
        <button onClick={() => setDuzenlemeModu(false)}>{t("buttons.cancel")}</button>
        <button onClick={handleGuncelle} className="guncelle">
          {t("buttons.update")}
        </button>
      </div>
    );
  }

  return (
    <div className="kitap">
      <h2 className="kitap-adi kitap-kisim">{gorunenIsim(kitap.kitapAdi)}</h2>
      <p className="yazar-adi kitap-kisim">{gorunenIsim(kitap.yazar)}</p>
      <div className="kitap-sayfa">
        <span className="sayfa-sayi">{kitap.sayfa} </span>
        <span>{kitap.sayfa > 1 ? t("pages") : t("page")}</span>
      </div>
      <p className="yayin-evi kitap-kisim">{gorunenIsim(kitap.yayinevi)}</p>
      <p className="tarih kitap-kisim">{tarihFormat(kitap.tarih)}</p>
      <button onClick={handleSil} className="sil">
        {t("buttons.delete")}
      </button>
      <button onClick={() => setDuzenlemeModu(true)} className="guncelle">
        {t("buttons.edit")}
      </button>
    </div>
  );
}
