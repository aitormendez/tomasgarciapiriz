<div class="fixed page-header top-12 left-6">
  <h1 class="mayusculas">{!! $title !!}</h1>
</div>

@if (is_page('bio') || is_page('bio-eng'))
  @include('partials.submenu-estudio')
@endif