<article @php(post_class('prose'))>
  <header>
    <h1 class="p-6 lg:px-0 lg:mx-auto lg:max-w-3xl">
      {!! $title !!}
    </h1>
    @include('partials/entry-meta')
  </header>

  <div class="p-6 lg:px-0 lg:mx-auto lg:max-w-3xl">
    @php(the_content())
  </div>

  @php(comments_template())
</article>