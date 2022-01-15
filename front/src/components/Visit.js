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
import data from "../data.json"
import translation from "../translation.json"


export const VisitList = (props) => {
    var visit = translation.visit
    const visitsFilters = [
        <DateInput label={visit.visitDate}  source="visitDate" alwaysOn />,
        <SelectInput label={visit.department} source="department" choices={data.departments} alwaysOn/>,
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
                <SelectField sortable={false} label={visit.department} source="department" choices={data.departments}/>
                <TextField sortable={false} label={visit.doctorName} source="doctorName"/>
                <TextField sortable={false} label={visit.providedService} source="providedService"/>
                <TextField sortable={false} label={visit.saleKey} source="saleKey"/>
                <SelectField sortable={false} label={visit.paymentStatus} source="paymentStatus" choices={data.payment}/>
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
                <SelectInput label={visit.department} source="department" choices={data.departments}/>
                <TextInput label={visit.doctorName} source="doctorName"/>
                <TextInput label={visit.providedService} source="providedService"/>
                <TextInput label={visit.saleKey} source="saleKey"/>
                <SelectInput label={visit.paymentStatus} source="paymentStatus" choices={data.payment}/>
                <DateInput label={visit.dischrgeDate} source="dischrgeDate"/>
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
                <SelectInput label={visit.department} source="department" choices={data.departments}/>
                <TextInput label={visit.doctorName} source="doctorName"/>
                <TextInput label={visit.providedService} source="providedService"/>
                <TextInput label={visit.saleKey} source="saleKey"/>
                <SelectInput label={visit.paymentStatus} source="paymentStatus" choices={data.payment}/>
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
                <SelectField label={visit.department} source="department" choices={data.departments}/>
                <TextField label={visit.doctorName} source="doctorName"/>
                <TextField label={visit.providedService} source="providedService"/>
                <TextField label={visit.saleKey} source="saleKey"/>
                <SelectField label={visit.paymentStatus} source="paymentStatus" choices={data.payment}/>
                <DateField label={visit.dischrgeDate} source="dischrgeDate"/>
            </SimpleShowLayout>
        </Show>
    );
}