import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  // ⭐ GET data from server
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // ⭐ POST data to server
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const newUser = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Inserted:", data);
        form.reset();
      });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>User Management</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Add User</button>
      </form>

      <h2>Total Users: {users.length}</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
