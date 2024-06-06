import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import CreateUser from './CreateUser/CreateUser'
import Content from './Content/Content'
import UpdateUser from './UpdateUser/UpdateUser'

function App() {
  const [editableUser, setEditableUser] = useState(null)
  const [users, setUsers] = useState(null)

  const getUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(json => setUsers(json.users))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Content users={users} getUsers={getUsers} setEditableUser={setEditableUser} />} />
        <Route path='/create-user' element={<CreateUser users={users} setUsers={setUsers} getUsers={getUsers} />}></Route>
        <Route path='/update-user' element={<UpdateUser editableUser={editableUser} getUsers={getUsers} />}></Route>
      </Routes>
    </>
  )
}

export default App
