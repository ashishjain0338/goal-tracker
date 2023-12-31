from django.shortcuts import render
from django.http import JsonResponse
from .models import GoalNode, GraphFlow, SubTask
from .crud import CRUD, SubTaskCRUD
from rest_framework.decorators import api_view
from django.core import serializers
import simplejson as json

USER_ID = 1
# Create your views here.


def home(request):
    return JsonResponse({"App-run": "SUccess"})


def create(request):
    crud_obj = CRUD(USER_ID)
    createdNodeId = crud_obj.create(USER_ID)
    print("New entry Added | Node-Id", createdNodeId)
    return JsonResponse({"pass": "true", "nodeId": createdNodeId})


def retrieveAll(request):
    crud_obj = CRUD(USER_ID)
    out = crud_obj.retrieveAll(USER_ID)
    out["edges"] = crud_obj.retrieveEdges(USER_ID)
    return JsonResponse(out)


def retrieveSingle(request, id):
    print("Please Fetch record of Node-id ", id, type(id))
    crud_obj = CRUD(USER_ID)
    out = crud_obj.retrieveSingle(USER_ID, id)
    return JsonResponse(out)


@api_view(["POST"])
def update(request):
    if request.method == 'POST':
        try:
            print("Request Post ", request.data)
            crud_obj = CRUD(USER_ID)
            out = crud_obj.update(
                USER_ID, request.data["id"], request.data["diff"])
            return JsonResponse({"pass": True})
        except Exception as err:
            print(err)
            return JsonResponse({"pass": False})

    return JsonResponse({"pass": False})


def delete(request, id):
    print("Deleting NodeId :", id)
    crud_obj = CRUD(USER_ID)
    crud_obj.delete(USER_ID, id)
    return JsonResponse({"pass": True})


@api_view(["POST"])
def createUpdateDeleteEdges(request):
    if request.method == 'POST':
        try:
            print("Request Post ", request.data)
            crud_obj = CRUD(USER_ID)
            updateEdgePresent = False
            # Since Update-Edges would automatically trigger a delete-edge event but not create edge,
            # So, storing "new edges" that get formed with update-edge event
            updatedYetToCreateEdge = []
            for operation in request.data:
                print(operation)
                if operation == "create-edge":
                    crud_obj.createEdges(USER_ID, request.data[operation])
                elif operation == "delete-edge":
                    crud_obj.deleteEdges(USER_ID, request.data[operation])
                elif operation == "position-nodes":
                    positionDiff = request.data[operation]
                    for id, newPosition in positionDiff.items():
                        crud_obj.update(USER_ID, int(id), newPosition)
                elif operation == "update-edge":
                    for event in request.data[operation]:
                        updatedYetToCreateEdge.append(
                            [event["new"]["src"], event["new"]["dst"]])

            crud_obj.createEdges(USER_ID, updatedYetToCreateEdge)
            return JsonResponse({"pass": True})
        except Exception as err:
            print("Error while cud Edges: ", err)
            return JsonResponse({"pass": False})

    return JsonResponse({"pass": False})


def retrieveEdges(request):
    crud_obj = CRUD(USER_ID)
    # out = crud_obj.retrieveEdges(USER_ID)
    # return JsonResponse({"edges": out})


def createSubTask(request, nodeId):
    subtaskCrud_obj = SubTaskCRUD()
    createdId = subtaskCrud_obj.create(nodeId)
    return JsonResponse({"pass": True, "taskId": createdId})


@api_view(["POST"])
def updateDeleteSubTask(request):
    if request.method == 'POST':
        print("Update-delete Got Data ", request.data)
        subtaskCrud_obj = SubTaskCRUD()
        operations = request.data
        for operation in operations:
            if operation == "update":
                subtaskCrud_obj.update(request.data[operation])
            elif operation == "delete":
                subtaskCrud_obj.delete(request.data[operation])
    return JsonResponse({"pass": True})


def takeBackup(request):
    print("Got Backup Request")
    outfolder = "backup/"
    backupPoints = [(GoalNode.objects.all(), "goalNode.json"), (GraphFlow.objects.all(), "graphFlow.json"), 
                    (SubTask.objects.all(), "subtask.json")]
    for (objects, filename) in backupPoints:
        json_str = serializers.serialize("json", objects)
        with open(outfolder + filename, "w") as fp:
            # For pretty-print we re converting string back to json and then to string, and then writing
            json.dump(json.loads(json_str), fp, indent=4)
    return JsonResponse({"pass": True})
