import { UsuarioDTO } from './dto/usuario.dto'

function App(): JSX.Element {
  const usuario: UsuarioDTO = {
    nome: 'Lucas',
    telefone: '123',
    email: 'lucas@lucas',
    password: '123',
  }
  console.log(usuario)
  return <div className="container"></div>
}

export default App
