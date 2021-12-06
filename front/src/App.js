import * as React from "react";
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import VisitList from './components/VisitList';
import VisitCreate from './components/VisitCreate';
import VisitEdit from './components/VisitEdit';
import IconPerson from '@material-ui/icons/Person';
import IconDashboard from '@material-ui/icons/Dashboard';


import './App.css';

function App() {
  const data = restProvider('http://localhost:3000');
  return (
    <Admin dataProvider={data}>
        <Resource
          icon={IconPerson}
          options={{ label: 'Հիվանդներ' }} 
          name="users"
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
        />
        <Resource icon={IconDashboard} options={{ label: 'Այցելություններ' }} name="visits" list={VisitList} create={VisitCreate} edit={VisitEdit}/>
    </Admin>
  );
}

export default App;
