import React from "react";
import {
    List,
    Create,
    Edit,
    Show,
    SimpleForm,
    Datagrid,
    TextField,
    DateField,
    SelectField,
    FunctionField,
    EditButton,
    ShowButton,
    TextInput,
    DateInput,
    SelectInput,
    SimpleShowLayout,
} from "react-admin";
import { Link } from "react-router-dom";

import {PatientShowActions, PatientListActions, PatientEditActions} from "./Actions"
import translation from "../translation.json"
import data from "../data.json"

export const PatientList = (props) => {
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
            actions={<PatientListActions/>}
            pagination={false}
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField sortable={false} label={patient.id} source="id" />
                <TextField sortable={false} label={patient.name} source="name" />
                <TextField sortable={false} label={patient.phone} source="phone" />
                <DateField sortable={false} label={patient.birthDate} source="birthDate" />
                <TextField sortable={false} label={patient.address} source="address" />
                <SelectField sortable={false} label={patient.appa} source="appa" choices={data.appa}/>

                <EditButton sortable={false} label={patient.editButton} source="/patients" />
                <ShowButton sortable={false} label={patient.showButton} source="/patients"/>
                <FunctionField sortable={false} label={patient.visits} render={record => <Link to={{
                    pathname: "/visits",
                    search: `?filter=${JSON.stringify({ patientId: record.id })}`,
                }}>
                    {patient.visits}
                </Link>} />
            </Datagrid>
        </List>
    )
}

export const PatientCreate = (props) => {
    var patient = translation.patient
    return(
        <Create title={patient.createTitle} {...props}>
            <SimpleForm>
                <TextInput label={patient.id} source="id"/>
                <TextInput label={patient.name} source="name"/>
                <TextInput label={patient.phone} source="phone"/>
                <DateInput label={patient.birthDate} source="birthDate"/>
                <TextInput label={patient.address} source="address"/>
                <SelectInput label={patient.appa} source="appa" choices={data.appa}/>
            </SimpleForm>
        </Create>
    )
}

export const PatientEdit = (props) => {
    var patient = translation.patient
    return(
        <Edit
            title={patient.editTitle}
            {...props}
            actions={<PatientEditActions/>}
        >
            <SimpleForm>
                <TextInput label={patient.id} source="id"/>
                <TextInput label={patient.name} source="name"/>
                <TextInput label={patient.phone} source="phone"/>
                <DateInput label={patient.birthDate} source="birthDate"/>
                <TextInput label={patient.address} source="address"/>
                <SelectInput label={patient.appa} source="appa" choices={data.appa}/>
            </SimpleForm>
        </Edit>
    )
}

export const PatientShow = (props) => {
    var patient = translation.patient
    return(
        <Show
            title={patient.showTitle}
            actions={<PatientShowActions/>}
            {...props}
        >
            <SimpleShowLayout>
                <TextField label={patient.id} source="id"/>
                <TextField label={patient.name} source="name"/>
                <TextField label={patient.phone} source="phone"/>
                <DateField label={patient.birthDate} source="birthDate"/>
                <TextField label={patient.address} source="address"/>
                <SelectField sortable={false} label={patient.appa} source="appa" choices={data.appa}/>
            </SimpleShowLayout>
        </Show>
    );
}