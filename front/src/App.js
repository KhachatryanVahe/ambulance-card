import * as React from "react";
import { Admin, Resource } from 'react-admin';

import { PatientList, PatientCreate, PatientEdit, PatientShow } from './components/Patient';
import { VisitCreate, VisitList, VisitEdit, VisitShow } from './components/Visit';
import { QueueList, QueueCreate, QueueEdit, QueueShow } from "./components/Queue"
import { CustomLayout } from "./components/CustomLayout";
import dataProv from "./dataProv";

import './App.css';

function App() {
  let HOST = process.env.REACT_APP_HOST || "localhost"
  let PORT = process.env.REACT_APP_PORT || 5000
  const url = `http://${HOST}:${PORT}`
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
