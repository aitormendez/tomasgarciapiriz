@extends('layouts.app')

@section('content')
    <canvas class="fixed top-0 left-0 z-0 w-full h-screen webgl"></canvas>
    <div class="fixed w-2/4 h-2 bg-black loading-bar top-3/4 left-1/4"></div>

    <section id="posts" class="relative z-30">
      @while(have_posts()) @php(the_post())
        @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
      @endwhile
    </section>
    <div class="navig">
      {!! get_the_posts_navigation() !!}
    </div>
    
@endsection

@section('sidebar')
  @include('partials.sidebar')
@endsection
