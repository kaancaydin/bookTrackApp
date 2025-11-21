import "../style/searchbar.css";
import magIcon from "../../public/magnifier.svg";
import micIcon from "../../public/mic.svg";

import { useTranslation } from "react-i18next";

// components/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { gorunenIsim } from "../utils/isimDuzeltme";
import { tarihFormat } from "../utils/tarihFormati";

export function Searchbar({ kitaplar }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const { t } = useTranslation();

  // Speech Recognition initialization
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "tr-TR";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;

      // Ses tanıma sonucu
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.replace(/\.$/, "");

        setSearchInput(transcript);
        searchBooks(transcript);
        setIsListening(false);
      };

      // Ses tanıma hatası
      recognitionRef.current.onerror = (event) => {
        console.error("Ses tanıma hatası: ", event.error);
        setIsListening(false);

        if (event.error === "not-allowed") {
          alert("Mikrofon erişimine izin vermeniz gerekiyor.");
        }
      };

      // Ses tanıma bittiğinde
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Bu tarayıcı ses tanımayı desteklemiyor.");
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, );

  // Arama fonksiyonu
  const searchBooks = (input) => {
    if (input.length < 1) {
      setSearchResults([]);
      return;
    }

    const results = kitaplar.filter(
      (kitap) =>
        kitap.kitapAdi.toLowerCase().includes(input.toLowerCase()) ||
        kitap.yazar.toLowerCase().includes(input.toLowerCase()) ||
        kitap.yayinevi.toLowerCase().includes(input.toLowerCase())
    );

    setSearchResults(results);
  };

  // Input değişikliğinde arama yap
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    searchBooks(value);
  };

  // SearchBar'ı aç/kapa
  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchInput("");
      setSearchResults([]);
    }
  };

  // Sesli arama fonksiyonu
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("Tarayıcınız sesli aramayı desteklemiyor.");
      return;
    }

    if (isListening) {
      // Dinleme durdur
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Dinlemeye başla
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Ses tanıma başlatılamadı: ", error);
        setIsListening(false);
      }
    }
  };

  return (
    <>
      {/* SEARCH BAR CONTAINER */}
      <div className={`searchbar-container ${searchActive ? "active" : ""}`}>
        <img
          src={magIcon}
          alt="magnifier"
          className="magnifier"
          onClick={toggleSearch}
        />
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          className="input"
          placeholder={t("placeholders.search")}
        />
        <img
          src={micIcon}
          alt="mic-icon"
          className={`mic-icon ${isListening ? "listening" : ""}`}
          onClick={handleVoiceSearch}
          title={isListening ? "Dinleniyor..." : "Sesli arama"}
        />
      </div>

      {/* DİNLENİYOR MESAJI */}
      {isListening && (
        <div
          className="mic"
        >
          {t("mic.micSpeak")}
        </div>
      )}

      {/* SEARCH RESULTS */}
      {searchResults.length > 0 && (
        <div id="searchResults">
          {searchResults.map((kitap, index) => (
            <div key={index} className="search-item">
              <strong>Kitap:</strong> {gorunenIsim(kitap.kitapAdi)} <br />
              <strong>Yazar:</strong> {gorunenIsim(kitap.yazar)} <br />
              <strong>Yayınevi:</strong> {gorunenIsim(kitap.yayinevi)} <br />
              <strong>Sayfa:</strong> {kitap.sayfa} <br />
              {tarihFormat(kitap.tarih)}
            </div>
          ))}
        </div>
      )}

      {/* SONUÇ BULUNAMADI */}
      {searchInput.length >= 1 && searchResults.length === 0 && (
        <div id="searchResults">
          <p className="search-item"> 
              {t("mic.micResult",{searchResult: searchInput})}
          </p>
        </div>
      )}
    </>
  );
}
