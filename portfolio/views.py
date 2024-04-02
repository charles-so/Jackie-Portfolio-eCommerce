from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
import stripe
from django.views.generic.edit import FormView
from django.core.mail import send_mail
from .forms import ContactForm
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin
import os


class AboutPageView(TemplateView):
    template_name = 'about.html'
    
class CoachingPageView(TemplateView):
    template_name = 'coaching.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['CAL_URL'] = os.environ.get('CAL_URL')
        print(context)
        return context

class ProductServicePageView(TemplateView):
    template_name = 'productservice.html'

class ContactPageView(TemplateView):
    template_name = 'contact.html'
    
class SuccessView(TemplateView):
    template_name = 'success.html'
    
@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'GET':
        domain_url = os.environ.get('CSRF_TRUSTED_ORIGINS')
        stripe.api_key = settings.STRIPE_SECRET_KEY
        unit_amount = 600
        name = "Notion Template"
        try:
            # Create new Checkout Session for the order
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'productservice/',
                payment_method_types=['card'],
                mode='payment',
                line_items=[
                    {
                        'price_data': {
                            'currency': 'aud',
                            'unit_amount': unit_amount,
                            'product_data': {
                                'name': name,
                            },
                        },
                        'quantity': 1,
                    }
                ]
            )
            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})
        

# Contact email
class ContactFormView(FormView):
    template_name = 'contact.html'
    form_class = ContactForm
    success_url = '/contact'
    success_message = "Your message has been sent successfully! ✅ We'll be in touch soon! 😊"
    failed_message = "Failed to send email. Please try again later. 😔"


    def form_valid(self, form):
        first_name = form.cleaned_data['first_name']
        last_name = form.cleaned_data['last_name']
        email = form.cleaned_data['email']
        subject = form.cleaned_data['subject']
        message = form.cleaned_data['message']
        
        # Construct the email message
        email_message = f"First Name: {first_name}\nLast Name: {last_name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}"
  
        try:
            # Send the email using SMTP Gmail
            send_mail(
                subject,
                email_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
                auth_user=settings.EMAIL_HOST_USER,
                auth_password=settings.EMAIL_HOST_PASSWORD 
            )
            messages.success(self.request, self.success_message)
            
        except Exception as e:
            messages.error(self.request, self.failed_message)
        
        return super().form_valid(form)
