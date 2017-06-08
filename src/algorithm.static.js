Object.entries({"algorithm/CompoundArrayContainer.js":"function CompoundArrayContainer(){\n    this._a=[]\n}\nCompoundArrayContainer.prototype.in=function(){\n    this._a.push(...arguments)\n}\nCompoundArrayContainer.prototype.out=function(){\n    return this._a.pop()\n}\nObject.defineProperty(CompoundArrayContainer.prototype,'size',{get(){\n    return this._a.length\n}})\nCompoundArrayContainer.prototype[Symbol.iterator]=function*(){\n    while(this._a.length)\n        yield this.out()\n}\nCompoundArrayContainer\n","algorithm/DirectedGraph/VertexEdgeArray.js":"function VertexEdgeArray(){\n    this._vertices=[]\n    this._edges=[]\n}\nObject.defineProperty(VertexEdgeArray.prototype,'vertices',{get(){\n    return this._vertices.slice()\n}})\nObject.defineProperty(VertexEdgeArray.prototype,'edges',{get(){\n    return this._edges.slice()\n}})\nVertexEdgeArray.prototype.addVertex=function(v=Symbol()){\n    this._vertices.push(v)\n    return v\n}\nVertexEdgeArray.prototype.addEdge=function(v,w){\n    let e=[v,w]\n    this._edges.push(e)\n}\nVertexEdgeArray\n","algorithm/Queue.js":";(async()=>{\n    let CompoundArrayContainer=\n        await module.repository.algorithm.CompoundArrayContainer\n    function Queue(){\n        CompoundArrayContainer.call(this)\n    }\n    Object.setPrototypeOf(\n        Queue.prototype,\n        CompoundArrayContainer.prototype\n    )\n    Queue.prototype.out=function(){\n        return this._a.shift()\n    }\n    return Queue\n})()\n","algorithm/DirectedGraph.js":";(async()=>{\n    let[\n        VertexEdgeArray,\n        PriorityQueue,\n        Stack,\n    ]=await Promise.all([\n        module.shareImport('DirectedGraph/VertexEdgeArray.js'),\n        module.repository.algorithm.PriorityQueue,\n        module.repository.algorithm.Stack,\n    ])\n    function DirectedGraph(DataStructure=VertexEdgeArray){\n        this._DataStructure=VertexEdgeArray\n        this._data=new this._DataStructure\n    }\n    Object.defineProperty(DirectedGraph.prototype,'vertices',{get(){\n        return this._data.vertices.slice()\n    }})\n    Object.defineProperty(DirectedGraph.prototype,'edges',{get(){\n        return this._data.edges.slice()\n    }})\n    DirectedGraph.prototype.addVertex=function(v){\n        return this._data.addVertex(v)\n    }\n    DirectedGraph.prototype.addEdge=function(v,w){\n        this._data.addEdge(v,w)\n    }\n    DirectedGraph.prototype.longestTopologicalSort=function(c=new Stack){\n        let id={},arc={}\n        this._data.vertices.map(v=>{\n            id[v]=0\n            arc[v]=[]\n        })\n        this._data.edges.map(([v,w])=>{\n            id[w]++\n            arc[v].push(w)\n        })\n        let res=[]\n        c.in(...this._data.vertices.filter(v=>id[v]==0))\n        while(c.size){\n            let v=c.out()\n            res.push(v)\n            arc[v].map(w=>--id[w]||c.in(w))\n        }\n        return res\n    }\n    Object.defineProperty(DirectedGraph.prototype,'topologicalSort',{get(){\n        let a=this.longestTopologicalSort()\n        if(a.length<this._data.vertices.length)\n            throw Error('Cycle detected.')\n        return a\n    }})\n    return DirectedGraph\n})()\n","algorithm/PriorityQueue.js":";(async()=>{\n    let CompoundArrayContainer=\n        await module.repository.algorithm.CompoundArrayContainer\n    function PriorityQueue(cmp){\n        CompoundArrayContainer.call(this)\n        this._cmp=cmp||((a,b)=>a-b)\n    }\n    Object.setPrototypeOf(\n        PriorityQueue.prototype,\n        CompoundArrayContainer.prototype\n    )\n    PriorityQueue.prototype.in=function(){\n        for(let i=0;i<arguments.length;i++){let e=arguments[i]\n            this._a.push(e)\n            for(let i=this._a.length-1,p;i;i=p){\n                p=~~((i-1)/2)\n                if(this._cmp(this._a[i],this._a[p])<0)\n                    [this._a[i],this._a[p]]=[this._a[p],this._a[i]]\n            }\n        }\n    }\n    PriorityQueue.prototype.out=function(){\n        let e=this._a[0]\n        this._a[0]=this._a[this._a.length-1]\n        this._a.pop()\n        for(let i=0;2*i+1<this._a.length;){\n            let min=\n                this._a.length<=2*i+2||\n                this._cmp(this._a[2*i+1],this._a[2*i+2])<0\n            ?\n                2*i+1\n            :\n                2*i+2\n            if(this._cmp(this._a[i],this._a[min])<0)\n                break\n            ;[this._a[i],this._a[min]]=[this._a[min],this._a[i]]\n            i=min\n        }\n        return e\n    }\n    Object.defineProperty(PriorityQueue.prototype,'top',{get(){\n        return this._a[0]\n    }})\n    return PriorityQueue\n})()\n","algorithm/Stack.js":";(async()=>{\n    let CompoundArrayContainer=\n        await module.repository.algorithm.CompoundArrayContainer\n    function Stack(){\n        CompoundArrayContainer.call(this)\n    }\n    Object.setPrototypeOf(\n        Stack.prototype,\n        CompoundArrayContainer.prototype\n    )\n    return Stack\n})()\n"}).map(([k,v])=>module.static(k,v));;(async()=>{
    let lazyMap=await module.importByPath('https://gitcdn.link/cdn/anliting/althea/ec53a6b03f7442787761ef9ca0bc6f95d758190d/src/AltheaServer/HttpServer/files/lib/tools/lazyMap.js',{mode:1})
    module.repository.algorithm=lazyMap({
        CompoundArrayContainer: 'algorithm/CompoundArrayContainer.js',
        DirectedGraph:          'algorithm/DirectedGraph.js',
        PriorityQueue:          'algorithm/PriorityQueue.js',
        Queue:                  'algorithm/Queue.js',
        Stack:                  'algorithm/Stack.js',
    },module.shareImport.bind(module))
    let[
        DirectedGraph,
        PriorityQueue,
        Queue,
        Stack,
    ]=await Promise.all([
        module.repository.algorithm.DirectedGraph,
        module.repository.algorithm.PriorityQueue,
        module.repository.algorithm.Queue,
        module.repository.algorithm.Stack,
    ])
    return{
        DirectedGraph,
        PriorityQueue,
        Stack,
        Queue,
    }
})()
