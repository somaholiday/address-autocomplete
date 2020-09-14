import React from "react";

import "./Address.css";

const Address = ({
  name,
  address_city,
  address_country,
  address_line1,
  address_line2,
  address_state,
  address_zip,
  id,
}) => (
  <div className="Address">
    <div>{name}</div>
    <div>
      {address_line1} {address_line2}
    </div>
    <div>
      {address_city}, {address_state} {address_zip}
    </div>
    <div>{address_country}</div>
  </div>
);

export default Address;
