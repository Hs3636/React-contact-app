import React from "react";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";

const HomeIndex = ({ fav }) => {
  const contacts = useSelector((state) => state.contact.contacts);

  if (fav) {
    const favorites = contacts.filter((contact) => contact.fav === true);
    return (
      <div className="all-contacts">
        {favorites.length > 0
          ? favorites.map((item) => (
              <ContactCard contact={item} key={item.id} />
            ))
          : <h1 className="no-data">No contacts added to favorites.</h1>}
      </div>
    );
  }

  return (
    <div className="all-contacts">
      {contacts.length > 0
        ? contacts.map((item) => <ContactCard contact={item} key={item.id} />)
        : <h1 className="no-data">No contacts available.</h1>}
    </div>
  );
};

export default HomeIndex;
