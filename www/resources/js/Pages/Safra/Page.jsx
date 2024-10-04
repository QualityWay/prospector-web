import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SafraContex } from '@/Context/SafraContex';
import { useContext, useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { YearPicker } from '@/Components/Calendar';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import NumberInput from '@/Components/NumberInput';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

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



const FormControl = ({ index, value, suffix, register, control, onChange, lineNumber, isMeta }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value; 
        onChange(newValue, lineNumber, isMeta); 
    };

    return (
        <NumberInput
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={3}
            fixedDecimalScale
            suffix={suffix}
            {...register(`lancamentos.${index}.value`)} // Registra o input
            control={control}
            onChange={handleInputChange} // Usa o novo manipulador
        />
    );
};

const createPairs = (arr) => {
    const result = [];
    let tempPair = null;

    arr.forEach((field, index) => {       
        if (field.isGroup) {            
            if (tempPair) {
                result.push(tempPair); 
                tempPair = null; 
            }
            result.push([{ ...field, index }]); 
        } else {            
            if (!tempPair) {                
                tempPair = { ...field, index }; 
            } else {               
                result.push([{ ...tempPair }, { ...field, index }]); 
                tempPair = null; 
            }
        }
    });    
    
    if (tempPair) {
        result.push([{ ...tempPair }]); 
    }

    return result;
};

const TableItem = ({ title, value, isGroup, lineNumber, index, suffix, register, control, onChange, isMeta }) => (    
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
                    lineNumber={lineNumber}
                    onChange={onChange}
                    isMeta={isMeta}                     
                />
            )}
        </div>
    </StyledTableCell>
);

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
   
    
    const pairs = createPairs(fields);  
    const [inputValues, setInputValues] = useState(() => {       
        return pairs.map(() => ({ value1: 0, value2: 0, total: 0 }));
    });

    const onSubmit = (data) => {
        console.log(data); 
        confirmSave(data);
    };

    const handleChange = (newValue, lineNumber, isMeta) => {
        const updatedValues = [...inputValues]; 
        const currentValues = { ...updatedValues[lineNumber] }; 
    
        // Atualiza o valor correto com base em isMeta
        if (isMeta) {
            currentValues.value2 = parseFloat(newValue) || 0;
        } else {
            currentValues.value1 = parseFloat(newValue) || 0;
        }
    
        // Verifica se value2 é 0 ou não e calcula o total
        if (currentValues.value2 === 0) {
            currentValues.total = NaN; 
        } else if (currentValues.value1 !== 0) {
            currentValues.total = (currentValues.value1 / currentValues.value2) * 100; 
        } else {
            currentValues.total = 0; 
        }
    
        updatedValues[lineNumber] = currentValues; 
        setInputValues(updatedValues); 
    
        console.log(`Valores Atualizados: ${JSON.stringify(currentValues)}, Total: ${currentValues.total}`);
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
                            value={lancamento.safra}
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
                                                {pair.map((field, colIndex) => {
                                                    return (
                                                        <TableItem
                                                            key={colIndex}
                                                            lineNumber={rowIndex}
                                                            index={field.index} 
                                                            title={field.title}                                                            
                                                            isGroup={field.isGroup}
                                                            suffix={field.suffix}
                                                            register={register}
                                                            control={control}
                                                            isMeta={field.isMeta}
                                                            value={field.value}
                                                            onChange={handleChange}                                                            
                                                        />
                                                    );
                                                })}
                                                {!pair.some(field => field.isGroup) && (
                                                    <StyledTableCell className='text-center'>
                                                    <div>
                                                        {inputValues[rowIndex]?.value1 === 0 && inputValues[rowIndex]?.value2 === 0
                                                            ? '-' 
                                                            : (inputValues[rowIndex]?.value1 !== 0 && (inputValues[rowIndex]?.value2 === 0 || isNaN(inputValues[rowIndex]?.total)))
                                                            ? '-'
                                                            : `${inputValues[rowIndex]?.total}%`} 
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
