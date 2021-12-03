import * as React from "react";
import { Admin, Resource } from 'react-admin';
// import { PersonIcon, EmojiPeopleIcon } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import restProvider from 'ra-data-simple-rest';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import VisitList from './components/VisitList';
import VisitCreate from './components/VisitCreate';
import VisitEdit from './components/VisitEdit';


import './App.css';


function App() {
  const data = restProvider('http://localhost:3000');
  return (
    <Admin dataProvider={data}>
        <Resource icon={PersonIcon} options={{ label: 'Հիվանդներ' }} name="users" list={UserList} create={UserCreate} edit={UserEdit}/>
        <Resource icon={PersonIcon} options={{ label: 'Այցելություններ' }} name="visits" list={VisitList} create={VisitCreate} edit={VisitEdit}/>

    </Admin>
  );
}

export default App;
