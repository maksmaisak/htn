During execution of a plan, it's possible to manually trigger new planning to replace that plan. Replanning always happens in the background and only aborts the current plan once a new plan is made (or planning fails).

This can be done by the with the Replan function of [Tasks](task?id=replan)/[Decorators](decorator?id=replan)/[Services](service?id=replan):

![Replan from Task](_media/replan_task.png ':size=400')

...or with dedicated services ([HTNService_Replan](node-reference?id=replan-1), [HTNService_ReplanIfLocationChanges](node-reference?id=replan-if-location-changes)).

...or with [the Replan function of the HTNComponent](htn-component?id=replan):

![Replan from HTN Component](_media/replan_htn_component.png ':size=400')

?> The Replan functions of nodes are preferred because if there are [nested plans](subplan.md), the Replan function of a node will affect the plan that the node is in, but the Replan function of the HTN Component will always affect the top-level plan.

## Replan Parameters

All Replan functions take the same `Replan Params` struct that contains the following values:

Property|Description
---|---
**Debug Reason**|The debug reason that will be logged in the [Visual Logger](vislog.md)
**Force Abort Plan**|If true, the current plan will be immediately aborted. If false, the current plan will only be aborted once the new plan is ready. Making the new plan may take multiple frames as some tasks take multiple frames to plan (e.g., [EQSQuery tasks](eqs.md)).
**Force Restart Active Planning**|If true, and a new plan is already being made when Replan is called, planning will be restarted.
**Force Defer To Next Frame**|If true, the replan will be delayed to the next frame.
**Replan Outermost Plan Instance**|Only relevant when inside a [SubPlan](subplan.md). If true, and there are multiple nested plans (see [the SubPlan task](subplan.md)), the Replan call will affect the outermost, top-level plan instance. If false, will affect the plan instance that the node is in. For example, if this is false and Replan is triggered by a node inside a SubPlan, only that SubPlan will be replanned.<br><br>Note that aborting a subplan causes it to fail, so whether it actually gets replanned is governed by the OnSubPlanFailed property of the SubPlan task, unless Force Replan is enabled.
**Force Replan**|Only relevant when inside a [SubPlan](subplan.md). Aborting a subplan causes it to fail so whether it actually gets replanned is governed by the OnSubPlanFailed property of the SubPlan task. This setting can override that. If true, and we're in a nested plan (see the SubPlan task) a replan will happen even if the SubPlan task does not have OnSubPlanFailed set to Loop.<br><br>For example, if the SubPlan task has OnSubPlanFailed set to Fail and Replan is called with this set to false, the subplan will Fail instead. If this is true, it will replan regardless of the OnSubPlanFailed setting.
**Make New Plan Regardless Of Sub Plan Settings**|Only relevant when inside a [SubPlan](subplan.md). If true, and we're in a nested plan whose SubPlan task has "Plan During Execution" disabled, a new subplan will be planned regardless. If false and "Plan During Execution" is disabled, then the same plan will be restarted. 
**Planning Type**|<table><tbody>  <tr><td>**Normal**</td><td>Try to make a new plan from scratch. The current plan is always aborted at the end of this replan and is replaced by the new plan. If replanning fails, the current plan is aborted anyway.</td></tr>  <tr><td>**Try To Adjust Current Plan**</td><td>See the "Plan Adjustment" section below</td></tr> </tbody></table>

## Plan Adjustment

![Replan from HTN Component](_media/plan_adjustment_service.png ':size=1200')

When triggering a replan with **"Planning Type"** set to **"Try To Adjust Current Plan"**, the planner tries to create a plan that is an adjustment of the current plan (e.g., try to make a plan that's just like the current plan, but takes the top branch of some [Prefer](prefer.md) node instead of the bottom branch). If such replanning fails, it is silently ignored. It only succeeds if the produced plan is actually different from the current plan.

The most common use case for this is "change to a higher-priority behavior when it becomes possible" where "possible" can only be checked by planning out an entire branch of the HTN instead of just checking the conditions of some decorators on an If node. This can be achieved by configuring a Prefer node with **"Plan Adjustment Mode"** set to **"Try Switch To Higher Priority Branch"** and putting an Replan service with **"Planning Type"** set to **"Try To Adjust Current Plan"** on a Scope in the bottom branch (see image above). As a result, when executing the bottom branch of that Prefer node, the service will switch to the top branch when it becomes possible.

!> Note that a plan produced in this fashion still starts execution from the beginning and not from the node at which it diverges from the current plan.

### Nodes' participation in plan adjustment

Custom nodes can participate in plan adjustment in various ways: see the "Plan Adjustment Mode" setting in the following nodes:

- [Prefer](prefer.md?id=plan-adjustment)
- [If](if.md?id=plan-adjustment)
- [Optional](optional.md?id=plan-adjustment)
- [SubNetwork Dynamic](subnetwork-dynamic.md?id=plan-adjustment)

Plan adjustment requires active participation from the nodes in the current plan. Plan adjustment is only possible if at least one node in the current plan set `bIsPotentialDivergencePointDuringPlanAdjustment` to true during planning. A plan is only considered a valid adjustment of the current plan if at least one node set `bDivergesFromCurrentPlanDuringPlanAdjustment` during planning. This allows the planner to prune branches not relevant to plan adjustment, which makes plan adjustment faster than regular planning.

!> Custom participation in plan adjustment is currently available only for C++ nodes and tasks. Support for Blueprint tasks is forthcoming in a future update.
