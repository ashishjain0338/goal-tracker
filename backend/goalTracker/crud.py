from .models import GraphFlow, GoalNode, SubTask
import simplejson as json
# decoder = ["not-started", "in-progress", "completed", "terminated"]


def cleanDiff(diffs):
    out = {}
    for diff in diffs:
        key = diff[0]
        if key == "id":
            print("Id are not Editable| Dropping")
            continue
        if key == 'targetStart':
            key = "ToStartAt"
        key = key[0].upper() + key[1:]
        out[key] = diff[1]
    return out


class CRUD:
    def __init__(self, userId) -> None:
        graphflow_obj = GraphFlow.objects.filter(UserId=userId)

        if len(graphflow_obj) == 0:
            GraphFlow.objects.create(UserId=1)
            self.nodeCount = 0
        else:
            self.nodeCount = graphflow_obj[0].NodeCount

    def create(self, userId):
        GoalNode.objects.create(GoalId=self.nodeCount)

        graphflow_obj = GraphFlow.objects.get(UserId=userId)
        adj = json.loads(graphflow_obj.AdjList)
        adj.append([])
        graphflow_obj.NodeCount = self.nodeCount + 1
        graphflow_obj.AdjList = json.dumps(adj)
        graphflow_obj.save()
        self.nodeCount += 1
        return self.nodeCount - 1

    def retrieveAll(self, userId):
        #  { id: '1', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Life", goalState: "not-started" } },
        goalnode_obj = GoalNode.objects.all()
        out = {"nodes": [], "edges": []}
        # Formatting Nodes as Required
        for node in goalnode_obj:
            curNodeFormatted = {
                "id": str(node.GoalId),
                "type": "goalNode",

                "position": {
                    "x": node.X,
                    "y": node.Y,
                },
                "data": {
                    "title": node.Title,
                    "description": node.Description,
                    "state": node.State,
                    "footer": node.getFooter(),
                    "subtask": json.loads(node.Subtask)
                }
            }
            out["nodes"].append(curNodeFormatted)
        print("retrieving data from crud All")
        return out

    def retrieveSingle(self, userId, nodeId):
        goalnode_obj = GoalNode.objects.get(GoalId=nodeId)
        subtask_list = json.loads(goalnode_obj.Subtask)
        subtask_data = {}
        for task in subtask_list:
            taskId = task[0]
            subtask_obj = SubTask.objects.get(TaskId = taskId)
            data = {
                "title": subtask_obj.Title,
                "description": subtask_obj.Description,
                "motivation": subtask_obj.Motivation,
                "state": subtask_obj.State,
                "createdAt": subtask_obj.CreatedAt,
                "editedAt": subtask_obj.EditedAt
            }
            subtask_data[taskId] = data

        out = {
            "title": goalnode_obj.Title,
            "Description": {
                "description": goalnode_obj.Description,
                "motivation": goalnode_obj.Motivation,
            },
            "Meta-Data": {
                "state": goalnode_obj.State,
                "id": nodeId,
                # To be set by current val (not saved val)
                "x": goalnode_obj.X,
                # To be set by current val (not saved val)
                "y": goalnode_obj.Y,
                # To be set by current val (not saved val)
                "height": goalnode_obj.Height,
                # To be set by current val (not saved val)
                "width": goalnode_obj.Width,
                "createdAt": goalnode_obj.CreatedAt.strftime("%Y-%m-%d"),
                "startedAt":  goalnode_obj.StartedAt.strftime("%Y-%m-%d"),
                "targetStart":  goalnode_obj.ToStartAt.strftime("%Y-%m-%d"),
                "completedAt":  goalnode_obj.CompletedAt.strftime("%Y-%m-%d"),
            },
            "Subtask": {
                "order": [subtask[0] for subtask in subtask_list],
                "data": subtask_data
            }
        }
        print(goalnode_obj)
        return out

    def update(self, userId, nodeId, diff):
        print("Updating NodeId: ", nodeId)
        diff = cleanDiff(diff)
        print(diff)
        GoalNode.objects.filter(GoalId=nodeId).update(
            **diff)
        
        
    def delete(self, userId, nodeId):
        GoalNode.objects.filter(GoalId=nodeId).update(GoalId=-1)# Represents Deletion
        for i in range(nodeId + 1, self.nodeCount):
            print("Decrementing NodeId of ", i)
            GoalNode.objects.filter(GoalId=i).update(GoalId = i - 1)
        GoalNode.objects.filter(GoalId=-1).delete()
        self.nodeCount -= 1
        GraphFlow.objects.filter(UserId=userId).update(NodeCount=self.nodeCount)

    def createEdges(self, userId, edgesToCreate):
        print("edges to create --> ", edgesToCreate)
        graph_obj = GraphFlow.objects.get(UserId=userId)
        adj = json.loads(graph_obj.AdjList)
        for [src, dst] in edgesToCreate:
            adj[int(src)].append(int(dst))
        graph_obj.AdjList = json.dumps(adj)
        graph_obj.save()
    
    def retrieveEdges(self, userId):
        graph_obj = GraphFlow.objects.get(UserId=userId)
        adj = json.loads(graph_obj.AdjList)
        edges = []
        for src in range(len(adj)):
            for dst in adj[src]:
                edge = {
                    "id": "e{}-{}".format(src, dst),
                    "source": str(src),
                    "target": str(dst)
                }
                edges.append(edge)
        return edges
    
    def deleteEdges(self, userId, edgesToDelete):
        print("edges to delete --> ", edgesToDelete)
        graph_obj = GraphFlow.objects.get(UserId=userId)
        adj = json.loads(graph_obj.AdjList)
        for [src, dst] in edgesToDelete:
            print(src, dst)
            adj[int(src)].remove(int(dst))
        graph_obj.AdjList = json.dumps(adj)
        graph_obj.save()

class SubTaskCRUD:
    def __init__(self) -> None:
        pass

    def create(self, nodeId):
        created_obj = SubTask.objects.create()
        print("Task Created with Id ", created_obj.TaskId)
        goal_obj = GoalNode.objects.get(GoalId=nodeId)
        subtaskList = json.loads(goal_obj.Subtask)
        subtaskList.append([created_obj.TaskId, created_obj.Title, created_obj.State])
        goal_obj.Subtask = json.dumps(subtaskList)
        goal_obj.save()
        return created_obj.TaskId
    
    # Action List Represents [
    #   {
    #       "taskId" : ,
    #       "datadict": { "title":, "description":, "motivation":, "state"}:
    #   }
    # ]
    def update(self, actionList):
        for action in actionList:
            taskId = action["taskId"]
            datadict = action["datadict"]
            data = {}
            for key,val in datadict.items():
                key = key[0].upper() + key[1:]
                data[key] = val

            print(data)
            # print(data)
            SubTask.objects.filter(TaskId = taskId).update(**data) 

    def delete(self, deletionIds):
        print(deletionIds)
        for id in deletionIds:
            SubTask.objects.get(TaskId=id).delete()