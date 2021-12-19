import React from "react";
import {
    List,
    Create,
    Edit,
    Show,
    Datagrid,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    TextField,
    DateField,
    SelectField,
    EditButton,
    DeleteButton,
    ShowButton,
    SimpleShowLayout,
} from "react-admin"

import {VisitsListActions, VisitShowActions, VisitEditActions} from './Actions'
import translation from "../translation.json"


export const VisitList = (props) => {
    var visit = translation.visit
    const visitsFilters = [
        <DateInput label={visit.visitDate}  source="visitDate" alwaysOn />,
        <TextInput label={visit.department} source="department" alwaysOn/>,
    ];
    return (
        <List
        {...props}
        filters={visitsFilters}
        title={visit.visitsTitle}
        actions={<VisitsListActions/>}
        pagination={false}
        >
            <Datagrid>
                <DateField sortable={false} label={visit.visitDate} source="visitDate"/>
                <TextField sortable={false} label={visit.department} source="department"/>
                <TextField sortable={false} label={visit.doctorName} source="doctorName"/>
                <TextField sortable={false} label={visit.sale} source="sale"/>
                <TextField sortable={false} label={visit.medication} source="medication"/>
                <DateField sortable={false} label={visit.dischrgeDate} source="dischrgeDate"/>
                <EditButton sortable={false} label={visit.editButton} source="/visits"/>
                <DeleteButton sortable={false} label={visit.deleteButton} source="/visits"/>
                <ShowButton sortable={false} label={visit.showButton} source="/visits"/>
            </Datagrid>
        </List>
    )
}

export const VisitCreate = (props) => {
    var visit = translation.visit
    return(
        <Create title={visit.createTitle} {...props}>
            <SimpleForm>
                <DateInput label={visit.visitDate} source="visitDate"/>
                <TextInput label={visit.department} source="department"/>
                <TextInput label={visit.doctorName} source="doctorName"/>
                <TextInput label={visit.sale} source="sale"/>
                <TextInput label={visit.medication} source="medication"/>
                <DateInput label={visit.dischrgeDate} source="dischrgeDate"/>
                <TextInput disabled source="patientId" value={""}/>
            </SimpleForm>
        </Create>
    )
}

export const VisitEdit = (props) => {
    var visit = translation.visit
    return(
        <Edit
            {...props}
            title={visit.editTitle}
            actions={<VisitEditActions/>}
        >
            <SimpleForm>
                <DateInput label={visit.visitDate} source="visitDate"/>
                <TextInput label={visit.department} source="department"/>
                <TextInput label={visit.doctorName} source="doctorName"/>
                <TextInput label={visit.sale} source="sale"/>
                <TextInput label={visit.medication} source="medication"/>
                <DateInput label={visit.dischrgeDate} source="dischrgeDate"/>
            </SimpleForm>
        </Edit>
    )
}

export const VisitShow = (props) => {
    var visit = translation.visit
    return(
        <Show 
            title={visit.showTitle}
            actions={<VisitShowActions/>}
            {...props}
        >
            <SimpleShowLayout>
                <DateField label={visit.visitDate} source="visitDate"/>
                <TextField label={visit.department} source="department"/>
                <TextField label={visit.doctorName} source="doctorName"/>
                <TextField label={visit.sale} source="sale"/>
                <TextField label={visit.medication} source="medication"/>
                <DateField label={visit.dischrgeDate} source="dischrgeDate"/>
            </SimpleShowLayout>
        </Show>
    );
}