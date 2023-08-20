<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="width: 100%; height: 100%">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lottery</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    </head>
    <body class="antialiased" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
    <ul>
        <li>
            <a href="{{ route('first') }}" title="First" target="_blank">
                First page
            </a>
        </li>
        <li>
            <a href="{{ route('second') }}" title="Second" target="_blank">
                Second page
            </a>
        </li>
        <li>
            <a href="{{ route('third') }}" title="Third" target="_blank">
                Third page
            </a>
        </li>
        <li>
            <a href="{{ route('fourth') }}" title="Fourth" target="_blank">
                Fourth page
            </a>
        </li>
        <li>
            <a href="{{ route('fifth') }}" title="Fifth" target="_blank">
                Fifth page
            </a>
        </li>
    </ul>
    </body>
</html>
