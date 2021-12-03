import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    CreateButton
} from "react-admin";

const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField label="Անձնագիր" source="id"/>
                <TextField label="Անուն, Ազգանուն" source="name"/>
                <TextField label="Հեռախոս" source="phone"/>
                <TextField label="Ծնդյան օր" source="birthDate"/>
                <TextField label="Արյան խումբ" source="bloodGroup"/>
                <TextField label="Հասցե" source="address"/>
                <EditButton label="Փոփոխել" basePath="/users"/>
                <DeleteButton label="Ջնջել" source="/users"/>
                <CreateButton label="Այցելություն" source="/users/"/>
            </Datagrid>
        </List>
    )
}

export default UserList;