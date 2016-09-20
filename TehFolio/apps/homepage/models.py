from django.db import models


class Person(models.Model):
    uid = models.IntegerField()
    firstName = models.TextField()
    lastName = models.TextField()


class BlogPost(models.Model):
    title = models.CharField(max_length=40)
    body = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return self.title


class Snippet(models.Model):
    title = models.CharField(max_length=30)
    body = models.TextField()
    date = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.title