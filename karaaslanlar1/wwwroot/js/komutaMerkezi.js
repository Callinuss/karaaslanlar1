// wwwroot/js/komutaMerkezi.js

var map = L.map('turkiyeHaritasi').setView([39.0, 35.0], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

// GOOGLE TRAFİK KATMANI
var googleTrafficLayer = L.tileLayer('https://mt1.google.com/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google Trafik Ağı'
});
var trafikAcikMi = false;

function trafikGoster() {
    var btn = document.getElementById("btnTrafik");
    if (!trafikAcikMi) {
        map.addLayer(googleTrafficLayer);
        trafikAcikMi = true;
        btn.innerHTML = "Trafiği Kapat";
    } else {
        map.removeLayer(googleTrafficLayer);
        trafikAcikMi = false;
        btn.innerHTML = "Canlı Trafik";
    }
}

// Marker İkon Setleri
var depremIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
var yanginIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
var selIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
var iotNormalIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [1, -30] });
var iotAlarmIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [28, 45], iconAnchor: [14, 45], popupAnchor: [1, -40] });
var toplanmaIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
var karargahIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });

// 🔮 SAHA EKİPLERİ İÇİN ÖZEL MOR (VIOLET) İKON - Tüm kriz renklerinden tamamen ayrıştı!
var canliSahaIkonu = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [26, 42],
    iconAnchor: [13, 42],
    popupAnchor: [1, -36]
});

var afetLayer = L.layerGroup().addTo(map);
var toplanmaLayer = L.layerGroup().addTo(map);
var iotLayer = L.layerGroup().addTo(map);
var efektLayer = L.layerGroup().addTo(map);
var karargahLayer = L.layerGroup().addTo(map);

// AFAD MERKEZLERİ VERİLERİ
var koordinasyonMerkezleri = [
    { ad: "Gaziantep İl AFAD Müdürlüğü", enlem: 37.1421, boylam: 37.3881, adres: "Göktürk Mah. 150150. Cadde 44/B, Şehitkamil", tel: "0342 336 26 92" },
    { ad: "Hatay İl AFAD Yönetim Merkezi", enlem: 36.3682, boylam: 36.2251, adres: "Serinyol 20. Sk. No:1/1, Antakya", tel: "0326 233 20 20" },
    { ad: "K.Maraş İl AFAD Müdürlüğü", enlem: 37.5061, boylam: 36.9925, adres: "Karacasu Mamaraş, 84041. Sk. No: 41", tel: "0344 224 14 14" },
    { ad: "Adıyaman İl AFAD Müdürlüğü", enlem: 37.7637, boylam: 38.2786, adres: "İmamağa, Atatürk Bulv. No:175", tel: "0416 216 12 31" }
];

var sehirKoordinatSözlugu = {
    gaziantep: { merkez: [37.0662, 37.3833], afad: { ad: "Gaziantep İl AFAD Müdürlüğü", enlem: 37.1421, boylam: 37.3881, adres: "Göktürk Mah. 150150. Cadde 44/B, Şehitkamil", tel: "0342 336 26 92" }, alan: { isim: "Şahinbey Parkı Toplanma Alanı", enlem: 37.0420, boylam: 37.3510, kapasite: "4.500 Kişi", imkanlar: "Çadır Sahası, Mobil Mutfak", adres: "Yeditepe Mah." } },
    hatay: { merkez: [36.2023, 36.1613], afad: { ad: "Hatay İl AFAD Yönetim Merkezi", enlem: 36.3682, boylam: 36.2251, adres: "Serinyol 20. Sk. No:1/1, Antakya", tel: "0326 233 20 20" }, alan: { isim: "Antakya Stadyumu Yanı Sahra Alanı", enlem: 36.2150, boylam: 36.1720, kapasite: "8.000 Kişi", imkanlar: "Sahra Hastanesi, İletişim", adres: "Saraykent Mah." } },
    kahramanmaras: { merkez: [37.5744, 36.9372], afad: { ad: "K.Maraş İl AFAD Müdürlüğü", enlem: 37.5061, boylam: 36.9925, adres: "Karacasu Mamaraş, 84041. Sk. No: 41", tel: "0344 224 14 14" }, alan: { isim: "Atatürk Parkı Güvenli Bölge", enlem: 37.5680, boylam: 36.9290, kapasite: "6.000 Kişi", imkanlar: "Barınma Kapsülleri, Sahra WC", adres: "Fevzi Çakmak Mah." } },
    adiyaman: { merkez: [37.7639, 38.2778], afad: { ad: "Adıyaman İl AFAD Müdürlüğü", enlem: 37.7637, boylam: 38.2786, adres: "İmamağa, Atatürk Bulv. No:175", tel: "0416 216 12 31" }, alan: { isim: "Eğriçay Parkı Lojistik Merkezi", enlem: 37.7550, boylam: 38.2778, kapasite: "5.000 Kişi", imkanlar: "Su Depoları, Erzak Deposu", adres: "Sümerevler Mah." } },
    istanbul: { merkez: [41.0082, 28.9784], afad: { ad: "İstanbul AFAD Merkez Komuta", enlem: 41.0855, boylam: 28.8211, adres: "Bakırköy", tel: "0212 455 56 00" }, alan: { isim: "Maltepe Sahil Etkinlik Alanı", enlem: 40.9250, boylam: 29.1210, kapasite: "50.000 Kişi", imkanlar: "Tam Teşekküllü Lojistik", adres: "Sahil Şeridi" } },
    ankara: { merkez: [39.9334, 32.8597], afad: { ad: "Ankara AFAD Başkanlığı", enlem: 39.8970, boylam: 32.7410, adres: "Dumlupınar Bulvarı, Çankaya", tel: "0312 258 23 23" }, alan: { isim: "Atatürk Orman Çiftliği Sahası", enlem: 39.9410, boylam: 32.7950, kapasite: "30.000 Kişi", imkanlar: "Lojistik Merkez, Sahra Mutfak", adres: "Emniyet Mah." } },
    izmir: { merkez: [38.4192, 27.1287], afad: { ad: "İzmir İl AFAD Komuta Merkezi", enlem: 38.4410, boylam: 27.1980, adres: "Anadolu Cad. Bayraklı", tel: "0232 462 24 24" }, alan: { isim: "Kültürpark Güvenli Alanı", enlem: 38.4280, boylam: 27.1420, kapasite: "25.000 Kişi", imkanlar: "İlk Yardım İstasyonları", adres: "Şair Eşref Bulv." } }
};

var karargahAcikMi = false;

function karargahlariGoster() {
    var btn = document.getElementById("btnKarargah");
    if (!karargahAcikMi) {
        karargahLayer.clearLayers();
        map.flyTo([39.0, 35.0], 6, { animate: true, duration: 1.2 });
        Object.keys(sehirKoordinatSözlugu).forEach(function (key, index) {
            var merkez = sehirKoordinatSözlugu[key].afad;
            setTimeout(function () {
                var popContent = "<div style='width:230px; font-family:sans-serif;'>" +
                    "<h6 class='text-dark fw-bolder mb-1' style='font-size:0.95rem; border-bottom: 2px solid #000; padding-bottom: 4px;'>Merkez: " + merkez.ad + "</h6>" +
                    "<p class='mb-1 small mt-2'><b>Adres:</b> " + merkez.adres + "</p>" +
                    "<p class='mb-0 small text-danger fw-bold'><b>Tel:</b> " + merkez.tel + "</p>" +
                    "</div>";
                L.marker([merkez.enlem, merkez.boylam], { icon: karargahIcon }).bindPopup(popContent).addTo(karargahLayer);
            }, (index + 1) * 200);
        });
        karargahAcikMi = true;
        btn.innerHTML = "Merkezleri Gizle";
    } else {
        karargahLayer.clearLayers();
        karargahAcikMi = false;
        btn.innerHTML = "AFAD Merkezleri";
        map.setView([39.0, 35.0], 6);
    }
}

// Sensör ve Altyapı Döngüleri
var sensorBilgileri = [
    { id: 1, isim: "GAZİANTEP - BOTAS Ana Gaz Dağıtım IoT Vanası", enlem: 37.0662, boylam: 37.3833 },
    { id: 2, isim: "GAZİANTEP - TEİAŞ Trafo Merkezi Akıllı Şebeke Sensörü", enlem: 37.0850, boylam: 37.4100 }
];
var aktifIotMarkerlar = [];
var alarmVerildiMi = false;
var aktifSirenSesMotoru = null;
var sesMikrofonAkisi = null;
var javascriptIslemeNode = null;
var efektZamanlayici = null;

var globalGonulluVeritabanı = [
    { id: 101, ad: "Ahmet Yılmaz", sehir: "gaziantep", dal: "İtfaiye / Orman", tel: "0532 *** ** 12", durum: "Müsait" },
    { id: 102, ad: "Murat Demir", sehir: "rize", dal: "Arama Kurtarma / Tahliye", tel: "0544 *** ** 56", durum: "Müsait" },
    { id: 103, ad: "Selin Kaya", sehir: "adiyaman", dal: "Deprem Kurtarma", tel: "0555 *** ** 89", durum: "Müsait" },
    { id: 104, ad: "Melih Karaaslan", sehir: "gaziantep", dal: "Deprem Kurtarma", tel: "0506 *** ** 34", durum: "Müsait" }
];

function iotSensorleriniYukle() {
    iotLayer.clearLayers();
    aktifIotMarkerlar = [];
    sensorBilgileri.forEach(function (sensor) {
        var marker = L.marker([sensor.enlem, sensor.boylam], { icon: iotNormalIcon })
            .bindPopup("<b>IoT İstasyonu:</b> " + sensor.isim + "<br><span class='text-success fw-bold'>Durum: Güvenli / Akış Aktif</span>");
        iotLayer.addLayer(marker);
        aktifIotMarkerlar.push({ id: sensor.id, marker: marker, data: sensor });
    });
}

// CANLI GPS KONUM MOTORU
var canliGpsLayer = L.layerGroup().addTo(map);
var gpsTakipZamanlayici = null;
var siberSaldiriZamanlayici = null;
var siberSaldiriAktifMi = false;

function canliGpsKonumunuBagla() {
    var btn = document.getElementById("btnCanliGps");
    if (gpsTakipZamanlayici) {
        clearInterval(gpsTakipZamanlayici); gpsTakipZamanlayici = null; canliGpsLayer.clearLayers();
        btn.innerHTML = "Saha Konumu";
        map.setView([39.0, 35.0], 6); return;
    }
    if (!navigator.geolocation) { alert("GPS Desteklenmiyor!"); return; }
    btn.innerHTML = "GPS Aranıyor...";
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var enlem = position.coords.latitude; var boylam = position.coords.longitude; var dogruluk = position.coords.accuracy.toFixed(1);
            btn.innerHTML = "Ekip Bağlı (Canlı)";
            map.flyTo([enlem, boylam], 16, { animate: true, duration: 2.0 });
            canliRadarHalkasiUret(enlem, boylam);
            canliGpsLayer.clearLayers();
            var popContent = "<div style='width:240px; font-family:sans-serif;'><h6>Saha Komuta Ekibi</h6><p class='mb-1 small'><b>Personel:</b> Melih Karaaslan</p><p class='mb-1 small text-primary'><b>Sapma Oranı:</b> ±" + dogruluk + " m</p></div>";

            // 🛠️ NET ÇÖZÜM: ARTIK SAF ASKERİ MOR (VIOLET) PİN DÜŞÜYOR
            var sahaMarkeri = L.marker([enlem, boylam], { icon: canliSahaIkonu }).bindPopup(popContent).addTo(canliGpsLayer);

            setTimeout(function () { sahaMarkeri.openPopup(); }, 2200);
            gpsTakipZamanlayici = setInterval(function () { canliRadarHalkasiUret(enlem, boylam); }, 5000);
        },
        function () { btn.innerHTML = "Bağlantı Başarısız"; alert("Konum izni gerekiyor kanka!"); },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
}

function sensoruBaslat() {
    var btn = document.getElementById("btnSensörAktif");
    if (!btn) return;
    if (alarmVerildiMi || sesMikrofonAkisi) { sistemiSifirla(); return; }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function (stream) {
            sesMikrofonAkisi = stream;
            btn.innerHTML = "Taramayı Durdur";
            document.getElementById("sensorBaslik").innerHTML = "Siber-Fiziksel Akustik Darbe Taraması (Sistem Dinliyor...)";

            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
            var duser = audioContext.createMediaStreamSource(stream);
            var analizor = audioContext.createAnalyser();
            javascriptIslemeNode = audioContext.createScriptProcessor(2048, 1, 1);
            analizor.smoothingTimeConstant = 0.3; analizor.fftSize = 1024;
            duser.connect(analizor); analizor.connect(javascriptIslemeNode); javascriptIslemeNode.connect(audioContext.destination);

            javascriptIslemeNode.onaudioprocess = function () {
                if (alarmVerildiMi) return;
                var dizi = new Uint8Array(analizor.frequencyBinCount);
                analizor.getByteFrequencyData(dizi);
                var degerler = 0;
                for (var i = 0; i < dizi.length; i++) { degerler += dizi[i]; }
                var ortalamaSesGurlutusu = degerler / dizi.length;

                if (ortalamaSesGurlutusu > 40) {
                    alarmVerildiMi = true;
                    iotSarsintiTetikle("Donanımsal Sismik Darbe Sensörü");
                }
            };
        }).catch(function (err) { alert("Mikrofon izni gerekiyor."); });
}

function iotSarsintiTetikle(kaynak) {
    var anlikEnlem = 37.0662; var anlikBoylam = 37.3833;
    var haritaKapsayici = document.getElementById("afetHaritasiKapsayici");
    if (haritaKapsayici) { haritaKapsayici.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

    map.flyTo([anlikEnlem, anlikBoylam], 14, { animate: true, duration: 1.2 });
    canliRadarHalkasiUret(anlikEnlem, anlikBoylam);

    try {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        aktifSirenSesMotoru = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        aktifSirenSesMotoru.connect(gainNode); gainNode.connect(audioCtx.destination);
        aktifSirenSesMotoru.type = 'sawtooth'; aktifSirenSesMotoru.frequency.setValueAtTime(440, audioCtx.currentTime); gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        aktifSirenSesMotoru.start();
    } catch (e) { }

    var haritaDiv = document.getElementById("turkiyeHaritasi");
    var rozet = document.getElementById("sistemDurumRozeti");
    var btn = document.getElementById("btnSensörAktif");

    var iotKutu = window.parent.document.getElementById("kpiIotKutusu") || document.getElementById("kpiIotKutusu");
    var iotDurum = window.parent.document.getElementById("kpiIotDurum") || document.getElementById("kpiIotDurum");
    var iotAlt = window.parent.document.getElementById("kpiIotAlt") || document.getElementById("kpiIotAlt");
    var kpiBekleyen = window.parent.document.getElementById("kpiBekleyen") || document.getElementById("kpiBekleyen");

    if (iotKutu) iotKutu.className = "card border-0 bg-danger text-white p-3 rounded-4 shadow-sm border-start border-dark border-4";
    if (iotDurum) { iotDurum.innerHTML = "KORUMADA"; iotDurum.className = "fw-bold text-dark my-1"; }
    if (iotAlt) { iotAlt.innerHTML = "Şebeke Akışı Kapatıldı!"; iotAlt.className = "small text-white fw-bold"; }
    if (kpiBekleyen) kpiBekleyen.innerHTML = parseInt(kpiBekleyen.innerHTML) + 1;

    if (btn) btn.innerHTML = "Sistemi Sıfırla";
    if (haritaDiv) { haritaDiv.style.border = "6px solid #dc3545"; haritaDiv.style.boxShadow = "0 0 35px rgba(220, 53, 69, 0.8)"; }
    if (rozet) { rozet.innerHTML = "SENSÖR TETİKLENDİ: OTONOM KORUMA AKTİF!"; rozet.className = "bg-dark text-danger rounded-pill fw-bold px-3 py-2 d-flex align-items-center shadow-sm border border-danger"; }

    setTimeout(() => {
        iotLayer.clearLayers();
        aktifIotMarkerlar.forEach(function (item) {
            var krizMarker = L.marker([item.data.enlem, item.data.boylam], { icon: iotAlarmIcon })
                .addTo(iotLayer)
                .bindPopup("<div class='p-1'><h6 class='text-danger fw-bold mb-1'>Alarm: " + kaynak + "</h6><p class='small mb-2'><b>İstasyon:</b> " + item.data.isim + "</p><div class='alert alert-danger py-1 px-2 small mb-0 fw-bold'>Şok Dalga Algılandı! Şebeke Güvenliği İçin Hat Kapatıldı.</div></div>");
            if (item.data.id === 1) { setTimeout(() => { krizMarker.openPopup(); }, 500); }
        });
    }, 1300);
}

function canliRadarHalkasiUret(lat, lng) {
    if (efektZamanlayici) clearInterval(efektZamanlayici);
    efektLayer.clearLayers();
    var rRadius = 50;
    var radarDairesi = L.circle([lat, lng], { color: '#0dcaf0', fillColor: '#0dcaf0', fillOpacity: 0.4, weight: 3, radius: rRadius }).addTo(efektLayer);
    efektZamanlayici = setInterval(function () {
        rRadius += 50; radarDairesi.setRadius(rRadius); var yeniOpasite = radarDairesi.options.fillOpacity - 0.025; radarDairesi.setStyle({ fillOpacity: yeniOpasite });
        if (yeniOpasite <= 0 || rRadius >= 1600) { clearInterval(efektZamanlayici); efektLayer.clearLayers(); }
    }, 25);
}

function sistemiSifirla() {
    alarmVerildiMi = false;
    if (efektZamanlayici) clearInterval(efektZamanlayici);
    efektLayer.clearLayers();

    var bBaslik = document.getElementById("sensorBaslik");
    if (bBaslik) bBaslik.innerHTML = "Siber-Fiziksel Akustik Darbe Taraması";

    var iotKutu = window.parent.document.getElementById("kpiIotKutusu") || document.getElementById("kpiIotKutusu");
    var iotDurum = window.parent.document.getElementById("kpiIotDurum") || document.getElementById("kpiIotDurum");
    var iotAlt = window.parent.document.getElementById("kpiIotAlt") || document.getElementById("kpiIotAlt");

    if (iotKutu) iotKutu.className = "card border-0 bg-dark text-white p-3 rounded-4 shadow-sm border-start border-info border-4";
    if (iotDurum) { iotDurum.innerHTML = "GÜVENLİ"; iotDurum.className = "fw-bold text-info my-1"; }
    if (iotAlt) { iotAlt.innerHTML = "Hatlarda Akış Aktif"; iotAlt.className = "small text-muted"; }

    if (aktifSirenSesMotoru) { try { aktifSirenSesMotoru.stop(); } catch (e) { } aktifSirenSesMotoru = null; }
    if (javascriptIslemeNode) { try { javascriptIslemeNode.onaudioprocess = null; javascriptIslemeNode.disconnect(); } catch (e) { } javascriptIslemeNode = null; }
    if (sesMikrofonAkisi) { try { sesMikrofonAkisi.getTracks().forEach(track => track.stop()); } catch (e) { } sesMikrofonAkisi = null; }

    var haritaDiv = document.getElementById("turkiyeHaritasi");
    var rozet = document.getElementById("sistemDurumRozeti");
    var btn = document.getElementById("btnSensörAktif");

    if (btn) btn.innerHTML = "Canlı Akustik Sensörü Başlat";
    if (haritaDiv) { haritaDiv.style.border = "none"; haritaDiv.style.boxShadow = "none"; }
    if (rozet) { rozet.innerHTML = "<span class='spinner-grow spinner-grow-sm me-2' role='status'></span> Sistem Aktif"; rozet.className = "bg-danger text-white rounded-pill fw-bold px-4 py-2 d-flex align-items-center shadow-sm"; }

    map.setView([39.0, 35.0], 6);
    iotSensorleriniYukle();
    karargahLayer.clearLayers();
    karargahAcikMi = false;
    if (document.getElementById("btnKarargah")) { btn.innerHTML = "AFAD Merkezleri"; }
}

function afetVerileriniGetir() {
    var btn = document.getElementById("btnYenile");
    if (btn) { btn.innerHTML = "..."; btn.disabled = true; }
    afetLayer.clearLayers();

    fetch('https://api.orhanaydogdu.com.tr/deprem/kandilli/live')
        .then(response => response.json())
        .then(data => {
            var listelenenCount = 0;
            for (var i = 0; i < data.result.length; i++) {
                if (listelenenCount >= 5) break;
                var deprem = data.result[i];
                if (deprem.mag > 2.5) {
                    var aiScore = (deprem.mag * 1.8).toFixed(1);
                    if (aiScore > 10) aiScore = 10.0;
                    var badgeColor = aiScore > 7 ? 'danger' : 'warning';
                    var temizSehirIsmi = deprem.title.toLowerCase().replace(/[^a-z]/g, "");
                    var hedefSehir = "gaziantep";
                    if (temizSehirIsmi.includes("hatay")) hedefSehir = "hatay";
                    if (temizSehirIsmi.includes("adiyaman")) hedefSehir = "adiyaman";
                    if (temizSehirIsmi.includes("maray") || temizSehirIsmi.includes("kahraman")) hedefSehir = "kahramanmaras";

                    var popupHtml = "<div class='p-1' style='width:220px; font-family:sans-serif;'>" +
                        "<h6 class='text-warning fw-bold mb-1'>Deprem (M " + deprem.mag + ")</h6>" +
                        "<div class='badge bg-" + badgeColor + " text-white mb-2 py-1 px-2 w-100'>AI Öncelik Skoru: " + aiScore + "/10</div>" +
                        "<p class='text-muted small mb-2'><b>Konum:</b> " + deprem.title + "</p>" +
                        "<button onclick=\"akilliEslesmeYap('" + deprem.title + "', '" + hedefSehir + "', 'Deprem Kurtarma')\" class='btn btn-sm btn-dark w-100 rounded-pill text-info fw-bold mb-1 shadow-sm'>Gönüllü Eşleştir</button>" +
                        "<button onclick=\"acilEkipIste('" + deprem.title + "', 'Deprem')\" class='btn btn-sm btn-outline-danger w-100 rounded-pill'>Saha Ekibi İste</button></div>";

                    L.marker([deprem.geojson.coordinates[1], deprem.geojson.coordinates[0]], { icon: depremIcon })
                        .bindPopup(popupHtml).addTo(afetLayer);
                    listelenenCount++;
                }
            }
            var kpiO = window.parent.document.getElementById("kpiOdak") || document.getElementById("kpiOdak");
            if (kpiO) { kpiO.innerHTML = listelenenCount + 2; }
            if (btn) { btn.innerHTML = "Verileri Yenile"; btn.disabled = false; }
        }).catch(err => { if (btn) btn.disabled = false; });

    var krizler = [
        { yer: "Gaziantep / Nurdağı Lojistik Hattı", lat: 37.16, lng: 36.74, icon: yanginIcon, sehir: "gaziantep", tur: "Yangın", score: "9.2", detay: "Kritik - Altyapı Yangını", uzmanlik: "İtfaiye / Orman" },
        { konum: "Rize / Çayeli Merkez", lat: 41.01, lng: 40.72, icon: selIcon, sehir: "rize", tur: "Sel Baskını", score: "7.8", detay: "Dere Taşkını", uzmanlik: "Arama Kurtarma / Tahliye" }
    ];
    krizler.forEach(function (k) {
        var pHtml = "<div class='p-1' style='width:220px; font-family:sans-serif;'><h6 class='text-danger fw-bold mb-1'>" + k.tur + "</h6>" +
            "<div class='badge bg-danger text-white mb-2 py-1 px-2 w-100'>AI Öncelik: " + k.score + "/10</div>" +
            "<p class='text-muted small mb-1'><b>Konum:</b> " + (k.yer || k.konum) + "</p>" +
            "<p class='small text-dark mb-2'>" + k.detay + "</p>" +
            "<button onclick=\"akilliEslesmeYap('" + (k.yer || k.konum) + "', '" + k.sehir + "', '" + k.uzmanlik + "')\" class='btn btn-sm btn-dark w-100 rounded-pill text-info fw-bold shadow-sm'>Gönüllü Eşleştir</button></div>";
        L.marker([k.lat, k.lng], { icon: k.icon }).bindPopup(pHtml).addTo(afetLayer);
    });
}

function akilliEslesmeYap(bölge, afetSehri, uzmanlikAlani) {
    var adaylar = globalGonulluVeritabanı.filter(g => g.sehir === afetSehri && g.durum === "Müsait");
    if (adaylar.length === 0) { adaylar = globalGonulluVeritabanı.filter(g => g.durum === "Müsait"); }
    if (adaylar.length === 0) { alert("Havuz Kilitli! Tüm personel aktif görevdedir."); return; }
    var secilenGonullu = adaylar[0];
    secilenGonullu.durum = "Görevde (Meşgul)";
    alert("SMART MATCHER ALGORİTMASI\n\nLokasyon: " + borigiOlabilir(bölge) + "\nAtanan Gönüllü: " + secilenGonullu.ad + "\nŞehir: " + secilenGonullu.sehir.toUpperCase() + "\nDurum: " + secilenGonullu.durum);
}

function borigiOlabilir(str) { return str.replace("💥 ", "").replace("🚨 ", ""); }

function sehreOdaklanVeToplanmaAlanlariniGetir() {
    var secilenSehir = document.getElementById("sehirSecimi").value;
    if (!secilenSehir) { map.setView([39.0, 35.0], 6); return; }
    toplanmaLayer.clearLayers();

    if (sehirKoordinatSözlugu[secilenSehir]) {
        var sehir = sehirKoordinatSözlugu[secilenSehir];
        map.flyTo(sehir.merkez, 12, { animate: true, duration: 1.5 });
        var popContent = "<div style='width:240px; font-family:sans-serif;'>" +
            "<h6 class='text-success fw-bold mb-1'>" + sehir.alan.isim + "</h6>" +
            "<hr class='my-1' style='opacity:0.25;'>" +
            "<p class='mb-1 small'><b>Kapasite:</b> " + sehir.alan.kapasite + "</p>" +
            "<p class='mb-1 small'><b>İmkanlar:</b> " + sehir.alan.imkanlar + "</p>" +
            "<p class='mb-0 small text-muted'><b>Bölge:</b> " + sehir.alan.adres + "</p>" +
            "</div>";
        L.marker([sehir.alan.enlem, sehir.alan.boylam], { icon: toplanmaIcon }).bindPopup(popContent).addTo(toplanmaLayer);
    } else {
        var sahteLat = 36.5 + (Math.random() * 4); var sahteLng = 26.5 + (Math.random() * 16);
        map.flyTo([sahteLat, sahteLng], 11, { animate: true, duration: 1.5 });
        var dinamikAd = secilenSehir.toUpperCase();
        var popContent = "<div style='width:240px; font-family:sans-serif;'>" +
            "<h6 class='text-success fw-bold mb-1'>" + dinamikAd + " Güvenli Alanı</h6>" +
            "<hr class='my-1' style='opacity:0.25;'>" +
            "<p class='mb-1 small'><b>Kapasite:</b> 3.500 Kişi</p>" +
            "<p class='mb-1 small'><b>İmkanlar:</b> Sahra Aşevi, İlk Yardım Birimi</p>" +
            "<p class='mb-0 small text-muted'><b>Bölge:</b> Afet Koordinasyon Otonom Bölgesi</p>" +
            "</div>";
        L.marker([sahteLat, sahteLng], { icon: toplanmaIcon }).bindPopup(popContent).addTo(toplanmaLayer);
    }
}

// SİBER EMÜLATÖR VE SAVUNMA MOTORU
// wwwroot/js/komutaMerkezi.js içindeki siberSaldiriTetikle fonksiyonunun güncel hali:

function siberSaldiriTetikle() {
    var btn = document.getElementById("btnSiberSaldiri");
    var logPanel = document.getElementById("cyberLogPanel");
    var logContent = document.getElementById("cyberLogContent");
    var reqCounter = document.getElementById("cyberRequestCounter");
    var rozetYukari = document.getElementById("sistemDurumRozetiYukari");
    var rozetHarita = document.getElementById("sistemDurumRozeti");
    var anaBanner = document.getElementById("adminMainBanner");
    var bannerBaslik = document.getElementById("adminBannerBaslik");
    var bannerAltYazi = document.getElementById("adminBannerAltYazi");
    var panelStatus = document.getElementById("cyberPanelStatus");

    if (siberSaldiriAktifMi) {
        clearInterval(siberSaldiriZamanlayici); siberSaldiriAktifMi = false;
        if (logPanel) logPanel.className = "cyber-log-container p-3 d-none";
        if (anaBanner) anaBanner.classList.remove("admin-banner-cyber-active");
        if (bannerBaslik) { bannerBaslik.innerHTML = "Merkez Komuta Yetkili Paneli"; bannerBaslik.className = "fw-bolder mb-1 text-danger"; }
        if (bannerAltYazi) bannerAltYazi.innerHTML = "Sistem şu an tam yetkili modda çalışıyor. Tüm operasyonel lojistik talepleri ve sivil gönüllü listeleri erişiminize açıktır.";
        if (btn) { btn.innerHTML = "Siber Savunma Testi"; btn.className = "btn btn-outline-warning rounded-pill fw-bold px-3 py-2 d-flex align-items-center shadow-sm"; btn.style.color = "#ffc107"; }
        var aktifText = "<span class='spinner-grow spinner-grow-sm me-2'></span>SİSTEM AKTİF";
        if (rozetYukari) { rozetYukari.innerHTML = aktifText; rozetYukari.className = "badge bg-danger rounded-pill px-4 py-2 fw-bold border border-light border-opacity-25 shadow-sm"; }
        if (rozetHarita) { rozetHarita.innerHTML = "Sistem Aktif"; rozetHarita.className = "bg-danger text-white rounded-pill px-3 py-2 d-flex align-items-center shadow-sm"; }
        return;
    }

    siberSaldiriAktifMi = true;
    if (logPanel) logPanel.classList.remove("d-none");
    if (logContent) logContent.innerHTML = "";
    if (anaBanner) anaBanner.classList.add("admin-banner-cyber-active");
    if (bannerBaslik) { bannerBaslik.innerHTML = "SİBER TEHDİT: YOĞUN TRAFİK DÖNGÜSÜ (DDOS)"; bannerBaslik.className = "fw-bolder mb-1 text-warning"; }
    if (bannerAltYazi) bannerAltYazi.innerHTML = "<b>UYARI:</b> Karargah ağına yoğun veri paketi yükleniyor! Otonom Güvenlik Duvarı tehdit kaynağını inceliyor...";
    if (btn) { btn.innerHTML = "Simülasyonu Durdur"; btn.className = "btn btn-danger text-white rounded-pill fw-bold px-3 py-2 d-flex align-items-center shadow-sm"; btn.style.color = "#fff"; }
    if (rozetYukari) { rozetYukari.innerHTML = "TEHDİT ALGILANDI"; rozetYukari.className = "badge bg-warning text-dark rounded-pill px-4 py-2 fw-bold shadow-sm"; }
    if (rozetHarita) { rozetHarita.innerHTML = "Siber Tehdit"; rozetHarita.className = "bg-warning text-dark rounded-pill px-3 py-2 d-flex align-items-center shadow-sm"; }
    if (panelStatus) { panelStatus.innerHTML = "Şüpheli Ağ İsteği Algılandı! Paketler İnceleniyor..."; panelStatus.className = "fw-bold text-uppercase small text-danger"; }

    var sanalIstekSayisi = 0;

    // 🚀 EMÜLASYON DÖNGÜSÜ
    siberSaldiriZamanlayici = setInterval(function () {
        var artis = Math.floor(Math.random() * 250) + 150;
        sanalIstekSayisi += artis;
        if (reqCounter) reqCounter.innerHTML = "Yük: " + sanalIstekSayisi + " req/sn";

        var sahteIp = "192.168." + Math.floor(Math.random() * 254) + "." + Math.floor(Math.random() * 254);
        if (logContent) {
            logContent.innerHTML += "<div class='text-white-50'>[GELEN PAKET] IP: " + sahteIp + " -> Port: 8080 | İnceleme Yapılıyor...</div>";
            logContent.scrollTop = logContent.scrollHeight;
        }

        // 🚨 KESTREL SİYAH EKRAN TETİKLEMESİ (GERÇEK AJAX İSTEĞİ)
        // Her döngüde .NET sunucusuna arka arkaya asenkron paket fırlatıyoruz kanka!
        fetch('/Home/SiberLogYaz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip: sahteIp, load: sanalIstekSayisi, status: "ATTACK" })
        }).catch(e => { });

        // OTONOM SAVUNMA (RATE LIMITER MECHANISM)
        if (sanalIstekSayisi > 2500) {
            clearInterval(siberSaldiriZamanlayici);

            // Sunucuya "SAVUNMA AKTİF, SALDIRI ENGELLENDİ" logu yolluyoruz kanka siyaha düşsün diye
            fetch('/Home/SiberLogYaz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: "0.0.0.0", load: 0, status: "SHIELD_ACTIVE" })
            }).catch(e => { });

            if (reqCounter) { reqCounter.innerHTML = "Yük: 0 req/sn [KORUMADA]"; reqCounter.className = "badge bg-success px-2 py-1 font-monospace"; }
            if (panelStatus) { panelStatus.innerHTML = "OTONOM RATE LIMITER TETİKLENDİ: ZARARLI IP BLOKLARI ENGELLENDİ!"; panelStatus.className = "fw-bold text-uppercase small text-success"; }
            if (bannerBaslik) { bannerBaslik.innerHTML = "SİBER KALKAN AKTİF: SUNUCU NETWORKÜ KORUNDU"; bannerBaslik.className = "fw-bolder mb-1 text-success"; }
            if (bannerAltYazi) bannerAltYazi.innerHTML = "Otonom kalkan başarıyla kilitlendi. Saldırı düzenleyen zararlı tüm IP kaynakları network katmanından kalıcı olarak engellendi (HTTP 403 Forbidden).";
            if (rozetYukari) { rozetYukari.innerHTML = "AĞ GÜVENLİ"; rozetYukari.className = "badge bg-success text-white rounded-pill px-4 py-2 fw-bold shadow-sm"; }
            if (rozetHarita) { rozetHarita.innerHTML = "Korumada"; rozetHarita.className = "bg-success text-white rounded-pill px-3 py-2 d-flex align-items-center shadow-sm"; }
            if (logContent) {
                logContent.innerHTML += "<div class='text-success fw-bold mt-1'>[GÜVENLİK ALARMI] Saniyede 2500+ paket sınırı aşıldı! Koruma katmanı devreye girdi.</div>";
                logContent.innerHTML += "<div class='text-success fw-bold'>[İŞLEM] Tehdit oluşturan tüm IP adresleri havuzdan temizlendi ve engellendi.</div>";
                logContent.scrollTop = logContent.scrollHeight;
            }
        }
    }, 150);
}
afetVerileriniGetir();
iotSensorleriniYukle();