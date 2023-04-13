import * as React from 'react';
import { Menu, MenuItemLink } from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HealingIcon from '@mui/icons-material/Healing';

import translation from "../translation.json";

export const MenuBar = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/patients" primaryText={translation.patient.patientsTitle} leftIcon={<PersonIcon />}/>
        <MenuItemLink to="/visits" primaryText={translation.visit.visitsTitle} leftIcon={<HealingIcon />}/>
        <MenuItemLink to="/queue" primaryText={translation.queue.queueTitle} leftIcon={<PeopleAltIcon />}/>
    </Menu>
);