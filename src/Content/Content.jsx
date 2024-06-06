import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteUser from '../Modal/Modal'
import s from './Content.module.css'

function Content({ users, getUsers, setEditableUser }) {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [removableUser, setRemovableUser] = useState(null);

    const handleDelete = (id, name) => {
        setActive(true)
        setRemovableUser({ id, name })
    }

    const closeModal = () => {
        setActive(false)
    }

    const removeUser = () => {
        fetch(`/api/users/${removableUser.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(json => {
                getUsers()
                closeModal()
            })
            .catch(err => console.log(err))
    }
    
    const editUser = (id) => {
        setEditableUser(id)
        navigate('/update-user')
    }

    return (
        <>
            <div className='container'>
                <div className={s.table__linkBlock} >
                    <NavLink to='/create-user' className={s.table__link}> Создать</NavLink>
                </div>
                <div className="row jusify-content-center">
                    <div className='col'>
                        {users?.length > 0 ? (
                            <table className='table'>
                                <thead>
                                    <tr className="table-success">
                                        <th >Имя</th>
                                        <th >Должность</th>
                                        <th >Характеристика</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(({ id, name, role, characteristic }) => (
                                        <tr key={id}>
                                            <td>{name}</td>
                                            <td>{role}</td>
                                            <td className={s.table__characteristic}>
                                                {characteristic}
                                                <div className={s.table__btn}>
                                                    <button className='btn btn-outline-info' onClick={() => editUser(id)}> Редактировать</button>
                                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(id, name)}>Удалить</button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div></div>
                        )
                        }
                    </div>
                </div>
                <DeleteUser active={active} setActive={setActive} user={removableUser} onSubmit={removeUser} onClose={closeModal} />
            </div>
        </>
    )
}

export default Content
