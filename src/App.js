import  React, { useState } from 'react';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory
} from 'react-router-dom';


const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: Burlywood;
  padding: 1em;
`;

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

const Home = () => {
  return (
    <div>
      <h2>TKTL react app</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  );
};


const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find(n => n.id === Number(id));
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  );
};


const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>)}
      </ul>
    </div>
  );
};


const Users = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  );
};


const Login = (props) => {

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('mluukkai');
    history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <Input />
        </div>
        <div>
          password: <Input type='password' />
        </div>
        <Button type='submit'>Log In</Button>
      </form>
    </div>
  );
};



const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [ notes, setNotes ]  = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ]);

  const [ user, setUser ]  = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const padding = { padding:5 };

  return (
    <Page>
      <Router>
        <Navigation>
          <Link style={padding} to='/'>Home</Link>
          <Link style={padding} to='/notes'>Notes</Link>
          <Link style={padding} to='/users'>Users</Link>
          {user ?
            <em>{user} logged in</em>
            : <Link style={padding} to='/login'>login</Link>
          }
        </Navigation>

        <Switch>
          <Route path='/notes/:id'>
            <Note notes={notes} />
          </Route>
          <Route path='/notes'>
            <Notes notes={notes}/>
          </Route>
          <Route path='/users'>
            {user ? <Users /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <Login onLogin={login} />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer>
        <br/>
        <em>Prepared By Kazi Shoaib Muhammad</em>
      </Footer>
    </Page>
  );


};

export default App;