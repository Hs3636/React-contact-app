import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editContact } from "../features/Contacts/contactSlice";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function EditContactModal(props) {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);

  const contacts = useSelector((state) => state.contact.contacts);
  const contact = contacts.find((contact) => contact.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (contact && props.show) {
      reset({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || ""
      });
      setProfileImg(contact.profileImg || null);
    }
  }, [contact, props.show, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (data) => {
    const editedContact = {
      id: id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      profileImg: profileImg,
    };

    toast.success("Contact modified successfully !!");
    dispatch(editContact(editedContact));
    navigate(`/home/${editedContact.id}`);
    props.onHide();
  };

  if (!contact) {
    return null; 
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Contact Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit(handleEdit)}>
          <TextField
            error={errors.name?.message}
            helperText={errors.name?.message || null}
            {...register("name", {
              required: { value: true, message: "Contact's name is required" },
            })}
            id="name"
            label="Name"
            placeholder="Enter contact's name"
          />
          <TextField
            error={errors.email?.message}
            helperText={errors.email?.message || null}
            {...register("email", {
              required: { value: true, message: "Contact's email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            id="email"
            label="Email"
            placeholder="Enter contact's email"
          />
          <TextField
            error={errors.phone?.message}
            helperText={errors.phone?.message || null}
            {...register("phone", {
              required: { value: true, message: "Phone is required" },
              pattern: { value: /^\d{10}$/, message: "Invalid phone number" },
            })}
            id="phone"
            label="Phone"
            type="number"
            placeholder="Enter contact's phone"
          />
          
          {profileImg && (
            <div>
              <img src={profileImg} className="preview" alt="Profile preview" />
            </div>
          )}
          
          <TextField
            type="file"
            id="profileImg"
            accept="image/*"
            onChange={handleFileChange}
            helperText="Change profile photo (optional)"
            fullWidth
            margin="normal"
          />
          
          <div className="pair-buttons" style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              color="success"
              type="submit"
            >
              Update Contact
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              type="button"
              onClick={props.onHide}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditContactModal;