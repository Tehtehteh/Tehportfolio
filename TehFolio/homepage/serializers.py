from rest_framework import serializers
from .models import BlogPost, Snippet


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'  # smart way to include every fields of my model in serializer

    def validate(self, data):
        if not any([value for value in data.values()]):
            raise serializers.ValidationError('All fields are required!')
        return data


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'
