<header class="fixed z-40 banner">
    <div class="fixed top-0 z-40 p-6 brand">
      <a id="logo" class="font-bold tracking-widest uppercase" href="{{ home_url('/') }}">
        {{ $siteName }}
      </a>
    </div>

  <button id="hamb" class="fixed left-0 top-20">
    <i class="block bg-black"></i>
    <i class="block bg-black"></i>
    <i class="block bg-black"></i>
  </button>

  <div id="solapa" class="fixed top-0 z-30 flex flex-col w-full p-6 pt-24 bg-white sm:w-auto">
    <div id="x" class="absolute hidden">
      @svg('images/interface/x-grande.svg', 'rotate-180', ['aria-label' => 'close-navigation-icon'])
    </div>
    <button id="cerrar" class="self-end mb-6 mr-1">
      @svg('images/interface/flecha.svg', 'rotate-180', ['aria-label' => 'close-navigation-icon'])
    </button>
    @include('partials.navigation')
  </div>
</header>