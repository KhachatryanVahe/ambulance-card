import React from "react";
import {Create, SimpleForm, TextInput, DateInput} from "react-admin"

const UserCreate = (props) => {
    return(
        <Create title={"Create a user"} {...props}>
            <SimpleForm>
                <TextInput label="Անձնագիր" source="id"/>
                <TextInput label="Անուն, Ազգանուն" source="name"/>
                <TextInput label="Հեռախոս" source="phone"/>
                <DateInput label="Ծնդյան օր" source="birthDate"/>
                <TextInput label="Արյան խումբ" source="bloodGroup"/>
                <TextInput label="Հասցե" source="address"/>
            </SimpleForm>
        </Create>
    )
}
export default UserCreate;