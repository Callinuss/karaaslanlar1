using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using karaaslanlar1.Models; // AppDbContext ve Modellerin olduğu klasör

namespace karaaslanlar1.Controllers
{
    public class GonulluController : Controller
    {
        private readonly AppDbContext _context;

        public GonulluController(AppDbContext context)
        {
            _context = context;
        }

        // ========================================================
        // ADMİN PANELİ: GÖNÜLLÜLERİ LİSTELEME EKRANI (HttpGet)
        // ========================================================
        public async Task<IActionResult> Index()
        {
            // Güvenlik Duvarı: Giriş yapan kişi Admin değilse listeyi görmesin, ana sayfaya şutla
            if (HttpContext.Session.GetString("KullaniciRolu") != "Admin")
            {
                return RedirectToAction("Index", "Home");
            }

            // DB'deki tüm başvuruları (onaylı/onaysız) çekip tek seferde View'a gönderiyoruz
            var basvurular = await _context.GonulluBasvurulari.ToListAsync();
            return View(basvurular);
        }

        // ========================================================
        // YENİ - OPERASYON: GÖNÜLLÜ BAŞVURUSUNU ONAYLAMA MOTORU (HttpPost)
        // ========================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Onayla(int id)
        {
            // Güvenlik Kontrolü
            if (HttpContext.Session.GetString("KullaniciRolu") != "Admin")
            {
                return RedirectToAction("Index", "Home");
            }

            var basvuru = await _context.GonulluBasvurulari.FindAsync(id);
            if (basvuru != null)
            {
                basvuru.IsApproved = true; // Durumu onaylandıya çekiyoruz kanka
                _context.Update(basvuru);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // ========================================================
        // YENİ - OPERASYON: GÖNÜLLÜ BAŞVURUSUNU KALICI SİLME MOTORU (HttpPost)
        // ========================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Sil(int id)
        {
            // Güvenlik Kontrolü
            if (HttpContext.Session.GetString("KullaniciRolu") != "Admin")
            {
                return RedirectToAction("Index", "Home");
            }

            var basvuru = await _context.GonulluBasvurulari.FindAsync(id);
            if (basvuru != null)
            {
                _context.GonulluBasvurulari.Remove(basvuru); // Veritabanından tamamen uçurur kanka
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // ========================================================
        // KULLANICI PANELİ: GÖNÜLLÜ KAYIT FORMU EKRANI (HttpGet)
        // ========================================================
        public IActionResult Create()
        {
            // Kullanıcı menüsünden tıklanınca boş formu ekrana basar
            return View();
        }

        // ========================================================
        // FORM POST METHODU: GELEN BİLGİLERİ VERİTABANINA KAYDETME
        // ========================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AdSoyad,Telefon,UzmanlikAlani,BasvuruTarihi,IsApproved")] GonulluBasvuru gonulluBasvuru)
        {
            if (ModelState.IsValid)
            {
                // Formdan gelen verileri "GonulluBasvurulari" tablosuna güvenle ekliyoruz
                _context.Add(gonulluBasvuru);
                await _context.SaveChangesAsync();

                // Kayıt başarılı olunca kullanıcıyı ana sayfaya yönlendiriyoruz
                return RedirectToAction("Index", "Home");
            }
            return View(gonulluBasvuru);
        }
    }
}