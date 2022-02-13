<a href="{{ get_permalink() }}" role="article" class="justify-start block w-full px-6 mb-24 text-black md:flex article">


  <div class="justify-start col-1 md:pr-6 lg:flex md:w-1/2 lg:w-2/3">
    <div class="my-6 header md:mt-0 entry-title lg:mr-6">
      <h2 class="text-2xl font-bold text-black lg:w-2/3 borde-largo">
        {!! $title !!}
      </h2>
    </div>
    <div class="my-6 font-serif text-xl text-black lg:borde lg:my-0 entry-summary lg:pr-6">
      @wpautop(get_the_excerpt())
    </div>
  </div>

  
    @if (has_post_thumbnail())
      <div class="md:borde thumb md:w-1/2 lg:ml-12">
        @thumbnail('large')
      </div>
    @endif

</a>
