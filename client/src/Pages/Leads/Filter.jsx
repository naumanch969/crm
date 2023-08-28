import React, { useState } from 'react';
import { Drawer, Button, TextField, IconButton, } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { filterLead } from '../../redux/action/lead'

const FilterDrawer = ({ open, setOpen }) => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        city: '',
        project: '',
        region: '',
        // Add more fields from your lead model here
    });



    const handleInputChange = (field, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const handleApplyFilters = () => {
        dispatch(filterLead(filters));
        setOpen(false)
    };

    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <div style={{ padding: '16px', minWidth: '300px', maxWidth: '90vw' }}>
                <IconButton style={{ float: 'right', marginBottom: '8px' }} onClick={() => setOpen(false)}>
                    <Close />
                </IconButton>
                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={filters.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </Button>
            </div>
        </Drawer>
    );
};

export default FilterDrawer;
