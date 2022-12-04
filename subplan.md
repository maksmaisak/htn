Subplans are a powerful feature that allows for containing an independent planning & execution process inside a task belonging to a higher-level plan.

![HTNTask_SubPlan](_media/subplan_task.png ':size=1200')

The SubPlan task looks like a structural node, but is actually a task. The outer plan contains the SubPlan task itself, but any nodes after it are part of the subplan contained within the task.

## Settings

Property|Description
---|---
**Plan During Outer Plan Planning**|If true, the subplan will be planned as part of the outer plan (the plan that contains the subnode). This is done as if the SubPlan node was a Scope node.
**Plan During Execution**|If true, the subplan will be planned when the SubPlan node begins execution. If this is node is in the looping secondary branch of a [Parallel](parallel.md) node, a new plan will be made every loop. The first execution can reuse the plan made with "Plan During Outer Plan Planning" if "Skip Planning OnFirst Execution If Plan Already Available" is enabled.
**Skip Planning On First Execution If Plan Already Available**|Only relevant when both "Plan During Outer Plan Planning" and "Plan During Execution" are true. If true, then on the first run of this SubPlan in the same outer plan it will use the plan made during planning, but consecutive runs will make a new plan. The following all count as consecutive runs:<ul><li>Replanning due to call to Replan</li><li>Replanning due to On Sub Plan Succeeded/Failed being set to Loop</li><li>The SubPlan task being executed again due to being in a looping secondary branch of a Parallel node</li></ul>
**On Sub Plan Succeeded / Failed**|What to do when subplan execution succeeded / planning or execution failed:<br><br><table><tbody>  <tr><td>**Succeed**</td><td>The SubPlan task will Succeed.</td></tr>  <tr><td>**Fail**</td><td>The SubPlan task will Fail.</td></tr> <tr><td>**Loop**</td><td>The SubPlan task will restart the subplan, possibly replanning it first as specified by "Planning During Outer Plan Execution".<br><br>Note that if the SubPlan task is being aborted, it will not loop. To achieve looping until success even when aborting, use two nested SubPlan tasks: the outer SubPlan with "On This Node Aborted" = "Wait For Sub Plan To Finish", and the inner SubPlan with "On Sub Plan Failed" set to Loop.</td></tr> </tbody></table>
**On This Node Aborted**|What to do when this node is aborted while the subplan is running:<br><br><table><tbody>  <tr><td>**Abort Sub Plan Execution**</td><td>The subplan will be aborted and the SubPlan task will finish aborting as soon as that's done.</td></tr>  <tr><td>**Wait For Sub Plan To Finish**</td><td>The SubPlan task will wait for the subplan to run to completion and then finish executing. If the subplan is being planned when the SubPlan task is aborted, it will wait until that plan is made and finishes executing, or until planning of the subplan fails.</td></tr> </tbody></table>

## Examples of usage

Here are a few examples of usage of the SubPlan task:

### Shooting while moving

![HTN for shooting while moving](_media/subplan_shoot_while_moving.png ':size=1200')

In this HTN, a character is moving towards a destination while at the same time shooting at the CurrentEnemy (the player). Whenever the shooting subplan succeeds or fails, it replans without affecting the rest of the plan. For example, if character is running behind a set of pillars, they will automatically stop firing when going behind a pillar and resume firing when coming out the other side. All this is done without interrupting the MoveTo task.

### Sequence of independent SubPlans

![HTN for shooting while moving](_media/subplan_sequence_of_subplans.png ':size=1200')

In this HTN, the character will first attack the CurrentEnemy (the player), and then run for cover. 
The top-level plan only has two tasks: the SubPlan tasks. Everything inside them is planned and executed when the containing SubPlan task is executed.

The "SubPlan Attack" task is configured to Succeed even if the subplan fails: this way the character will run for cover even if the attack fails.
This setup is the same as if the character had a state machine with two states: "attack" and "hide" and was alternating between them.

Note that thanks to the ["Replan If Location Changes" service](node-reference?id=replan-if-location-changes), if the CurrentEnemy moves a lot while the character is getting into shooting range, the SubPlan Attack will be replanned without aborting the overarching plan.

### Keeping a service active between plans

![A root service that is always active due to looping SubPlan](_media/subplan_root_service_always_active.png ':size=1200')

In this HTN, the top-level plan has only one task: a SubPlan task that loops forever. Any replanning is happening without interrupting the SubPlan task. This allows the service on the root node to run forever, without being interrupted by replans.

### Restarting from the current part of a long plan if failed

![Sequence of nested SubPlans](_media/subplan_restart_from_current_subplan.png ':size=1200')

It's possible to have long and complex plans with multiple sections, such that if one section fails, we can replan from the current section, instead of restarting the whole plan.

This HTN has three nested SubPlans, with these settings:
- **"Plan During Outer Plan Planning: True"**: this means that the subplan and the outer plan are planned together, as if they were one plan. So at first, the planner makes one large plan and then splits that up into four subplans: 
    - [SubPlan A]
    - [A1, A2, A3, SubPlan B]
    - [B1, B2, B3, SubPlan C]
    - [C1, C2, C3]
- **"On Sub Plan Failed: Loop"**: if planning or execution of this subplan failed, the SubPlan task won't fail. Instead it will make a new plan and execute that. It will keep repeating that until it finishes successfully. 

With this setup, if execution fails, the planner will replan from the deepest SubPlan we're in, not from the beginning of the HTN.

For example, if the task B2 fails, the planner will replan starting from the "SubPlan B" task, so the tasks [B1, B2, B3, SubPlan C, C1, C2, C3] will be replanned. Execution will restart from task B1.

If the task C2 fails, the planner will replan starting from the "SubPlan C" task, so the tasks [C1, C2, C3] will be replanned. Execution will restart from task C1.

### Waiting for subplan to finish while aborting

![SubPlan that wait until subplan finishes when the SubPlan task is aborted](_media/subplan_wait_until_subplan_finishes_when_aborted.png ':size=1200')

In this HTN a character steps out of cover, shoots, and steps back in.

The SubPlan task here has "On This Node Aborted: Wait for Sub Plan to Finish". That means if the outer plan is aborted, the SubPlan task will wait for the subplan to finish before finishing aborting. This makes sure that if we get aborted while doing the "Shoot Firearm" task, the "Step Back Into Cover" task will still be execute. This prevents the character from being stuck outside of cover.
