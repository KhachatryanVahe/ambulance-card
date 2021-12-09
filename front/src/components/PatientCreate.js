import React from "react";
import {Create, SimpleForm, TextInput, DateInput} from "react-admin"
import translation from "../translation.json"

const PatientCreate = (props) => {
    var user = translation.user
    return(
        <Create title={user.createTitle} {...props}>
            <SimpleForm>
                <TextInput label={user.id} source="id"/>
                <TextInput label={user.name} source="name"/>
                <TextInput label={user.phone} source="phone"/>
                <DateInput label={user.birthDate} source="birthDate"/>
                <TextInput label={user.bloodGroup} source="bloodGroup"/>
                <TextInput label={user.address} source="address"/>
            </SimpleForm>
        </Create>
    )
}
export default PatientCreate;