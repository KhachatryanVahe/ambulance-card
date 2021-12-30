import * as React from "react";
import { Admin, Resource } from 'react-admin';

import { PatientList, PatientCreate, PatientEdit, PatientShow } from './components/Patient';
import { VisitCreate, VisitList, VisitEdit, VisitShow } from './components/Visit';
import { QueueList, QueueCreate, QueueEdit, QueueShow } from "./components/Queue"
import { CustomLayout } from "./components/CustomLayout";
import dataProv from "./dataProv";

import './App.css';

function App() {
  const url = "http://localhost:3006"
  const provider = dataProv(url)
  return (
    <Admin layout={CustomLayout} dataProvider={provider}>
        <Resource
          name="patients"
          list={PatientList}
          create={PatientCreate}
          edit={PatientEdit}
          show={PatientShow}
        />
        <Resource
          name="visits"
          list={VisitList}
          create={VisitCreate}
          edit={VisitEdit}
          show={VisitShow}
        />
        <Resource
          name="queue"
          list={QueueList}
          create={QueueCreate}
          edit={QueueEdit}
          show={QueueShow}
        />
    </Admin>
  );
}

export default App;
