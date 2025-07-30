import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import AddContactModal from "./AddContactModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../features/Contacts/contactSlice";
import { CSVLink } from "react-csv";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownHeader, DropdownMenu } from "react-bootstrap";
import { TbLogout } from "react-icons/tb";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { IoMdPersonAdd } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import { toast } from "react-toastify";
import { LuImport } from "react-icons/lu";
import ImportContactsModal from "./ImportContactsModal";
import CustomNavbar from "./Navbar";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import Cookies from "js-cookie";
import { getAuth, unsetAuth } from "../features/Auth/authSlice";

const Home = () => {
  const [addContactModal, showAddContactModal] = useState(false);
  const [importContactsModal, showImportContactsModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currUser = useSelector((state) => state.auth.currUser);
  const contacts = useSelector((state) => state.contact.contacts);

  const csvdata = contacts.map((contact) => ({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    fav: contact.fav,
  }));

  useEffect(() => {
    dispatch(getAuth());
    const authKey = Cookies.get("auth");
    if (authKey) {
      dispatch(fetchContacts(authKey));
    }
  }, [dispatch]);

  const handleLogout = () => {
    toast.success("Logout successful.");
    dispatch(unsetAuth({}));
    navigate("/sign-in");
  };

  if (!currUser || !currUser.id) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <CustomNavbar>
        <Dropdown className="profile">
          <Dropdown.Toggle
            as="div"
            bsPrefix="custom-toggle"
            style={{ cursor: "pointer" }}
          >
            <Avatar className="avatar">
              {currUser.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown.Toggle>
          <DropdownMenu align="end">
            <DropdownHeader>
              <b>Name:</b> {currUser.name} <br />
              <b>Email:</b> {currUser.email}
            </DropdownHeader>
            <Dropdown.Divider />
            <Dropdown.Item as="button">
              <CSVLink data={csvdata}>
                <TiExport /> Export Contacts
              </CSVLink>
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleLogout}>
              <TbLogout /> Logout
            </Dropdown.Item>
          </DropdownMenu>
        </Dropdown>
      </CustomNavbar>
      <div className="sidebar">
        <Button
          variant="contained"
          color="success"
          startIcon={<IoMdPersonAdd />}
          onClick={() => showAddContactModal(true)}
        >
          Create Contact
        </Button>
        <AddContactModal
          show={addContactModal}
          onHide={() => showAddContactModal(false)}
        />
        <Button
          variant="contained"
          startIcon={<LuImport />}
          onClick={() => showImportContactsModal(true)}
        >
          Import Contacts
        </Button>
        <ImportContactsModal
          show={importContactsModal}
          onHide={() => showImportContactsModal(false)}
        />
        <hr />
        <ul>
          <li>
            <NavLink
              to='/home/all'
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <RiContactsBook2Fill size="20px"/> All Contacts
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/home/favorites'
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <MdOutlineFavorite size="20px"/> Favorites
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Home;