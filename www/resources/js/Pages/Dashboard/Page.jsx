import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DashboarContext } from '@/Context/DashboarContex';
import { useContext } from 'react';
import { YearPicker } from '@/Components/Calendar';
import Loading from "@/Components/Loading";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default (props) => {
    const { loadingQuery, currentMonths, yearChange } = useContext(DashboarContext);

    // Lista de meses com lançamentos vindo do backend
    const lancamentosMeses = props.safra_lancamentos || [];

    const handleMonthClick = (date) => {
        router.get(route("safra.show", [date.getFullYear(), date.getMonth() + 1]));
    };

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title='Dashboard' />

            <Loading loading={loadingQuery} />
            <div className='py-4'>
                <div className='max-w-max mx-auto sm:px-3 lg:px-4'>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-12'>
                        <div className='flex justify-end mb-5'>                            
                            <YearPicker
                                label="Ano referência"
                                value={currentMonths[0]}
                                onChange={yearChange}
                            />
                        </div>
                        <div className='flex justify-start mb-3'>                            
                            <h1>Selecione o mês desejado:</h1>
                        </div>

                        <div className="flex flex-wrap justify-between w-full">
                            {currentMonths.map((date) => {
                                const month = date.getMonth() + 1; // Obtendo o número do mês (1-12)
                                const isLancamento = lancamentosMeses.includes(month); // Verifica se o mês tem lançamentos

                                return (
                                    <div
                                        key={date}
                                        className={`rounded-lg shadow-md cursor-pointer hover:bg-gray-200 box-calendar mt-3 mb-3 p-5 text-center 
                                            ${isLancamento ? 'active' : 'bg-gray-100'}`} 
                                        onClick={() => handleMonthClick(date)}                                    
                                    >                                    
                                        {new Date(date).toLocaleString('pt-BR', { month: 'long' })}
                                        {isLancamento && (
                                            <CheckCircleIcon className="ml-2 inline-block icon-size" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
