from django.db import models
import datetime
import simplejson as json

# Create your models here.
class GoalNode(models.Model):
    Title = models.CharField(max_length=500, default="Goal-X")
    Description = models.CharField(max_length=1000, default="Your Goal Description")
    Motivation = models.CharField(max_length=5000, default="Your Goal Motivation")
    Subtask = models.CharField(max_length=1000, default=json.dumps([]))
    State = models.CharField(default="not-started", max_length=30)# 
    # Possible Option for state : terminated, not-started, in-progress, completed 
    GoalId = models.IntegerField()
    X = models.IntegerField(default= 100)
    Y = models.IntegerField(default= 100)
    Height = models.IntegerField(default=0)
    Width = models.IntegerField(default=0)
    CreatedAt = models.DateField(auto_now_add=True,auto_now=False)
    StartedAt = models.DateField(default= datetime.date(1900, 1, 1))
    ToStartAt = models.DateField(default= datetime.date(1900, 1, 1))
    CompletedAt = models.DateField(default= datetime.date(1900, 1, 1))
    TerminatedAt = models.DateField(default= datetime.date(1900, 1, 1))

    def getFooter(self):
        '''
        It returns the data to be written at the Foot of the Goal-Node
        '''
        priority_show = [self.TerminatedAt, self.CompletedAt, self.StartedAt, self.ToStartAt, self.CreatedAt]
        label = ["Terminated-On: ", "Completed-On: ", "Started-On: ", "To-Be-Started-On: ", "Created-On: "]
        default_date = datetime.date(1900, 1, 1)

        for i in range(len(priority_show)):
            if priority_show[i] != default_date:
                return label[i] + priority_show[i].strftime("%d/%m/%y")
        return ""

class GraphFlow(models.Model):
    UserId = models.IntegerField()
    AdjList = models.CharField(max_length=5000, default= json.dumps([]))
    NodeCount = models.IntegerField(default=0)

class SubTask(models.Model):
    TaskId = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=500, default="Task-X")
    Description = models.CharField(max_length=1000, default="Your Sub-Task Description")
    Motivation = models.CharField(max_length=5000, default="Your Sub-Task Motivation")
    State = models.CharField(default="not-started", max_length=30)# 
    # Possible Option for state : terminated, not-started, in-progress, completed 
    CreatedAt = models.DateField(auto_now_add=True,auto_now=False)
    EditedAt = models.DateField(auto_now=True)

    

