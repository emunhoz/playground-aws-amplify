import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Users } from './models';

function App() {
  const [userList, setUserList] = useState<any>([])
  const [userName, setUserName] = useState<string>('')

  async function getUser() {
    const models = await DataStore.query(Users);
    setUserList(models)
  }

  async function createUser(name: string) {
    await DataStore.save(new Users({ name }))

    getUser()
  }

  async function deleteUser(id: string) {
    const modelToDelete = await DataStore.query(Users, id);
    DataStore.delete(modelToDelete as any);

    getUser()
  }

  return (
    <div className="App">
      <header className="App-header">

        <input onChange={(e) => setUserName(e.target.value)} />
        <button onClick={() => createUser(userName)}>Create user</button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user: { id: string; name: string }) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td><small>{user.id}</small></td>
                <td><button onClick={() => deleteUser(user.id)}>Delete user</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={getUser}>Get data</button>
      </header>
    </div>
  );
}

export default App;
