import React from "react";
import {
    List,
    TextField,
    DateField,
    Datagrid,
    EditButton,
    DeleteButton,
    TextInput
} from "react-admin";
import translation from "../translation.json"

const VisitList = (props) => {
    var visit = translation.visit
    const visitsFilters = [
        <TextInput label={visit.visitDate}  source="visitDate" alwaysOn />,
        <TextInput label={visit.department} source="department" alwaysOn/>,
    ];
    return (
        <List
            {...props}
            filters={visitsFilters}
        >
            <Datagrid>
                <DateField label={visit.visitDate} source="visitDate"/>
                <TextField label={visit.department} source="department"/>
                <TextField label={visit.doctorName} source="doctorName"/>
                <TextField label={visit.sale} source="sale"/>
                <TextField label={visit.medication} source="medication"/>
                <DateField label={visit.dischrgeDate} source="dischrgeDate"/>
                <EditButton label={visit.editButton} source="/visits"/>
                <DeleteButton label={visit.deleteButton} source="/visits"/>
            </Datagrid>
        </List>
    )
}

export default VisitList;