<header>
  @if (has_excerpt())
  <div class="px-20 py-6 my-12 font-sans text-2xl font-bold tracking-wide md:text-4xl hero-excerpt columns-2">
    @wpautop(get_the_excerpt())
  </div>
@endif
  @include('partials/entry-meta')

  <h1 class="w-full p-6 font-black lg:px-0 lg:mx-auto lg:max-w-3xl">
    {!! $title !!}
  </h1>
</header>
