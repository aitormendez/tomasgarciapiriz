@if ($submenu_estudio_navigation)
  <div class="flex justify-center submenu md:mt-6 mt-36">
    <b class="mayusculas" >{{ __('estudio', 'sage') }}</b>
    <ul role="nav" class="flex flex-wrap justify-center max-w-xs md:max-w-sm lg:max-w-md">
      @foreach ($submenu_estudio_navigation as $item)
        <li class="mx-3">
          <a class="uppercase" href="{{ $item->url }}">
            {{ $item->label }}
          </a>
        </li>
      @endforeach
    </ul>
  </div>
@endif
