<footer class="mt-24 lg:gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-6 content-info">

  <b id="T" class="w-full p-6 font-black lg:col-span-2 lg:row-span-6">T</b>

  <div class="w-full p-6 lg:px-0 lg:pb-0 footer-text lg:col-span-6 lg:row-span-4 lg:col-start-3">
    @hasoption('footer_texto')
      @option('footer_texto')
    @endoption
  </div>

  <div class="p-6 lg:px-0 lg:pb-0 lg:row-start-5 w-fullfooter-links lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:pb-6">
    @hasoptions('footer_enlaces')
      <ul class="flex flex-wrap lg:h-full">
        @options('footer_enlaces')
          <li class="w-full">
            @php $enlace =  get_sub_field('footer_enlace')  @endphp
            <a href="{{ $enlace['url'] }}" target="{{ $enlace['target'] }}">{{ $enlace['title'] }}</a>
          </li>
        @endoptions
      </ul>
    @endhasoptions
  </div>

    <div class="p-6 lg:px-0 lg:pb-0 lg:row-start-5 w-fullfooter-links lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:h-full lg:pb-6">
    @hasoptions('footer_enlaces_2')
      <ul class="h-full lg:flex lg:items-end lg:justify-end">
        @options('footer_enlaces_2')
          <li class="lg:px-4">
            @php $enlace =  get_sub_field('footer_enlace_2')  @endphp
            <a href="{{ $enlace['url'] }}" target="{{ $enlace['target'] }}">{{ $enlace['title'] }}</a>
          </li>
        @endoptions
      </ul>
    @endhasoptions
  </div>
  
  @if ($primary_navigation)
    <ul class="flex flex-col justify-center w-full p-6 text-2xl font-bold menu-footer lg:col-span-4 lg:row-span-6" id="nav-principal">
      @foreach ($primary_navigation as $item) 
        <li class="my-menu-item {{ $item->classes ?? '' }} {{ $item->active ? 'active' : '' }} capitalize">
          <div class="text-center">
            <a href="{{ $item->url }}">{!! $item->label !!}</a>
          </div>
        </li>
      @endforeach
    </ul>
  @endif

</footer>
