The SubNetwork Dynamic node is similar to the [SubNetwork node](subnetwork.md), but its HTN can be changed dynamically using [gameplay tags](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Tags/), or be taken from a [worldstate](planning?id=worldstates) key during planning.
This node is the HTN version of the [RunBehaviorDynamic](https://docs.unrealengine.com/en-US/InteractiveExperiences/ArtificialIntelligence/BehaviorTrees/BehaviorTreeNodeReference/BehaviorTreeNodeReferenceTasks/index.html#runbehaviordynamic) node from Behavior Trees.

![Subnetwork node example](_media/subnetwork_dynamic.png ':size=1200')

The HTN can be accessed on a per-character basis using the `SetDynamicHTN`/`GetDynamicHTN` functions of the [HTN extension](htn-extensions.md) [HTNExtension_SubNetworkDynamic](node-reference?id=subnetwork-dynamic-1) like shown on the image below.

![HTNExtension_SubNetworkDynamic](_media/HTNExtension_SubNetworkDynamic.png ':size=1200')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.

