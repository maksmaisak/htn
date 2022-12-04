During execution of a plan, it's possible to manually trigger new planning to replace that plan. 

This can be done by the with the Replan function of [Tasks](task?id=replan)/[Decorators](decorator?id=replan)/[Services](service?id=replan):

![Replan from Task](_media/replan_task.png ':size=400')

...or with [the Replan function of the HTNComponent](htn-component?id=replan):

![Replan from HTN Component](_media/replan_htn_component.png ':size=400')

?> The Replan functions of nodes are preferred because if there are [nested plans](subplan.md), the Replan function of a node will affect the plan that the node is in, but the Replan function of the HTN Component will always affect the top-level plan.

## Replan Parameters

All Replan functions take the same Replan Params struct that contains the following values:

Property|Description
---|---
**Debug Reason**|The debug reason that will be logged in the [Visual Logger](vislog.md)
**Force Abort Plan**|If true, the current plan will be immediately aborted. If false, the current plan will only be aborted once the new plan is ready. Making the new plan may take multiple frames as some tasks take multiple frames to plan (e.g., [EQSQuery tasks](eqs.md)).
**Force Restart Active Planning**|If true, and a new plan is already being made when Replan is called, planning will be restarted.
**Force Defer To Next Frame**|If true, the replan will be delayed to the next frame.
**Replan Outermost Plan Instance**|Only relevant when inside a [SubPlan](subplan.md). If true, and there are multiple nested plans (see [the SubPlan task](subplan.md)), the Replan call will affect the outermost, top-level plan instance. If false, will affect the plan instance that the node is in. For example, if this is false and Replan is triggered by a node inside a SubPlan, only that SubPlan will be replanned.<br><br>Note that aborting a subplan causes it to fail, so whether it actually gets replanned is governed by the OnSubPlanFailed property of the SubPlan task, unless Force Replan is enabled.
**Force Replan**|Only relevant when inside a [SubPlan](subplan.md). Aborting a subplan causes it to fail so whether it actually gets replanned is governed by the OnSubPlanFailed property of the SubPlan task. This setting can override that. If true, and we're in a nested plan (see the SubPlan task) a replan will happen even if the SubPlan task does not have OnSubPlanFailed set to Loop.<br><br>For example, if the SubPlan task has OnSubPlanFailed set to Fail and Replan is called with this set to false, the subplan will Fail instead. If this is true, it will replan regardless of the OnSubPlanFailed setting.
**Make New Plan Regardless Of Sub Plan Settings**|Only relevant when inside a [SubPlan](subplan.md). If true, and we're in a nested plan whose SubPlan task has "Plan During Execution" disabled, a new subplan will be planned regardless. If false and "Plan During Execution" is disabled, then the same plan will be restarted. 
