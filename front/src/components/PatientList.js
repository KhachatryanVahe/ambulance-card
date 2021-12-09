import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    Button,
    TextInput
} from "react-admin";
import translation from "../translation.json"

const PatientList = (props) => {
    var user = translation.user
    const usersFilters = [
        <TextInput label={user.id}  source="id" alwaysOn />,
        <TextInput label={user.name} source="name" alwaysOn/>,
    ];

    return (
        <List
            {...props}
            filters={usersFilters}
        >
            <Datagrid>
                <TextField label={user.id} source="id"/>
                <TextField label={user.name} source="name"/>
                <TextField label={user.phone} source="phone"/>
                <TextField label={user.birthDate} source="birthDate"/>
                <TextField label={user.bloodGroup} source="bloodGroup"/>
                <TextField label={user.address} source="address"/>
                <EditButton label={user.editButton} basePath="/users"/>
                <DeleteButton label={user.deleteButton} source="/users"/>
                <Button label={user.button} basePath="/visits"/>
            </Datagrid>
        </List>
    )
}

export default PatientList;