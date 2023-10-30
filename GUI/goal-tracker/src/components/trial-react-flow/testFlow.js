const BiginitialNodes = [
    {id: '1', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-1" , goalState: "not-started"}},
    {id: '2', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-2" , goalState: "completed" }},
    {id: '3', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-3" ,goalState: "in-progress" }},
    {id: '4', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-4" , goalState: "terminated"}},
    {id: '5', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-5" , goalState: "not-started"}},
    
    {id: '6', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-6" , goalState: "not-started"}},
    {id: '7', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-7" , goalState: "completed" }},
    {id: '8', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-8" ,goalState: "in-progress" }},
    {id: '9', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-9" , goalState: "terminated"}},
    {id: '10', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-10" , goalState: "not-started"}},

    {id: '11', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-11" , goalState: "not-started"}},
    {id: '12', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-12" , goalState: "completed" }},
    {id: '13', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-13" ,goalState: "in-progress" }},
    {id: '14', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-14" , goalState: "terminated"}},
    {id: '15', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-15" , goalState: "not-started"}},

    {id: '16', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-16" , goalState: "not-started"}},
    {id: '17', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-17" , goalState: "completed" }},
    {id: '18', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-18" ,goalState: "in-progress" }},
    {id: '19', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-19" , goalState: "terminated"}},
    {id: '20', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-20" , goalState: "not-started"}},

    {id: '21', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-21" , goalState: "not-started"}},
    {id: '22', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-22" , goalState: "completed" }},
    {id: '23', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-23" ,goalState: "in-progress" }},
    {id: '24', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-24" , goalState: "terminated"}},
    {id: '25', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-25" , goalState: "not-started"}},

    {id: '26', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-26" , goalState: "not-started"}},
    {id: '27', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-27" , goalState: "completed" }},
    {id: '28', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-28" ,goalState: "in-progress" }},
    {id: '29', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-29" , goalState: "terminated"}},
    {id: '30', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-30" , goalState: "not-started"}},

    {id: '31', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Goal-31" , goalState: "not-started"}},
    {id: '32', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-32" , goalState: "completed" }},
    {id: '33', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-33" ,goalState: "in-progress" }},
    {id: '34', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-34" , goalState: "terminated"}},
    {id: '35', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-35" , goalState: "not-started"}},

];
const BiginitialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },

  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e8-11', source: '8', target: '11' },

  { id: 'e3-12', source: '3', target: '12' },

  { id: 'e4-13', source: '4', target: '13' },
  { id: 'e4-14', source: '4', target: '14' },
  { id: 'e4-15', source: '4', target: '15' },
  { id: 'e4-16', source: '4', target: '16' },
  { id: 'e13-17', source: '13', target: '17' },
  { id: 'e15-18', source: '15', target: '18' },
  { id: 'e15-19', source: '15', target: '19' },
  { id: 'e15-20', source: '15', target: '20' },
  { id: 'e15-21', source: '15', target: '21' },
  { id: 'e15-22', source: '15', target: '22' },
  { id: 'e15-23', source: '15', target: '23' },

  { id: 'e5-24', source: '5', target: '24' },
  { id: 'e24-25', source: '24', target: '25' },
  { id: 'e24-26', source: '24', target: '26' },
  { id: 'e25-27', source: '25', target: '27' },
  { id: 'e26-28', source: '26', target: '28' },
  { id: 'e27-29', source: '27', target: '29' },
  { id: 'e28-30', source: '28', target: '30' },
  { id: 'e29-31', source: '29', target: '31' },
  { id: 'e30-32', source: '30', target: '32' },
  { id: 'e31-33', source: '31', target: '33' },
  { id: 'e32-34', source: '32', target: '34' },
  { id: 'e33-35', source: '33', target: '35' },

];

exports.BigNodes = BiginitialNodes
exports.BigEdges = BiginitialEdges