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
            $table->decimal("toneladas_art", 11, 3)->default(0)->nullable();
            $table->decimal("cana_safra", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_horaria", 11, 3)->default(0)->nullable();
            $table->decimal("extracao_moenda", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_real_media", 11, 3)->default(0)->nullable();
            $table->decimal("brix_cana", 11, 3)->default(0)->nullable();
            $table->decimal("pol_cana", 11, 3)->default(0)->nullable();
            $table->decimal("pureza_cana", 11, 3)->default(0)->nullable();
            $table->decimal("fibra_cana", 11, 3)->default(0)->nullable();
            $table->decimal("umidade", 11, 3)->default(0)->nullable();
            $table->decimal("ar_cana", 11, 3)->default(0)->nullable();
            $table->decimal("art_cana", 11, 3)->default(0)->nullable();
            $table->decimal("atr", 11, 3)->default(0)->nullable();
            $table->decimal("impureza_mineral", 11, 3)->default(0)->nullable();
            $table->decimal("impureza_vegetal", 11, 3)->default(0)->nullable();
            $table->decimal("perda_lavagem_cana", 11, 3)->default(0)->nullable();
            $table->decimal("perda_extracao", 11, 3)->default(0)->nullable();
            $table->decimal("perda_torta", 11, 3)->default(0)->nullable();
            $table->decimal("perda_multijatos", 11, 3)->default(0)->nullable();
            $table->decimal("perda_residuaria_geral", 11, 3)->default(0)->nullable();
            $table->decimal("vinhaca_flegmassa", 11, 3)->default(0)->nullable();
            $table->decimal("perda_indeterminada", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_geral", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_industrial", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo_agrícola", 11, 3)->default(0)->nullable();
            $table->decimal("aproveitamento_tempo", 11, 3)->default(0)->nullable();
            $table->decimal("dias_safra_consecutivos", 11, 3)->default(0)->nullable();
            $table->decimal("dias_safra_efetivo", 11, 3)->default(0)->nullable();
            $table->decimal("horas_efetiva", 11, 3)->default(0)->nullable();
            $table->decimal("pol_acucar_produzido", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_hidratado", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro_ciclo_hexano", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_anidro_peneira_molecular", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_lavagem_cana", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_extracao", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_torta", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_multijatos", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_aguas_residuarias", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_destilaria", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdas_indeterminadas", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_hidratado", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_anidro", 11, 3)->default(0)->nullable();
            $table->decimal("producao_alcool_total", 11, 3)->default(0)->nullable();
            $table->decimal("rgd", 11, 3)->default(0)->nullable();
            $table->decimal("rgd_corrigido_fermentec", 11, 3)->default(0)->nullable();
            $table->decimal("eficiencia_fermentacao", 11, 3)->default(0)->nullable();
            $table->decimal("eficiencia_fermentacao_corrigido_fermentec", 11, 3)->default(0)->nullable();
            $table->decimal("rendimento_destilacao", 11, 3)->default(0)->nullable();
            $table->decimal("alcool_processo", 11, 3)->default(0)->nullable();
            $table->decimal("producao_acucar", 11, 3)->default(0)->nullable();
            $table->decimal("sjm", 11, 3)->default(0)->nullable();
            $table->decimal("producao_vapor", 11, 3)->default(0)->nullable();
            $table->decimal("consumo_vapor21_bar", 11, 3)->default(0)->nullable();
            $table->decimal("vapor_42_bar_geracao_energia", 11, 3)->default(0)->nullable();
            $table->decimal("vapor_42_bar_tg1_tg3", 11, 3)->default(0)->nullable();
            $table->decimal("vapor_disponivel_42_bar_rebaixado_21_bar", 11, 3)->default(0)->nullable();
            $table->decimal("producao_energia_eletrica_tg1_tg_342_bar", 11, 3)->default(0)->nullable();
            $table->decimal("producao_energia_eletrica_tg2_21_bar", 11, 3)->default(0)->nullable();
            $table->decimal("consumo_energia_industria", 11, 3)->default(0)->nullable();
            $table->decimal("consumo_energia_vila", 11, 3)->default(0)->nullable();
            $table->decimal("consumo_energia_silo_armazem_graos", 11, 3)->default(0)->nullable();
            $table->decimal("potencial_instalada_requerida_irrigacao", 11, 3)->default(0)->nullable();
            $table->decimal("potencia_consumida_irrigacao", 11, 3)->default(0)->nullable();
            $table->decimal("meta_disponibilidade_energia_irrigacao", 11, 3)->default(0)->nullable();
            $table->decimal("excedente_meta_producao_energia_irrigacao", 11, 3)->default(0)->nullable();
            $table->decimal("producao_geracao_energia_eletrica", 11, 3)->default(0)->nullable();
            $table->decimal("exportacao_meta_producao_energia_irrigacao", 11, 3)->default(0)->nullable();
            $table->decimal("exportacao_energia", 11, 3)->default(0)->nullable();
            $table->decimal("art_cana_peso", 11, 3)->default(0)->nullable();
            $table->decimal("art_produzido_alcool_rt", 11, 3)->default(0)->nullable();
            $table->decimal("art_produzido_alcool_rtc", 11, 3)->default(0)->nullable();
            $table->decimal("art_produzido_acucar", 11, 3)->default(0)->nullable();
            $table->decimal("art_produzido_total_rtc", 11, 3)->default(0)->nullable();
            $table->decimal("rtc", 11, 3)->default(0)->nullable();
            $table->decimal("rtc_corrigido_fermetec", 11, 3)->default(0)->nullable();
            $table->decimal("rt", 11, 3)->default(0)->nullable();
            $table->decimal("mix_producao_alcool", 11, 3)->default(0)->nullable();
            $table->decimal("mix_producao_acucar", 11, 3)->default(0)->nullable();
            $table->decimal("unicop_alcool", 11, 3)->default(0)->nullable();
            $table->decimal("unicop_acucar", 11, 3)->default(0)->nullable();
            $table->decimal("unicop_total", 11, 3)->default(0)->nullable();
            $table->decimal("unicop_tc", 11, 3)->default(0)->nullable();
            $table->decimal("vinhaca", 11, 3)->default(0)->nullable();
            $table->decimal("bagaco", 11, 3)->default(0)->nullable();
            $table->decimal("impurezas_mesa", 11, 3)->default(0)->nullable();
            $table->decimal("torta_produzida", 11, 3)->default(0)->nullable();
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
