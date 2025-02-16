import React from "react";
import { Link } from "react-router-dom";
export default function Input(props) {
    return (
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    );
}