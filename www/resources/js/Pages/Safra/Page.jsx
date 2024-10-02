import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SafraContex } from '@/Context/SafraContex';
import { useContext, useState } from 'react';
import Loading from '@/Components/Loading';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { YearPicker } from '@/Components/Calendar';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import NumberInput from '@/Components/NumberInput';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#00328c',
        color: theme.palette.common.white,
        fontFamily: '"Figtree", sans-serif',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: '"Figtree", sans-serif',
    },
    [`&.group`]: {
        backgroundColor: '#c8dbf2',
        fontWeight: 'bold'
    },
}));

const FormControl = ({ index, value, suffix, register, control, onChange }) => (
    <NumberInput
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={3}
        fixedDecimalScale
        suffix={suffix}
        {...register(`lancamentos.${index}.value`)}
        control={control}
        onChange={(event) => onChange(`lancamentos.${index}.value`, event.target.value)} 
    />
);

const createPairs = (arr) => {
    const result = [];
    let tempPair = null;

    arr.forEach((field) => {
        if (field.isGroup) {            
            if (tempPair) {
                result.push(tempPair); 
                tempPair = null; 
            }
            result.push([field]); 
        } else {            
            if (!tempPair) {
                tempPair = field; 
            } else {
                result.push([tempPair, field]); 
                tempPair = null; 
            }
        }
    });
    
    if (tempPair) {
        result.push([tempPair]);
    }

    return result;
};

const TableItem = ({ title, value, isGroup, lineNumber, index, suffix, register, control, onChange, isMeta }) => {
    return (
        <StyledTableCell colSpan={isGroup ? 3 : 1} className={isGroup ? "group" : ""}>
            <div>
                <h4>{title}</h4>
                {!isGroup && (
                    <FormControl
                        index={index}
                        value={value}
                        suffix={suffix}
                        register={register}
                        control={control}
                        onChange={onChange}
                        lineNumber={lineNumber}
                        isMeta={isMeta}
                    />
                )}
            </div>
        </StyledTableCell>
    );
};

const Page = (props) => {
    const {
        loadingQuery,
        year,
        month,
        yearChange,
        confirmSave,
        register,
        fields,
        handleSubmit,
        control,
        lancamento,      
    } = useContext(SafraContex);


    const [calculatedPercentages, setCalculatedPercentages] = useState([]); 
    const pairs = createPairs(fields);


    const handleChange = (name, value, lineNumber, isMeta) => {
        const updatedLancamentos = [...lancamento];        

        // Captura o valor numérico do input
        const numericValueStr = value.match(/[\d,.]+/g)?.pop();
        const numericValue = numericValueStr ? parseFloat(numericValueStr.replace(',', '.')) : 0;

        // Atualiza o lançamento na linha correspondente
        updatedLancamentos[lineNumber] = {
            ...updatedLancamentos[lineNumber],
            value: numericValue,
            linha: lineNumber,
            isMeta: isMeta
        };

        // Cálculo da porcentagem
        const metaValue = updatedLancamentos[lineNumber]?.isMeta ? updatedLancamentos[lineNumber].value : updatedLancamentos[lineNumber - 1]?.value;

        if (metaValue && metaValue > 0) {
            const calculatedPercentage = (numericValue / metaValue) * 100;
            updatedLancamentos[lineNumber].percentage = calculatedPercentage;
            setCalculatedPercentages((prev) => {
                const newPercentages = [...prev];
                newPercentages[lineNumber] = calculatedPercentage; 
                return newPercentages;
            });
        } else {
            updatedLancamentos[lineNumber].percentage = '-';
            setCalculatedPercentages((prev) => {
                const newPercentages = [...prev];
                newPercentages[lineNumber] = null; 
                return newPercentages;
            });
        }
    };

    const onSubmit = (data) => {
        console.log(data); 
        confirmSave(data);
    };

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Dashboard" />
            <Loading loading={loadingQuery} />
            <div className="py-16 form-safra">
                <div className="max-w-max mx-auto sm:px-3 lg:px-4 divide-y">
                    <div className="flex py-2">
                        <YearPicker
                            className="flex-none w-14 h-14"
                            label="Safra"
                            defaultValue={lancamento.safra || new Date()}
                            onChange={yearChange}
                        />
                        <div className="grow text-center text-lg">Lançamentos dia {`${month}/${year}`}</div>
                        <Button
                            className="flex-none"
                            variant="contained"
                            color="primary"
                            onClick={() => window.history.back()}
                            startIcon={<ArrowBackIcon />}
                        >
                            Voltar
                        </Button>
                        <Button
                            className="flex-none"
                            sx={{ ml: 2 }}
                            type="submit"
                            variant="contained"
                            color="success"
                            form="form"
                            startIcon={<SaveIcon />}
                        >
                            Salvar
                        </Button>
                    </div>
                    <form id="form" onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: '80vh' }}>
                                <Table stickyHeader sx={{ minWidth: 900 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Valores do Item</StyledTableCell>
                                            <StyledTableCell>Valores Meta</StyledTableCell>
                                            <StyledTableCell className='text-center'>% da Meta</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pairs.map((pair, rowIndex) => ( 
                                            <TableRow key={rowIndex}>
                                                {pair.map((field, colIndex) => (
                                                    <TableItem
                                                        key={colIndex}
                                                        lineNumber={rowIndex} 
                                                        index={rowIndex * 2 + colIndex} 
                                                        title={field.title}
                                                        value={field.value}
                                                        isGroup={field.isGroup}
                                                        suffix={field.suffix} 
                                                        register={register} 
                                                        control={control}
                                                        isMeta={field.isMeta}
                                                        onChange={(name, value) => handleChange(name, value, rowIndex, field.isMeta)} 
                                                    />
                                                ))}
                                                {!pair.some(field => field.isGroup) && (
                                                    <StyledTableCell className='text-center'>
                                                        <div>
                                                            {calculatedPercentages[rowIndex] !== undefined 
                                                                ? calculatedPercentages[rowIndex] + '%' 
                                                                : '-'}
                                                        </div>                                                   
                                                    </StyledTableCell>
                                                )}
                                            </TableRow>
                                        ))}
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

export default Page;
