<header class="fixed z-40 banner">
    <div class="fixed z-40 p-6 brand">
      <a class="font-bold tracking-widest uppercase" href="{{ home_url('/') }}">
        {{ $siteName }}
      </a>
    </div>

  <button id="hamb" class="fixed left-0 top-16">
    <i class="block bg-black"></i>
    <i class="block bg-black"></i>
    <i class="block bg-black"></i>
  </button>

  <div id="solapa" class="fixed z-30 flex flex-col p-6 pt-24 bg-white">
    <button id="cerrar" class="self-end mb-6">
      @svg('images/interface/flecha.svg', 'rotate-180', ['aria-label' => 'close-navigation-icon'])
    </button>
    @include('partials.navigation')
  </div>
</header>