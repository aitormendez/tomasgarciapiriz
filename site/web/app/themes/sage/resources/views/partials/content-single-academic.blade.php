<article @php(post_class())>
  @if ($hero_image['has_img'])
    @include('partials/post-header-hero')
  @else
    @include('partials/post-header')
  @endif

  @if (has_excerpt())
      <div class="p-6 my-12 font-bold tracking-wide prose excerpt">
        @wpautop(get_the_excerpt())
      </div>
  @endif

  <div id="content" class="prose max-w-none">
    @php(the_content())
  </div>

  @php(comments_template())
  
</article>
@include('partials/relacionados')