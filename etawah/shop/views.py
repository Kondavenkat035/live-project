from django.shortcuts import render
from django.http import JsonResponse
from .models import Shop

def home(request):
    return render(request, 'shop/index.html')
def pricing(request):
    return render(request, 'shop/pricing.html')

def contact(request):
    return render(request, 'shop/contact.html')

def status(request):
    return JsonResponse({"status": "ok"})

def shop_list(request):
    shops = Shop.objects.all()
    return render(request, "shop/shop.html", {"shops": shops})

def about_view(request):
    return render(request, 'shop/about.html')