import './Modal.css'

function DeleteUser({ active, setActive, user, onClose, onSubmit }) {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal'} onClick={e => e.stopPropagation()}>
        <div className='modal__header'>
          <h4>Удалить {active === true ? user.name : null}?</h4>
        </div>
        <div className='modal__btn'>
          <button className='btn btn-success' onClick={onSubmit}>Да</button>
          <button className='btn btn-danger' onClick={onClose}>Нет</button>
        </div>
      </div>
    </div>
  )

}

export default DeleteUser