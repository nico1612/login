import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RecordarPassword=()=>{
    const [correo,setCorreo]=useState('')
    const navigate =useNavigate()
    const handleSubmit=()=>{
        
    }
    const volver=()=>{
        navigate("/")
    }
    return(
        <div className="flexContainer">
            <div className="flexGeneral border border-dark">
                <h1>Forgot Password</h1>
                <div className="labelMail">
                    <label className="form-label">Mail</label>
                    <input
                        type="email"
                        className={`form-control`}
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <button className="btn btn-dark" onClick={handleSubmit}>send</button>
                <button className="btn volver btn-volver" onClick={volver}>home</button>
            </div>
        </div>
    )
}