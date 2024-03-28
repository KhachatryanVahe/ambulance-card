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
  const [authProvider, setAuthProvider] = React.useState(null);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        return Promise.resolve();
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return Promise.reject(error.message || 'Authentication error');
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  };

  if (!authProvider) {
    setAuthProvider({
      login: handleLogin,
      logout: handleLogout,
      checkError: () => Promise.resolve(),
      checkAuth: () => localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
      getPermissions: () => Promise.resolve(),
    });
  }

  return (
    <Admin layout={CustomLayout} authProvider={authProvider} dataProvider={provider}>
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
