using System.Numerics;
using ClinicBookingSystem.Core.Interfacess.IServices;
using ClinicBookingSystem.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClinicBookingSystem.Controllers
{
    
        [ApiController]
        [Route("api/[controller]")]
        public class DoctorsController : ControllerBase
        {
            private readonly IDoctorService _service;

            public DoctorsController(IDoctorService service)
            {
                _service = service;
            }

            [HttpGet]
            public async Task<IActionResult> GetAll()
                => Ok(await _service.GetDoctorsAsync());

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)
            {
                var doctor = await _service.GetDoctorByIdAsync(id);
                return doctor == null ? NotFound() : Ok(doctor);
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] Doctor doctor)
            {
                await _service.AddDoctorAsync(doctor);
                return CreatedAtAction(nameof(GetById), new { id = doctor.Id }, doctor);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> Update(int id, [FromBody] Doctor doctor)
            {
                var updated = await _service.UpdateDoctorAsync(id, doctor);
                return updated ? Ok("Updated") : NotFound();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                var deleted = await _service.DeleteDoctorAsync(id);
                return deleted ? Ok("Deleted") : NotFound();
            }
        }
  
}
