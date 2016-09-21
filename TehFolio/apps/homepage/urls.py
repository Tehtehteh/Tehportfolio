from django.conf.urls import url
from .views import index, BlogPostView, SnippetView, PersonView, getLikes
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^api/govno', getLikes),
    url(r'^api/person', PersonView.as_view()),
    url(r'^api/snippets', SnippetView.as_view()),
    url(r'^api/posts', BlogPostView.as_view(), name = 'blogposts'),
    url(r'^$', index, name='homepage'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])