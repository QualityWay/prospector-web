import { router, usePage } from "@inertiajs/react";
import { createContext, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const SafraContex = createContext();

export const SafraProvider = ({ children }) => {
    const { year, month, day, lancamento } = usePage().props;

    const [loadingQuery, setLoadingQuery] = useState(false);
    const { control, register, handleSubmit } = useForm({
        mode: 'confirmSave',
    });
    const { fields, append } = useFieldArray({
        control,
        name: "lancamentos",
    });

    useMemo(() => {
        if (lancamento.safra) {
            lancamento['safra'] = new Date(lancamento.safra, 0, 1)
        } else {
            lancamento['safra'] = new Date()
        }

        append([
            { name: '', title: 'DADOS EXTRAÇÃO', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'toneladas_art', title: 'Toneladas ART', suffix: ' ton', isGroup: false, tabspace: 1, value: lancamento.toneladas_art || null },
            { name: 'cana_safra', title: 'Cana Safra', suffix: ' t/mês', isGroup: false, tabspace: 1, value: lancamento.cana_safra || null },
            { name: 'moagem_horaria', title: 'Moagem Horária', suffix: ' t/h', isGroup: false, tabspace: 1, value: lancamento.moagem_horaria || null },
            { name: 'extracao_moenda', title: 'Extração Moenda', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.extracao_moenda || null },
            { name: 'moagem_real_media', title: 'Moagem real média', suffix: ' t/dia', isGroup: false, tabspace: 1, value: lancamento.moagem_real_media || null },

            { name: '', title: 'DADOS DA MATÉRIA PRIMA', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'brix_cana', title: 'Brix % cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.brix_cana || null },
            { name: 'pol_cana', title: 'Pol % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.pol_cana || null },
            { name: 'pureza_cana', title: 'Pureza % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.pureza_cana || null },
            { name: 'fibra_cana', title: 'Fibra % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.fibra_cana || null },
            { name: 'umidade', title: 'Umidade %', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.umidade || null },
            { name: 'ar_cana', title: 'AR % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.ar_cana || null },
            { name: 'art_cana', title: 'ART % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.art_cana || null },
            { name: 'atr', title: 'ATR', suffix: ' Kg/tc', isGroup: false, tabspace: 1, value: lancamento.atr || null },
            { name: 'impureza_mineral', title: 'Impureza Mineral', suffix: ' Kg/tc', isGroup: false, tabspace: 1, value: lancamento.impureza_mineral || null },
            { name: 'impureza_vegetal', title: 'Impureza Vegetal', suffix: ' Kg/tc', isGroup: false, tabspace: 1, value: lancamento.impureza_vegetal || null },

            { name: '', title: 'DADOS DE PERDAS', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'perda_lavagem_cana', title: 'Perda Lavagem de Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_lavagem_cana || null },
            { name: 'perda_extracao', title: 'Perda Extração', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_extracao || null },
            { name: 'perda_torta', title: 'Perda na Torta', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_torta || null },
            { name: 'perda_multijatos', title: 'Perda nos Multijatos', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_multijatos || null },
            { name: 'perda_residuaria_geral', title: 'Perda Residuária Geral ( Moenda + Trat. Caldo + Dest. + Fab.Açúcar)', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_residuaria_geral || null },
            { name: 'vinhaca_flegmassa', title: 'Vinhaça/flegmassa', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.vinhaca_flegmassa || null },
            { name: 'perda_indeterminada', title: 'Perda Indeterminada', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_indeterminada || null },

            { name: '', title: 'DADOS DO PROCESSO', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'aproveitamento_tempo_geral', title: 'Aproveitamento Tempo Geral', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.aproveitamento_tempo_geral || null },
            { name: 'aproveitamento_tempo_industrial', title: 'Aproveitamento Tempo Industrial', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.aproveitamento_tempo_industrial || null },
            { name: 'aproveitamento_tempo_agrícola', title: 'Aproveitamento Tempo Agrícola (CTT)', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.aproveitamento_tempo_agrícola || null },
            { name: 'aproveitamento_tempo', title: 'Aproveitamento Tempo (Climático)', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.aproveitamento_tempo || null },
            { name: 'dias_safra_consecutivos', title: 'Dias de Safra Consecutivos', suffix: ' dias/mês', isGroup: false, tabspace: 1, value: lancamento.aproveitamento_tempo || null },
            { name: 'dias_safra_efetivo', title: 'Dias de Safra Efetivo (100%)', suffix: ' dias/mês', isGroup: false, tabspace: 1, value: lancamento.dias_safra_efetivo || null },
            { name: 'horas_efetiva', title: 'Horas Efetiva', suffix: ' Hr/Mês', isGroup: false, tabspace: 1, value: lancamento.horas_efetiva || null },
            { name: 'pol_acucar_produzido', title: 'Pol do Açúcar Produzido', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.pol_acucar_produzido || null },
            { name: 'alcool_anidro', title: '% Álcool Anidro', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.alcool_anidro || null },
            { name: 'alcool_hidratado', title: '% Álcool Hidratado', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.alcool_hidratado || null },
            { name: 'alcool_anidro_ciclo_hexano', title: 'Álcool Anidro Ciclo Hexano', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.alcool_anidro_ciclo_hexano || null },
            { name: 'alcool_anidro_peneira_molecular', title: 'Álcool Anidro Peneira Molecular', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.alcool_anidro_peneira_molecular || null },

            { name: '', title: 'CÁLCULO DAS PERDAS', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'art_perdido_lavagem_cana', title: 'ART Perdido Lavagem de Cana', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_lavagem_cana || null },
            { name: 'art_perdido_extracao', title: 'ART Perdido Extração', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_extracao || null },
            { name: 'art_perdido_torta', title: 'ART Perdido na Torta', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_torta || null },
            { name: 'art_perdido_multijatos', title: 'ART Perdido nos Multijatos', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_multijatos || null },
            { name: 'art_perdido_aguas_residuarias', title: 'ART Perdido nas Águas Residuárias', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_aguas_residuarias || null },
            { name: 'art_perdido_destilaria', title: 'ART Perdido na Destilaria', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdido_destilaria || null },
            { name: 'art_perdas_indeterminadas', title: 'ART Perdas Indeterminadas', suffix: ' kg', isGroup: false, tabspace: 1, value: lancamento.art_perdas_indeterminadas || null },

            { name: '', title: 'CÁLCULO DA PRODUÇÃO', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: '', title: 'MIX ÁLCOOL', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'producao_alcool_hidratado', title: 'Produção de Álcool Hidratado', suffix: ' m3/dia', isGroup: false, tabspace: 2, value: lancamento.producao_alcool_hidratado || null },
            { name: 'producao_alcool_anidro', title: 'Produção de Álcool Anidro', suffix: ' m3/dia', isGroup: false, tabspace: 2, value: lancamento.producao_alcool_anidro || null },
            { name: 'producao_alcool_total', title: 'Produção de Álcool Total', suffix: ' m3/dia', isGroup: false, tabspace: 2, value: lancamento.producao_alcool_total || null },
            { name: 'rgd', title: 'RGD', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.rgd || null },
            { name: 'rgd_corrigido_fermentec', title: 'RGD corrigido Fermentec', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.rgd_corrigido_fermentec || null },
            { name: 'eficiencia_fermentacao', title: 'Eficiencia Fermentação', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.eficiencia_fermentacao || null },
            { name: 'eficiencia_fermentacao_corrigido_fermentec', title: 'Eficiência fermentação corrigido Fermentec', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.eficiencia_fermentacao_corrigido_fermentec || null },
            { name: 'rendimento_destilacao', title: 'Rendimento Destilação', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.rendimento_destilacao || null },
            { name: 'alcool_processo', title: 'Álcool em processo', suffix: '  m3/mês', isGroup: false, tabspace: 2, value: lancamento.alcool_processo || null },
            { name: '', title: 'MIX AÇÚCAR', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'producao_acucar', title: 'Produção de Açúcar', suffix: ' sc/dia', isGroup: false, tabspace: 2, value: lancamento.producao_acucar || null },
            { name: 'sjm', title: 'SJM', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.sjm || null },

            { name: '', title: 'GERAÇÃO DE VAPOR', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: '', title: 'Produção de vapor', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'producao_vapor', title: 'Produção de vapor', suffix: ' Ton/mês', isGroup: false, tabspace: 2, value: lancamento.producao_vapor || null },
            { name: 'consumo_vapor21_bar', title: 'Consumo de Vapor 21 bar para turbinas de processo (0,250)', suffix: ' Tvh/Tch', isGroup: false, tabspace: 2, value: lancamento.consumo_vapor21_bar || null },
            { name: 'vapor_42_bar_geracao_energia', title: 'Vapor 42 bar disponivel para geração de energia', suffix: ' TVH', isGroup: false, tabspace: 2, value: lancamento.vapor_42_bar_geracao_energia || null },

            { name: '', title: 'GERAÇÃO DE ENERGIA', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'vapor_42_bar_tg1_tg3', title: 'Vapor 42 bar para TG1/TG3 (75 TVH : 10 MWH)', suffix: ' Tvh', isGroup: false, tabspace: 1, value: lancamento.vapor_42_bar_tg1_tg3 || null },
            { name: 'vapor_disponivel_42_bar_rebaixado_21_bar', title: 'Vapor disponivel de 42 bar rebaixado 21 bar (15 tvh/mwh-ver curva turbina)', suffix: ' Tvh', isGroup: false, tabspace: 1, value: lancamento.vapor_disponivel_42_bar_rebaixado_21_bar || null },
            { name: 'producao_energia_eletrica_tg1_tg_342_bar', title: 'Produção de energia elétrica TG1/TG3 - 42 bar', suffix: ' Mvh', isGroup: false, tabspace: 1, value: lancamento.producao_energia_eletrica_tg1_tg_342_bar || null },
            { name: 'producao_energia_eletrica_tg2_21_bar', title: 'Produção de energia elétrica TG2 - 21 bar', suffix: ' Mvh', isGroup: false, tabspace: 1, value: lancamento.producao_energia_eletrica_tg2_21_bar || null },
            { name: '', title: 'Produção de Geração de Energia Elétrica', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'consumo_energia_industria', title: 'Consumo de energia Indústria (13 kw/ tch)', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.consumo_energia_industria || null },
            { name: 'consumo_energia_vila', title: 'Consumo de Energia Vila', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.consumo_energia_vila || null },
            { name: 'consumo_energia_silo_armazem_graos', title: 'Consumo de Energia Silo Armazem de Grãos', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.consumo_energia_silo_armazem_graos || null },
            { name: '', title: 'Excedente de Energia', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'potencial_instalada_requerida_irrigacao', title: 'Potencial Instalada Requerida Irrigação', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao || null },
            { name: 'potencia_consumida_irrigacao', title: 'Potencia Consumida Irrigação', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.potencia_consumida_irrigacao || null },
            { name: 'meta_disponibilidade_energia_irrigacao', title: 'Meta de disponibilidade de energia Irrigação', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.meta_disponibilidade_energia_irrigacao || null },
            { name: 'excedente_meta_producao_energia_irrigacao', title: 'Meta de Produção de Energia Irrigação', suffix: ' Mvh', isGroup: false, tabspace: 2, value: lancamento.excedente_meta_producao_energia_irrigacao || null },
            { name: '', title: 'Exportação de energia', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'producao_geracao_energia_eletrica', title: 'Produção de Geração de Energia Elétrica', suffix: ' Mv/Mês', isGroup: false, tabspace: 2, value: lancamento.producao_geracao_energia_eletrica || null },
            { name: 'exportacao_meta_producao_energia_irrigacao', title: 'Meta de Produção de Energia Irrigação', suffix: ' Mv/Mês', isGroup: false, tabspace: 2, value: lancamento.exportacao_meta_producao_energia_irrigacao || null },
            { name: 'exportacao_energia', title: 'Exportação de energia', suffix: ' Mv/Mês', isGroup: false, tabspace: 2, value: lancamento.exportacao_energia || null },

            { name: '', title: 'CÁLCULO DA EFICIÊNCIA', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'art_cana_peso', title: 'ART na cana peso', suffix: ' kg/mês', isGroup: false, tabspace: 1, value: lancamento.art_cana_peso || null },
            { name: 'art_produzido_alcool_rt', title: 'ART Produzido Álcool (RT)', suffix: ' kg/mês', isGroup: false, tabspace: 1, value: lancamento.art_produzido_alcool_rt || null },
            { name: 'art_produzido_alcool_rtc', title: 'ART Produzido Álcool (RTC)', suffix: ' kg/mês', isGroup: false, tabspace: 1, value: lancamento.art_produzido_alcool_rtc || null },
            { name: 'art_produzido_acucar', title: 'ART Produzido Açúcar', suffix: ' kg/mês', isGroup: false, tabspace: 1, value: lancamento.art_produzido_acucar || null },
            { name: 'art_produzido_total_rtc', title: 'ART Produzido Total (RTC)', suffix: ' kg/mês', isGroup: false, tabspace: 1, value: lancamento.art_produzido_total_rtc || null },

            { name: 'rtc', title: 'RTC', suffix: ' %', isGroup: false, value: lancamento.rtc || null },
            { name: 'rtc_corrigido_fermetec', title: 'RTC CORRIGIDO FERMETEC', suffix: ' %', isGroup: false, value: lancamento.rtc_corrigido_fermetec || null },
            { name: 'rt', title: 'RT', suffix: ' %', isGroup: false, value: lancamento.rt || null },

            { name: '', title: 'RIT CTC', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: '', title: 'MIX DE PRODUÇÃO', suffix: '', isGroup: true, tabspace: 1, value: null },
            { name: 'mix_producao_alcool', title: 'Álcool', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.mix_producao_alcool || null },
            { name: 'mix_producao_acucar', title: 'Açúcar', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.mix_producao_acucar || null },

            { name: '', title: 'CÁLCULO DO UNICOP', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'unicop_alcool', title: 'Álcool', suffix: ' Unicop', isGroup: false, tabspace: 1, value: lancamento.unicop_alcool || null },
            { name: 'unicop_acucar', title: 'Açúcar', suffix: ' Unicop', isGroup: false, tabspace: 1, value: lancamento.unicop_acucar || null },
            { name: 'unicop_total', title: 'UNICOP Total', suffix: ' Unicop', isGroup: false, tabspace: 1, value: lancamento.unicop_total || null },
            { name: 'unicop_tc', title: 'UNICOP/TC', suffix: ' UNICOP/TC', isGroup: false, tabspace: 1, value: lancamento.unicop_tc || null },

            { name: '', title: 'SUB PRODUTOS', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'vinhaca', title: 'Vinhaça', suffix: ' L', isGroup: false, tabspace: 1, value: lancamento.vinhaca || null },
            { name: 'bagaco', title: 'Bagaço', suffix: ' Kg', isGroup: false, tabspace: 1, value: lancamento.bagaco || null },
            { name: 'impurezas_mesa', title: 'Impurezas mesa', suffix: ' Kg', isGroup: false, tabspace: 1, value: lancamento.impurezas_mesa || null },
            { name: 'torta_produzida', title: 'Torta Produzida', suffix: ' Kg', isGroup: false, tabspace: 1, value: lancamento.torta_produzida || null },

        ], {
            focusName: "fields.0"
        });
    }, [lancamento])

    const yearChange = (value) => lancamento['safra'] = value.getFullYear()

    const confirmSave = (formRequest) => {
        Swal.fire({
            title: "Salvar?",
            text: "Deseja realmente salvar os dados!",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "Não, cancelar!",
        }).then(function (response) {
            if (response.isConfirmed) {
                let safra = typeof lancamento.safra === 'number' ? lancamento.safra : lancamento.safra.getFullYear()

                formRequest['lancamentos'] = prepareData(formRequest);
                formRequest['id'] = lancamento.id || null;
                formRequest['safra'] = safra;

                router.post(route("safra.upsert", [year, month, day]),
                    formRequest,
                    {
                        preserveScroll: true,
                        onSuccess: () => Swal.fire({
                            title: "Salvo!",
                            text: "Lançamentos salvo com sucesso!",
                            icon: "success",
                            timer: 1500,
                        }),
                        onError: (err) => Swal.fire({
                            title: "Erro ao salvar!",
                            text: err,
                            icon: "error",
                            timer: 1500,
                        }),
                        onBefore: () => setLoadingQuery(true),
                        onFinish: () => setLoadingQuery(false),
                    });
            }
        });
    };

    const prepareData = (formRequest) => formRequest.lancamentos
        .filter(x => !x.isGroup)
        .map(x => {
            let valor = x.value ? x.value?.split(' ')[0] : "";
            x.value = valor.includes(',') ? valor.replaceAll('.', '').replace(',', '.') : valor;

            return x;
        })
        .filter(x => x.value)
        .map(x => {
            return { [x.name]: x.value };
        })

    const objProps = useMemo(
        () => ({
            loadingQuery,
            year,
            month,
            day,
            fields,
            control,
            lancamento,
            yearChange,
            confirmSave,
            register,
            handleSubmit,
        }),
        [
            loadingQuery,
            year,
            month,
            day,
            fields,
            control,
        ]
    );

    return (
        <SafraContex.Provider value={objProps}>
            {children}
        </SafraContex.Provider>
    );
};
