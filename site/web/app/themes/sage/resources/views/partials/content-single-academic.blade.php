<article @php(post_class())>

    @include('partials/post-header-academic')


  <div id="content" class="prose max-w-none">
    @php(the_content())
  </div>

  @php(comments_template())
  
</article>
@include('partials/relacionados')