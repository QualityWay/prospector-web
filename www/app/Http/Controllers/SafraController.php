<?php

namespace App\Http\Controllers;

use App\Models\SafraHistory;

use Illuminate\Http\Request;
use Inertia\Inertia;
use stdClass;

class SafraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {       
        
        $year = $request->year ?? now()->year;

        $safraLancamentos = SafraHistory::whereYear('data', $year)->get('data');

        // Mapeia os meses que têm lançamentos
        $lancamentosMeses = $safraLancamentos->map(function ($lancamento) {
            return \Carbon\Carbon::parse($lancamento->data)->month;
        });

        return Inertia::render('Dashboard/Index', [
            'year'              => $year,
            'safra_lancamentos' => $lancamentosMeses, 
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($year, $month)
    {
        
        
        $lancamento = SafraHistory::whereYear('data', $year)
                                ->whereMonth('data', $month)
                                ->first() ?? [];        

        return Inertia::render('Safra/Index', [
            'year'          => $year,
            'month'         => $month,           
            'lancamento'    => $lancamento,
        ]);
    }

    /**
     * Store/Update a newly created resource in storage.
     */
    public function upsert(Request $request, $year, $month)
    {          
        $month = str_pad($month, 2, '0', STR_PAD_LEFT);
        
        if ($request->lancamentos) {
            $object = new stdClass();

            $object->safra = $request->safra;
            $object->data = "$year-$month-01";
            foreach ($request->lancamentos as $item) {
                $object->{key($item)} = $item[key($item)];
            }

            if ($request->id) {
                SafraHistory::find($request->id)->update(collect($object)->toArray());
            } else {
                SafraHistory::create(collect($object)->toArray());
            }
        }

        return redirect()->route("dashboard");
    }
}
