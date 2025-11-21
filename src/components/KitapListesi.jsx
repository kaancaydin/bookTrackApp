// components/KitapListesi.jsx
import { KitapItem } from "./kitapItem";

import { useTranslation } from "react-i18next";

export function KitapListesi({ kitaplar, kitapSil, kitapGuncelle, tumunuSil }) {
  const { t } = useTranslation();
  // Eğer kitap yoksa
  if (kitaplar.length === 0) {
    return <p className="kitap">{t("warnings.addBook")}</p>;
  }

  return (
    <div>
      {/* Açıklama yazısı */}
      <p className="kitap"> {t("warnings.explanation")}</p>

      {/* Kitapları listele */}
      {kitaplar.map((kitap, index) => (
        <div className="liste">
          <KitapItem
            key={index}
            kitap={kitap}
            kitapSil={kitapSil}
            kitapGuncelle={kitapGuncelle}
          />
        </div>
      ))}

      {/* Tümünü sil butonu */}
      {kitaplar.length > 0 && (
        <button id="tumunuSil" onClick={tumunuSil}>
          {t("buttons.deleteAll")}
        </button>
      )}
    </div>
  );
}
