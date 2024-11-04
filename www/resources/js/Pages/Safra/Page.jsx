import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SafraContex } from '@/Context/SafraContex';
import { useContext, useState, useEffect, useRef, setFocus } from 'react';
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
            {...register(`lancamentos.${index}.value`)} 
            control={control}
            onChange={handleInputChange} 
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
        confirmSave(data);
    };

    useEffect(() => {
        pairs.forEach((pair, rowIndex) => {
            const value1 = pair[0].value || 0; // Valor do Item
            const value2 = pair[1]?.value || 0; // Valor Meta (se existir)

            if (value1 > 0 && value2 > 0) {
                const total = ((value1 / value2) * 100).toFixed(2);
                setInputValues(prevValues => {
                    const updatedValues = [...prevValues];
                    updatedValues[rowIndex] = { value1: value1, value2: value2, total: total };
                    return updatedValues;
                });
            }
        });
    }, [pairs]); // Dependência: quando pairs mudar, recalcula as porcentagens

    const handleChange = (newValue, lineNumber, isMeta) => {
        const updatedValues = [...inputValues];
        const currentValues = { ...updatedValues[lineNumber] };

        // Atualiza o valor correto com base em isMeta
        if (isMeta) {
            // Atualiza value2 se newValue for válido
            if (!isNaN(parseFloat(newValue))) {
                currentValues.value2 = parseFloat(newValue);
            }
        } else {
            // Atualiza value1 se newValue for válido
            if (!isNaN(parseFloat(newValue))) {
                currentValues.value1 = parseFloat(newValue);
            }
        }

        // Verifica se value2 é 0 ou não e calcula o total
        if (currentValues.value2 === 0) {
            currentValues.total = NaN;
        } else if (currentValues.value1 !== 0) {
            currentValues.total = ((currentValues.value1 / currentValues.value2) * 100).toFixed(2);
        } else {
            currentValues.total = 0;
        }

        updatedValues[lineNumber] = currentValues;
        setInputValues(updatedValues);
    };


    

    //YearPicker
    const selectedYear = lancamento.data
        ? new Date(parseInt(lancamento.data.substring(0, 4)), 0, 1)
        : new Date(parseInt(year), 0, 1
    );


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
                            value={selectedYear}
                            onChange={yearChange}
                            disabled
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
                                                            value={field.value || ''}  
                                                            onChange={field.value ? null : handleChange}                                                            
                                                        />
                                                    );
                                                })}
                                                {!pair.some(field => field.isGroup) && (
                                                    <StyledTableCell className='text-center'>
                                                    <div>
                                                        {inputValues[rowIndex]?.value1 == null || inputValues[rowIndex]?.value2 == null ? (
                                                            '-'  // Se não houver valores, exibe '-'
                                                        ) : inputValues[rowIndex]?.value1 === 0 && inputValues[rowIndex]?.value2 === 0 ? (
                                                            '-'
                                                        ) : inputValues[rowIndex]?.value2 === 0 || isNaN(inputValues[rowIndex]?.total) ? (
                                                            '-'
                                                        ) : (
                                                            `${inputValues[rowIndex]?.total}%`
                                                        )}
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
