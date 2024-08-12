import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@/Components/Modal';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ModalHeader from '@/Components/ModalHeader';

import Swal from "sweetalert2";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { users } = usePage().props;
    const [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false);
    };

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeModal();
                Swal.fire({ title: 'Usu&aacute;rio cadastrado com sucesso', icon: "success", timer: 1500 });
            },
        });
    };

    const confirmDestroy = (id) => {
        Swal.fire({
            title: "Tem certeza de que deseja excluir a conta?",
            text: "Depois que a conta for excluida, todos os recursos e dados serao perdidos permanentemente.",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "N&atilde;o, cancelar!",
        }).then(function (response) {
            if (response.isConfirmed) {
                destroy(route('profile.destroy', { id: id }), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ title: 'Usuario exclido com sucesso', icon: "success", timer: 1500 }),
                    onError: () => passwordInput.current.focus(),
                    onFinish: () => reset(),
                });
            }
        });
    };

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
        >
            <Head title="Usu&aacute;rios" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='flex flex-row-reverse'>
                        <Button variant='contained' color='success' startIcon={<AddIcon />} onClick={() => setModal(true)}>Criar</Button>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: '80vh' }}>
                                <Table stickyHeader sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>#</StyledTableCell>
                                            <StyledTableCell>Nome</StyledTableCell>
                                            <StyledTableCell>E-mail</StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className='text-center'>
                                        {users.map(user => {
                                            return <TableRow key={user.id} hover>
                                                <TableCell>{user.id}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell align='right'>
                                                    <IconButton aria-label="delete" size="large" color='error' onClick={() => confirmDestroy(user.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </div>

            <Modal show={modal} onClose={closeModal}>
                <ModalHeader>Cadastrar usu&aacute;rio</ModalHeader>
                <form onSubmit={submit} className="p-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nome" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Senha" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirma Senha" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Cadastrar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
