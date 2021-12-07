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

const VisitList = (props) => {
    const visitsFilters = [
        <TextInput label="Ամսաթիվ"  source="visitDate" alwaysOn />,
        <TextInput label="Բաժանմունք" source="department" alwaysOn/>,
    ];
    return (
        <List 
            {...props}
            filters={visitsFilters}
        >
            <Datagrid>
                <DateField label="Ամսաթիվ" source="visitDate"/>
                <TextField label="Բաժանմունք" source="department"/>
                <TextField label="Բժշկի անուն" source="doctorName"/>
                <TextField label="Վճարում" source="sale"/>
                <TextField label="Դեղորայք" source="medication"/>
                <DateField label="Դուրսգրման ամսաթիվ" source="dischrgeDate"/>
                <EditButton label="Փոփոխել" basePath="/visits"/>
                <DeleteButton label="Ջնջել" source="/visits"/>
            </Datagrid>
        </List>
    )
}

export default VisitList;