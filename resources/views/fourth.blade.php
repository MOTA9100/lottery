@extends('layouts.app')

@section('title', 'Fourth')

@section('head')
    <link type="text/css" rel="stylesheet" href="{{ asset('css/fourth/app.css') }}">
@endsection

@section('content')
    <div class="container">
        <ul id="slideshow"></ul>
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{ asset('js/fourth/app.js') }}"></script>
    <script type="text/javascript">
        lottery(@json($users), @js($winner))
    </script>
@endsection
