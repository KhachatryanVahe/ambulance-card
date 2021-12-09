import React from "react";
import {Edit, SimpleForm, TextInput, DateInput} from "react-admin"
import translation from "../translation.json"

const PatientEdit = (props) => {
    var user = translation.user
    return(
        <Edit title={user.editTitle} {...props}>
            <SimpleForm>
                <TextInput label={user.id} source="id"/>
                <TextInput label={user.name} source="name"/>
                <TextInput label={user.phone} source="phone"/>
                <DateInput label={user.birthDate} source="birthDate"/>
                <TextInput label={user.bloodGroup} source="bloodGroup"/>
                <TextInput label={user.address} source="address"/>
            </SimpleForm>
        </Edit>
    )
}
export default PatientEdit;