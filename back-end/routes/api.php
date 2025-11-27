<?php




use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\PaymentController;

Route::post('/admin-login', [AdminController::class, 'login']); //anyone can access the log in page


    Route::post('/admin-create', [AdminController::class, 'createAdmin']);
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/flights', [FlightController::class, 'liste_flight']);
    Route::delete('/flights/{id}', [FlightController::class, 'delete_flight']);
    Route::put('/flights/{id}', [FlightController::class, 'modifier_flight']);
    Route::post('/flights', [FlightController::class, 'creer_flight']);
    Route::post('/logout', [AdminController::class, 'logout']);
    Route::post('/reservations', [ReservationController::class, 'store_reservation']); // create partial reservation
    Route::put('/reservations/{id}/assign-flight', [ReservationController::class, 'choisir_Flight']); // assign flight
    Route::post('/flights/search', [FlightController::class, 'searchFlights']);
    Route::get('/reservations/{id}/flight-details', [ReservationController::class, 'getFlightDetails']);
    Route::post('/passengers/store', [PassengerController::class, 'storePassengers']);
    Route::put('/reservations/{reservation_ID}/email', [ReservationController::class, 'updateEmail']);
    Route::post('/payments/create', [PaymentController::class, 'createPayment']);
    Route::get('/reservation/confirmation/{reservationId}', [ReservationController::class, 'getConfirmationData']);
    Route::post('/reservation/login', [ReservationController::class, 'Manage_your_booking_login']);



