"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from goalTracker import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('create/', views.create),
    path('retrieve/all/', views.retrieveAll),
    path('retrieve/single/<int:id>/', views.retrieveSingle),
    path('update/', csrf_exempt(views.update)),
    path('delete/<int:id>/', views.delete),
    path('edges/cud/', csrf_exempt(views.createUpdateDeleteEdges)),
    path('edges/retrieve/', views.retrieveEdges),
    path('subtask/create/<int:nodeId>/', views.createSubTask),
    path('subtask/ud/', views.updateDeleteSubTask),

]


# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', views.home),
#     path('update/<code>', views.update),
#     path('view_data/', csrf_exempt(views.view_data)),
#     path('trend_plot/', views.trend_plot),
#     path('get_data/', views.get_monthly_data),
#     path('get_goals/<month>/<year>', csrf_exempt(views.get_goals)),
#     path('get_mapping_info/', views.get_mapping_info),
#     path('get_meta_data/', views.get_meta_data),
# ]
