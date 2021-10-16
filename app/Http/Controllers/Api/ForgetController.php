<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ForgetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;

class ForgetController extends Controller
{

    public function ForgetPassword(Request $request){

        $validate = $request->validate([
            'email' => 'required'
        ]);

        if (User::where('email', $request->email)->doesntExist()){
            return Response::json([
               'error' => 'Email Invalid'
            ],401);
        }else {

            $token = rand(10, 100000);

            try {

                DB::table('password_resets')->insert([
                    'email' => $request->email,
                    'token' => $token
                ]);

                Mail::to($request->email)->send(new ForgetPassword($token));

                return Response::json([
                    'success' => 'Reset password link sent successfully'
                ], 200);

            }catch (\Exception $exception){
                return Response::json([
                    'message' => $exception->getMessage()
                ],401);
            }

        }



    }


    public function ResetPassword(Request $response){

//        $validateData = $response->validate([
//            'token' => 'required',
//            'email' => 'required',
//            'password' => 'required|confirmed'
//        ]);

        $token = DB::table('password_resets')->where('token', $response->token)->first();
        $email = DB::table('password_resets')->where('email', $response->email)->first();

        if ($email){

            if ($token){

                $user = User::where('email', $email->email)->first();

                $user->password = Hash::make($response->password);

                $update = $user->save();

                if ($update){
                    DB::table('password_resets')->where('token', $response->token)->delete();
                }

                return Response::json([
                    'success' => 'Password reset successfully'
                ], 200);

            }else{
                return Response::json([
                    'error' => 'Token Invalid'
                ], 401);
            }

        }else{
            return Response::json([
                'error' => 'Email Invalid'
            ], 401);
        }


    }


}
