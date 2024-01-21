import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormsV2() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    dateOfBirth: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const resetForm = (event) => {
    setFormData({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      dateOfBirth: ''
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const firstName     = formData['firstName'];
      const lastName      = formData['lastName'];
      const emailAddress  = formData['emailAddress'];
      const phoneNumber   = formData['phoneNumber'];
      const dateOfBirth   = formData['dateOfBirth'];

      let data = {
        email           : emailAddress
        , first_name    : firstName
        , last_name     : lastName
        , phone_number  : phoneNumber
        , date_of_birth : dateOfBirth
      }
      console.log(data)


      fetch('https://crm-api.dungeoninnovations.com/klaviyo', {
        method: 'POST',
        headers : {
          'Content-Type' : "application/json",

        },
        body : JSON.stringify(data)
      }).then((response) => {

        console.log("New CRM record added")
        console.log(response)

        const statusCode = response['status']
        if (statusCode === 200) {
          resetForm()

          alert("A new CRM profile has been added");
        } else if (statusCode === 409) {
          alert("This CRM profile already exists!");
        } else {
          alert("An error in the API call." + response['statusText']);
        }

      })
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>

        </Col>
        <Col>
          <h1>CRM Form</h1>
          <Form.Group className="mb-3" controlId="validationFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationLastName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="emailAddress"
              placeholder="Email address"
              value={formData.emailAddress}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationLastName">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="number"
              name="phoneNumber"
              placeholder="123456789"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              required
              type="date"
              name="dateOfBirth"
              placeholder=""
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Save</Button>
        </Col>
        <Col>
          {/*Empty space*/}
        </Col>
      </Row>
    </Form>
  );
}

export default FormsV2;