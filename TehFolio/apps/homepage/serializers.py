from rest_framework.serializers import ModelSerializer, ValidationError
from django.contrib.auth.models import User
from rest_framework.serializers import CharField
from .models import BlogPost, Snippet, Person
from random import randint
from django.db.models import Q


class PostSerializer(ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'  # smart way to include every fields of my model in serializer

    def validate(self, data):
        if not any([value for value in data.values()]):
            raise ValidationError('All fields are required!')
        return data


class UserSerializer(ModelSerializer):
    token = CharField(max_length=50, allow_blank=False, read_only=True)
    username = CharField(required=False, allow_blank=True)
    password = CharField(required=True, allow_blank=False)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',
        ]

    def validate(self, data):
        password = data['password']
        username = data.get('username', 'None')
        if not all([password, username]):
            raise ValidationError('Username and password required.')
        user = User.objects.filter(username=username)
        if not user.count():
            raise ValidationError('Not such user.')
        else:
            user_obj = user.first()
            if not user_obj.check_password(password):
                raise ValidationError('Incorrect credentials. Please try again.')
            else:
                data['Token'] = randint(0, 3000)
        return data


class SnippetSerializer(ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'


class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'