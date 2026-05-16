using System;
using System.ComponentModel.DataAnnotations;

namespace karaaslanlar1.Models
{
    public class AfetTalebi
    {
        [Display(Name = "Afet Türü")]
        public AfetTuru Turu { get; set; }
        public int Id { get; set; }

        [Required(ErrorMessage = "Başlık zorunludur.")]
        [Display(Name = "İhtiyaç Başlığı (Örn: Çadır, Su)")]
        public string? Baslik { get; set; }

        [Required(ErrorMessage = "Açıklama zorunludur.")]
        [Display(Name = "Detaylı Bilgi")]
        public string? Aciklama { get; set; }

        [Required(ErrorMessage = "Lokasyon zorunludur.")]
        [Display(Name = "Bölge / Tam Adres")]
        public string? Lokasyon { get; set; }

        [Display(Name = "Aciliyet Durumu")]
        public Aciliyet Derecesi { get; set; }

        public DateTime OlusturulmaTarihi { get; set; } = DateTime.Now;
    }

    public enum Aciliyet
    {
        Kritik,
        Yuksek,
        Orta,
        Dusuk
    }
    public enum AfetTuru
    {
        Deprem,
        Yangin,
        Sel,
        Heyelan,
        Diger
    }
}