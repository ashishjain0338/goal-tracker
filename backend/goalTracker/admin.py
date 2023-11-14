from django.contrib import admin
from .models import GoalNode, GraphFlow, SubTask
# Register your models here.

# Register your models here.
# class Gsheet_Admin(admin.ModelAdmin):
#     list_display = ('Date_created','Date', 'Description', 'Amount', 'Transact_type', 'v_band', 'Expense_cat', 'Cash_in_hand', 'Refill_Amt', 'Emergency_Amt', 'Account', 'Tot_Amt', 'Day', 'Month','Note')
#     ordering = ('Date','Tot_Amt')


admin.site.register(GoalNode)
admin.site.register(GraphFlow)
admin.site.register(SubTask)