const usuarios=[
    {
        "mail": "ejemplo1@example.com",
        "password": "Contraseña1$"
    },
    {
        "mail": "usuario2@gmail.com",
        "password": "Prueba#23@"
    },
    {
        "mail": "correo3@hotmail.com",
        "password": "Segura$123"
    }
]

export const validarUsuario=(mail,password,setMailError,setPasswordError)=>{
   let aux1=false
   let aux2=false

    usuarios.map(usuario=>{
        if(usuario.mail===mail){
        aux1= true
        }else{
            setMailError('mail incorrecto')
        }
        if(usuario.password===password){
            aux2=true
        }else{
            setPasswordError('password incorrecto')
        }
    })
    if(aux1 && aux2){
        setMailError('')
        setMailError('')
    }
}