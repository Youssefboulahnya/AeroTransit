@extends('layouts.default')

@section('header')
        <h1>This is the header</h1>


        @include('sidemenu')
@endsection


@section('maincontent')
        <h1>Home</h1>
            <form action="{{ route('formsubmitted') }}" method="post">
            @csrf
            <label for="fullname">Full name:</label>
            <input type="text" id="fullname" name="fullname" placeholder="full name..." required>
            <br><br>
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="enter ur email..." required><br><br>
            <button type="submit">Submit</button>

        </form>
@endsection


@section('footer')
    <h1>This is a footer</h1>
@endsection