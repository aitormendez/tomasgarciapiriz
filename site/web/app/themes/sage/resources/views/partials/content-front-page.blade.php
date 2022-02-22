
<article id="post-{{ get_the_ID() }}" @php(post_class('relative post border-b p-4'))>
@dump($feat_content)
  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>
    @include('partials/entry-meta')
  </header>

  <div class="hidden thumb thumb-path" data-format="{{ $feat_content()['img_format'] }}" data-type="{{ $feat_content()['tipo'] }}" data-path="{{ $feat_content()['url'] }}"></div>      

  @if (!is_home())
    <div class="entry-summary">
      @php(the_excerpt())
    </div>
  @endif

</article>
