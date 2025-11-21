import { gorunenIsim } from "./isimDuzeltme.js";
import { tarihFormat } from "./tarihFormati.js";

const searchBarConEl = document.querySelector(".searchbar-container");
const magnifierEl = document.querySelector(".magnifier");

magnifierEl.addEventListener("click",()=>{
    searchBarConEl.classList.toggle("active");

})


function searchBooks() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if(input.length < 1) {
        // input boşsa sonuçları gizle
        resultsDiv.style.display = 'none';
        return;
    }

    let kitaplar = JSON.parse(localStorage.getItem('kitaplar')) || [];

    let results = kitaplar.filter(k => 
        k.kitapAdi.toLowerCase().includes(input) ||
        k.yazarAdi.toLowerCase().includes(input) ||
        k.yayinEvi.toLowerCase().includes(input)
    );

    if(results.length === 0) {
        resultsDiv.innerHTML = '<p class="search-item">Sonuç bulunamadı.</p>';
    } else {
        resultsDiv.style.display = 'block';
        results.forEach(k => {
            resultsDiv.innerHTML += `
                <div class="search-item">
                    <strong>Kitap:</strong> ${gorunenIsim(k.kitapAdi)} <br>
                    <strong>Yazar:</strong> ${gorunenIsim(k.yazarAdi)} <br>
                    <strong>Yayınevi:</strong> ${gorunenIsim(k.yayinEvi)} <br>
                    <strong>Sayfa:</strong> ${k.sayfaSayi} <br>
                    ${tarihFormat(k.tarih)} 
                </div>
            `;
        });
    }
}

let input = document.getElementById('searchInput');
const micBtn = document.getElementById('micInput');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR'; // dil Türkçe
    recognition.interimResults = false;

    let isListening = false;
    micBtn.addEventListener('click', () => {
        if(!isListening){
            recognition.start();
            isListening= true;
            micBtn.classList.add('listening');
        }else{
            micBtn.classList.remove('listening');
            isListening = false;
            micBtn.classList.remove('listening');
        }

    });

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript.replace(/\.$/, '');
        input.value = transcript; // sesi inputa yaz
        searchBooks(); // senin search fonksiyonunu çağır
    });

    recognition.addEventListener('end', () => {
        // konuşma bittiğinde otomatik durur
        micBtn.classList.remove('listening');
        isListening = false;
    });

} else {
    micBtn.disabled = true;
    micBtn.title = "Tarayıcınız mikrofonu desteklemiyor.";
}

document.getElementById('searchInput').addEventListener("input",searchBooks)