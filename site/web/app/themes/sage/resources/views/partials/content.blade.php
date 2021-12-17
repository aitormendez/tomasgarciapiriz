
<article id="post-{{ get_the_ID() }}" @php(post_class('relative post border-b p-4'))>

  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>
    @include('partials/entry-meta')
  </header>

  @if (has_post_thumbnail())
    <div class="hidden thumb thumb-path" data-type="{{ $feat_content()['tipo'] }}" data-path="{{ $feat_content()['url'] }}"></div>      
  @endif

    @if (!is_home())
      <div class="entry-summary">
        @php(the_excerpt())
      </div>
    @endif

</article>
