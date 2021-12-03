import React from "react";
import {Create, SimpleForm, TextInput, DateInput} from "react-admin"

const VisitCreate = (props) => {
    return(
        <Create title={"Create a visit"} {...props}>
            <SimpleForm>
                <DateInput label="Ամսաթիվ" source="visitDate"/>
                <TextInput label="Բաժանմունք" source="department"/>
                <TextInput label="Բժշկի անուն" source="doctorName"/>
                <TextInput label="Վճարում" source="sale"/>
                <TextInput label="Դեղորայք" source="medication"/>
                <DateInput label="Դուրսգրման ամսաթիվ" source="dischrgeDate"/>
            </SimpleForm>
        </Create>
    )
}
export default VisitCreate;