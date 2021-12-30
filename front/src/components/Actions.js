import { CreateButton, EditButton, ShowButton, ExportButton, TopToolbar } from 'react-admin';

import translation from "../translation.json"

export const PatientListActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <CreateButton basePath={basePath} label={translation.visit.createButton}/>
            <ExportButton/>
        </TopToolbar>
    )
};

export const PatientShowActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <EditButton basePath={basePath} record={data} label={translation.patient.editButton}/>
            <CreateButton to={`/visits/create/${data.id}`} label={translation.visit.createButton}/>
        </TopToolbar>
    )
};

export const PatientEditActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <ShowButton basePath={basePath} record={data} label={translation.patient.showButton}/>
        </TopToolbar>
    )
};

export const VisitsListActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            {/* <CreateButton basePath={basePath} label={translation.visit.createButton}/> */}
            <ExportButton/>
        </TopToolbar>
    )
};

export const VisitShowActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <EditButton basePath={basePath} record={data} label={translation.visit.editButton}/>
        </TopToolbar>
    )
};

export const VisitEditActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <ShowButton basePath={basePath} record={data} label={translation.visit.showButton}/>
        </TopToolbar>
    )
};

export const QueueListActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <CreateButton basePath={basePath} label={translation.queue.createButton}/>
        </TopToolbar>
    )
};

export const QueueShowActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <EditButton basePath={basePath} record={data} label={translation.queue.editButton}/>
        </TopToolbar>
    )
};

export const QueueEditActions = ({ basePath, data, resource }) => {
    return(
        <TopToolbar>
            <ShowButton basePath={basePath} record={data} label={translation.queue.showButton}/>
        </TopToolbar>
    )
};