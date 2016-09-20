from django.conf.urls import url
from .views import index, BlogPostView, SnippetView, PersonView

urlpatterns = [
    url(r'^api/person', PersonView.as_view()),
    url(r'^api/snippets', SnippetView.as_view(), name = 'snippets'),
    url(r'^api/posts', BlogPostView.as_view(), name = 'blogposts'),
    url(r'^$', index, name='homepage'),
]