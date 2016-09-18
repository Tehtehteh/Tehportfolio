from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost, Snippet
from .serializers import PostSerializer, SnippetSerializer


class SnippetView(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (IsAuthenticated,)


class BlogPostView(APIView):
    def lookup(self, request, keyword):
        posts = BlogPost.objects.filter(body__contains=keyword)
        if posts:
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data, status=status.HTTP_302_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        """
           When I want to serialize data — I simply pass model as first argument.
        """
        posts = BlogPost.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        When I want to deserialize data — I should pass object
        as first argument with keyword 'data'
        """
        serializer = PostSerializer(data=request.data, many=True)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error_messages, status=status.HTTP_409_CONFLICT)


def index(request):
    return render(request, 'index.html')
