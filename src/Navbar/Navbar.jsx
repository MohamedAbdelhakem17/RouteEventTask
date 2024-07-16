import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed w-100 top-0">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>User Transactions</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/chart"}>Chart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>

}
