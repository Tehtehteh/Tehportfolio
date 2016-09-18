from django.conf.urls import url
from .views import index, BlogPostView, SnippetView

urlpatterns = [
    url(r'^api/snippets', SnippetView.as_view(), name = 'snippets'),
    url(r'^api/posts', BlogPostView.as_view(), name = 'blogposts'),
    url(r'^$', index, name='homepage'),
]