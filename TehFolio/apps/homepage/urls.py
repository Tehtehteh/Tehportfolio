from django.conf.urls import url
from .views import index, BlogPostView, SnippetView, PersonView, getLikes, Authenticate, Logout
# from rest_framework.urlpatterns import format_suffix_patterns
# from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # url(r'^api/auth/', obtain_jwt_token),
    url(r'^api/logout', Logout.as_view()),
    url(r'^api/govno', getLikes),
    url(r'^api/person', PersonView.as_view()),
    url(r'^api/snippets', SnippetView.as_view()),
    url(r'^api/posts', BlogPostView.as_view(), name='blogposts'),
    url(r'^api/auth', Authenticate.as_view()),
    url(r'.*', index, name='homepage'),
]

# urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
