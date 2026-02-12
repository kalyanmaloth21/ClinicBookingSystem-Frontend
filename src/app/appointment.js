// Load doctors and patients when page loads
window.onload = async function () {
    await loadDoctors();
    await loadPatients();
};

async function loadDoctors() {
    try {
        const res = await fetch('/api/Doctors');
        const doctors = await res.json();
        const doctorSelect = document.getElementById('doctorId');

        doctors.forEach((doctor) => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.text = doctor.name;
            doctorSelect.add(option);
        });
    } catch (error) {
        console.error("Error loading doctors:", error);
        alert("Failed to load doctors.");
    }
}

async function loadPatients() {
    try {
        const res = await fetch('/api/Patients');
        const patients = await res.json();
        const patientSelect = document.getElementById('patientId');

        patients.forEach((patient) => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.text = patient.name;
            patientSelect.add(option);
        });
    } catch (error) {
        console.error("Error loading patients:", error);
        alert("Failed to load patients.");
    }
}

document.getElementById("appointmentForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
        doctorId: parseInt(document.getElementById("doctorId").value),
        patientId: parseInt(document.getElementById("patientId").value),
        startTime: document.getElementById("startTime").value,
        endTime: document.getElementById("endTime").value,
        durationInMinutes: calculateDuration(
            document.getElementById("startTime").value,
            document.getElementById("endTime").value
        ),
        notes: document.getElementById("notes").value
    };

    const res = await fetch('/api/Appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const createdAppointment = await res.json(); // 👈 Get full appointment from API
        sessionStorage.setItem("appointmentDetails", JSON.stringify(createdAppointment)); // 👈 Save for success page
        window.location.href = "appointment_success.html"; // 👈 Navigate to confirmation
    } else {
        alert('Error scheduling appointment.');
    }
});


function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate - startDate) / (1000 * 60); // in minutes
}
