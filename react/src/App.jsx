import { useState } from 'react'
// No used images
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// New modules
import { ApolloClient, inMemoryCache, ApolloProvider, useLazyQuery, gql } from '@apollo/client';
import { Container, Row, Form, Button } from "react-bootstrap"

// Random stuff imported by itself xd
import e from 'express';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new inMemoryCache(),
})

const HELLO_QUERY = gql`
query Hello($message: String!) {
  hello(message: $message)
}
`;

// This function was created
function hello() {
  const [message, setMessage] = useState("");
  const [getGreating, {loading, error, data}] = useLazyQuery(HELLO_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreating({variables: {message}})
  }

  if(loading) return <p>Cargando</p>;
  if(error) return <p>Error :v</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlID= "formMessage">
      <Form.Control type= "text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe un mensaje"
      />
      </Form.Group>
      <Button className="nt-2" variant="primary" type="submit">
        Enviar
      </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.hello}</h2>}
    </div>
  )

}

// This was changed 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
