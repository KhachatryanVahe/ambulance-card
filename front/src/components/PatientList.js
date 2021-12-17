import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    TextInput,
    FunctionField
} from "react-admin";
import { Link } from "react-router-dom";

import translation from "../translation.json"

const PatientList = (props) => {
    var patient = translation.patient
    const patientsFilters = [
        <TextInput label={patient.id} source="id" alwaysOn />,
        <TextInput label={patient.name} source="name" alwaysOn />,
    ];
    return (
        <List
            {...props}
            filters={patientsFilters}
            title={patient.patientsTitle}
            exporter={false}
            pagination={false}
        >
            <Datagrid>
                <TextField label={patient.id} source="id" />
                <TextField label={patient.name} source="name" />
                <TextField label={patient.phone} source="phone" />
                <TextField label={patient.birthDate} source="birthDate" />
                <TextField label={patient.bloodGroup} source="bloodGroup" />
                <TextField label={patient.address} source="address" />
                <EditButton label={patient.editButton} source="/patients" />
                <DeleteButton label={patient.deleteButton} source="/patients" />
                <FunctionField label="Visits" render={record => <Link to={{
                    pathname: "/visits",
                    search: `?filter=${JSON.stringify({ patientId: record.id })}`,
                }}>
                    {patient.visits}
                </Link>} />
            </Datagrid>
        </List>
    )
}

export default PatientList;