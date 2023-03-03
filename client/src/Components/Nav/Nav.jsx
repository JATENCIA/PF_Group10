import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"
import img from "../../assets/img.png"
import { useSelector } from 'react-redux'

function Nav () {
    const user = useSelector(state => state.user)

    return(
        <>
            <div className="nav">
                <div id="titulo">
                    <h1 className="navp">Tempting</h1>
                    <h2 className="navp2">Argentina</h2>
                </div>
                <Link className="link" to="/home">Home</Link>
                <Link className="link">Nosotros</Link>
                <Link className="link">FAQ</Link>
                <Link className="link">Terminos y condiciones</Link>
                <Link className="link">Contacto</Link>
                <div className={`align-items-center justify-content-end h-100`}>

            
            {user &&
              <Link to='#' className='menu-bars2'>
              <FaIcons.FaUserAstronaut onClick={showSidebar2} />
            </Link>}
            {/* {user &&
              <Navegador link='/HashCash' span='Comprar HashCash' className='nav-link' />}
            {user &&
              <Navegador link='/profile' span='Perfil' className='nav-link' />} */}
            {!user && 
              <Modale
              buttonText={!user ? 'Iniciar sesión' : 'Cerrar sesión'}
              title={!user ? 'Iniciar sesión' : 'Cerrar sesión'}
              render={FormLogin}
              link='/register'
              createAcc
            />}
          </div>
                {/* {
                    user?
                    <div className="container">
                        <div className="btn">
                            <label htmlFor="btn" className="icon2"><img src={img} alt="icono" className="icono"/></label>
                        </div>
                        <input type={"checkbox"}id="btn"/>
                        <div className="opciones">                 
                            <a href="a" className="perfil">Mi perfil</a>
                            <a href="a" className="salir">logout {"[=>"}</a>
                        </div> 
                    </div>
                    :
                    <button>login</button>
                } */}
            </div>
        </>
    )
}

export default Nav