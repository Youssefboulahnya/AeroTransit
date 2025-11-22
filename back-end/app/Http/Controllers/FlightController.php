<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{

    public function liste_flight(){
        $flights = Flight::all();
        return response()->json($flights);
    }
    /**
     * Display a listing of the resource.
     */

    // the modifier_flight function

   public function modifier_flight(Request $request, $id)
    {
        $flight = Flight::findOrFail($id);

        $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string|different:Origin',
            'temps_aller' => 'required|date',
            'temps_arriver' => 'required|date|after:temps_aller',
            'seats' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:scheduled,arrived',
        ]);

        $flight->update($request->all());

        return response()->json([
            'message' => 'Flight updated successfully',
            'flight' => $flight
        ]);
    }
    //idk lmao
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Flight $flight)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flight $flight)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flight $flight)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flight $flight)
    {
        //
    }
}
