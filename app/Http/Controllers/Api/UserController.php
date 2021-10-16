<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{

    public function __construct(){
        $this->middleware('auth:api');
    }

    public function authUser(){

        return Response::json(Auth::user());

    }


}
