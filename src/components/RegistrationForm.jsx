import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    semester: '',
    rollNumber: '',
    department: '',
    universityEmail: '',
    contactNumber: '',
    eventId: ''
  });

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>ZGDC CASPAM Event Registration</h2>
      <p>Fill out the details below to register.</p>
    </div>
  );
};

export default RegistrationForm;
