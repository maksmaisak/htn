
The Optional node is a structural node with one output. 

Everything after this node is optional. This means that The planner will try to make a plan that includes tasks after this. If that fails, it will exclude those tasks from the final plan instead of failing the whole planning. 

Using this node is equivalent to having a [Prefer](prefer) node that only uses the top branch.

![The Optional node](_media/optional.png ':size=800')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.
