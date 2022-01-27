<header>
  <div class="hero-img">
    <img class="" src="{!! $hero_image['url'] !!}" srcset="{!! $hero_image['srcset'] !!}" alt="{!! $hero_image['alt'] !!}" sizes="100vw">
  </div>
  @include('partials/entry-meta')

  <h1 class="p-6 font-black lg:px-0 lg:mx-auto lg:max-w-3xl">
    {!! $title !!}
  </h1>
</header>
