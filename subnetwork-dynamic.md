The SubNetwork Dynamic node is similar to the [SubNetwork node](subnetwork.md), but its HTN can be changed dynamically using [gameplay tags](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Tags/), or be taken from a [worldstate](planning?id=worldstates) key during planning.
This node is the HTN version of the [RunBehaviorDynamic](https://docs.unrealengine.com/en-US/InteractiveExperiences/ArtificialIntelligence/BehaviorTrees/BehaviorTreeNodeReference/BehaviorTreeNodeReferenceTasks/index.html#runbehaviordynamic) node from Behavior Trees.

![Subnetwork node example](_media/subnetwork_dynamic.png ':size=1200')

The HTN can be accessed on a per-character basis using the `SetDynamicHTN`/`GetDynamicHTN` functions of the [HTN extension](htn-extensions.md) [HTNExtension_SubNetworkDynamic](node-reference?id=subnetwork-dynamic-1) like shown on the image below.

![HTNExtension_SubNetworkDynamic](_media/HTNExtension_SubNetworkDynamic.png ':size=1200')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.

## Plan Adjustment

The SubNetwork Dynamic node can be configured to participate in [Plan Adjustment](replanning?id=plan-adjustment) via its **"Plan Adjustment Mode"** setting with the following options:

Plan Adjustment Mode|Description
---|---
**No Adjustment Allowed**|When trying to adjust the current plan, the plan is not allowed to diverge from the current plan at this node. The planner will only try to plan through the same branch as in the current plan.<br>Even if the dynamic subnetwork was changed, the planner will go with the same subnetwork as in the current plan.
**Try Switch To Another SubNetwork**|When trying to adjust the current plan, the plan will try to diverge from the current plan by using a new sunetwork that was possibly assigned to this node dynamically. If that is the case, the planner will try to plan through the new subnetwork and mark such a plan as diverging from the current plan.<br>Plan adjustment only succeeds if a divergence like this happens at least at one node.
