async function loadPatients() {
    try {
        const response = await fetch("http://localhost:5042/api/patients");

        if (!response.ok) {
            throw new Error("API not reachable: " + response.status);
        }

        const patients = await response.json();

        const patientsTable = document
            .getElementById("patientsTable")
            .getElementsByTagName("tbody")[0];

        patientsTable.innerHTML = '';

        patients.forEach(patient => {
            const row = patientsTable.insertRow();
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.dateOfBirth}</td>
                <td>${patient.phoneNumber}</td>
                <td>${patient.email}</td>
            `;
        });

    } catch (error) {
        console.error("Failed to load patients:", error);
        alert("Backend API is not reachable. Is .NET running?");
    }
}

loadPatients();
