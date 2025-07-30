import { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { addContact } from "../features/Contacts/contactSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function AddContactModal(props) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setProfileImg(null);
    setFav(false);
    reset();
  }, [props.show, reset]);

  const [profileImg, setProfileImg] = useState(null);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

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

  const handleAddContact = (data) => {
    const contact = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      profileImg: profileImg || null,
      fav: fav,
      userRefId: Cookies.get('auth'),
    };

    toast.success("Contact created successfully !!");
    dispatch(addContact(contact));
    setProfileImg(null);
    setFav(false);
    navigate(`/home/all`);
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
          Create New Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="form"
          ref={ref}
          onSubmit={handleSubmit(handleAddContact)}
        >
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
            id="phone"
            helperText={errors.phone?.message || null}
            {...register("phone", {
              required: { value: true, message: "Phone is required" },
              pattern: { value: /^\d{10}$/, message: "Invalid phone number" },
            })}
            label="Phone"
            type="number"
            placeholder="Enter contact's phone"
          />
          <TextField
            type="file"
            id="profileImg"
            accept="image/*"
            onChange={handleFileChange}
          />
          {profileImg && <img src={profileImg} className="preview"></img>}
          <div className="fav">
            <Checkbox id="fav" value={fav} onChange={() => setFav(!fav)} />
            <label htmlFor="fav">Add contact to favorites</label>
          </div>
          <hr />
          <div className="pair-buttons">
            <Button variant="contained" color="success" type="submit">
              Add Contact
            </Button>
            <Button
              variant="contained"
              color="error"
              type="reset"
              onClick={() => {
                reset();
                props.onHide();
              }}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddContactModal;
