from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import vk
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from django.contrib.auth import authenticate, login, logout
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BlogPost, Snippet, Person
from .serializers import PostSerializer, SnippetSerializer, PersonSerializer, UserSerializer


class Logout(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        if request.user.is_authenticated:
            logout(request.user)
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)


class Authenticate(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            username = new_data['username']
            password = new_data['password']
            acc = authenticate(username=username, password=password)
            if acc:
                login(request=request, user=acc)
            else:
                return Response(status=HTTP_400_BAD_REQUEST)
            return Response(new_data, status=200)


def getLikes(request):
    session = vk.Session()
    api = vk.API(session)
    data = api.likes.getList(type='sitepage', page_url='fin.trade', owner_id='5629812', offset=1, extended=True)
    print(data)
    return render(request, 'test.html', {'data': data['items']})


class PersonView(APIView):
    def get(self, request, format=None):
        persons = Person.objects.all()
        serializer = PersonSerializer(persons, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        When I want to deserialize data — I should pass object
        as first argument with keyword 'data'
        """
        serializer = PersonSerializer(data=request.data, many=True)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error_messages, status=status.HTTP_409_CONFLICT)


class SnippetView(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (IsAuthenticated,)

# todo UpdateAPIView onto Snippet and BlogPost models.


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
    return render(request, 'new_index.html')
