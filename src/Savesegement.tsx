
import React, { useState } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export const SaveSegmentSideDrawer = () => {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [currentSchema, setCurrentSchema] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSchema = () => {
    if (currentSchema) {
      setSelectedSchemas([...selectedSchemas, currentSchema]);
      setCurrentSchema("");
    }
  };

  const handleSaveSegment = async () => {
    const schemaData = selectedSchemas.map((schema) => ({
      [schema]:
        schemaOptions.find((option) => option.value === schema)?.label || "",
    }));

    const payload = {
      segment_name: segmentName,
      schema: schemaData,
    };

    try {
    
      const webhookUrl =
        "https://webhook.site/d769f4b2-5227-4f69-b347-34183c3bba16";

   
      const response = await axios.post(webhookUrl, payload);

      console.log("Data successfully sent:", response.data);
      alert("Segment saved and data sent to the server!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data.");
    }

    handleClose();
  };

  
  const availableOptions = schemaOptions.filter(
    (option) => !selectedSchemas.includes(option.value)
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save Segment
      </Button>

    
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"

      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Save Segment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group controlId="segmentName">
              <Form.Label>Segment Name</Form.Label>
              <Form.Control
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                placeholder="Enter segment name"
              />
            </Form.Group>

            <Form.Group controlId="schemaSelect" className="mt-3">
              <Form.Label>Add schema to segment</Form.Label>
              <Form.Control
                as="select"
                value={currentSchema}
                onChange={(e) => setCurrentSchema(e.target.value)}
              >
                <option value="">Select a schema</option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="link" onClick={handleAddSchema} className="mt-2">
              +Add new schema
            </Button>

            <div className="mt-3 p-3 border border-primary bg-light">
              {selectedSchemas.map((schema, index) => (
                <Form.Group
                  controlId={`schemaSelect${index}`}
                  key={index}
                  className="mb-2"
                >
                  <Form.Control
                    as="select"
                    value={schema}
                    onChange={(e) => {
                      const updatedSchemas = [...selectedSchemas];
                      updatedSchemas[index] = e.target.value;
                      setSelectedSchemas(updatedSchemas);
                    }}
                  >
                    {schemaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveSegment}>
                Save Segment
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );

};


