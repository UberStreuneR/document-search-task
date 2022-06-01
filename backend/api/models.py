from django.db import models
import datetime
# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    date = models.DateField(default=datetime.datetime.now())