{{--
  Template Name: Colaboradores
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    @include('partials.content-page-colaboradores')
  @endwhile
@endsection
