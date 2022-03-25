<article class="w-full p-6 lg:px-0 lg:mx-auto lg:max-w-3xl">
  @field('video_embed')
  <h1 class="mt-4 mb-3 font-bold">{!! $title !!}</h1>
  
      <div class="">
        
        @hasfield('video_fecha')
          <p>@field('video_fecha')</p>
        @endfield

        @if (has_excerpt())
          @wpautop(get_the_excerpt())
        @endif
      </div>
  
</article>