import { useState } from "react";

const CRUDPage = () => {
  const [data, setData] = useState([
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Doe", age: 40 },
  ]);
  const [formData, setFormData] = useState({ name: "", age: "" });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editing) {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      setData([...data, { id: newId, ...formData }]);
    } else {
      const updatedData = data.map((item) =>
        item.id === editId ? { ...item, ...formData } : item
      );
      setData(updatedData);
      setEditing(false);
      setEditId(null);
    }
    setFormData({ name: "", age: "" });
  };

  const handleEdit = (id) => {
    const editItem = data.find((item) => item.id === id);
    setFormData({ name: editItem.name, age: editItem.age });
    setEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div>
      <h1>CRUD Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}, {item.age}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDPage;
