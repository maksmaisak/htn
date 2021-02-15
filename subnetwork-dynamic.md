The SubNetwork Dynamic node is similar to the [SubNetwork node](subnetwork.md), but its HTN can be changed at runtime using gameplay tags.
This node is the HTN version of the [RunBehaviorDynamic](https://docs.unrealengine.com/en-US/InteractiveExperiences/ArtificialIntelligence/BehaviorTrees/BehaviorTreeNodeReference/BehaviorTreeNodeReferenceTasks/index.html#runbehaviordynamic) node from Behavior Trees.

![Subnetwork node example](_media/subnetwork_dynamic.png ':size=1200')

The HTN can be accessed on a per-character basis using the `SetDynamicHTN`/`GetDynamicHTN` functions like shown on the image below.

![HTN of the subnetwork node](_media/subnetwork_dynamic_usage.png ':size=1200')

