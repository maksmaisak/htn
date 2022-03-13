This page describes the built-in nodes of the plugin.

## Tasks

### Success

A utility task that instantly succeeds during planning.

Property|Description
---|---
**Cost**|The cost the plan step will have.

### Fail

A utility task that instantly fails during planning.

### Wait

A task that waits for a configurable amount of time.

Property|Description
---|---
**Wait Time**|How long to wait, in seconds.
**Random Deviation**|Allows adding a random time (plus or minus) to the **Wait Time** property.

### Move To

A task for moving the Pawn controlled by this AI towards a destination given by a specified Blackboard key.
The planning cost is determined by the estimated length (or cost) of the movement path.

Property|Description
---|---
**Blackboard Key**|The key to move to. Can be an Actor or a Vector.
**Acceptable Radius**|How close does the Pawn have to be to the target for the Task to succeed.
**Observe Blackboard Value**|If the goal in Blackboard changes during execution, the move will be redirected to the new location.
**Observed Blackboard Value Tolerance**|If the task is expected to react to changes to location represented by the **Blackboard Key**, this property can be used to tweak sensitivity of the mechanism. The value is recommended to be less than **Acceptable Radius**.
**Filter Class**|Which navigation data should be used? If set to None the default navigation data will be used.
**Allow Strafe**|Whether to enable the AI's ability to strafe while moving towards the destination.
**Reach Test Includes Agent Radius**|If enabled, the radius of the AI's capsule will be added to the threshold between the AI and goal location.
**Reach Test Includes Goal Radius**|If enabled, the radius of the goal's capsule will be added to the threshold between the AI and goal location.
**Allow Partial Path**|If enabled, allow the AI to use an incomplete path when the goal cannot be reached.
**Track Moving Goal**|If enabled, the path to the goal Actor will update itself when the Actor moves.
**Project Goal Location**|If enabled, the goal location will be projected on the Nav Mesh before using.
**Test Path During Planning**|If set, the planning cost of the task will be determined by the estimated pathfinding length (or cost), computed during planning. If not set, the distance between the start location and the goal location, projected to navmesh, will be used instead.
**Use Path Cost Instead Of Length**|Only relevant if **Test Path During Planning** is set. If set, estimated path cost will be used instead of path length when computing the planning cost of the MoveTo task.
**Force Plan Time String Pulling**|Only relevant if **Test Path During Planning** is set. String pulling is a post processing step of the pathfinding system, which certain pathfinding components (such as UCrowdFollowingComponent) disable. If this is set, string pulling will be enabled regardless for the plan-time pathfinding test.<br><br>Without string pulling the computed path length might be longer than the actual shortest path length, which may produce an inaccurate plan cost and an incorrect path end location. Enabling this avoids that issue.
**Cost Per Unit Path Length**|Cost multiplier for the planning cost of the task.

### Set Value

During planning, sets a specified value to a specified worldstate key.

Property|Description
---|---
**Blackboard Key**|The blackboard key to set the value of. All standard key types are supported.
**Value**|The value to assign to the key.

### Clear Value

During planning, clears the specified key in the worldstate.

Property|Description
---|---
**Blackboard Key**|The blackboard key to set the value of. All key types are supported.

### EQS Query

During planning, runs an [EQS query](https://docs.unrealengine.com/InteractiveExperiences/ArtificialIntelligence/EQS/) and puts the result in the specified key. 

Can be configured to output multiple results. In that case, multiple alternative plans are created.

[More information on the plugin's integration with the Environment Query System](eqs)

Property|Description
---|---
**Blackboard Key**|The Blackboard Key value to update based on the EQS results.
**Query Template**|The EQS asset to run.
**Query Config**|The additional parameters to include as part of the EQS test.
**EQSQuery Blackboard Key**|Optional Blackboard Key storing an EQS Query Template to use instead of specifying one under the **Query Template**.
**Run Mode**|<table><tbody>  <tr><td>**Single Best Item**</td><td>Pick the first item with the best score.</td></tr>  <tr><td>**Single Random Item from Best 5%**</td><td>Pick a random item with score 95% to 100% of max.</td></tr>  <tr><td>**Single Random Item from Best 25%**</td><td>Pick a random item with score 75% to 100% of max.</td></tr> <tr><td>**All Matching**</td><td>Get all items that match conditions.</td></tr> </tbody></table>
**Max Num Candidate Plans**|If the **Run Mode** is set to **All Matching**, the node will produce multiple candidate plan steps from the top items of the query result. This variable limits how many possible branches this node can produce.<br><br>For example, if the **Run Mode** is **All Matching**, this variable is 5, and the query produces 15 items, the top 5 of them will be used to create 5 alternative plan steps.<br><br>0 means no limit.

### Reset Cooldown

![HTNTask_ResetCooldown](_media/HTNTask_ResetCooldown.png ':size=800')

During execution, resets [Cooldown decorators](node-reference?id=cooldown).

Property|Description
---|---
**Affected Cooldowns**|<table><tbody>  <tr><td>**Cooldowns With Gameplay Tag**</td><td>Only affects cooldowns that have a gameplay tag that is equal to or is a child of the one in the Gameplay Tag property</td></tr>  <tr><td>**Cooldowns Without Gameplay Tag**</td><td>Only affects cooldowns without a gameplay tag specified.</td></tr>  <tr><td>**All Cooldowns**</td><td>All cooldowns are affected.</td></tr> </tbody></table>
**Gameplay Tag**|The tag to reset. Children of this tag are also affected.

### Reset Do Once

![HTNTask_ResetDoOnce](_media/HTNTask_ResetDoOnce.png ':size=800')

During execution, resets [Do Once decorators](node-reference?id=do-once).

Property|Description
---|---
**Affected Decorators**|<table><tbody>  <tr><td>**Do Once Decorators With Gameplay Tag**</td><td>Only affects Do Once decorators that have a gameplay tag that is equal to or is a child of the one in the Gameplay Tag property</td></tr>  <tr><td>**Do Once Decorators Without Gameplay Tag**</td><td>Only affects Do Once decorators without a gameplay tag specified.</td></tr>  <tr><td>**All Do Once Decorators**</td><td>All Do Once decorators are affected.</td></tr> </tbody></table>
**Gameplay Tag**|The tag to reset. Children of this tag are also affected.

## Decorators

### Blackboard

Checks a condition on the value of a key in the Blackboard/Worldstate.

Property|Description
---|---
**Blackboard Key**|The blackboard key to check the value of.
**Key Value**|The value to compare the value in **Blackboard Key** with. **Int**, **Float**, or **String** depending on the type of **Blackboard Key**.
**Key Query**|The check/comparison type to use, depending on the type of **Blackboard Key**: **Is Set**, **Is Not Set**, **Is Equal To**, **Is Not Equal To**, **Is Less Than**, **Is Less Than Or Equal To**, **Is Greater Than**, **Is Greater Than Or Equal To**.

> Enabling [**Check Condition on Tick**](decorator?id=condition-check-time) will make the decorator subscribe to blackboard change events instead of checking if the value changed every tick.

### Cooldown

A decorator node that bases its condition on whether a cooldown timer has expired. The cooldown begins [**on execution finish**](decorator?id=receiveexecutionfinish).

Property|Description
---|---
**Cooldown duration**|The duration in seconds for which the decorator's condition will be false after finishing.
**Gameplay Tag**|If not None, it will be possible to influence all decorators with this gameplay tag through the [**HTNTask_ResetCooldown**](node-reference?id=reset-cooldown) task or [**HTNExtension_Cooldown**](node-reference?id=cooldown-1) extension.
**Lock Even If Execution Aborted**|If true (default), the cooldown will lock even if execution was aborted.

### Distance check

Checks if the distance between two worldstate keys is within a certain numeric range.

Property|Description
---|---
**A**|First Blackboard key. Actor or Vector.
**B**|Second Blackboard key. Actor or Vector.
**Min Distance**|Minimum distance between the values of **A** and **B**.
**Max Distance**|Maximum distance between the values of **A** and **B**.

### Do Once

![HTNDecorator_DoOnce](_media/HTNDecorator_DoOnce.png ':size=400')

[**On execution finish**](decorator?id=receiveexecutionfinish), locks itself, so it will not pass during any subsequent planning. If a GameplayTag is specified, can be reset using that gameplay tag via the `SetDoOnceLocked` helper function of the [**HTNExtension_DoOnce extension**](node-reference?id=do-once-1) or using [**HTNTask_ResetDoOnce task**](node-reference?id=reset-do-once).

Property|Description
---|---
**Gameplay Tag**|If not None, it will be possible to lock/unlock all DoOnce decorators with this gameplay tag using the `SetDoOnceLocked` function of the [**HTNExtension_DoOnce extension**](node-reference?id=do-once-1). If None, the decorator will still work, but the only way to unlock it would be to call `ResetAllDoOnceDecoratorsWithoutGameplayTag` or `ResetAllDoOnceDecorators`.
**Lock Even If Execution Aborted**|If true, will lock the DoOnce even if the execution is aborted before finishing.
**Can Abort Plan Instantly**|When the decorator fails during plan execution, it will either abort the plan instantly (if ticked) or wait until a new plan is made (if unticked).

### Focus Scope

[**On execution start**](decorator?id=receiveexecutionstart), optionally sets the focus of the AIController to the value of the specified blackboard key.<br>
[**On execution finish**](decorator?id=receiveexecutionfinish), if "Restore Old Focus On Execution Finish" is enabled, restores the focus back to its original value.

Property|Description
---|---
**Set New Focus**|If true, will set the focus of the AIController to the value of the **Focus Target** blackboard key. Upon execution finish, the focus will be restored to the value it had on execution start regardless.
**Focus Target**|The blackboard key on which to focus. Actor and Vector keys are supported.
**Observe Blackboard Value**|If true, the decorator will respond to changes in the FocusTarget key.
**Restore Old Focus On Execution Finish**|If true, OnExecutionFinish focus will be restored to the value it had before entering this focus.
**Focus Priority**|AIControllers allow multiple focuses to be active at the same time. The Blueprint functions [SetFocus](https://docs.unrealengine.com/BlueprintAPI/AI/SetFocus/) and [SetFocalPoint](https://docs.unrealengine.com/BlueprintAPI/AI/SetFocalPoint/) use priority 2 (the highest — `Gameplay`). See `EAIFocusPriority`.

### Guard Value

A decorator for setting a value in the worldstate and/or later restoring it to its original value.

[**On plan enter**](decorator?id=receiveonplanenter) optionally sets the specified key in the worldstate to the specified value.<br>
[**On plan exit**](decorator?id=receiveonplanexit) optionally restores the key to the value it had before the decorator activated.
By default, the value is also restored if the decorator is aborted before properly completing.

Property|Description
---|---
**Blackboard Key**|The blackboard key to set and restore.
**Value**|The value to set to the blackboard key.
**Set Value On Enter Plan**|If set, the value will be set when the decorator becomes active during planning.
**Restore Value On Exit Plan**|If set, the value will be restored when the decorator becomes inactive during planning.
**Restore Value On Abort**|If set, the value will be restored when the decorator's execution is aborted.

### Modify Cost

Modifies the cost of the task it's on by multiplying by the specified factor and adding a bias term. The resulting cost cannot be negative. When attached to a structural node or a Subnetwork, the cost cannot be reduced.

Property|Description
---|---
**Scale**|The number to multiply the cost by.
**Bias**|The number to add to the multiplied cost. 

### Trace Test

The condition of this decorator passes based on a trace between two points (or actors) being blocked (by default must be blocked to pass).

When tracing from/to actors, they're automatically excluded from the trace test.

Property|Description
---|---
**Trace From**|The blackboard key with the location from which to trace. Can be an Actor or a Vector.
**Trace From Z Offset**|An offset added on the Z axis to the location to **Trace From**.
**Trace To**|The blackboard key with the location to which to trace. Can be an Actor or a Vector.
**Trace To Z Offset**|An offset added on the Z axis to the location to **Trace To**.
**Collision Channel**|The collision channel on which to trace.
**Use Complex Collision**|If set, the trace will be run against complex collision instead of simplified collision shapes.
**Ignore Self**|If set, the trace will ignore the AIController and its Pawn.
**Trace Shape**|The shape to trace: **Line**, **Box**, **Sphere**, **Capsule**.
**Trace Extent X/Y/Z**|Parameters for the shape defined by **Trace Shape**.
**Draw Debug Type**|Determines if and how debug lines will be displayed in the viewport: **None**, **For One Frame**, **For Duration**, **Persistent**.
**Debug Color**|The color of the debug lines before the hit location (or the end of the trace if nothing was hit).
**Debug Hit Color**|The color of the debug lines after the hit location.
**Debug Draw Time**|Time in seconds to keep the debug lines on screen when **Draw Debug Type** is set to **For Duration**.

## Services

### Replan If Location Changes

If the location of the specified blackboard key changes too much from what it was [**on execution start**](service?id=receiveexecutionstart), forces a replan.

Property|Description
---|---
**Blackboard Key**|The blackboard key with the location to track. Can be an Actor or a Vector.
**Tolerance**|Changes below this value will be ignored.
**Force Abort Plan**|If the location changes, should the current plan be aborted instantly instead of waiting until a new plan is made?
**Force Restart Active Planning**|If the location changes, but the AI is already planning, should the planning be restarted?

## Extensions

### Cooldown

Stores which [**Cooldown decorators**](node-reference?id=cooldown) and tags are on cooldown. Allows to query that information and (re)set cooldowns.
Provides the following functions:
![HTNExtension_Cooldown](_media/HTNExtension_Cooldown.png ':size=1200')

### Do Once

Stores which [**Do Once decorators**](node-reference?id=do-once) and tags are locked. Allows to query that information and lock/unlock Do Once decorators.
Provides the following functions:
![HTNExtension_DoOnce](_media/HTNExtension_DoOnce.png ':size=1200')

### SubNetwork Dynamic

Stores a map from GameplayTag to HTN used by [**SubNetwork Dynamic nodes**](subnetwork-dynamic.md). Allows to query and modify that map.
Provides the following functions:
![HTNExtension_SubNetworkDynamic](_media/HTNExtension_SubNetworkDynamic.png ':size=1200')
