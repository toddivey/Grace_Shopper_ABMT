import React from 'react'

const UserForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>Please fill out the fields below:</div>
    {props.addedMessage && <div className="success">{props.addedMessage}</div>}
    <label>User First Name:</label>
    <input
      name="firstName"
      type="text"
      onChange={props.handleChange}
      value={props.firstName}
    />
    <label>User Last Name:</label>
    <input
      name="lastName"
      type="text"
      onChange={props.handleChange}
      value={props.lastName}
    />
    <label>User Email:</label>
    <input
      name="email"
      type="text"
      onChange={props.handleChange}
      value={props.email}
    />
    <label>Is User Admin?</label>
    <input
      name="admin"
      type="text"
      onChange={props.handleChange}
      value={props.admin}
    />
    <label>User Address:</label>
    <input
      name="address"
      type="text"
      onChange={props.handleChange}
      value={props.address}
    />
    <label>User Profile Picture:</label>
    <input
      name="profilePicture"
      type="text"
      onChange={props.handleChange}
      value={props.profilePicture}
    />
    <button
      type="submit"
      disabled={!props.firstName|| !props.lastName}
      className="submit"
    >
      Submit
    </button>
    {props.errorMessage && <div className="error">{props.errorMessage}</div>}
  </form>
)

export default UserForm
