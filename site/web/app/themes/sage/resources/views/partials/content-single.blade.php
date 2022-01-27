<article @php(post_class())>

  @if ($hero_image['has_img'])
    @include('partials/post-header-hero')
  @else
    @include('partials/post-header')
  @endif

  <div class="p-6 prose lg:px-0 lg:mx-auto lg:max-w-3xl">
    @php(the_content())
  </div>

  @php(comments_template())
  
</article>