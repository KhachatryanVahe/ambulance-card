import React from "react";
import {Edit, SimpleForm, TextInput, DateInput} from "react-admin"

const VisitEdit = (props) => {
    return(
        <Edit title={"Edit visit"} {...props}>
            <SimpleForm>
                <DateInput label="Ամսաթիվ" source="visitDate"/>
                <TextInput label="Բաժանմունք" source="department"/>
                <TextInput label="Բժշկի անուն" source="doctorName"/>
                <TextInput label="Վճարում" source="sale"/>
                <TextInput label="Դեղորայք" source="medication"/>
                <DateInput label="Դուրսգրման ամսաթիվ" source="dischrgeDate"/>
            </SimpleForm>
        </Edit>
    )
}
export default VisitEdit;