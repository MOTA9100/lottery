@extends('layouts.app')

@section('title', 'Fifth')

@section('head')
    <link type="text/css" rel="stylesheet" href="{{ asset('css/fifth/app.css') }}">
@endsection

@section('content')
    <div class="container">
        <div id="squares" class="squares"></div>
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{ asset('js/fifth/app.js') }}"></script>
    <script type="text/javascript">
        lottery(@json($users), @js($winner))
    </script>
@endsection
