# Task node reference

A task node represents an atomic action an AIController can execute: move to point X, shoot firearm, etc. 
It encapsulates the state and behavior of this action during plan execution, as well as its preconditions and effects during planning.

> Custom tasks can be made by creating a subclass of `UHTNTask_BlueprintBase` (for Blueprints) or `UHTNTask` (for C++).

## Planning

When the planner tries adding a task to a plan, the [`ReceiveCreatePlanSteps`](#receivecreateplansteps) function is called. Here the task can check preconditions on a worldstate and and apply effects to it. The worldstate can be accessed via [a set of functions](manipulating-worldstates.md). 

![CreatePlanSteps of GrabFirearm](_media/grab_firearm_create_plan_steps.png ':size=1200')

### Submit Plan Step

If the given worldstate fits the preconditions, the task should apply its effects and call `SubmitPlanStep`. No action is needed if the preconditions don't fit. In this example the precondition is "having a valid Firearm in a specific key of the worldstate", and the effect is "putting that Firearm in another key of the worldstate".

#### Planned changes are applied during execution

By default, changes applied to the worldstate during planning are also applied to the blackboard during plan execution, but only when the task successfully **finishes** executing. 

This can be changed via the **"When To Apply Planned Changes"** property on the task. These are the possible values:

When To Apply Planned Changes|Description
---|---
Before Execution|Right before the task begins execution
After Execution Successful|After the task successfully finishes **(default)**
After Execution Aborted|After the task is aborted
After Execution Failed|After the task fails

?> This is a bitmask, so you can select multiple or none of the options.

#### Submitting multiple plan steps

It is possible to submit multiple alternative plan steps by calling `SubmitPlanStep` multiple times. Each call replaces the accessed worldstate with a fresh copy without the applied effects. This allows producing multiple candidate plans from a single task, each with a step with a different set of effects. Each alternative plan step will be considered separately and only one will become part of the final plan. 

By default, the planner will pick the candidate plan with the [lowest total cost](planning?id=example-costs). However, if `ProcessSubmittedPlanStepsInOrder` is enabled, each submitted step will only be considered if all the previous ones failed to produce a plan, similarly to the [Prefer node](prefer.md). 

## Execution

Task execution is exactly the same as with Behavior Tree Tasks:

The [`ReceiveExecute`](#receiveexecute) function is called when the function begins execution. 
If `FinishExecute` isn't called immediately, [`ReceiveTick`](#receivetick) will be called per tick until `FinishExecute` is called.

Task execution can be aborted at any time for various reasons. When that happens, [`ReceiveAbort`](#receiveabort)is called and the task continues being active (in a special "aborting" state) until `FinishAbort` is called.
If `ReceiveAbort` is not implemented, the task will be aborted immediately.

Regardless of how a task finished its execution (e.g., via a call to `FinishExecute` or due to being aborted), [`ReceiveOnFinished`](#receiveonfinished) is called in any case when task execution ends.

?> You can use the `IsTaskExecuting` and `IsTaskAborting` helper functions to verify the status of the task during execution.

## Limiting recursion

The `MaxRecursionLimit` property of task nodes (and standalone nodes in general) makes it possible to create recursion limits in recursive HTNs. This number limits the number of times a node may be included in a single plan. 0 means no limit.

## Functions

### FinishExecute

To be called at the end of task execution after receiving a call to [ReceiveExecute](task?id=receiveexecute).

### FinishAbort

To be called at the end of task execution after receiving a call to [ReceiveAbort](task?id=receiveabort).

### Replan

![Replan HTN Component](_media/replan_task.png ':size=400')

Forces the HTNComponent to start making a new plan to replace the current one. See the [Replanning](replanning.md) page for more details. 

## Overridable functions

### ReceiveCreatePlanSteps

Called during planning on the task object in the HTN asset. 
Check and/or modify information in the worldstate to produce any number of plan steps via `SubmitPlanStep`.

### ReceiveRecheckPlan

Called on a task instance inside a plan while verifying if the plan is still valid.
Check values in the worldstate and return true if the task can still be executed.
This is necessary because values in the worldstate at this point in the plan might be different due to changing conditions.

### ReceiveExecute

Entry point for execution. The task will stay active until [FinishExecute](task?id=finishexecute) is called, or the task is aborted.

### ReceiveTick

Tick function, called each tick (or per the `TickInterval` property) as long as the task is executing.

### ReceiveAbort

If overriden, task will stay active until [FinishAbort](task?id=finishabort) is called.
Otherwise the task will complete immediately when prompted to abort.

### ReceiveOnFinished

Called when the task definitively finished executing for any reason, including the AIController being destroyed.

### ReceiveOnPlanExecutionStarted

Called when a plan containing this node begins executing.
Together with `ReceiveOnPlanExecutionFinished`, this can be used to lock resources or notify other characters/systems about what the AI indends to do in the plan before this node actually begins executing. (e.g. reserve a specific movement target to prevent others from moving to it).

?> If called from inside this function, the [worldstate manipulation functions](manipulating-worldstates.md) will work with the worldstate with which this plan step finished planning.<br>That worldstate cannot be modified further from this function.

### ReceiveOnPlanExecutionFinished

Called when a plan containing this node finishes executing, for any reason.
This is called even if the plan was aborted before this node could execute.

?> If called from inside this function, the [worldstate manipulation functions](manipulating-worldstates.md) will work with the worldstate with which this plan step finished planning.<br>That worldstate cannot be modified further from this function.

### ReceiveDescribePlanStepToVisualLog

Called per frame on tasks that are in the future of the current plan (not executing yet but will be in the future).

Use this to log shapes to the [visual logger](vislog.md) on the "HTNCurrentPlan" category (given as parameter) to provide a visual representation of the current plan.

?> If called from inside this function, the [worldstate manipulation functions](manipulating-worldstates.md) will work with the worldstate with which this plan step finished planning.<br>That worldstate cannot be modified further from this function.

!> This is only called if the visual logger is recording.
