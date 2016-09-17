from django.db import models

# Create your models here.

class BlogPost(models.Model):
    title = models.CharField(max_length=40)
    body = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return self.title