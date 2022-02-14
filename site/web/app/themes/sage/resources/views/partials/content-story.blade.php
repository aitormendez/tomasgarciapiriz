<a href="{{ get_permalink() }}" role="article" class="justify-start block w-full mb-24 text-black md:flex article">


  <div class="justify-start col-1 lg:flex md:w-1/2 lg:w-2/3 md:pr-6">
    <div class="my-6 header md:mt-0 entry-title borde-largo">
      <h2 class="pt-6 pl-6 text-2xl font-bold text-black lg:w-2/3">
        {!! $title !!}
      </h2>
    </div>
    <div class="my-6 font-serif text-xl text-black lg:borde lg:my-0 entry-summary">
      <div class="pt-6 pl-6 lg:pl-0">@wpautop(get_the_excerpt())</div>
    </div>
  </div>

  
  @if (has_post_thumbnail())
    <div class="md:borde thumb md:w-1/2 lg:w-1/3">
      <div class="md:pt-6">@thumbnail('large')</div>
    </div>
  @endif

</a>
