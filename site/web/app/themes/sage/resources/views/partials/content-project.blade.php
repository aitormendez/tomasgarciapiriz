<article id="post-{{ get_the_ID() }}" @php(post_class('relative post mb-6'))>
  <a href="{{ get_permalink() }}">
    @if (has_post_thumbnail())
      @thumbnail('large')
    @endif
    <header class="px-6 md:px-0">
      <h2 class="pt-2 text-black entry-title">
        {!! $title !!}
      </h2>
    </header>
  </a>
</article>
