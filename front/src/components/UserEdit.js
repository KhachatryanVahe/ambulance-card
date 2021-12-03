import React from "react";
import {Edit, SimpleForm, TextInput, DateInput} from "react-admin"

const UserEdit = (props) => {
    return(
        <Edit title={"Edit user"} {...props}>
            <SimpleForm>
                <TextInput label="Անձնագիր" source="id"/>
                <TextInput label="Անուն, Ազգանուն" source="name"/>
                <TextInput label="Հեռախոս" source="phone"/>
                <DateInput label="Ծնդյան օր" source="birthDate"/>
                <TextInput label="Արյան խումբ" source="bloodGroup"/>
                <TextInput label="Հասցե" source="address"/>
            </SimpleForm>
        </Edit>
    )
}
export default UserEdit;