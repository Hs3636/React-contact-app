import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { addContact } from "../features/Contacts/contactSlice";
import { z } from "zod";

function ImportContactsModal(props) {
  const [csvFile, setCsvFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Valid phone number required"),
    fav: z.string().transform((val) => val === "true"),
  });

  const currUserId = useSelector((state) => state.auth.currUser.id);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".csv")) {
      toast.error("Please select a CSV file");
      e.target.value = "";
      setCsvFile(null);
      return;
    }

    setCsvFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        const data = results.data;
        const errors = [];
        const validContacts = [];

        data.forEach((row, index) => {
          try {
            const validatedRow = contactSchema.parse(row);
            validContacts.push(validatedRow);
          } catch (error) {
            error.issues.forEach((issue) => {
              errors.push(`Contact ${index + 2}: ${issue.message}`);
            });
          }
        });

        if (errors.length > 0) {
          const errorMessage = errors.join("\n");
          toast.error(
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              <b>Invalid csv data</b>
              <pre style={{ fontSize: "12px", margin: "10px 0" }}>
                {errorMessage}
              </pre>
            </div>,
            {
              autoClose: false,
            }
          );
          return;
        }

        validContacts.forEach((item) => {
          const contact = {
            id: crypto.randomUUID(),
            ...item,
            profileImg: null,
            userRefId: currUserId,
          };
          dispatch(addContact(contact));
        });
      },

      error: (error) => {
        toast.error(`Failed to parse CSV file: ${error.message}`);
      },
    });

    navigate("/home/all");
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Import contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            required
            type="file"
            id="csv"
            accept=".csv"
            onChange={handleFileChange}
            helperText="Select a CSV file containing contacts (expected file format: name,email,phone,fav)"
          />
          <Button type="submit" variant="contained" color="success">
            Import contacts
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ImportContactsModal;
