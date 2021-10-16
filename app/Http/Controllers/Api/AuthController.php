<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{

    public function Login(Request $request){
        $validateData = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {


            if (Auth::attempt($request->only('email', 'password'))){
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return Response::json([
                    'message' => 'Login Success',
                    'token' => $token,
                    'user' => $user
                ]);

            }

        }catch (\Exception $exception){
            return Response::json([
                'message' => $exception->getMessage()
            ]);
        }

        return Response::json([
            'message' => 'Email or Password Invalid'
        ],401);
    }

    public function Register(RegisterRequest $request){
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken('app')->accessToken;

            return Response::json([
               'token' => $token,
               'user' => $user
            ], 200);

        }catch (\Exception $exception){

            return Response::json([
                'message' => $exception->getMessage()
            ], 401);

        }


    }


}
