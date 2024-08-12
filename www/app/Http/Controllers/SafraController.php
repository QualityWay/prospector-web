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

        return Inertia::render('Dashboard/Index', [
            'year'              => $year,
            'safra_lancamentos' => $safraLancamentos,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($year, $month, $day)
    {
        $lancamento = SafraHistory::where('data', "$year/$month/$day")->first() ?? [];

        return Inertia::render('Safra/Index', [
            'year'          => $year,
            'month'         => $month,
            'day'           => $day,
            'lancamento'    => $lancamento,
        ]);
    }

    /**
     * Store/Update a newly created resource in storage.
     */
    public function upsert(Request $request, $year, $month, $day)
    {
        if ($request->lancamentos) {
            $object = new stdClass();

            $object->safra = $request->safra;
            $object->data = "$year-$month-$day";
            foreach ($request->lancamentos as $item) {
                $object->{key($item)} = $item[key($item)];
            }

            if ($request->id) {
                SafraHistory::find($request->id)->update(collect($object)->toArray());
            } else {
                SafraHistory::create(collect($object)->toArray());
            }
        }
    }
}
