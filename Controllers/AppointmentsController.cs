using ClinicBookingSystem.Core.Interfacess.IServices;
using ClinicBookingSystem.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClinicBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentsController(IAppointmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAppointmentsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetAppointmentByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Book([FromBody] Appointment appointment)
        {
            var success = await _service.BookAppointmentAsync(appointment);
            if (success)
            {
                // Fetch the last created appointment if needed (e.g., by ID or by timestamp)
                var appointments = await _service.GetAppointmentsByPatientAsync(appointment.PatientId);
                var latest = appointments.OrderByDescending(a => a.Id).FirstOrDefault(); // Assuming latest has highest ID
                return Ok(latest);
            }
            else
            {
                return Conflict("Slot unavailable");
            }
            //return success ? Ok("Appointment booked") : Conflict("Slot unavailable");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            var success = await _service.CancelAppointmentAsync(id);
            return success ? Ok("Cancelled") : NotFound();
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<IActionResult> GetByDoctor(int doctorId)
            => Ok(await _service.GetAppointmentsByDoctorAsync(doctorId));

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatient(int patientId)
            => Ok(await _service.GetAppointmentsByPatientAsync(patientId));

        [HttpGet("check-availability")]
        public async Task<IActionResult> IsSlotAvailable(int doctorId, DateTime start, int durationInMinutes)
        {
            bool available = await _service.IsSlotAvailableAsync(doctorId, start, durationInMinutes);
            return Ok(new { available });
        }
    }

}
