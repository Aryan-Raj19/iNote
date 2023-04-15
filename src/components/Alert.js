import React from "react";

function Alert(props) {
  return (
    <div>
      {props.alert && (
        <div className={`alert sticky-top alert-${props.alert.type}`} role="alert" >
          <p className="pt-3"><strong>{props.alert.head && `${props.alert.head}`.toUpperCase()}</strong> {props.alert.message}</p>
        </div>
      )}
    </div>
  );
}

export default Alert;
