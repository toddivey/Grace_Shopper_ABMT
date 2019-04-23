import React from 'react'

const ProductForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>Please fill out the fields below:</div>
    {props.addedMessage && <div className="success">{props.addedMessage}</div>}
    <label>Product Name:</label>
    <input
      name="name"
      type="text"
      onChange={props.handleChange}
      value={props.name}
    />
    <label>Product Price:</label>
    <input
      name="price"
      type="text"
      onChange={props.handleChange}
      value={props.price}
    />
    <label>Product Status:</label>
    <input
      name="status"
      type="text"
      onChange={props.handleChange}
      value={props.status}
    />
    <label>Product Description:</label>
    <input
      name="description"
      type="text"
      onChange={props.handleChange}
      value={props.description}
    />
    <label>Product ImageUrl:</label>
    <input
      name="imageUrl"
      type="text"
      onChange={props.handleChange}
      value={props.imageUrl}
    />
    <label>Product Inventory:</label>
    <input
      name="inventory"
      type="text"
      onChange={props.handleChange}
      value={props.inventory}
    />
    <label>Product ABV:</label>
    <input
      name="ABV"
      type="text"
      onChange={props.handleChange}
      value={props.ABV}
    />
    <label>Product brewery:</label>
    <input
      name="brewery"
      type="text"
      onChange={props.handleChange}
      value={props.brewery}
    />
    <button
      type="submit"
      disabled={!props.name || !props.price}
      className="submit"
    >
      Submit
    </button>
    {props.errorMessage && <div className="error">{props.errorMessage}</div>}
  </form>
)

export default ProductForm
