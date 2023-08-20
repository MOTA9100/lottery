@extends('layouts.app')

@section('title', 'Third')

@section('head')
    <link type="text/css" rel="stylesheet" href="{{ asset('css/third/app.css') }}">
@endsection

@section('content')
    <div id="table" class="container"></div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{ asset('js/third/app.js') }}"></script>
    <script type="text/javascript">
        lottery(@json($users), @js($winner))
    </script>
@endsection
