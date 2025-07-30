import React, { useState } from "react";
import ProfileImg from "../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteContact,
  editContact,
} from "../features/Contacts/contactSlice";
import EditContactModal from "./EditContactModal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editContactModal, showEditContactModal] = useState(false);

  const contacts = useSelector((state) => state.contact.contacts);
  const contact = contacts.find((contact) => contact.id === id);

  const handleDelete = () => {
    const msg = confirm("Are you sure you want to delete the contact ?");

    if (!msg) {
      return;
    }

    toast.warn("Contact deleted successfully !!");
    dispatch(deleteContact(id));
    navigate("/home/all");
  };

  const handleFav = () => {
    dispatch(editContact({ id: id, fav: !contact.fav }));
    {
      contact.fav
        ? toast.success("Contact removed from favorites")
        : toast.success("Contact added to favorites");
    }
  };

  if (!contact) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="contact-display">
      <div className="card">
        <img
          className="cardImg"
          src={contact.profileImg || ProfileImg}
          alt=""
        />
        <h4 className="card-title">{contact.name}</h4>
        <div className="card-content">
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MdEmail size="20px" /> {contact.email}
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaPhoneAlt size="14px" /> {contact.phone}
          </p>
        </div>
        <div
          className="pair-buttons"
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "10px",
          }}
        >
          {contact.fav ? (
            <GoHeartFill
              size="25px"
              color="red"
              style={{ cursor: "pointer" }}
              onClick={handleFav}
            />
          ) : (
            <GoHeart
              size="25px"
              color="red"
              style={{ cursor: "pointer" }}
              onClick={handleFav}
            />
          )}
          <Button
            onClick={() => showEditContactModal(true)}
            variant="contained"
            color="success"
            size="small"
            startIcon={<FaEdit />}
          >
            Edit
          </Button>
          <EditContactModal
            show={editContactModal}
            onHide={() => showEditContactModal(false)}
          />
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            size="small"
            startIcon={<MdDelete />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDisplay;
