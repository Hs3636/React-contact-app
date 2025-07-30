import { Button } from "@mui/material";
import ProfileImg from "../assets/profile.png";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const ContactCard = ({contact}) => {
  return (
    <div className="card">
      <img className="cardImg" src={contact?.profileImg || ProfileImg} alt="" />
      <h4 className="card-title">{contact?.name}</h4>
      <div className="card-content">
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <MdEmail size="20px" /> {contact?.email}
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaPhoneAlt size="14px" /> {contact?.phone}
        </p>
      </div>
      <Button variant="outlined" style={{borderRadius: "20px"}} endIcon={<FaRegArrowAltCircleRight />}><Link to={`/home/${contact.id}`}>view contact</Link></Button>
    </div>
  )
}

export default ContactCard