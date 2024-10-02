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
            $table->decimal("toneladas_art_meta", 11, 3)->default(0)->nullable(); 
            $table->decimal("cana_safra", 11, 3)->default(0)->nullable();
            $table->decimal("cana_safra_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("moagem_horaria", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_horaria_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("extracao_moenda", 11, 3)->default(0)->nullable();
            $table->decimal("extracao_moenda_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("moagem_real_media", 11, 3)->default(0)->nullable();
            $table->decimal("moagem_real_media_meta", 11, 3)->default(0)->nullable(); 
            
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
            
            $table->decimal("art_perdido_lavagem_cana", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_lavagem_cana_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_extracao", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_extracao_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_torta", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_torta_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_multijatos", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_multijatos_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_residuaria_geral", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_residuaria_geral_meta", 11, 3)->default(0)->nullable(); 
            
            $table->decimal("art_perdido_vinhaca_flegmassa", 11, 3)->default(0)->nullable();
            $table->decimal("art_perdido_vinhaca_flegmassa_meta", 11, 3)->default(0)->nullable(); 
            
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
