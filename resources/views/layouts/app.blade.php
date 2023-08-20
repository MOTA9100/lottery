<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    @yield('head')
    <title>@yield('title')</title>
    <style>
        body {
            font-family: Vazirmatn;
        }
        main {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
        }

        .title {
            text-align: center;
            z-index: 10;
        }

        .button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
        }

        .button {
            font-family: Vazirmatn;
            background: #2d8dec;
            color: white;
            border-radius: 8px;
            border: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
            min-height: 40px;
            font-size: 16px;
            cursor: pointer;
            z-index: 2;
        }
    </style>
</head>
<body>
<main>
    <h1 class="title">قرعه کشی شماره ۱ صندوق اوّل</h1>
    @yield('content')
    <div class="button-container">
        <button class="button">
            اشتراک گذاری
        </button>
        <button class="button">
            برگشت
        </button>
    </div>
</main>

@yield('footer')
</body>
</html>
