@extends('layouts.app')

@section('content')
  <canvas class="fixed top-0 left-0 z-0 w-full h-screen webgl"></canvas>
  
  <div class="fixed w-2/4 h-2 bg-gray-200 loading-bar top-3/4 left-1/4">
    <div class="h-2 bg-black fill"></div>
  </div>

  <section id="posts" class="relative inset-0 z-30 justify-end hidden loading-bar">
    <div class="relative max-w-md columna">
      <div id="posts-bg" class="absolute inset-0 transition-opacity bg-white opacity-0"></div>
      @while(have_posts()) @php(the_post())
        @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
      @endwhile
    </div>
  </section>
  <div class="navig">
    {!! get_the_posts_navigation() !!}
  </div>

  <div id="icn-scroll" class="fixed z-50 flex-col items-center hidden p-4 ml-6 bg-white rounded-lg sm:flex bottom-10">
    @svg('images/interface/icn-scroll.svg', 'mb-3', ['aria-label' => 'scroll-icon'])
    <p class="">{{ __('Scroll or click on an object', 'sage') }}</p>
  </div>
    
@endsection

@section('sidebar')
  @include('partials.sidebar')
@endsection
