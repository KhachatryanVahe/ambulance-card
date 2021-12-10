import React from "react";
import {Create, SimpleForm, TextInput, DateInput} from "react-admin"
import translation from "../translation.json"

const PatientCreate = (props) => {
    var patient = translation.patient
    return(
        <Create title={patient.createTitle} {...props}>
            <SimpleForm>
                <TextInput label={patient.id} source="id"/>
                <TextInput label={patient.name} source="name"/>
                <TextInput label={patient.phone} source="phone"/>
                <DateInput label={patient.birthDate} source="birthDate"/>
                <TextInput label={patient.bloodGroup} source="bloodGroup"/>
                <TextInput label={patient.address} source="address"/>
            </SimpleForm>
        </Create>
    )
}
export default PatientCreate;