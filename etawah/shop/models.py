from django.db import models


class Shop(models.Model):
    name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    services = models.JSONField(default=list)
    products = models.JSONField(default=list)

    def __str__(self):
        return self.name

class Feature(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class PricingPlan(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name