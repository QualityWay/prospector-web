import { router, usePage } from "@inertiajs/react";
import { createContext, useEffect, useMemo, useState } from "react";

export const DashboarContext = createContext();

export const DashboarProvider = ({ children }) => {
    const { year, safra_lancamentos } = usePage().props;

    const [loadingQuery, setLoadingQuery] = useState(false);
    const [currentMonths, setCurrentMonths] = useState([
        new Date(year, 0, 1),
        new Date(year, 1, 1),
        new Date(year, 2, 1),
        new Date(year, 3, 1),
        new Date(year, 4, 1),
        new Date(year, 5, 1),
        new Date(year, 6, 1),
        new Date(year, 7, 1),
        new Date(year, 8, 1),
        new Date(year, 9, 1),
        new Date(year, 10, 1),
        new Date(year, 11, 1),
    ]);

    const [lancamentos, setLancamentos] = useState([]);
    useEffect(() => setLancamentos(safra_lancamentos.map(lancamento => new Date(`${lancamento.data} 00:00:00`))), [safra_lancamentos]);

    const yearChange = (newValue) => {
        setCurrentMonths([
            new Date(newValue.getFullYear(), 0, 1),
            new Date(newValue.getFullYear(), 1, 1),
            new Date(newValue.getFullYear(), 2, 1),
            new Date(newValue.getFullYear(), 3, 1),
            new Date(newValue.getFullYear(), 4, 1),
            new Date(newValue.getFullYear(), 5, 1),
            new Date(newValue.getFullYear(), 6, 1),
            new Date(newValue.getFullYear(), 7, 1),
            new Date(newValue.getFullYear(), 8, 1),
            new Date(newValue.getFullYear(), 9, 1),
            new Date(newValue.getFullYear(), 10, 1),
            new Date(newValue.getFullYear(), 11, 1),
        ]);

        router.post(
            route("dashboard"),
            { year: newValue.getFullYear() },
            {
                only: [
                    "safra_lancamentos",
                    "year"
                ],
                preserveState: true,
                replace: true,
                onBefore: () => setLoadingQuery(true),
                onFinish: () => setLoadingQuery(false),
            }
        );
    };

    const objProps = useMemo(
        () => ({
            loadingQuery,
            yearChange,
            currentMonths,
            lancamentos,
        }),
        [
            loadingQuery,
            currentMonths,
            lancamentos,
        ]
    );

    return (
        <DashboarContext.Provider value={objProps}>
            {children}
        </DashboarContext.Provider>
    );
};
