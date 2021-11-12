@extends('layouts.app')

@section('content')
    <canvas class="fixed top-0 left-0 z-0 w-full h-screen webgl"></canvas>
    <div class="loading-bar absolute h-2 bg-black w-2/4 top-3/4 left-1/4"></div>

    <section id="posts" class="relative z-30">
      @while(have_posts()) @php(the_post())
        @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
      @endwhile
    </section>
    
@endsection

@section('sidebar')
  @include('partials.sidebar')
@endsection
