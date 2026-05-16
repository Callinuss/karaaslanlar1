using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using karaaslanlar1.Models;

namespace karaaslanlar1.Controllers
{
    public class AfetTalepleriController : Controller
    {
        private readonly AppDbContext _context;

        public AfetTalepleriController(AppDbContext context)
        {
            _context = context;
        }

        // GET: AfetTalepleri
        public async Task<IActionResult> Index()
        {
            return View(await _context.Talepler.ToListAsync());
        }

        // GET: AfetTalepleri/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var afetTalebi = await _context.Talepler
                .FirstOrDefaultAsync(m => m.Id == id);
            if (afetTalebi == null)
            {
                return NotFound();
            }

            return View(afetTalebi);
        }

        // GET: AfetTalepleri/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AfetTalepleri/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Baslik,Aciklama,Lokasyon,Derecesi,OlusturulmaTarihi")] AfetTalebi afetTalebi)
        {
            if (ModelState.IsValid)
            {
                _context.Add(afetTalebi);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(afetTalebi);
        }

        // GET: AfetTalepleri/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var afetTalebi = await _context.Talepler.FindAsync(id);
            if (afetTalebi == null)
            {
                return NotFound();
            }
            return View(afetTalebi);
        }

        // POST: AfetTalepleri/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Baslik,Aciklama,Lokasyon,Derecesi,OlusturulmaTarihi")] AfetTalebi afetTalebi)
        {
            if (id != afetTalebi.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(afetTalebi);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AfetTalebiExists(afetTalebi.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(afetTalebi);
        }

        // GET: AfetTalepleri/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var afetTalebi = await _context.Talepler
                .FirstOrDefaultAsync(m => m.Id == id);
            if (afetTalebi == null)
            {
                return NotFound();
            }

            return View(afetTalebi);
        }

        // POST: AfetTalepleri/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var afetTalebi = await _context.Talepler.FindAsync(id);
            if (afetTalebi != null)
            {
                _context.Talepler.Remove(afetTalebi);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AfetTalebiExists(int id)
        {
            return _context.Talepler.Any(e => e.Id == id);
        }
    }
}
