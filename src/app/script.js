const form = document.getElementById('appointmentForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const patient = {
    name: formData.get('name'),
    age: parseInt(formData.get('age')),
    gender: formData.get('gender'),
    dateOfBirth: formData.get('dob'),
    phoneNumber: formData.get('phoneNumber'),
    email: formData.get('email')
  };

  try {
    const response = await fetch('/api/Patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    });

    if (response.ok) {
      alert('Appointment booked successfully!');
      form.reset();
    } else {
      alert('Failed to book appointment.');
    }
  } catch (err) {
    console.error(err);
    alert('Error connecting to server.');
  }
});
