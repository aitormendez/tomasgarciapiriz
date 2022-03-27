@if ($submenu_estudio_navigation)
  <div class="mb-6 ml-6 submenu md:mt-6 mt-36">
    <b class="mayusculas" >{{ __('estudio', 'sage') }}</b>
    <ul role="nav" class="">
      @foreach ($submenu_estudio_navigation as $item)
        <li class="inline-block mr-2">
          <a class="uppercase" href="{{ $item->url }}">
            {{ $item->label }}
          </a>
        </li>
      @endforeach
    </ul>
  </div>
@endif
