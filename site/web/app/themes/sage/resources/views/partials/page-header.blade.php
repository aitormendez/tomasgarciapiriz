<div class="fixed page-header top-12 left-6">
  <h1 class="mayusculas">{!! $title !!}</h1>
</div>

@if (is_page('bio') || is_page('bio-eng') || is_page('premios-otorgados') || is_page('awards') || is_page('contacto') || is_page('contact') || is_post_type_archive('prize'))
  @include('partials.submenu-estudio')
@endif