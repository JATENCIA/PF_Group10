import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import style from './Modale.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Modale (props) {
  const login = useSelector(state => state.login)
  const user = useSelector(state => state.user)
  useEffect(() => { handleChange() }, [login])
  const [show, setShow] = useState(login)
  const handleChange = () => setShow(!show)

  return (
    <>
      <div className={!props.styleButton ? `${style.navlink}` : ''} type='button' onClick={handleChange}>
        {props.buttonText}
      </div>
      
      <Modal show={show} onHide={handleChange} className={style.modal}>
        
        <Modal.Header closeButton className={style.modal_tittle}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className={style.modal_body}>
          {/* Esperamos un componente a renderizar en el body del modal sino un texto y caso que no esten tiramos un texto */}
          {
            props.render ? <props.render  /> : props.body ? props.body : 'Debes pasar la data por body o pasar el componente a renderizar'
          }
        </Modal.Body>

        {!user &&
          <Modal.Footer className={style.modal_footer}>
            
            <div className={style.link_cnt}>
              <Link className={style.footer_link} to='/forgotPassword'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            
            {/* <div className='fs-4'>
              {props.close && <Button variant='secondary' onClick={handleChange}>Cerrar</Button>}
              {props.createAcc && <p className='fs-4 pt-3' data-bs-dismiss='modal' onClick={handleChange}><Link className='text-primary' to='/register'> Crea tu cuenta!</Link></p>}
            </div> */}
          </Modal.Footer>}
      </Modal>
    </>
  )
}
