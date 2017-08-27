Object.entries({"template/Container.js":"function Container(){\n}\nContainer.prototype[Symbol.iterator]=function*(){\n    while(this.size)\n        yield this.out()\n}\nContainer.iterator=c=>Container.prototype[Symbol.iterator].call(c)\nContainer\n","template/CompoundArrayContainer.js":"(async()=>{\n    let Container=await module.repository.template.Container\n    function CompoundArrayContainer(){\n        Container.call(this)\n        this._a=[]\n    }\n    Object.setPrototypeOf(\n        CompoundArrayContainer.prototype,\n        Container.prototype\n    )\n    CompoundArrayContainer.prototype.in=function(){\n        this._a.push(...arguments)\n    }\n    CompoundArrayContainer.prototype.out=function(){\n        return this._a.pop()\n    }\n    Object.defineProperty(CompoundArrayContainer.prototype,'size',{get(){\n        return this._a.length\n    }})\n    return CompoundArrayContainer\n})()\n","template/DirectedGraph.js":";(async()=>{\n    let[\n        VertexEdgeArray,\n        Stack,\n        Container,\n    ]=await Promise.all([\n        module.shareImport('DirectedGraph/VertexEdgeArray.js'),\n        module.repository.template.Stack,\n        module.repository.template.Container,\n    ])\n    function DirectedGraph(DataStructure=VertexEdgeArray){\n        this._DataStructure=VertexEdgeArray\n        this._data=new this._DataStructure\n    }\n    Object.defineProperty(DirectedGraph.prototype,'vertices',{get(){\n        return this._data.vertices.slice()\n    }})\n    Object.defineProperty(DirectedGraph.prototype,'edges',{get(){\n        return this._data.edges.slice()\n    }})\n    DirectedGraph.prototype.addVertex=function(v){\n        return this._data.addVertex(v)\n    }\n    DirectedGraph.prototype.addEdge=function(v,w){\n        this._data.addEdge(v,w)\n    }\n    DirectedGraph.prototype.longestTopologicalSort=function(c=new Stack){\n        let id={},arc={}\n        for(let v of this._data.vertices){\n            id[v]=0\n            arc[v]=[]\n        }\n        for(let[v,w]of this._data.edges){\n            id[w]++\n            arc[v].push(w)\n        }\n        let res=[]\n        for(let v of this._data.vertices.filter(v=>id[v]==0))\n            c.in(v)\n        for(let v of Container.iterator(c)){\n            res.push(v)\n            arc[v].map(w=>--id[w]||c.in(w))\n        }\n        return res\n    }\n    Object.defineProperty(DirectedGraph.prototype,'topologicalSort',{get(){\n        let a=this.longestTopologicalSort()\n        if(a.length<this._data.vertices.length)\n            throw Error('Cycle detected.')\n        return a\n    }})\n    return DirectedGraph\n})()\n","template/DirectedGraph/VertexEdgeArray.js":"function VertexEdgeArray(){\n    this._vertices=[]\n    this._edges=[]\n}\nObject.defineProperty(VertexEdgeArray.prototype,'vertices',{get(){\n    return this._vertices.slice()\n}})\nObject.defineProperty(VertexEdgeArray.prototype,'edges',{get(){\n    return this._edges.slice()\n}})\nVertexEdgeArray.prototype.addVertex=function(v=Symbol()){\n    this._vertices.push(v)\n    return v\n}\nVertexEdgeArray.prototype.addEdge=function(v,w){\n    let e=[v,w]\n    this._edges.push(e)\n}\nVertexEdgeArray\n","template/Vector2.js":"/*\n我在這裡設計過多型，但是比沒多型的版本慢四倍；這樣的效率在現在（2017-06-06）的處境下這是沒辦法接受的，只好寫成 add-addN 這個模樣。\nThese names (add, sub, mul, div) come from x86 instructions.\n*/\nfunction Vector2(x=0,y=x){\n    this.x=x\n    this.y=y\n}\nVector2.prototype[Symbol.iterator]=function*(){\n    yield*[this.x,this.y]\n}\n// a+b\nVector2.prototype.add=function(v){\n    this.x+=v.x\n    this.y+=v.y\n    return this\n}\nVector2.prototype.addN=function(x,y=x){\n    this.x+=x\n    this.y+=y\n    return this\n}\n// a-b\nVector2.prototype.sub=function(v){\n    this.x-=v.x\n    this.y-=v.y\n    return this\n}\nVector2.prototype.subN=function(x,y=x){\n    this.x-=x\n    this.y-=y\n    return this\n}\n// a*b\nVector2.prototype.mul=function(v){\n    this.x*=v.x\n    this.y*=v.y\n    return this\n}\nVector2.prototype.mulN=function(x,y=x){\n    this.x*=x\n    this.y*=y\n    return this\n}\n// a/b\nVector2.prototype.div=function(v){\n    this.x/=v.x\n    this.y/=v.y\n    return this\n}\nVector2.prototype.divN=function(x,y=x){\n    this.x/=x\n    this.y/=y\n    return this\n}\n// a<b\nVector2.prototype.lt=function(v){\n    return this.x<v.x&&this.y<v.y\n}\nVector2.prototype.ltN=function(x,y){\n    return this.x<x&&this.y<y\n}\n// a==b\nVector2.prototype.eq=function(v){\n    return this.x==v.x&&this.y==v.y\n}\nVector2.prototype.eqN=function(x,y){\n    return this.x==x&&this.y==y\n}\n// a>b\nVector2.prototype.gt=function(v){\n    return this.x>v.x&&this.y>v.y\n}\nVector2.prototype.gtN=function(v){\n    return this.x>x&&this.y>y\n}\n// inner product\nVector2.prototype.ip=function(v){\n    return this.x*v.x+this.y*v.y\n}\n// length\nObject.defineProperty(Vector2.prototype,'len',{get(v){\n    return this.ip(this)**.5\n}})\nObject.defineProperty(Vector2.prototype,'new',{get(){\n    return new Vector2(this.x,this.y)\n}})\n// -a: negetive\nObject.defineProperty(Vector2.prototype,'newNeg',{get(){\n    return this.newMulN(-1)\n}})\nVector2.prototype.newAdd=function(v){\n    return new Vector2(this.x+v.x,this.y+v.y)\n}\nVector2.prototype.newAddN=function(x,y=x){\n    return new Vector2(this.x+x,this.y+y)\n}\nVector2.prototype.newSub=function(v){\n    return new Vector2(this.x-v.x,this.y-v.y)\n}\nVector2.prototype.newSubN=function(x,y=x){\n    return new Vector2(this.x-x,this.y-y)\n}\nVector2.prototype.newMul=function(v){\n    return new Vector2(this.x*vx,this.y*v.y)\n}\nVector2.prototype.newMulN=function(x,y=x){\n    return new Vector2(this.x*x,this.y*y)\n}\nVector2.prototype.newDiv=function(v){\n    return new Vector2(this.x/v.x,this.y/v.y)\n}\nVector2.prototype.newDivN=function(x,y=x){\n    return new Vector2(this.x/x,this.y/y)\n}\nVector2\n","template/Queue.js":";(async()=>{\n    let CompoundArrayContainer=\n        await module.repository.template.CompoundArrayContainer\n    function Queue(){\n        CompoundArrayContainer.call(this)\n    }\n    Object.setPrototypeOf(\n        Queue.prototype,\n        CompoundArrayContainer.prototype\n    )\n    Queue.prototype.out=function(){\n        return this._a.shift()\n    }\n    return Queue\n})()\n","template/PriorityQueue.js":";(async()=>{\n    let[\n        CompoundArrayContainer,\n    ]=await Promise.all([\n        module.repository.template.CompoundArrayContainer,\n    ])\n    function PriorityQueue(cmp){\n        CompoundArrayContainer.call(this)\n        this._cmp=cmp||((a,b)=>a-b)\n    }\n    Object.setPrototypeOf(\n        PriorityQueue.prototype,\n        CompoundArrayContainer.prototype\n    )\n    PriorityQueue.prototype.in=function(){\n        for(let i=0;i<arguments.length;i++){let e=arguments[i]\n            this._a.push(e)\n            for(let i=this._a.length-1,p;i;i=p){\n                p=~~((i-1)/2)\n                if(this._cmp(this._a[i],this._a[p])<0)\n                    [this._a[i],this._a[p]]=[this._a[p],this._a[i]]\n            }\n        }\n    }\n    PriorityQueue.prototype.out=function(){\n        let e=this._a[0]\n        this._a[0]=this._a[this._a.length-1]\n        this._a.pop()\n        for(let i=0;2*i+1<this._a.length;){\n            let min=\n                this._a.length<=2*i+2||\n                this._cmp(this._a[2*i+1],this._a[2*i+2])<0\n            ?\n                2*i+1\n            :\n                2*i+2\n            if(this._cmp(this._a[i],this._a[min])<0)\n                break\n            ;[this._a[i],this._a[min]]=[this._a[min],this._a[i]]\n            i=min\n        }\n        return e\n    }\n    Object.defineProperty(PriorityQueue.prototype,'top',{get(){\n        return this._a[0]\n    }})\n    return PriorityQueue\n})()\n","template/Stack.js":";(async()=>{\n    let CompoundArrayContainer=\n        await module.repository.template.CompoundArrayContainer\n    function Stack(){\n        CompoundArrayContainer.call(this)\n    }\n    Object.setPrototypeOf(\n        Stack.prototype,\n        CompoundArrayContainer.prototype\n    )\n    return Stack\n})()\n"}).map(([k,v])=>module.static(k,v));;(async()=>{
    let lazyMap=await module.importByPath('https://gitcdn.link/cdn/anliting/althea/ec53a6b03f7442787761ef9ca0bc6f95d758190d/src/AltheaServer/HttpServer/files/lib/tools/lazyMap.js',{mode:1})
    module.repository.template=lazyMap({
        CompoundArrayContainer: 'template/CompoundArrayContainer.js',
        Container:              'template/Container.js',
        DirectedGraph:          'template/DirectedGraph.js',
        PriorityQueue:          'template/PriorityQueue.js',
        Queue:                  'template/Queue.js',
        Stack:                  'template/Stack.js',
        Vector2:                'template/Vector2.js',
    },module.shareImport.bind(module))
    let[
        Container,
        DirectedGraph,
        PriorityQueue,
        Queue,
        Stack,
        Vector2,
    ]=await Promise.all([
        module.repository.template.Container,
        module.repository.template.DirectedGraph,
        module.repository.template.PriorityQueue,
        module.repository.template.Queue,
        module.repository.template.Stack,
        module.repository.template.Vector2,
    ])
    return{
        Container,
        DirectedGraph,
        PriorityQueue,
        Stack,
        Queue,
        Vector2,
    }
})()
