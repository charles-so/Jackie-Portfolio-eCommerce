from django import forms

class ContactForm(forms.Form):
    first_name = forms.CharField(label='First Name', max_length=100, required=True)
    last_name = forms.CharField(label='Last Name', max_length=100, required=True)
    email = forms.EmailField(label='Your Email', required=True)
    subject = forms.CharField(label='Subject', max_length=100, required=True)
    message = forms.CharField(label='Message', widget=forms.Textarea, required=True)