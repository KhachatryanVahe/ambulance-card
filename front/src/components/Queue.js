import React from "react";
import {
    List,
    Create,
    Edit,
    Show,
    SimpleForm,
    Datagrid,
    TextField,
    DateField,
    SelectField,
    EditButton,
    ShowButton,
    TextInput,
    DateTimeInput,
    SelectInput,
    SimpleShowLayout
} from "react-admin";

import {QueueListActions, QueueEditActions, QueueShowActions} from "./Actions"
import translation from "../translation.json"
import data from "../data.json"

export const QueueList = (props) => {
    var queue = translation.queue
    const queueFilters = [
        <TextInput label={queue.name} source="name" alwaysOn />,
    ];
    return (
        <List
            {...props}
            filters={queueFilters}
            title={queue.queueTitle}
            actions={<QueueListActions/>}
            pagination={false}
            exporter={false}
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField sortable={false} label={queue.name} source="name" />
                <DateField sortable={false} label={queue.date} showTime source="date" />
                <TextField sortable={false} label={queue.doctorName} source="doctorName"/>
                <SelectField sortable={false} label={queue.department} source="department" choices={data.departments}/>
                <EditButton sortable={"false"} label={queue.editButton} source="/queue" />
                <ShowButton sortable={"false"} label={queue.showButton} source="/queue"/>
            </Datagrid>
        </List>
    )
}

export const QueueCreate = (props) => {
    var queue = translation.queue
    return(
        <Create title={queue.createTitle} {...props}>
            <SimpleForm>
                <TextInput label={queue.name} source="name"/>
                <DateTimeInput label={queue.date} source="date" />
                <TextInput label={queue.doctorName} source="doctorName" />
                <SelectInput label={queue.department} source="department" choices={data.departments}/>
            </SimpleForm>
        </Create>
    )
}

export const QueueEdit = (props) => {
    var queue = translation.queue
    return(
        <Edit
            {...props}
            title={queue.editTitle}
            actions={<QueueEditActions/>}
        >
            <SimpleForm>
                <TextInput label={queue.name} source="name"/>
                <DateTimeInput label={queue.date} source="date" />
                <TextInput label={queue.doctorName} source="doctorName" />
                <SelectInput label={queue.department} source="department" choices={data.departments}/>
            </SimpleForm>
        </Edit>
    )
}

export const QueueShow = (props) => {
    var queue = translation.queue
    return(
        <Show
            {...props}
            title={queue.queueTitle}
            actions={<QueueShowActions/>}
        >
            <SimpleShowLayout>
                <TextField label={queue.name} source="name" />
                <DateField label={queue.date} showTime source="date" />
                <TextField label={queue.doctorName} source="doctorName"/>
                <SelectField label={queue.department} source="department" choices={data.departments}/>
            </SimpleShowLayout>
        </Show>
    );
}