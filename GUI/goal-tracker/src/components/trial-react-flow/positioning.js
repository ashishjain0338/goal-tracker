import { Children } from "react";

function createAdjancyMatrix(graphData){
    console.log("Creating Adjancy Matrix")
    var nodeCount = graphData.nodes.length;
    console.log(nodeCount);
    nodeCount++; //Since Nodes are one-indexed
    let adj = new Array(nodeCount);
    for (var i = 0;i < nodeCount; i++){
        adj[i] = [];
    }
    for (const edges of graphData.edges){
        adj[Number(edges.source)].push(Number(edges.target));
    }
    return adj;
}

/**
 * 
 * @param {*} graphData 
 * @param {*} dimensions 
 */
function sameLvlPositioning(graphData, dimensions, root){
    var width = dimensions['width'], height = dimensions['height'], marginW = dimensions['margin-w'], marginH = dimensions['margin-h']
    console.log(width, height, marginW, marginH); 
    console.log("positioning Engine: ", graphData);
    var adj = createAdjancyMatrix(graphData);
    console.log(adj);
    var pos = new Array(adj.length).fill({x: 0, y : 0});
    var queue = [];
    var lvlHeight = 0;
    if (root.length == 1){
        var childrenCount = adj[root[0]].length
        if (childrenCount != 0){
            // You want this element to be at the center
            var centerw = ((width + marginW)*childrenCount - marginW)/2
            pos[root[0]] = {x : centerw, y : 0}
            for (var i = 0;i < childrenCount; i++){
                queue.push({"node" : adj[root[0]][i], "parent" : root[0]})
            }
            lvlHeight += (height + marginH);
        }
    }
    // Starting a Basic BFS and Allotting positions
    while (queue.length != 0){
        var lvlWidth =-10000, qsize = queue.length;
        for (var z = 0; z < qsize; z++){
            var curEle = queue.shift();
            var cur = curEle["node"], parent = curEle['parent'];
            // Beautifying Logic, Children should start on -2 parent x-cord (if-possible)
            // if (lvlWidth < pos[parent].x - 2*(width + marginH)){
            //     lvlWidth = pos[parent].x - 2*(width + marginH);
            // }
            // Beautifying Logic, If possible then try to keep the parent in the middle
            var childrenCount = adj[parent].length;
            var tot_width_req = (width + marginW)*(childrenCount -1);
            var lvlwdith_req = pos[parent].x - tot_width_req/2;
            if (lvlWidth < lvlwdith_req){
                lvlWidth = lvlwdith_req;
            } 
            

            pos[cur] = {x : lvlWidth, y : lvlHeight}
            lvlWidth += (width + marginW);
            // Pushing the childrens
            for (var i = 0;i < adj[cur].length; i++){
                queue.push({"node" : adj[cur][i], "parent" : cur})
            }

        }
        lvlHeight += (height + marginH);
    }

    console.log(pos);
    for (i = 0;i < graphData.nodes.length; i++){
        graphData.nodes[i].position = pos[i + 1];
        graphData.nodes[i].positionAbsolute = pos[i + 1];
    }
    console.log(graphData);
    return graphData;
    
}

export {sameLvlPositioning};