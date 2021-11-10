@extends('layouts.app')

@section('content')
    <canvas class="fixed top-0 left-0 z-0 w-full h-screen webgl"></canvas>
@endsection

@section('sidebar')
  @include('partials.sidebar')
@endsection
