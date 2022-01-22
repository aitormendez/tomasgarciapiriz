@if ($primary_navigation)
  <ul class="px-6 text-2xl my-menu" id="nav-principal">
    @foreach ($primary_navigation as $item)
      <li class="my-menu-item {{ $item->classes ?? '' }} {{ $item->active ? 'active' : '' }} lowercase">

        

        <div class="flex justify-between">
          <a href="{{ $item->url }}">{!! $item->label !!}</a>
          @if ($item->children)
            <button>@svg('images/interface/flecha.svg', 'self-center', ['aria-label' => 'toggle-submenu-button'])</button>
          @endif
        </div>


        

        @if ($item->children)
          <ul class="px-6 py-2 my-child-menu">
            @foreach ($item->children as $child)
              <li class="my-child-item {{ $child->classes ?? '' }} {{ $child->active ? 'active' : '' }} mayusculas text-sm">
                <a href="{{ $child->url }}" class="block py-0.5">
                  {!! $child->label !!}
                </a>
              </li>
            @endforeach
          </ul>
        @endif
      </li>
    @endforeach
  </ul>
@endif

@if ($secondary_navigation)
  <ul class="px-6 mt-10 text-2xl my-menu">
    @foreach ($secondary_navigation as $item)
      <li class="my-menu-item {{ $item->classes ?? '' }} {{ $item->active ? 'active' : '' }} mayusculas text-sm">
        <a href="{{ $item->url }}">
          {!! $item->label !!}
        </a>
      </li>
    @endforeach
  </ul>
@endif