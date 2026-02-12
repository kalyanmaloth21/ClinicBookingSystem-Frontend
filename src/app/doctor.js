// Function to load all doctors from the API
async function loadDoctors() {
    const response = await fetch("/api/doctors"); // Adjust URL as needed
    const doctors = await response.json();
    const doctorsTable = document.getElementById("doctorsTable").getElementsByTagName("tbody")[0];

    doctorsTable.innerHTML = ''; // Clear existing rows

    doctors.forEach(doctor => {
        const row = doctorsTable.insertRow();
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.email}</td>
            <td>${doctor.phoneNumber}</td>
        `;
    });
}

// Initialize the page by loading all doctors
loadDoctors();
