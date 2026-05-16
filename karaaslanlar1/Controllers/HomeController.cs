using System.Diagnostics;
using karaaslanlar1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http; // SESSION KONTROLÜ ÝÇÝN ÞART KANKA

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

        // --- YENÝ EKLENEN ROL VE GÝRÝÞ SÝSTEMÝ METOTLARI ---

        // 1. Giriþ Simülasyonu (Post): Formdan gelen mail ve þifreye göre rol daðýtýr
        [HttpPost]
        public IActionResult Login(string email, string sifre)
        {
            if (email == "admin@afet.com" && sifre == "123456")
            {
                // Giriþ yapan admin ise hafýzaya Admin rolünü iþle ve yönlendir
                HttpContext.Session.SetString("KullaniciRolu", "Admin");
                return RedirectToAction("AdminDashboard");
            }
            else
            {
                // Normal kullanýcý/vatandaþ ise Kullanici rolünü iþle ve ana sayfaya at
                HttpContext.Session.SetString("KullaniciRolu", "Kullanici");
                return RedirectToAction("Index");
            }
        }

        // 2. Admin Komuta Merkezi (Dashboard)
        public IActionResult AdminDashboard()
        {
            // GÜVENLÝK DUVARI: Eðer session'da Admin rolü yoksa, URL'den sýzmaya çalýþanlarý ana sayfaya þutla
            if (HttpContext.Session.GetString("KullaniciRolu") != "Admin")
            {
                return RedirectToAction("Index");
            }

            return View(); // Views/Home/AdminDashboard.cshtml sayfasýný açar
        }

        // 3. Güvenli Çýkýþ (Logout): Rolleri temizler ve ana sayfaya döner
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Tüm session verilerini sýfýrlar
            return RedirectToAction("Index");
        }

        // --- MEVCUT DÝÐER SÝSTEM METOTLARI ---

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}