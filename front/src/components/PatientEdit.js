import React from "react";
import {Edit, SimpleForm, TextInput, DateInput} from "react-admin"
import translation from "../translation.json"

const PatientEdit = (props) => {
    var patient = translation.patient
    return(
        <Edit title={patient.editTitle} {...props}>
            <SimpleForm>
                <TextInput label={patient.id} source="id"/>
                <TextInput label={patient.name} source="name"/>
                <TextInput label={patient.phone} source="phone"/>
                <DateInput label={patient.birthDate} source="birthDate"/>
                <TextInput label={patient.bloodGroup} source="bloodGroup"/>
                <TextInput label={patient.address} source="address"/>
            </SimpleForm>
        </Edit>
    )
}
export default PatientEdit;