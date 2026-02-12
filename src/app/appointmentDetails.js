const appointmentsTableBody = document.querySelector("#appointmentsTable tbody");

async function fetchAppointments() {
    try {
        const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
            fetch("/api/Appointments"),
            fetch("/api/Doctors"),
            fetch("/api/Patients")
        ]);

        const appointments = await appointmentsRes.json();
        const doctors = await doctorsRes.json();
        const patients = await patientsRes.json();

        const doctorMap = new Map(doctors.map(doc => [doc.id, doc.name]));
        const patientMap = new Map(patients.map(pat => [pat.id, pat.name]));

        appointmentsTableBody.innerHTML = "";

        appointments.forEach(app => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${app.id}</td>
                <td>${doctorMap.get(app.doctorId) || "Unknown"}</td>
                <td>${patientMap.get(app.patientId) || "Unknown"}</td>
                <td>${formatDate(app.startTime)}</td>
                <td>${formatDate(app.endTime)}</td>
                <td>${app.durationInMinutes} min</td>
                <td>${app.notes || ""}</td>
                <td><button onclick="deleteAppointment(${app.id})">Delete</button></td>
            `;

            appointmentsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
}

function formatDate(dateStr) {
    if (!dateStr || dateStr.startsWith("0001")) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString();
}

async function deleteAppointment(id) {
    const confirmed = confirm("Are you sure you want to delete this appointment?");
    if (!confirmed) return;

    try {
        const res = await fetch(`/api/Appointments/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("Appointment deleted.");
            fetchAppointments();
        } else {
            alert("Failed to delete appointment.");
        }
    } catch (error) {
        console.error("Error deleting appointment:", error);
    }
}

fetchAppointments();
