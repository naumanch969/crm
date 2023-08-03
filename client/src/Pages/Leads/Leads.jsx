import React, { useState } from 'react';
import Topbar from './Topbar';
import Kanban from './Kanban/Kanban';
import Table from './Table/Table';
import { person5 } from '../../assets';

const Leads = () => {

    const [view, setView] = useState('table')

    const [leads, setLeads] = useState([
        {
            _id: '1',
            type: 'new',
            title: 'New coming soon page',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }, { image: person5, name: 'steven' }, { image: person5, name: 'steven' }],
            status: 'pending'
        },
        {
            _id: '2',
            type: 'disqualified',
            title: 'Wordpress theme design',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '3',
            type: 'qualified',
            title: 'Login page redesign',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '4',
            type: 'new',
            title: 'Migrate from Loom',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '5',
            type: 'converted',
            title: 'Create a new logo',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '6',
            type: 'proposalSent',
            title: 'Custom landing page',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '7',
            type: 'qualified',
            title: 'Update the leads page',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'pending'
        },
        {
            _id: '8',
            type: 'disqualified',
            title: 'Android stock taking',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'completed'
        },
        {
            _id: '9',
            type: 'proposalSent',
            title: 'Web hosting',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'pending'
        },
        {
            _id: '10',
            type: 'contacted',
            title: 'Custom web design',
            value: '4,500.00',
            contact: 'Aniel Watson',
            telephone: '',
            created: '08-13-2020',
            contacted: '08-13-2020',
            email: '',
            contentType: 'Unknown',
            targetDate: '10-01-2021',
            alarm: {
                time: '10:14',
                date: '09-20-2022',
                CTA: 'Email some mockups'
            },
            assigned: [{ image: person5, name: 'steven' }],
            status: 'pending'
        },
    ])


    return (
        <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >
            <Topbar view={view} setView={setView} />
            {
                view == 'table'
                    ?
                    <Table leads={leads} setLeads={setLeads} />
                    :
                    <Kanban leads={leads} setLeads={setLeads} />
            }
        </div>
    );
}

export default Leads;