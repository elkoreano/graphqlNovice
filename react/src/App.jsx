import { useState } from 'react'
// No used images
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// New modules
import { ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery, gql, } from '@apollo/client';
import { Container, Row, Form, Button, Col } from "react-bootstrap"

// Random stuff imported by itself xd
// import e from 'express';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const HELLO_QUERY = gql`
query Hello($message: String!) {
  hello(message: $message)
}
`;

// This function was created
// React component names must start with an uppercase letter. React Hook names must start with the word "use".
function Hello() {
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
      <Form.Control type= "text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe un nombre"
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
  // const [count, setCount] = useState(0)

  return (
   
   <ApolloProvider client={client}>
    <Container className='my-5'>
    <Row>
    <Col xs={12} md={{ span: 6, offset: 3 }}>
      <h1>Saludo para futuros clientes de X Cakes</h1>
      <Hello/>
      </Col>
      </Row>
      </Container>
      </ApolloProvider>
  )
}

export default App
