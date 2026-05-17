using System.Diagnostics;
using karaaslanlar1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http; // SESSION KONTROLÜ İÇİN ŞART KANKA
using Microsoft.Extensions.Logging;
namespace karaaslanlar1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        // --- YENİ EKLENEN ROL VE GİRİŞ SİSTEMİ METOTLARI ---

        // 1. Giriş Simülasyonu (Post): Formdan gelen mail ve şifreye göre rol dağıtır
        [HttpPost]
        public IActionResult Login(string email, string sifre)
        {
            if (email == "admin@afet.com" && sifre == "123456")
            {
                // Giriş yapan admin ise hafızaya Admin rolünü işle ve yönlendir
                HttpContext.Session.SetString("KullaniciRolu", "Admin");
                return RedirectToAction("AdminDashboard");
            }
            else
            {
                // Normal kullanıcı/vatandaş ise Kullanici rolünü işle ve ana sayfaya at
                HttpContext.Session.SetString("KullaniciRolu", "Kullanici");
                return RedirectToAction("Index");
            }
        }

        // 2. Admin Komuta Merkezi (Dashboard)
        public IActionResult AdminDashboard()
        {
            // GÜVENLİK DUVARI: Eğer session'da Admin rolü yoksa, URL'den sızmaya çalışanları ana sayfaya şutla
            if (HttpContext.Session.GetString("KullaniciRolu") != "Admin")
            {
                return RedirectToAction("Index");
            }

            return View(); // Views/Home/AdminDashboard.cshtml sayfasını açar
        }

        // 3. Güvenli Çıkış (Logout): Rolleri temizler ve ana sayfaya döner
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Tüm session verilerini sıfırlar
            return RedirectToAction("Index");
        }

        // --- MEVCUT DİĞER SİSTEM METOTLARI ---

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult Sunum()
        {
            return View();
        }
        // Controllers/HomeController.cs içine eklenecek loglama motoru:

        [HttpPost]
        public IActionResult SiberLogYaz([FromBody] CyberLogModel model)
        {
            if (model == null) return BadRequest();

            // 📟 MODEL DURUMUNA GÖRE KESTREL SİYAH EKRANINA RENKLİ LOG BASIYORUZ KANKA
            if (model.status == "ATTACK")
            {
                // Saldırı anında ekrana kırmızı uyarılar düşer
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"warn: AfetKomuta.Network.Firewall[403] | TEHDİT ALGILANDI | Kaynak IP: {model.ip} -> Anlık Yük: {model.load} req/sn");
            }
            else if (model.status == "SHIELD_ACTIVE")
            {
                // Savunma kilitlendiğinde ekrana devasa yeşil kalkan logu basar
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\n=================================================================================");
                Console.WriteLine("info: AfetKomuta.Network.Security[200] | 🛡️ OTONOM RATE LIMITING AKTİF!");
                Console.WriteLine("info: Sunucu network şebekesi koruma altına alındı. Zararlı IP blokları banlandı.");
                Console.WriteLine("=================================================================================\n");
            }

            Console.ResetColor(); // Konsol rengini orijinal haline geri döndürür kanka
            return Ok(new { success = true });
        }

        // JSON verisini karşılamak için gerekli yardımcı nesne sınıfı
        public class CyberLogModel
        {
            public string ip { get; set; }
            public int load { get; set; }
            public string status { get; set; }
        }

    }
}