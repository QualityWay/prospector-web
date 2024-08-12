import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { SafraContex } from '@/Context/SafraContex';
import { useContext } from 'react';
import Loading from '@/Components/Loading';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { YearPicker } from '@/Components/Calendar';

import { Button } from '@mui/material';
import NumberInput from '@/Components/NumberInput';

import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default (props) => {
    const {
        loadingQuery,
        year,
        month,
        day,
        yearChange,
        confirmSave,
        register,
        fields,
        handleSubmit,
        control,
        lancamento,
    } = useContext(SafraContex);


    function FormControl({ ...props }) {
        return <NumberInput
            {...props}
            thousandSeparator='.'
            decimalSeparator=','
            decimalScale={3}
            fixedDecimalScale
            {...register(`lancamentos.${props.index}.value`)}
            control={control}
        />
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4d3af7',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        [`&.group`]: {
            backgroundColor: '#c8dbf2',
        }
    }));

    const TabSpace = (numSpace) => {
        if (numSpace === 1) {
            return <span className='inline-block ml-4' />;
        } else if (numSpace === 2) {
            return <span className='inline-block ml-8' />;
        } else if (numSpace === 3) {
            return <span className='inline-block ml-12' />;
        } else if (numSpace === 4) {
            return <span className='inline-block ml-14' />;
        }

        return '';
    }

    const TableItem = ({ title, tabspace = 0, isGroup = false, ...props }) =>
        <TableRow hover={!isGroup}>
            <StyledTableCell className={isGroup ? 'group' : ''}>
                {TabSpace(tabspace)}
                <b>{title}</b>
            </StyledTableCell>
            <StyledTableCell className={isGroup ? 'group' : ''}>
                {!isGroup ? <FormControl {...props} /> : ''}
            </StyledTableCell>
        </TableRow >

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title='Dashboard' />

            <Loading loading={loadingQuery} />
            <div className='py-4'>
                <div className='max-w-max mx-auto sm:px-3 lg:px-4 divide-y'>
                    <div className='flex py-2'>
                        <YearPicker
                            className='flex-none w-14 h-14'
                            label='Safra'
                            defaultValue={lancamento.safra || new Date()}
                            onChange={yearChange}
                        />

                        <div className='grow text-center text-lg'>Lan&ccedil;amentos dia {`${day}/${month}/${year}`}</div>

                        <Button className='flex-none' variant='contained' color='primary' onClick={() => window.history.back()} startIcon={<ArrowBackIcon />}>Voltar</Button>

                        <Button className='flex-none' sx={{ ml: 2 }} type='submit' variant='contained' color='success' form={"form"} startIcon={<SaveIcon />}>Salvar</Button>
                    </div>

                    <form id="form" onSubmit={handleSubmit(confirmSave)}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: '80vh' }}>
                                <Table stickyHeader sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Item</StyledTableCell>
                                            <StyledTableCell align='right'>Valor</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fields.map((field, index) =>
                                            <TableItem key={index} name={field.name} title={field.title} suffix={field.suffix} isGroup={field.isGroup} tabspace={field.tabspace} index={index} value={field.value} />
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
