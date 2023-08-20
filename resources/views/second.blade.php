@extends('layouts.app')

@section('title', 'Second')

@section('head')
    <link type="text/css" rel="stylesheet" href="{{ asset('css/second/app.css') }}">
@endsection

@section('content')
    <div class="container">
        <div id="wheel"></div>
        <img class="middle" src="{{ asset('images/second/middle.svg') }}" alt="middle" />
        <img class="active" src="{{ asset('images/second/active.svg') }}" alt="active" />
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{ asset('js/second/app.js') }}"></script>
    <script type="text/javascript">
        lottery(@json($users), @js($winner))
    </script>
@endsection
