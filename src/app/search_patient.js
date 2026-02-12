document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const patientId = document.getElementById("patientId").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    try {
        const [patientRes, appointmentsRes, doctorsRes] = await Promise.all([
            fetch(`/api/Patients/${patientId}`),
            fetch(`/api/Appointments`),
            fetch(`/api/Doctors`)
        ]);

        if (!patientRes.ok) {
            resultDiv.innerHTML = "Patient not found.";
            return;
        }

        const patient = await patientRes.json();
        const appointments = await appointmentsRes.json();
        const doctors = await doctorsRes.json();

        // Filter appointments for this patient
        const patientAppointments = appointments.filter(app => app.patientId == patientId);

        let html = `
            <h3>Patient Information</h3>
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Gender:</strong> ${patient.gender}</p>
            <p><strong>Date of Birth:</strong> ${formatDate(patient.dateOfBirth)}</p>
            <p><strong>Phone:</strong> ${patient.phoneNumber}</p>
            <p><strong>Email:</strong> ${patient.email}</p>
        `;

        if (patientAppointments.length === 0) {
            html += `<p><strong>No appointments found for this patient.</strong></p>`;
        } else {
            html += `<h3>Appointments</h3><ul>`;
            for (const app of patientAppointments) {
                const doctor = doctors.find(doc => doc.id === app.doctorId);
                html += `
                    <li>
                        <strong>Doctor:</strong> ${doctor ? doctor.name : 'Unknown'}<br>
                        <strong>Start:</strong> ${formatDate(app.startTime)}<br>
                        <strong>End:</strong> ${formatDate(app.endTime)}<br>
                        <strong>Notes:</strong> ${app.notes || 'None'}
                    </li><br>`;
            }
            html += `</ul>`;
        }

        resultDiv.innerHTML = html;

    } catch (error) {
        console.error("Error fetching data:", error);
        resultDiv.innerHTML = "Error occurred while fetching data.";
    }
});

function formatDate(dateStr) {
    if (!dateStr || dateStr.startsWith("0001")) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString();
}
