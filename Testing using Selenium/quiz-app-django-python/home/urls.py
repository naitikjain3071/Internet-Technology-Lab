from . import views
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("", views.index, name="index"),
    #path('', TemplateView.as_view(template_name="index1.html")),
    # path("index/<int:myid>/", views.quiz, name="quiz"), 
    # path('index/<int:myid>/data/', views.quiz_data_view, name='quiz-data'),
    # path('index/<int:myid>/save/', views.save_quiz_view, name='quiz-save'),
    path("<int:myid>/", views.quiz, name="quiz"), 
    path('<int:myid>/data/', views.quiz_data_view, name='quiz-data'),
    path('<int:myid>/save/', views.save_quiz_view, name='quiz-save'),
    path("signup/", views.Signup, name="signup"),
    path("login/", views.Login, name="login"),
    path("logout/", views.Logout, name="logout"),
    
    path('add_quiz/', views.add_quiz, name='add_quiz'),    
    path('add_question/', views.add_question, name='add_question'),  
    path('add_options/<int:myid>/', views.add_options, name='add_options'), 
    path('results/', views.results, name='results'),    
    path('delete_question/<int:myid>/', views.delete_question, name='delete_question'),  
    path('delete_result/<int:myid>/', views.delete_result, name='delete_result'), 
    
    path('accounts/', include('allauth.urls')),
    #path('logout', LogoutView.as_view()),   
]