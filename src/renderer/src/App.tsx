import { Button } from 'react-bootstrap'
import { UsuarioDTO } from './dto/usuario.dto'

function App(): JSX.Element {
  const usuario: UsuarioDTO = {
    nome: 'Lucas',
    telefone: '123',
    email: 'lucas@lucas',
    password: '123',
  }
  console.log(usuario)
  return (
    <div className="container">
      <Button variant="danger" className="btn-app-primary">
        Hello World
      </Button>
    </div>
  )
}

export default App
