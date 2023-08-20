@extends('layouts.app')

@section('title', 'First')

@section('head')
    <link type="text/css" rel="stylesheet" href="{{ asset('css/first/app.css') }}">
@endsection

@section('content')
    <div id="app">
        <div class="main">
            <canvas class="confetti" id="confetti-canvas"></canvas>
            <div id="lucky-draw">
                <div class="slot">
                    <div class="slot__outer">
                        <div class="slot__dots"></div>
                        {{--                    <img class="slot__img" src="{{ asset('images/first/light-blubs.svg') }}" alt="blubs" />--}}
                        <div class="slot__inner">
                            <div class="slot__shadow"></div>
                            <div class="reel" id="reel"></div>
                        </div>
                    </div>
                    <div class="sunburst" id="sunburst">
                        <img src="/images/first/sunburst.svg" alt="sunburst"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{ asset('js/first/app.js') }}"></script>
    <script type="text/javascript">
        lottery(@json($users), @js($winner));
    </script>
@endsection
