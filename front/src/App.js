import * as React from "react";
import { Admin, Resource } from 'react-admin';

import PatientList from './components/PatientList';
import PatientCreate from './components/PatientCreate';
import PatientEdit from './components/PatientEdit';
import VisitList from './components/VisitList';
import VisitCreate from './components/VisitCreate';
import VisitEdit from './components/VisitEdit';
import {CustomLayout} from "./components/CustomLayout";
import dataProv from "./dataProv";

import './App.css';

function App() {
  const url = "http://localhost:3000"
  const provider = dataProv(url)
  return (
    <Admin layout={CustomLayout} dataProvider={provider}>
        <Resource
          name="patients"
          list={PatientList}
          create={PatientCreate}
          edit={PatientEdit}
        />
        <Resource
          name="visits"
          list={VisitList}
          create={VisitCreate}
          edit={VisitEdit}
        />
    </Admin>
  );
}

export default App;
