# Decorator node reference

Decorators are subnodes used to modify the plan-time and execution-time behavior of a standalone node, such as a task, a compound task, or a structural node.

![Decorators on a task](_media/decorator.png ':size=1200')

Decorators can be used for the following:
- Conditions
- Planning effects
- Modify task cost during planning
- Running code during plan execution

> Custom decorators can be made by creating a subclass of `UHTNDecorator_BlueprintBase` (for Blueprints) or `UHTNDecorator` (for C++).

## Condition check time

Conditions can be configured to be checked at any of these moments:

Property|Description
---|---
**Check Condition on Plan Enter**|During planning, when entering the scope of the decorator.
**Check Condition on Plan Exit**|During planning, when exiting the scope of the decorator. 
**Check Condition on Plan Recheck**|During plan execution, when the the future portion of the current plan is [rechecked](planning?id=plan-rechecking). If this is enabled, the condition is evaluated every tick for every future plan step in which this decorator is active.
**Check Condition on Tick**|During plan execution, while the decorator is active (see [Execution Scope](decorator?id=execution-scope) below).<br><br>By default the condition is checked every tick but can be made to update less often by changing the variables **Condition Check Interval** and **Condition Check Interval Random Deviation**. The condition will be checked at a random interval between **Condition Check Interval - Condition Check Interval Random Deviation** seconds and **Condition Check Interval + Condition Check Interval Random Deviation** seconds. This interval is recalculated after every condition check.<br><br>If **"Check Condition on Tick Only Once"** is enabled (only relevant when **Check Condition on Tick** is active), during execution the tick condition will only be checked once (when entering the decorator's scope during execution). The resulting value is cached and reused for all future ticks of this decorator in this plan. This is useful for decorators that report changes in their conditions in an event-based way (by calling [NotifyEventBasedDecoratorCondition on the HTNComponent](htn-component?id=notifyeventbaseddecoratorcondition)) instead of on tick, such as the [Blackboard decorator](node-reference?id=blackboard).

## Execution scope

A decorator is active for as long as the node it's on is active. 
This means different things for different standalone nodes:

- For a [primitive task](task.md) – while the task is executing. 
- For a [subnetwork](subnetwork.md) – while any task inside or under the subnetwork is executing.
- For a structural node – while any task within or under this HTN after this structural node is executing.
- For a root node – while any task inside or under the current HTN is executing.

The scoping rules are the same for [Services](service.md).

## Functions

### NotifyEventBasedCondition

![ForceReplan](_media/notify_event_based_decorator_condition.png ':size=400')

To be called by decorators that report changes in their condition in an event-based way instead of on tick (e.g., the [Blackboard decorator](node-reference?id=blackboard)). 

Parameter|Description
---|---
**Raw Condition Value**|The updated raw condition value (without any inversion applied to it even if "Inverse Condition" is enabled).
**Can Abort Plan Instantly**|If true, and this notify triggers a replan, it will be done instantly, like calling [ForceReplan](htn-component?id=forcereplan) with **Force Abort Plan** enabled.

The function returns true if this resulted in a replan.

### Replan

![Replan HTN Component](_media/replan_decorator.png ':size=400')

Forces the HTNComponent to start making a new plan to replace the current one. See the [Replanning](replanning.md) page for more details. 

## Overridable functions

### PerformConditionCheck

Called when testing if the underlying node can be added to the plan or executed. The `CheckType` parameter indicates what kind of check it is: during planning, during execution etc.

### ReceiveModifyStepCost

During planning, this can be used to modify the cost of the plan step this decorator is on.
Return the new cost of the plan step.

!> The cost must be non-negative. 
If the decorator is attached to a non-primitive node (like [SubNetwork](subnetwork.md) or [If](if.md)), the new cost must not be lower than the old cost.

### ReceiveOnPlanEnter

This provides an opportunity to change worldstate values during planning, before entering the underlying task or subnetwork.

!> This is only called if the condition check passed.

### ReceiveOnPlanExit

This provides an opportunity to change worldstate values during planning, after exiting the underlying task or subnetwork.

!> This is only called if the condition check passed.

### ReceiveExecutionStart

Called when execution of the underlying node begins execution.

### ReceiveTick

The tick function. By default it is called each tick for as long as the underlying task or subnetwork is executing.<br><br>By adjusting the variables **Tick Function Interval** and **Tick Function Interval Random Deviation** it is possible to make this function be called not every tick, but at a random interval between **Tick Function Interval - Tick Function Interval Random Deviation** seconds and **Tick Function Interval + Tick Function Interval Random Deviation** seconds. This interval is recalculated after every call to this function.

### ReceiveExecutionFinish

Called when execution of the underlying node finishes execution.

### ReceiveOnPlanExecutionStarted

Called when a plan containing this node begins executing.
Together with `ReceiveOnPlanExecutionFinished`, this can be used to lock resources or notify other characters/systems about what the AI indends to do in the plan before this node actually begins executing. (e.g. reserve a specific movement target to prevent others from moving to it).

?> If called from inside this function, the [worldstate manipulation functions](manipulating-worldstates.md) will work with the worldstate with which this plan step finished planning.<br>That worldstate cannot be modified further from this function.

### ReceiveOnPlanExecutionFinished

Called when a plan containing this node finishes executing, for any reason.
This is called even if the plan was aborted before this node could execute.

?> If called from inside this function, the [worldstate manipulation functions](manipulating-worldstates.md) will work with the worldstate with which this plan step finished planning.<br>That worldstate cannot be modified further from this function.
