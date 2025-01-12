import { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';


const Settings = () => {
  const [password, setPassword] = useState('');
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
  });

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveSettings = async () => {
    // Add logic to save settings (e.g., API call)
    console.log('Settings saved:', { password, contactInfo });
  };

  return (
    <div className="container my-4">
      <Card className="shadow-sm p-3 mb-4">
        <CardBody>
          <h2 className="text-center mb-4">Settings</h2>
          <Form>
            <FormGroup>
              <Label for="password">Change Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Contact Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="Enter contact email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Contact Phone</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactInfoChange}
                placeholder="Enter contact phone"
              />
            </FormGroup>
            <Button color="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;