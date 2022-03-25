
<article class="w-full pr-6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">

  @field('video_embed')

  <header class="mt-4 mb-3">
    <h2 class="font-bold entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>
  </header>

  <div class="entry-summary">
    <p>@field('video_fecha')</p>
    @php(the_excerpt())
  </div>

</article>
