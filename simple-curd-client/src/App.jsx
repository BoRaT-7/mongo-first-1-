import './App.css'

function App() {
  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
     

    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type':'application/json'

      },
      body:JSON.stringify(user)
    })
    .then(res =>res.json())
    .then(data => {
      console.log(data);
    })
    // form reset করতে চাওলে
    form.reset();
  }

  return (
    <>
      <h1>Simple CRUD</h1>

      {/* ✅ onSubmit এখানে যুক্ত করো */}
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Enter name" required /><br /><br />
        <input type="email" name="email" placeholder="Enter email" required /><br /><br />
        <input type="submit" value="Add User" /><br />
      </form>
    </>
  )
}

export default App;
