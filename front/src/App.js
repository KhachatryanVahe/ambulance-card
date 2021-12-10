import * as React from "react";
import { Admin, Resource } from 'react-admin';
import IconPerson from '@material-ui/icons/Person';
import IconDashboard from '@material-ui/icons/Dashboard';

import PatientList from './components/PatientList';
import PatientCreate from './components/PatientCreate';
import PatientEdit from './components/PatientEdit';
import VisitList from './components/VisitList';
import VisitCreate from './components/VisitCreate';
import VisitEdit from './components/VisitEdit';
import translation from "./translation.json";
import dataProv from "./dataProv";

import './App.css';

function App() {
  const data = dataProv(process.env.REACT_APP_URL)
  console.log("data => ", data)

  return (
    <Admin dataProvider={data}>
        <Resource
          icon={IconPerson}
          options={{ label: translation.menu.patients }}
          name="patients"
          list={PatientList}
          create={PatientCreate}
          edit={PatientEdit}
        />
        <Resource
          icon={IconDashboard}
          options={{ label: translation.menu.visits }}
          name="visits"
          list={VisitList}
          // create={VisitCreate}
          edit={VisitEdit}
        />
    </Admin>
  );
}

export default App;
