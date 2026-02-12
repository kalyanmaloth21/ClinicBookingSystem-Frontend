window.onload = async function () {
    const data = JSON.parse(sessionStorage.getItem("appointmentDetails"));

    if (!data) {
        document.getElementById("appointmentDetails").innerText = "No appointment data found.";
        return;
    }

    const doctorRes = await fetch(`/api/Doctors/${data.doctorId}`);
    const patientRes = await fetch(`/api/Patients/${data.patientId}`);
    const doctor = await doctorRes.json();
    const patient = await patientRes.json();

    const container = document.getElementById("appointmentDetails");
    container.innerHTML = `
        <p><strong>Appointment ID:</strong> ${data.id}</p>
        <p><strong>Doctor:</strong> ${doctor.name}</p>
        <p><strong>Patient:</strong> ${patient.name}</p>
        <p><strong>Start Time:</strong> ${new Date(data.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> ${new Date(data.endTime).toLocaleString()}</p>
        <p><strong>Duration:</strong> ${data.durationInMinutes} minutes</p>
        <p><strong>Notes:</strong> ${data.notes || "None"}</p>
    `;
};
