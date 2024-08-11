
The Optional node is a structural node with one output. 

Everything after this node is optional. This means that The planner will try to make a plan that includes tasks after this. If that fails, it will exclude those tasks from the final plan instead of failing the whole planning. 

Using this node is equivalent to having a [Prefer](prefer) node that only uses the top branch.

![The Optional node](_media/optional.png ':size=800')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.

## Plan Adjustment

The Optional node can be configured to participate in [Plan Adjustment](replanning?id=plan-adjustment) via its **"Plan Adjustment Mode"** setting with the following options:

Plan Adjustment Mode|Description
---|---
**No Adjustment Allowed**|When trying to adjust the current plan, the plan is not allowed to diverge from the current plan at this node.<br>The planner will only try to plan through the same branch as in the current plan.
**Try Switch To With Content**|When trying to adjust the current plan, the plan will try to diverge from the current plan by switching from the version where the optional did not have the nodes after it to the one where it does if possible.<br>Plan adjustment only succeeds if a divergence like this happens at least at one node.
**Try Switch To Without Content**|When trying to adjust the current plan, the plan will try to diverge from the current plan by switching from the version where the optional had the nodes after it to the one where it doesn't if possible.<br>Plan adjustment only succeeds if a divergence like this happens at least at one node.
**Try Switch To Other**|When trying to adjust the current plan, the plan will try to diverge from the current plan by switching from the current version (with or without the nodes after the Optional) to the other one.<br>Plan adjustment only succeeds if a divergence like this happens at least at one node.
