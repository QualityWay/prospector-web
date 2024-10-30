<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('safra_histories', function (Blueprint $table) {
            $table->id();
            $table->year("safra");
            $table->date("data");

            // DADOS EXTRAÇÃO
            $table->decimal("toneladas_art", 11, 3)->default(0)->nullable();
            $table->decimal("toneladas_art_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("cana_safra", 11, 3)->default(0)->nullable();
            $table->decimal("cana_safra_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("moagem_horaria", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_horaria_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("extracao_moenda", 11, 3)->default(0)->nullable();
            $table->decimal("extracao_moenda_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("moagem_horaria", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_horaria_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("extracao_moenda", 11, 3)->default(0)->nullable();
            $table->decimal("extracao_moenda_meta", 11, 3)->default(0)->nullable();
            
            $table->decimal("moagem_real_media", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_real_media_meta", 11, 3)->default(0)->nullable(); 


            // DADOS DA MATÉRIA PRIMA
            
            $table->decimal("brix_cana", 11, 3)->default(0)->nullable();
            $table->decimal("brix_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("pol_cana", 11, 3)->default(0)->nullable();
            $table->decimal("pol_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("pureza_cana", 11, 3)->default(0)->nullable();
            $table->decimal("pureza_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("fibra_cana", 11, 3)->default(0)->nullable();
            $table->decimal("fibra_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("umidade", 11, 3)->default(0)->nullable();
            $table->decimal("umidade_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("ar_cana", 11, 3)->default(0)->nullable();
            $table->decimal("ar_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_cana", 11, 3)->default(0)->nullable();
            $table->decimal("art_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("atr", 11, 3)->default(0)->nullable();
            $table->decimal("atr_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("impureza_mineral", 11, 3)->default(0)->nullable();
            $table->decimal("impureza_mineral_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("impureza_vegetal", 11, 3)->default(0)->nullable();
            $table->decimal("impureza_vegetal_meta", 11, 3)->default(0)->nullable();
            
            
            // DADOS DE PERDAS
            
            $table->decimal("perda_lavagem_cana", 11, 3)->default(0)->nullable();
            $table->decimal("perda_lavagem_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("perda_extracao", 11, 3)->default(0)->nullable();
            $table->decimal("perda_extracao_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("perda_torta", 11, 3)->default(0)->nullable();
            $table->decimal("perda_torta_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("perda_multijatos", 11, 3)->default(0)->nullable();
            $table->decimal("perda_multijatos_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("perda_residuaria_geral", 11, 3)->default(0)->nullable();
            $table->decimal("perda_residuaria_geral_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("vinhaca_flegmassa", 11, 3)->default(0)->nullable();
            $table->decimal("vinhaca_flegmassa_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("perda_indeterminada", 11, 3)->default(0)->nullable();
            $table->decimal("perda_indeterminada_meta", 11, 3)->default(0)->nullable(); 

            // DADOS DO PROCESSO
            
            $table->decimal("aproveitamento_tempo_geral", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_geral_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("aproveitamento_tempo_industrial", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_industrial_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("aproveitamento_tempo_agrícola", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_agrícola_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("aproveitamento_tempo", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("dias_safra_consecutivos", 11, 3)->default(0)->nullable();
            $table->decimal("dias_safra_consecutivos_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("dias_safra_efetivo", 11, 3)->default(0)->nullable();
            $table->decimal("dias_safra_efetivo_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("horas_efetiva", 11, 3)->default(0)->nullable();
            $table->decimal("horas_efetiva_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("pol_acucar_produzido", 11, 3)->default(0)->nullable();
            $table->decimal("pol_acucar_produzido_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("alcool_anidro", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("alcool_hidratado", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_hidratado_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("alcool_anidro_ciclo_hexano", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro_ciclo_hexano_meta", 11, 3)->default(0)->nullable(); 
                     
            $table->decimal("alcool_anidro_peneira_molecular", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro_peneira_molecular_meta", 11, 3)->default(0)->nullable(); 


            // CÁLCULO DAS PERDAS               
            $table->decimal("art_perdido_lavagem_cana", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_lavagem_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_extracao", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_extracao_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_torta", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_torta_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_multijatos", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_multijatos_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("art_perdido_aguas_residuarias", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_aguas_residuarias_meta", 11, 3)->default(0)->nullable();

            $table->decimal("art_perdido_destilaria", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_destilaria_meta", 11, 3)->default(0)->nullable();
            
            $table->decimal("art_perdas_indeterminadas", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdas_indeterminadas_meta", 11, 3)->default(0)->nullable();


            // CÁLCULO DA PRODUÇÃO
            // MIX ÁLCOOL

            $table->decimal("producao_alcool_hidratado_dia", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_hidratado_dia_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("producao_alcool_hidratado_mes", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_hidratado_mes_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("art_perdido_residuaria_geral", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_residuaria_geral_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("producao_alcool_anidro_dia", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_anidro_dia_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("producao_alcool_anidro_mes", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_anidro_mes_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("rgd", 11, 3)->default(0)->nullable();
            $table->decimal("rgd_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("rgd_corrigido_fermentec", 11, 3)->default(0)->nullable();
            $table->decimal("rgd_corrigido_fermentec_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("eficiencia_fermentacao", 11, 3)->default(0)->nullable();
            $table->decimal("eficiencia_fermentacao_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("eficiencia_fermentacao_corrigido_fermentec", 11, 3)->default(0)->nullable();
            $table->decimal("eficiencia_fermentacao_corrigido_fermentec_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("rendimento_destilacao", 11, 3)->default(0)->nullable();
            $table->decimal("rendimento_destilacao_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("alcool_processo", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_processo_meta", 11, 3)->default(0)->nullable(); 

            // MIX AÇÚCAR

            $table->decimal("producao_acucar_dia", 11, 3)->default(0)->nullable();
            $table->decimal("producao_acucar_dia_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("producao_acucar_mes", 11, 3)->default(0)->nullable();
            $table->decimal("producao_acucar_mes_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("producao_acucar_tonelada", 11, 3)->default(0)->nullable();
            $table->decimal("producao_acucar_tonelada_meta", 11, 3)->default(0)->nullable(); 

            $table->decimal("sjm", 11, 3)->default(0)->nullable();
            $table->decimal("sjm_meta", 11, 3)->default(0)->nullable(); 


           // GERAÇÃO DE VAPOR
           $table->decimal("producao_vapor", 11, 3)->default(0)->nullable();
           $table->decimal("producao_vapor_meta", 11, 3)->default(0)->nullable(); 

           $table->decimal("producao_vapor_mes", 11, 3)->default(0)->nullable();
           $table->decimal("producao_vapor_mes_meta", 11, 3)->default(0)->nullable(); 

           $table->decimal("consumo_vapor21_bar", 11, 3)->default(0)->nullable();
           $table->decimal("consumo_vapor21_bar_meta", 11, 3)->default(0)->nullable(); 

           $table->decimal("vapor_42_bar_geracao_energia", 11, 3)->default(0)->nullable();
           $table->decimal("vapor_42_bar_geracao_energia_meta", 11, 3)->default(0)->nullable(); 


           // GERAÇÃO DE ENERGIA
           $table->decimal("vapor_42_bar_tg1_tg3", 11, 3)->default(0)->nullable();
           $table->decimal("vapor_42_bar_tg1_tg3_meta", 11, 3)->default(0)->nullable();

           $table->decimal("vapor_disponivel_42_bar_rebaixado_21_bar", 11, 3)->default(0)->nullable();
           $table->decimal("vapor_disponivel_42_bar_rebaixado_21_bar_meta", 11, 3)->default(0)->nullable();

           $table->decimal("producao_energia_eletrica_tg1_tg_342_bar", 11, 3)->default(0)->nullable();
           $table->decimal("producao_energia_eletrica_tg1_tg_342_bar_meta", 11, 3)->default(0)->nullable();

           $table->decimal("producao_energia_eletrica_tg2_21_bar", 11, 3)->default(0)->nullable();
           $table->decimal("producao_energia_eletrica_tg2_21_bar_meta", 11, 3)->default(0)->nullable();


           // Produção de Geração de Energia Elétrica
           $table->decimal("consumo_energia_industria", 11, 3)->default(0)->nullable();
           $table->decimal("consumo_energia_industria_meta", 11, 3)->default(0)->nullable();

           $table->decimal("consumo_energia_vila", 11, 3)->default(0)->nullable();
           $table->decimal("consumo_energia_vila_meta", 11, 3)->default(0)->nullable();

           $table->decimal("consumo_energia_silo_armazem_graos", 11, 3)->default(0)->nullable();
           $table->decimal("consumo_energia_silo_armazem_graos_meta", 11, 3)->default(0)->nullable();

           $table->decimal("consumo_energia_industria", 11, 3)->default(0)->nullable();
           $table->decimal("consumo_energia_industria_meta", 11, 3)->default(0)->nullable();


           // Excedente de Energia
           $table->decimal("potencial_instalada_requerida_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("potencial_instalada_requerida_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("potencia_consumida_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("potencia_consumida_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("potencial_instalada_requerida_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("potencial_instalada_requerida_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("meta_disponibilidade_energia_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("meta_disponibilidade_energia_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("potencial_instalada_requerida_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("potencial_instalada_requerida_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("excedente_meta_producao_energia_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("excedente_meta_producao_energia_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("potencial_instalada_requerida_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("potencial_instalada_requerida_irrigacao_meta", 11, 3)->default(0)->nullable();


           // Exportação de energia
           $table->decimal("producao_geracao_energia_eletrica", 11, 3)->default(0)->nullable();
           $table->decimal("producao_geracao_energia_eletrica_meta", 11, 3)->default(0)->nullable();

           $table->decimal("exportacao_meta_producao_energia_irrigacao", 11, 3)->default(0)->nullable();
           $table->decimal("exportacao_meta_producao_energia_irrigacao_meta", 11, 3)->default(0)->nullable();

           $table->decimal("exportacao_energia", 11, 3)->default(0)->nullable();
           $table->decimal("exportacao_energia_meta", 11, 3)->default(0)->nullable();


           // CÁLCULO DA EFICIÊNCIA
           $table->decimal("art_cana_peso", 11, 3)->default(0)->nullable();
           $table->decimal("art_cana_peso_meta", 11, 3)->default(0)->nullable();

           $table->decimal("art_produzido_alcool_rt", 11, 3)->default(0)->nullable();
           $table->decimal("art_produzido_alcool_rt_meta", 11, 3)->default(0)->nullable();

           $table->decimal("art_produzido_alcool_rtc", 11, 3)->default(0)->nullable();
           $table->decimal("art_produzido_alcool_rtc_meta", 11, 3)->default(0)->nullable();

           $table->decimal("art_produzido_acucar", 11, 3)->default(0)->nullable();
           $table->decimal("art_produzido_acucar_meta", 11, 3)->default(0)->nullable();

           $table->decimal("art_produzido_total_rtc", 11, 3)->default(0)->nullable();
           $table->decimal("art_produzido_total_rtc_meta", 11, 3)->default(0)->nullable();

           $table->decimal("rtc", 11, 3)->default(0)->nullable();
           $table->decimal("rtc_meta", 11, 3)->default(0)->nullable();

           $table->decimal("rtc_corrigido_fermetec", 11, 3)->default(0)->nullable();
           $table->decimal("rtc_corrigido_fermetec_meta", 11, 3)->default(0)->nullable();

           $table->decimal("rt", 11, 3)->default(0)->nullable();
           $table->decimal("rt_meta", 11, 3)->default(0)->nullable();


           // RIT CTC
           $table->decimal("mix_producao_alcool", 11, 3)->default(0)->nullable();
           $table->decimal("mix_producao_alcool_meta", 11, 3)->default(0)->nullable();

           $table->decimal("mix_producao_acucar", 11, 3)->default(0)->nullable();
           $table->decimal("mix_producao_acucar_meta", 11, 3)->default(0)->nullable();


           // CÁLCULO DO UNICOP
           $table->decimal("unicop_alcool", 11, 3)->default(0)->nullable();
           $table->decimal("unicop_alcool_meta", 11, 3)->default(0)->nullable();

           $table->decimal("unicop_acucar", 11, 3)->default(0)->nullable();
           $table->decimal("unicop_acucar_meta", 11, 3)->default(0)->nullable();

           $table->decimal("unicop_total", 11, 3)->default(0)->nullable();
           $table->decimal("unicop_total_meta", 11, 3)->default(0)->nullable();

           $table->decimal("unicop_tc", 11, 3)->default(0)->nullable();
           $table->decimal("unicop_tc_meta", 11, 3)->default(0)->nullable();


           // SUB PRODUTOS
           $table->decimal("vinhaca", 11, 3)->default(0)->nullable();
           $table->decimal("vinhaca_meta", 11, 3)->default(0)->nullable();

           $table->decimal("bagaco", 11, 3)->default(0)->nullable();
           $table->decimal("bagaco_meta", 11, 3)->default(0)->nullable();

           $table->decimal("impurezas_mesa", 11, 3)->default(0)->nullable();
           $table->decimal("impurezas_mesa_meta", 11, 3)->default(0)->nullable();

           $table->decimal("torta_produzida", 11, 3)->default(0)->nullable();
           $table->decimal("torta_produzida_meta", 11, 3)->default(0)->nullable();

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('safra_histories');
    }
};
