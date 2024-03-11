Node Instance Pooling is an optional optimization feature that practically eliminates the load on Garbage Collection (GC) when using Blueprint nodes.

When a new plan is created, Blueprint nodes (and C++ nodes that enabled `bCreateNodeInstance`) from the HTN graph are duplicated to be used in the plan. These duplicates are normally discarded after the plan is over, which increases the load on Garbage Collection, especially when making plans frequently. Enabling node instance pooling allows the HTN Component to reuse the same node instances across many plans.

# Enabling node instance pooling

Node instance pooling is off by default and can be enabled in the project settings under Plugins > HTN via the "Enable Node Instance Pooling" property:

![Enable Node Instance Pooling in the Project Settings](_media/node_instance_pooling.png ':size=600')

The project-wide setting can be overridden on individual nodes to exclude specific nodes from pooling or to only make specific nodes pooled via the "Node Instance Pooling Mode" property. This property is only visible on nodes that create instances (built-in C++ nodes don't).

![Enable Node Instance Pooling per node](_media/enable_node_instance_pooling_per_node.png ':size=1200')

# Resetting the node

When returning a node instance to the pool after its plan is over, the node instance's state is automatically reset to make it identical to the original template node in the HTN asset from which the node instance was duplicated. The following things are reset:

- Member variables
- Local variables inside macros (e.g., DoOnce, Gate, etc)
- Cached values of output pins on Blueprint nodes
- Event subscriptions: any event subscriptions of the node are automatically invalidated. This includes manual subscriptions to external events and the output pins of nodes like "Play Montage". This is done by resetting the serial number of the UObject, which invalidates any WeakObjectPtrs pointing to it, including those inside delegates

C++ nodes may override the OnInstanceReturnedToPool function to change what gets reset.
This behavior can be augmented by overriding the OnInstanceReturnedToPool function. This setting can be overridden on a per-node basis via the "Node Instance Pooling Mode" of each HTN node. "Node Instance Pooling Mode" is only visible for nodes that create instances (built in C++ nodes don't).
