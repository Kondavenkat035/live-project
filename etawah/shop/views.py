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

#def shop_list(request):
 #   shops = Shop.objects.all()
  #  return render(request, "shop/shop.html", {"shops": shops})

def about_view(request):
    return render(request, 'shop/about.html')

def shop_list(request):
    shops = [
        {
            "name": "SharmaG Furniture House",
            "contact_number": "7518733540",
            "location": "Etawah Bus Stand",
            "rating": 4.5,
            "services": ["Create", "Repair","Sale"],
            "products": ["Wood Work", "Furniture","Decor"]
        },
        {
            "name": "FASTTERS MOBILE",
            "contact_number": "7906935039",
            "location": "762 Alkapuri, FASTTERS MOBILE, Gupta Petrol Pump Ke Saamne, Kanpur Road, Kanpur Highway-206001",
            "rating": 4.8,
            "services": ["Mobile","Sale","Repair"],
            "products": ["Accessories", "Exchange"]
        }
    ]
    return render(request, 'shop/shop.html', {'shops': shops})
