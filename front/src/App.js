import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserIcon } from "@material-ui/icons/People";
import restProvider from 'ra-data-simple-rest';
import UsersList from './components/UsersList';
import UsersCreate from './components/UsersCreate';

import './App.css';


function App() {
  const data = restProvider('http://localhost:3000');
  return (
    <Admin dataProvider={data}>
        <Resource icon={UserIcon} options={{ label: 'Հիվանդներ' }} name="users" list={UsersList} create={UsersCreate}/>

    </Admin>
  );
}

export default App;
