import { router, usePage } from "@inertiajs/react";
import { createContext, useMemo, useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const SafraContex = createContext();

export const SafraProvider = ({ children }) => {
    const { year, month, day, lancamento: initialLancamento } = usePage().props;

    const [loadingQuery, setLoadingQuery] = useState(false);
    const [lancamento, setLancamento] = useState(initialLancamento); // Defina o estado aqui
    const { control, register, handleSubmit } = useForm({
        mode: 'onSubmit',
    });
    const { fields, append } = useFieldArray({
        control,
        name: "lancamentos",
    });

    const getValues = () => {
        return fields.map(field => ({
            name: field.name,
            value: field.value
        }));
    };

    useEffect(() => {
        lancamento.safra = lancamento.safra ? new Date(lancamento.safra, 0, 1) : new Date();

        append([
            { name: '', title: 'DADOS EXTRAÇÃO', suffix: '', isGroup: true, tabspace: 0, value: null },
            { name: 'toneladas_art', title: 'Toneladas ART', suffix: ' ton', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.toneladas_art || null },
            { name: 'toneladas_art_meta', title: 'Toneladas ART Meta', suffix: ' ton', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.toneladas_art_meta || null },
            { name: 'cana_safra', title: 'Cana Safra', suffix: ' t/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.cana_safra || null },
            { name: 'cana_safra_meta', title: 'Cana Safra Meta', suffix: ' t/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.cana_safra_meta || null },
            { name: 'moagem_horaria', title: 'Moagem Horária', suffix: ' t/h', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.moagem_horaria || null },
            { name: 'moagem_horaria_meta', title: 'Moagem Horária Meta', suffix: ' t/h', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.moagem_horaria_meta || null },
            { name: 'extracao_moenda', title: 'Extração Moenda', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.extracao_moenda || null },
            { name: 'extracao_moenda_meta', title: 'Extração Moenda Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.extracao_moenda_meta || null },
            { name: 'moagem_horaria', title: 'Moagem Horária', suffix: ' t/h', isGroup: false, tabspace: 1, value: lancamento.moagem_horaria || null },
            { name: 'moagem_horaria_meta', title: 'Moagem Horária Meta', suffix: ' t/h', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.moagem_horaria_meta || null },

            { name: 'extracao_moenda', title: 'Extração Moenda', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.extracao_moenda || null },
            { name: 'extracao_moenda_meta', title: 'Extração Moenda Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.extracao_moenda_meta || null },

            { name: 'moagem_real_media', title: 'Moagem real média', suffix: ' t/dia', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.moagem_real_media || null },
            { name: 'moagem_real_media_meta', title: 'Moagem real média Meta', suffix: ' t/dia', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.moagem_real_media_meta || null },


            // DADOS DA MATÉRIA PRIMA
            { name: '', title: 'DADOS DA MATÉRIA PRIMA', suffix: '', isGroup: true, tabspace: 0, value: null },

            { name: 'brix_cana', title: 'Brix % cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.brix_cana || null },
            { name: 'brix_cana_meta', title: 'Brix % cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.brix_cana || null },

            { name: 'pol_cana', title: 'Pol % Cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.pol_cana || null },
            { name: 'pol_cana_meta', title: 'Pol % Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.pol_cana || null },

            { name: 'pureza_cana', title: 'Pureza % Cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.pureza_cana || null },
            { name: 'pureza_cana_meta', title: 'Pureza % Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.pureza_cana || null },

            { name: 'fibra_cana', title: 'Fibra % Cana', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.fibra_cana || null },
            { name: 'fibra_cana_meta', title: 'Fibra % Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.fibra_can_meta || null },

            { name: 'umidade', title: 'Umidade %', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.umidade || null },
            { name: 'umidade_meta', title: 'Umidade % Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.umidade_meta || null },

            { name: 'ar_cana', title: 'AR % Cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.ar_cana || null },
            { name: 'ar_cana_meta', title: 'AR % Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.ar_cana_meta || null },

            { name: 'art_cana', title: 'ART % Cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_cana || null },
            { name: 'art_cana_meta', title: 'ART % Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_cana_meta || null },

            { name: 'atr', title: 'ATR', suffix: ' Kg/tc', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.atr || null },
            { name: 'atr_meta', title: 'ATR Meta', suffix: ' Kg/tc', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.atr_meta || null },

            { name: 'impureza_mineral', title: 'Impureza Mineral', suffix: ' Kg/tc', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.impureza_mineral || null },
            { name: 'impureza_mineral_meta', title: 'Impureza Mineral Meta', suffix: ' Kg/tc', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.impureza_mineral_meta || null },

            { name: 'impureza_vegetal', title: 'Impureza Vegetal', suffix: ' Kg/tc', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.impureza_vegetal || null },
            { name: 'impureza_vegetal_meta', title: 'Impureza Vegetal Meta', suffix: ' Kg/tc', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.impureza_vegetal_meta || null },



            // DADOS DE PERDAS
            { name: '', title: 'DADOS DE PERDAS', suffix: '', isGroup: true, tabspace: 0, value: null },

            { name: 'perda_lavagem_cana', title: 'Perda Lavagem de Cana', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.perda_lavagem_cana || null },
            { name: 'perda_lavagem_cana', title: 'Perda Lavagem de Cana Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_lavagem_cana || null },


            { name: 'perda_extracao', title: 'Perda Extração', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.perda_extracao || null },
            { name: 'perda_extracao_meta', title: 'Perda Extração Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_extracao_meta || null },

            { name: 'perda_torta', title: 'Perda na Torta', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.perda_torta || null },
            { name: 'perda_torta_meta', title: 'Perda na Torta Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_torta_meta || null },

            { name: 'perda_multijatos', title: 'Perda nos Multijatos', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.perda_multijatos || null },
            { name: 'perda_multijatos_meta', title: 'Perda nos Multijatos Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_multijatos_meta || null },

            { name: 'perda_residuaria_geral', title: 'Perda Residuária Geral ( Moenda + Trat. Caldo + Dest. + Fab.Açúcar)', suffix: ' %', isGroup: false, tabspace: 1, value: lancamento.perda_residuaria_geral || null },
            { name: 'perda_residuaria_geral_meta', title: 'Perda Residuária Geral ( Moenda + Trat. Caldo + Dest. + Fab.Açúcar) Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_residuaria_geral_meta || null },

            { name: 'vinhaca_flegmassa', title: 'Vinhaça/flegmassa', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.vinhaca_flegmassa || null },
            { name: 'vinhaca_flegmassa_meta', title: 'Vinhaça/flegmassa Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.vinhaca_flegmassa_meta || null },

            { name: 'perda_indeterminada', title: 'Perda Indeterminada', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.perda_indeterminada || null },
            { name: 'perda_indeterminada_meta', title: 'Perda Indeterminada Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.perda_indeterminada_meta || null },


            // DADOS DO PROCESSO        
            { name: '', title: 'DADOS DO PROCESSO', suffix: '', isGroup: true, tabspace: 0, value: null },

            { name: 'aproveitamento_tempo_geral', title: 'Aproveitamento Tempo Geral', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.aproveitamento_tempo_geral || null },
            { name: 'aproveitamento_tempo_geral_meta', title: 'Aproveitamento Tempo Geral Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.aproveitamento_tempo_geral_meta || null },

            { name: 'aproveitamento_tempo_industrial', title: 'Aproveitamento Tempo Industrial', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.aproveitamento_tempo_industrial || null },
            { name: 'aproveitamento_tempo_industrial_meta', title: 'Aproveitamento Tempo Industrial Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.aproveitamento_tempo_industrial_meta || null },

            { name: 'aproveitamento_tempo_agrícola', title: 'Aproveitamento Tempo Agrícola (CTT)', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.aproveitamento_tempo_agrícola || null },
            { name: 'aproveitamento_tempo_agrícola_meta', title: 'Aproveitamento Tempo Agrícola (CTT) Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.aproveitamento_tempo_agrícola_meta || null },

            { name: 'aproveitamento_tempo', title: 'Aproveitamento Tempo (Climático)', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.aproveitamento_tempo || null },
            { name: 'aproveitamento_tempo_meta', title: 'Aproveitamento Tempo (Climático) Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.aproveitamento_tempo_meta || null },


            { name: 'dias_safra_consecutivos', title: 'Dias de Safra Consecutivos', suffix: ' dias/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.aproveitamento_tempo || null },
            { name: 'dias_safra_consecutivos_meta', tit_metale: 'Dias de Safra Consecutivos Meta', suffix: ' dias/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.aproveitamento_tempo_meta || null },


            { name: 'dias_safra_efetivo', title: 'Dias de Safra Efetivo (100%)', suffix: ' dias/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.dias_safra_efetivo || null },
            { name: 'dias_safra_efetivo_meta', title: 'Dias de Safra Efetivo (100%) Meta', suffix: ' dias/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.dias_safra_efetivo_meta || null },


            { name: 'horas_efetiva', title: 'Horas Efetiva', suffix: ' Hr/Mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.horas_efetiva || null },
            { name: 'horas_efetiva_meta', title: 'Horas Efetiva Meta', suffix: ' Hr/Mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.horas_efetiva_meta || null },


            { name: 'pol_acucar_produzido', title: 'Pol do Açúcar Produzido', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.pol_acucar_produzido || null },
            { name: 'pol_acucar_produzido_meta', title: 'Pol do Açúcar Produzido', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.pol_acucar_produzido_meta || null },


            { name: 'alcool_anidro', title: '% Álcool Anidro', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.alcool_anidro || null },
            { name: 'alcool_anidro_meta', title: '% Álcool Anidro Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.alcool_anidro_meta || null },


            { name: 'alcool_hidratado', title: '% Álcool Hidratado', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.alcool_hidratado || null },
            { name: 'alcool_hidratado_meta', title: '% Álcool Hidratado Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.alcool_hidratado_meta || null },


            { name: 'alcool_anidro_ciclo_hexano', title: 'Álcool Anidro Ciclo Hexano', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.alcool_anidro_ciclo_hexano || null },
            { name: 'alcool_anidro_ciclo_hexano_meta', title: 'Álcool Anidro Ciclo Hexano Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.alcool_anidro_ciclo_hexano_meta || null },


            { name: 'alcool_anidro_peneira_molecular', title: 'Álcool Anidro Peneira Molecular', suffix: ' %', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.alcool_anidro_peneira_molecular || null },
            { name: 'alcool_anidro_peneira_molecular_meta', title: 'Álcool Anidro Peneira Molecular Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.alcool_anidro_peneira_molecular_meta || null },

            // CÁLCULO DAS PERDAS
            { name: '', title: 'CÁLCULO DAS PERDAS', suffix: '', isGroup: true, tabspace: 0, value: null },


            { name: 'art_perdido_lavagem_cana', title: 'ART Perdido Lavagem de Cana', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_lavagem_cana || null },
            { name: 'art_perdido_lavagem_cana_meta', title: 'ART Perdido Lavagem de Cana Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_lavagem_cana_meta || null },


            { name: 'art_perdido_extracao', title: 'ART Perdido Extração', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_extracao || null },
            { name: 'art_perdido_extracao_meta', title: 'ART Perdido Extração Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_extracao_meta || null },


            { name: 'art_perdido_torta', title: 'ART Perdido na Torta', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_torta || null },
            { name: 'art_perdido_torta_meta', title: 'ART Perdido na Torta Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_torta_meta || null },


            { name: 'art_perdido_multijatos', title: 'ART Perdido nos Multijatos', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_multijatos || null },
            { name: 'art_perdido_multijatos_meta', title: 'ART Perdido nos Multijatos Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_multijatos_meta || null },


            { name: 'art_perdido_aguas_residuarias', title: 'ART Perdido nas Águas Residuárias', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_aguas_residuarias || null },
            { name: 'art_perdido_aguas_residuarias_meta', title: 'ART Perdido nas Águas Residuárias Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_aguas_residuarias_meta || null },


            { name: 'art_perdido_destilaria', title: 'ART Perdido na Destilaria', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdido_destilaria || null },
            { name: 'art_perdido_destilaria_meta', title: 'ART Perdido na Destilaria Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdido_destilaria_meta || null },


            { name: 'art_perdas_indeterminadas', title: 'ART Perdas Indeterminadas', suffix: ' kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_perdas_indeterminadas || null },
            { name: 'art_perdas_indeterminadas_meta', title: 'ART Perdas Indeterminadas Meta', suffix: ' kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_perdas_indeterminadas_meta || null },

            // CÁLCULO DA PRODUÇÃO
            { name: '', title: 'CÁLCULO DA PRODUÇÃO', suffix: '', isGroup: true, tabspace: 0, value: null },

            { name: '', title: 'MIX ÁLCOOL', suffix: '', isGroup: true, tabspace: 1, value: null },


            { name: 'producao_alcool_hidratado_dia', title: 'Produção de Álcool Hidratado dia', suffix: ' m3/dia', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_hidratado_dia || null },
            { name: 'producao_alcool_hidratado_dia_meta', title: 'Produção de Álcool Hidratado Mês Meta', suffix: ' m3/dia', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_hidratado_dia_meta || null },

            { name: 'producao_alcool_hidratado_mes', title: 'Produção de Álcool Mês Hidratado', suffix: ' m3/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_hidratado_mes || null },
            { name: 'producao_alcool_hidratado_mes_meta', title: 'Produção de Álcool Hidratado Mês Meta', suffix: ' m3/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_hidratado_mes_meta || null },
            

            { name: 'producao_alcool_anidro_dia', title: 'Produção de Álcool Anidro Mês', suffix: ' m3/dia', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_anidro_dia || null },
            { name: 'producao_alcool_anidro_dia_meta', title: 'Produção de Álcool Anidro Mês Meta', suffix: ' m3/dia', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_anidro_dia_meta || null },

            { name: 'producao_alcool_anidro_mes', title: 'Produção de Álcool Anidro Mês', suffix: ' m3/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_anidro_mes || null },
            { name: 'producao_alcool_anidro_mes_meta', title: 'Produção de Álcool Anidro Mês Meta', suffix: ' m3/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_anidro_mes_meta || null },

            { name: 'producao_alcool_total_dia', title: 'Produção de Álcool Total Dia', suffix: ' m3/dia', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_total_dia || null },
            { name: 'producao_alcool_total_dia_meta', title: 'Produção de Álcool Total Dia Meta', suffix: ' m3/dia', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_total_dia_meta || null },

            { name: 'producao_alcool_total_mes', title: 'Produção de Álcool Total Mês', suffix: ' m3/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_alcool_total_mes || null },
            { name: 'producao_alcool_total_mes_meta', title: 'Produção de Álcool Total Mês Meta', suffix: ' m3/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_alcool_total_mes_meta || null },

            { name: 'rgd', title: 'RGD', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.rgd || null },
            { name: 'rgd_meta', title: 'RGD Meta', suffix: ' %', isGroup: false, isMeta: true,  tabspace: 2, value: lancamento.rgd_meta || null },

            { name: 'rgd_corrigido_fermentec', title: 'RGD corrigido Fermentec', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.rgd_corrigido_fermentec || null },
            { name: 'rgd_corrigido_fermentec_meta', title: 'RGD corrigido Fermentec Meta', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.rgd_corrigido_fermentec_meta || null },

            { name: 'eficiencia_fermentacao', title: 'Eficiencia Fermentação', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.eficiencia_fermentacao || null },
            { name: 'eficiencia_fermentacao_meta', title: 'Eficiencia Fermentação Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.eficiencia_fermentacao_meta || null },

            { name: 'eficiencia_fermentacao_corrigido_fermentec', title: 'Eficiência fermentação corrigido Fermentec', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.eficiencia_fermentacao_corrigido_fermentec || null },
            { name: 'eficiencia_fermentacao_corrigido_fermentec_meta', title: 'Eficiência fermentação corrigido Fermentec Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.eficiencia_fermentacao_corrigido_fermentec_meta || null },

            { name: 'rendimento_destilacao', title: 'Rendimento Destilação', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.rendimento_destilacao || null },
            { name: 'rendimento_destilacao_meta', title: 'Rendimento Destilação Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.rendimento_destilacao_meta || null },

            { name: 'alcool_processo', title: 'Álcool em processo', suffix: '  m3/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.alcool_processo || null },
            { name: 'alcool_processo_meta', title: 'Álcool em processo Meta', suffix: '  m3/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.alcool_processo_meta || null },

            // MIX AÇÚCAR
            { name: '', title: 'MIX AÇÚCAR', suffix: '', isGroup: true, tabspace: 1, value: null },

            { name: 'producao_acucar_dia', title: 'Produção de Açúcar Dia', suffix: ' sc/dia', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_acucar_dia || null },
            { name: 'producao_acucar_dia_meta', title: 'Produção de Açúcar Dia Meta', suffix: ' sc/dia', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_acucar_dia_meta || null },

            { name: 'producao_acucar_mes', title: 'Produção de Açúcar Mês', suffix: ' sc/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_acucar_mes || null },
            { name: 'producao_acucar_mes_meta', title: 'Produção de Açúcar Mês Meta', suffix: ' sc/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_acucar_mes_meta || null },

            { name: 'producao_acucar_tonelada', title: 'Produção de Açúcar Tonelada', suffix: ' sc/ton', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_acucar_tonelada || null },
            { name: 'producao_acucar_tonelada_meta', title: 'Produção de Açúcar Tonelada Meta', suffix: ' sc/ton', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_acucar_tonelada_meta || null },

            { name: 'sjm', title: 'SJM', suffix: ' %', isGroup: false, tabspace: 2, value: lancamento.sjm || null },
            { name: 'sjm_meta', title: 'SJM Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.sjm_meta || null },


            // GERAÇÃO DE VAPOR
            { name: '', title: 'GERAÇÃO DE VAPOR', suffix: '', isGroup: true, isMeta: false, tabspace: 0, value: null },
            { name: '', title: 'Produção de vapor Meta', suffix: '', isGroup: true, isMeta: true, tabspace: 1, value: null },

            { name: 'producao_vapor', title: 'Produção de vapor', suffix: ' Ton/hora', isGroup: false,  isMeta: false, tabspace: 2, value: lancamento.producao_vapor || null },
            { name: 'producao_vapor_meta', title: 'Produção de vapor Meta', suffix: ' Ton/hora', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_vapor_meta || null },

            { name: 'producao_vapor_mes', title: 'Produção de vapor Mês', suffix: ' Ton/mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_vapor_mes || null },
            { name: 'producao_vapor_mes_meta', title: 'Produção de vapor hora Mês', suffix: ' Ton/mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_vapor_hora_mes_meta || null },                  

            { name: 'consumo_vapor21_bar', title: 'Consumo de Vapor 21 bar para turbinas de processo (0,250)', suffix: ' Tvh/Tch', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.consumo_vapor21_bar || null },
            { name: 'consumo_vapor21_bar_meta', title: 'Consumo de Vapor 21 bar para turbinas de processo (0,250) Meta', suffix: ' Tvh/Tch', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_vapor21_bar_meta || null },

            { name: 'vapor_42_bar_geracao_energia', title: 'Vapor 42 bar disponivel para geração de energia', suffix: ' TVH', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.vapor_42_bar_geracao_energia || null },
            { name: 'vapor_42_bar_geracao_energia_meta', title: 'Vapor 42 bar disponivel para geração de energia  Meta', suffix: ' TVH', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.vapor_42_bar_geracao_energia_meta || null },



            // // GERAÇÃO DE ENERGIA
            { name: '', title: 'GERAÇÃO DE ENERGIA', suffix: '', isGroup: true, tabspace: 0, value: null },

            { name: 'vapor_42_bar_tg1_tg3', title: 'Vapor 42 bar para TG1/TG3 (75 TVH : 10 MWH)', suffix: ' Tvh', isGroup: false, isMeta: false,  tabspace: 1, value: lancamento.vapor_42_bar_tg1_tg3 || null },
            { name: 'vapor_42_bar_tg1_tg3_meta', title: 'Vapor 42 bar para TG1/TG3 (75 TVH : 10 MWH) Meta', suffix: ' Tvh', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.vapor_42_bar_tg1_tg3_meta || null },


            { name: 'vapor_disponivel_42_bar_rebaixado_21_bar', title: 'Vapor disponivel de 42 bar rebaixado 21 bar (15 tvh/mwh-ver curva turbina)', suffix: ' Tvh', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.vapor_disponivel_42_bar_rebaixado_21_bar || null },
            { name: 'vapor_disponivel_42_bar_rebaixado_21_bar_meta', title: 'Vapor disponivel de 42 bar rebaixado 21 bar (15 tvh/mwh-ver curva turbina) Meta', suffix: ' Tvh', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.vapor_disponivel_42_bar_rebaixado_21_bar_meta || null },

            
            { name: 'producao_energia_eletrica_tg1_tg_342_bar', title: 'Produção de energia elétrica TG1/TG3 - 42 bar', suffix: ' Mvh', isGroup: false, isMeta: false,tabspace: 1, value: lancamento.producao_energia_eletrica_tg1_tg_342_bar || null },
            { name: 'producao_energia_eletrica_tg1_tg_342_bar_meta', title: 'Produção de energia elétrica TG1/TG3 - 42 bar Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.producao_energia_eletrica_tg1_tg_342_bar_meta || null },


            { name: 'producao_energia_eletrica_tg2_21_bar', title: 'Produção de energia elétrica TG2 - 21 bar', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.producao_energia_eletrica_tg2_21_bar || null },
            { name: 'producao_energia_eletrica_tg2_21_bar_meta', title: 'Produção de energia elétrica TG2 - 21 bar Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.producao_energia_eletrica_tg2_21_bar_meta || null },


            // Produção de Geração de Energia Elétrica
            { name: '', title: 'Produção de Geração de Energia Elétrica', suffix: '', isGroup: true, isMeta: false, tabspace: 1, value: null },

            { name: 'consumo_energia_industria', title: 'Consumo de energia Indústria (13 kw/ tch)', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.consumo_energia_industria || null },
            { name: 'consumo_energia_industria_meta', title: 'Consumo de energia Indústria (13 kw/ tch) Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_energia_industria_meta || null },

            { name: 'consumo_energia_vila', title: 'Consumo de Energia Vila', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.consumo_energia_vila || null },
            { name: 'consumo_energia_vila_meta', title: 'Consumo de Energia Vila Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_energia_vila_meta || null },

            { name: 'consumo_energia_industria', title: 'Consumo de energia Indústria (13 kw/ tch)', suffix: ' Mvh', isGroup: false,isMeta: false, tabspace: 2, value: lancamento.consumo_energia_industria || null },
            { name: 'consumo_energia_industria_meta', title: 'Consumo de energia Indústria (13 kw/ tch) Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_energia_industria_meta || null },

            { name: 'consumo_energia_silo_armazem_graos', title: 'Consumo de Energia Silo Armazem de Grãos', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.consumo_energia_silo_armazem_graos || null },
            { name: 'consumo_energia_silo_armazem_graos_meta', title: 'Consumo de Energia Silo Armazem de Grãos Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_energia_silo_armazem_graos_meta || null },


            { name: 'consumo_energia_industria', title: 'Consumo de energia Indústria (13 kw/ tch)', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.consumo_energia_industria || null },
            { name: 'consumo_energia_industria_meta', title: 'Consumo de energia Indústria (13 kw/ tch) Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.consumo_energia_industria_meta || null },


            // Excedente de Energia
            { name: '', title: 'Excedente de Energia', suffix: '', isGroup: true, tabspace: 1, value: null },

            { name: 'potencial_instalada_requerida_irrigacao', title: 'Potencial Instalada Requerida Irrigação', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao || null },
            { name: 'potencial_instalada_requerida_irrigacao_meta', title: 'Potencial Instalada Requerida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao_meta || null },

            { name: 'potencia_consumida_irrigacao', title: 'Potencia Consumida Irrigação', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.potencia_consumida_irrigacao || null },
            { name: 'potencia_consumida_irrigacao_meta', title: 'Potencia Consumida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.potencia_consumida_irrigacao_meta || null },

            { name: 'potencial_instalada_requerida_irrigacao', title: 'Potencial Instalada Requerida Irrigação', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao || null },
            { name: 'potencial_instalada_requerida_irrigacao_meta', title: 'Potencial Instalada Requerida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao_meta || null },


            { name: 'meta_disponibilidade_energia_irrigacao', title: 'Meta de disponibilidade de energia Irrigação', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.meta_disponibilidade_energia_irrigacao || null },
            { name: 'meta_disponibilidade_energia_irrigacao_meta', title: 'Meta de disponibilidade de energia Irrigação Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.meta_disponibilidade_energia_irrigacao_meta || null },


            { name: 'potencial_instalada_requerida_irrigacao', title: 'Potencial Instalada Requerida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao || null },
            { name: 'potencial_instalada_requerida_irrigacao_meta', title: 'Potencial Instalada Requerida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao_meta || null },


            { name: 'excedente_meta_producao_energia_irrigacao', title: 'Meta de Produção de Energia Irrigação', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.excedente_meta_producao_energia_irrigacao || null },
            { name: 'excedente_meta_producao_energia_irrigacao_meta', title: 'Meta de Produção de Energia Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.excedente_meta_producao_energia_irrigacao_meta || null },


            { name: 'potencial_instalada_requerida_irrigacao', title: 'Potencial Instalada Requerida Irrigação', suffix: ' Mvh', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao || null },
            { name: 'potencial_instalada_requerida_irrigacao_meta', title: 'Potencial Instalada Requerida Irrigação Meta', suffix: ' Mvh', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.potencial_instalada_requerida_irrigacao_meta || null },

            // Exportação de energia
            { name: '', title: 'Exportação de energia', suffix: '', isGroup: true, tabspace: 1, value: null },

            { name: 'producao_geracao_energia_eletrica', title: 'Produção de Geração de Energia Elétrica', suffix: ' Mv/Mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.producao_geracao_energia_eletrica || null },
            { name: 'producao_geracao_energia_eletrica_meta', title: 'Produção de Geração de Energia Elétrica Meta', suffix: ' Mv/Mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.producao_geracao_energia_eletrica_meta || null },


            { name: 'exportacao_meta_producao_energia_irrigacao', title: 'Meta de Produção de Energia Irrigação', suffix: ' Mv/Mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.exportacao_meta_producao_energia_irrigacao || null },
            { name: 'exportacao_meta_producao_energia_irrigacao_meta', title: 'Meta de Produção de Energia Irrigação Meta', suffix: ' Mv/Mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.exportacao_meta_producao_energia_irrigacao_meta || null },

            { name: 'exportacao_energia', title: 'Exportação de energia', suffix: ' Mv/Mês', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.exportacao_energia || null },
            { name: 'exportacao_energia_meta', title: 'Exportação de energia Meta', suffix: ' Mv/Mês', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.exportacao_energia_meta || null },

            // CÁLCULO DA EFICIÊNCIA
            { name: '', title: 'CÁLCULO DA EFICIÊNCIA', suffix: '', isGroup: true, isMeta: false, tabspace: 0, value: null },

            { name: 'art_cana_peso', title: 'ART na cana peso', suffix: ' kg/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_cana_peso || null },
            { name: 'art_cana_peso_meta', title: 'ART na cana peso Meta', suffix: ' kg/mês', isGroup: false, isMeta: true,tabspace: 1, value: lancamento.art_cana_peso_meta || null },


            { name: 'art_produzido_alcool_rt', title: 'ART Produzido Álcool (RT)', suffix: ' kg/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_produzido_alcool_rt || null },
            { name: 'art_produzido_alcool_rt_meta', title: 'ART Produzido Álcool (RT) Meta', suffix: ' kg/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_produzido_alcool_rt_meta || null },


            { name: 'art_produzido_alcool_rtc', title: 'ART Produzido Álcool (RTC)', suffix: ' kg/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_produzido_alcool_rtc || null },
            { name: 'art_produzido_alcool_rtc_meta', title: 'ART Produzido Álcool (RTC) Meta', suffix: ' kg/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_produzido_alcool_rtc_meta || null },

            { name: 'art_produzido_acucar', title: 'ART Produzido Açúcar', suffix: ' kg/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_produzido_acucar || null },
            { name: 'art_produzido_acucar_meta', title: 'ART Produzido Açúcar Meta', suffix: ' kg/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_produzido_acucar_meta || null },

            { name: 'art_produzido_total_rtc', title: 'ART Produzido Total (RTC)', suffix: ' kg/mês', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.art_produzido_total_rtc || null },
            { name: 'art_produzido_total_rtc_meta', title: 'ART Produzido Total (RTC) Meta', suffix: ' kg/mês', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.art_produzido_total_rtc_meta || null },

            { name: 'rtc', title: 'RTC', suffix: ' %', isGroup: false, isMeta: false, value: lancamento.rtc || null },
            { name: 'rtc_meta', title: 'RTC Meta', suffix: ' %', isGroup: false, isMeta: true, value: lancamento.rtc_meta || null },


            { name: 'rtc_corrigido_fermetec', title: 'RTC CORRIGIDO FERMETEC', suffix: ' %', isGroup: false, isMeta: false, value: lancamento.rtc_corrigido_fermetec || null },
            { name: 'rtc_corrigido_fermetec_meta', title: 'RTC CORRIGIDO FERMETEC Meta', suffix: ' %', isGroup: false, isMeta: true, value: lancamento.rtc_corrigido_fermetec_meta || null },

            { name: 'rt', title: 'RT', suffix: ' %', isGroup: false, isMeta: false, value: lancamento.rt || null },
            { name: 'rt_meta', title: 'RT Meta', suffix: ' %', isGroup: false, isMeta: true, value: lancamento.rt_meta || null },


            // RIT CTC
            { name: '', title: 'RIT CTC', suffix: '', isGroup: true, isMeta: false, tabspace: 0, value: null },
            { name: '', title: 'MIX DE PRODUÇÃO', suffix: '', isGroup: true, isMeta: true, tabspace: 1, value: null },

            { name: 'mix_producao_alcool', title: 'Álcool', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.mix_producao_alcool || null },
            { name: 'mix_producao_alcool_meta', title: 'Álcool Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.mix_producao_alcool_meta || null },

            { name: 'mix_producao_acucar', title: 'Açúcar', suffix: ' %', isGroup: false, isMeta: false, tabspace: 2, value: lancamento.mix_producao_acucar || null },
            { name: 'mix_producao_acucar_meta', title: 'Açúcar Meta', suffix: ' %', isGroup: false, isMeta: true, tabspace: 2, value: lancamento.mix_producao_acucar_meta || null },


            // CÁLCULO DO UNICOP
            { name: '', title: 'CÁLCULO DO UNICOP', suffix: '', isGroup: true, isMeta: false, tabspace: 0, value: null },

            { name: 'unicop_alcool', title: 'Álcool', suffix: ' Unicop', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.unicop_alcool || null },
            { name: 'unicop_alcool_meta', title: 'Álcool Meta', suffix: ' Unicop', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.unicop_alcool_meta || null },

            { name: 'unicop_acucar', title: 'Açúcar', suffix: ' Unicop', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.unicop_acucar || null },
            { name: 'unicop_acucar_meta', title: 'Açúcar Meta', suffix: ' Unicop', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.unicop_acucar_meta || null },

            { name: 'unicop_total', title: 'UNICOP Total', suffix: ' Unicop', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.unicop_total || null },
            { name: 'unicop_total_meta', title: 'UNICOP Total Meta', suffix: ' Unicop', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.unicop_total_meta || null },

            { name: 'unicop_tc', title: 'UNICOP/TC', suffix: ' UNICOP/TC', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.unicop_tc || null },
            { name: 'unicop_tc_meta', title: 'UNICOP/TC Meta', suffix: ' UNICOP/TC', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.unicop_tc_meta || null },


            // SUB PRODUTOS
            { name: '', title: 'SUB PRODUTOS', suffix: '', isGroup: true, isMeta: false, tabspace: 0, value: null },
            { name: 'vinhaca', title: 'Vinhaça', suffix: ' L', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.vinhaca || null },
            { name: 'vinhaca_meta', title: 'Vinhaça Meta', suffix: ' L', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.vinhaca_meta || null },

            { name: 'bagaco', title: 'Bagaço', suffix: ' Kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.bagaco || null },
            { name: 'bagaco_meta', title: 'Bagaço Meta', suffix: ' Kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.bagaco_meta || null },

            { name: 'impurezas_mesa', title: 'Impurezas mesa', suffix: ' Kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.impurezas_mesa || null },
            { name: 'impurezas_mesa_meta', title: 'Impurezas mesa Meta', suffix: ' Kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.impurezas_mesa_meta || null },

            { name: 'torta_produzida', title: 'Torta Produzida', suffix: ' Kg', isGroup: false, isMeta: false, tabspace: 1, value: lancamento.torta_produzida || null },
            { name: 'torta_produzida_meta', title: 'Torta Produzida Meta', suffix: ' Kg', isGroup: false, isMeta: true, tabspace: 1, value: lancamento.torta_produzida_meta || null },
        ]);
    }, [lancamento]);

    const yearChange = (value) => {
        setLancamento(prev => ({ ...prev, safra: value.getFullYear() }));
    };

    const confirmSave = (formRequest) => {
        Swal.fire({
            title: "Salvar?",
            text: "Deseja realmente salvar os dados!",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "Não, cancelar!",
        }).then((response) => {
            if (response.isConfirmed) {
                const safra = typeof lancamento.safra === 'number' ? lancamento.safra : lancamento.safra.getFullYear();

                formRequest.lancamentos = prepareData(formRequest);
                formRequest.id = lancamento.id || null;
                formRequest.safra = safra;

                router.post(route("safra.upsert", [year, month, day]), formRequest, {
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

    const prepareData = (formRequest) => {
        return formRequest.lancamentos
            .filter(x => !x.isGroup)
            .map(x => {
                let valor = x.value ? x.value.split(' ')[0] : "";
                x.value = valor.includes(',') ? valor.replaceAll('.', '').replace(',', '.') : valor;
                return x;
            })
            .filter(x => x.value)
            .map(x => ({ [x.name]: x.value }));
    };

    const objProps = useMemo(
        () => ({
            loadingQuery,
            year,
            month,
            day,
            fields,
            control,
            lancamento,
            setLancamento, // Inclua setLancamento aqui
            yearChange,
            confirmSave,
            register,
            handleSubmit,
            getValues,
        }),
        [loadingQuery, year, month, day, fields, control, lancamento] // Inclua lancamento aqui
    );

    return (
        <SafraContex.Provider value={objProps}>
            {children}
        </SafraContex.Provider>
    );
};
