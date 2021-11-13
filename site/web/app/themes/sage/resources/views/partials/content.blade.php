<article id="post-{{ get_the_ID() }}" @php(post_class('post'))>

  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>
    @include('partials/entry-meta')
  </header>
  <div class="hidden thumb">
    @thumbnail('large')
  </div>

    @if (!is_home())
      <div class="entry-summary">
        @php(the_excerpt())
      </div>
    @endif

</article>
