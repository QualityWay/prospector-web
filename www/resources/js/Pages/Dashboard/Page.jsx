import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

import { DashboarContext } from '@/Context/DashboarContex';
import { useContext } from 'react';
import { Calendar, YearPicker } from '@/Components/Calendar';
import Loading from "@/Components/Loading";


export default (props) => {
    const { loadingQuery, currentMonths, yearChange, lancamentos } = useContext(DashboarContext);

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title='Dashboard' />

            <Loading loading={loadingQuery} />
            <div className='py-4'>
                <div className='max-w-max mx-auto sm:px-3 lg:px-4'>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-1'>
                        <div className='p-5'>
                            <YearPicker
                                label="Ano referência"
                                value={currentMonths[0]}
                                onChange={yearChange}
                            />
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {currentMonths.map((date) =>
                                <Calendar
                                    key={date}
                                    referenceDate={date}
                                    onChange={(date) => router.get(route("safra.show", [
                                        date.getFullYear(),
                                        date.getMonth() + 1,
                                        date.getDate()
                                    ]
                                    ))}
                                    slotProps={{
                                        day: {
                                            lancamentos,
                                        },
                                    }}
                                />

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
