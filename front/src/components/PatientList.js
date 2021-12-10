import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    TextInput
} from "react-admin";
import { Link } from "react-router-dom";
import translation from "../translation.json"

const PatientList = (props) => {
    var patient = translation.patient
    const patientsFilters = [
        <TextInput label={patient.id}  source="id" alwaysOn />,
        <TextInput label={patient.name} source="name" alwaysOn/>,
    ];
    console.log("props => ", props)
    return (
        <List
            {...props}
            filters={patientsFilters}
        >
            <Datagrid>
                <TextField label={patient.id} source="id"/>
                <TextField label={patient.name} source="name"/>
                <TextField label={patient.phone} source="phone"/>
                <TextField label={patient.birthDate} source="birthDate"/>
                <TextField label={patient.bloodGroup} source="bloodGroup"/>
                <TextField label={patient.address} source="address"/>
                <EditButton label={patient.editButton} source="/patients"/>
                <DeleteButton label={patient.deleteButton} source="/patients"/>
                <Link to={{
                    pathname: "/patients",
                    search: `?id=10`//${patient.id}`,
                }}>
                    {patient.visits}
                </Link>
            </Datagrid>
        </List>
    )
}

export default PatientList;