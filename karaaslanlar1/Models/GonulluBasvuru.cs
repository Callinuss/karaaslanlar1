using System;
using System.ComponentModel.DataAnnotations;

namespace karaaslanlar1.Models
{
    public class GonulluBasvuru
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Ad Soyad alanı zorunludur.")]
        [Display(Name = "Ad Soyad")]
        public string AdSoyad { get; set; }

        [Required(ErrorMessage = "Telefon alanı zorunludur.")]
        [Display(Name = "Telefon Numarası")]
        public string Telefon { get; set; }

        [Required(ErrorMessage = "Uzmanlık alanı seçilmelidir.")]
        [Display(Name = "Uzmanlık / Kan Grubu / Meslek")]
        public string UzmanlikAlani { get; set; }

        [Display(Name = "Başvuru Tarihi")]
        public DateTime BasvuruTarihi { get; set; } = DateTime.Now;
    }
}
