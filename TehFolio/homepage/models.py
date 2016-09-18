from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=40)
    body = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return self.title


class Snippet(models.Model):
    title = models.CharField(max_length=30)
    body = models.TextField()

    def __str__(self):
        return self.title