import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton
} from "react-admin";

const UsersList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField label="Անձնագիր" source="id"/>
                <TextField label="Անուն, Ազգանուն" source="name"/>
                <TextField label="Հեռախոս" source="phone"/>
                <TextField label="Ծնդյան օր" source="birthDate"/>
                <TextField label="Արյան խումբ" source="bloodGroup"/>
                <TextField label="Հասցե" source="address"/>
                <EditButton label="Փոփոխել" source="/users"/>
                <DeleteButton label="Ջնջել" source="/users"/>
            </Datagrid>
        </List>
    )
}

export default UsersList;