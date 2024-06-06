import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from '../CreateUser/CreateUser.module.css'

function UpdateUser({ editableUser, getUsers }) {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ id: '', name: '', role: '', characteristic: '' })
    const roles = ['Программист', 'Дизайнер']

    useEffect(() => {
        fetch(`/api/users/${editableUser}`)
            .then(res => res.json())
            .then(json => setUserData(json.user))

    }, [editableUser])

    const handleClick = (e) => {
        e.preventDefault();
        fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({ id: userData.id, name: userData.name, role: userData.role, characteristic: userData.characteristic }),
        })
            .then(res => res.json())
            .then(json => {
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
                <input type='text' className='form-control' onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name}></input>
                <select className={'form-select ' + s.form__role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} value={userData.role}>
                    {roles.map((opt) => (<option key={[opt]} value={opt}>{opt}</option>))}
                </select>
                <textarea className={'form-control ' + s.form__characteristic} onChange={(e) => setUserData({ ...userData, characteristic: e.target.value })} value={userData.characteristic}></textarea>
                <div className={s.form__btn}>
                    <button className='btn btn-success' type='submit' onClick={handleClick}>Редактировать</button>
                    <button className='btn btn-danger' type='submit' onClick={cancelClick}>Отмена</button>
                </div>
            </form>
        </>
    )
}

export default UpdateUser