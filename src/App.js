import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    // to stop reload page
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value
    const user = { name, email };
    console.log(name, email);


    // post data to server 
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })

  }

  return (
    <div className="App">
      <h1>MY own data :{users.length}</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='NAme'></input>
        <input type="text" name="email" placeholder='Email'></input>
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>name:{user.name}</li>)
        }
      </ul>
    </div >
  );
}

export default App;
