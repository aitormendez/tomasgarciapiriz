
<a href="{{ get_permalink() }}" role="article" id="post-{{ get_the_ID() }}" class="w-full mb-12 md:mb-0 article borde">
    <h2 class="relative px-6 mt-6 mb-4 font-bold text-black entry-title">
        {!! $title !!}
    </h2>

    @if (has_post_thumbnail())
      <div class="flex items-center thumb md:fixed">
        @thumbnail('large')
      </div>
    @endif
</a>
