import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './CreateUser.module.css'

function CreateUser({ users, setUsers, getUsers }) {
  const navigate = useNavigate()
  const roles = ['Программист', 'Дизайнер']

  const [name, setName] = useState('')
  const [role, setRole] = useState(roles[0])
  const [characteristic, setCharacteristic] = useState('')


  const handleClick = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, role, characteristic }),
    })
      .then(res => res.json())
      .then(json => {
        setUsers([...users, json.user])
        getUsers()
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  const cancelClick = () => (
    navigate('/')
  )

  return (
    <>
      <form className={s.form}>
        <input type='text' className='form-control' placeholder='Имя' onChange={(e) => setName(e.target.value)}></input>
        <select className={'form-select ' + s.form__role} onChange={(e) => setRole(e.target.value)}>
          <option disabled={true} value="Должность" selected={true}>Должность</option>
          {roles.map((opt) => (<option key={[opt]} value={opt}>{opt}</option>))}
        </select>
        <textarea className={'form-control ' + s.form__characteristic} id="exampleFormControlTextarea1" rows="5" onChange={(e) => setCharacteristic(e.target.value)}></textarea>
        <div className={s.form__btn}>
          <button className='btn btn-success' type='submit' onClick={handleClick}>Сохранить</button>
          <button className='btn btn-danger' type='submit' onClick={cancelClick}>Отмена</button>
        </div>
      </form>
    </>
  )
}

export default CreateUser