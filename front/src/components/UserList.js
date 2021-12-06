import React from "react";
import {
    List,
    TextField,
    Datagrid,
    EditButton,
    DeleteButton,
    CreateButton,
    TextInput
} from "react-admin";
import ListActions from "../Action";

const UserList = (props) => {
    const postFilters = [
        <TextInput label="Անձնագիր"  source="id" alwaysOn />,
        <TextInput label="Անուն, ազգանուն" source="name" alwaysOn/>,
    ];
    return (
        <List {...props}  
            // actions={<ListActions/>}
            filters={postFilters}
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
                <CreateButton label="Այցելություն" basePath="/visits"/>
            </Datagrid>
        </List>
    )
}

export default UserList;