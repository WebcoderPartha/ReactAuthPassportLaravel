<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Forget Password</title>
</head>
<body>
    <div>
        <p>Hi </p>
        <p>Here is your Pin: {{ $data }}</p>
        <p><a href="{{ URL::to('/') }}/reset/{{$data}}">Click Here</a> to reset password</p>
    </div>
</body>
</html>
