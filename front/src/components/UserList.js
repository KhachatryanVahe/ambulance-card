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

const UserList = (props) => {
    const usersFilters = [
        <TextInput label="Անձնագիր"  source="id" alwaysOn />,
        <TextInput label="Անուն, ազգանուն" source="name" alwaysOn/>,
    ];
    return (
        <List {...props}
            filters={usersFilters}
        >
            <Datagrid>
                <TextField label="Անձնագիր" source="id"/>
                <TextField label="Անուն, Ազգանուն" source="name"/>
                <TextField label="Հեռախոս" source="phone"/>
                <TextField label="Ծնդյան օր" source="birthDate"/>
                <TextField label="Արյան խումբ" source="bloodGroup"/>
                <TextField label="Հասցե" source="address"/>
                <EditButton label="Փոփոխել" basePath="/users"/>
                <DeleteButton label="Ջնջել" source="/users"/>
                <Button label="Այցելություն" basePath="/visits"/>
            </Datagrid>
        </List>
    )
}

export default UserList;