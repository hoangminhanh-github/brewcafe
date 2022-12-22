import "./InputField.scss";

import React from "react";

const InputField = ({ formik, name }: any) => {
  return (
    <div className="register-form-group">
      <label htmlFor={name}>
        {name}
        <span style={{ color: "red" }}> *</span>
      </label>
      <input
        name={name}
        type="text"
        className="form-control"
        id={name}
        aria-describedby="emailHelp"
        placeholder={`nhập ${name} ....`}
        onChange={formik.handleChange}
      />
      {formik.errors[name] && formik.touched[name] && (
        <span className="mess-err">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default InputField;
