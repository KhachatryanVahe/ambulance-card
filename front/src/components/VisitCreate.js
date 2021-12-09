import React from "react";
import {Create, SimpleForm, TextInput, DateInput} from "react-admin"
import translation from "../translation.json"

const VisitCreate = (props) => {
    var visit = translation.visit
    return(
        <Create title={visit.createTitle} {...props}>
            <SimpleForm>
                <DateInput label={visit.visitDate} source="visitDate"/>
                <TextInput label={visit.department} source="department"/>
                <TextInput label={visit.doctorName} source="doctorName"/>
                <TextInput label={visit.sale} source="sale"/>
                <TextInput label={visit.medication} source="medication"/>
                <DateInput label={visit.dischrgeDate} source="dischrgeDate"/>
            </SimpleForm>
        </Create>
    )
}
export default VisitCreate;