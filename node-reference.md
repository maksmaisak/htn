This page describes the built-in nodes of the plugin.

## Tasks

### Success

A utility task that instantly succeeds during planning.

Property|Description
---|---
**Cost**|The cost the plan step will have.

### Fail

A utility task that instantly fails during planning.

Property|Description
---|---
**Fail During Execution**|If true, will fail during execution, otherwise will fail during planning.
**Failure Message**|Debug reason for failure that will be logged to the [Visual Logger](vislog.md).

### Wait

A task that waits for a configurable amount of time.

Property|Description
---|---
**Wait Forever**|If true, the wait task will not complete until aborted.
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
**Always Repath When Blackboard Value Set**|If enabled, whenever the destination BB key is set, a new path will be calculated even if the location did not change. This is useful for peridocially recalculating the path (e.g., to weave around obstacles) by having a [Service](service.md) assign the destination periodically.
**Allow Strafe**|Whether to enable the AI's ability to strafe while moving towards the destination.
**Reach Test Includes Agent Radius**|If enabled, the radius of the AI's capsule will be added to the threshold between the AI and goal location.
**Reach Test Includes Goal Radius**|If enabled, the radius of the goal's capsule will be added to the threshold between the AI and goal location.
**Allow Partial Path**|If enabled, allow the AI to use an incomplete path when the goal cannot be reached.
**Track Moving Goal**|If enabled, the path to the goal Actor will update itself when the Actor moves.
**Require Navigable End Location**| If set, the goal location will need to be navigable (will need to be on the navmesh). Set this to false and "Allow Partial Path" to true if the destination is the center of a building that blocks the navmesh. In that case the pawn will move to a point as close as possible to the destination.<br><br>Note: this feature is only available in UE5.2 and up.
**Project Goal Location**|If enabled, the goal location will be projected on the Nav Mesh before using.
**Test Path During Planning**|If set, the planning cost of the task will be determined by the estimated pathfinding length (or cost), computed during planning. If not set, the distance between the start location and the goal location, projected to navmesh, will be used instead.
**Use Path Cost Instead Of Length**|Only relevant if **Test Path During Planning** is set. If set, estimated path cost will be used instead of path length when computing the planning cost of the MoveTo task.
**Force Plan Time String Pulling**|Only relevant if **Test Path During Planning** is set. String pulling is a post processing step of the pathfinding system, which certain pathfinding components (such as UCrowdFollowingComponent) disable. If this is set, string pulling will be enabled regardless for the plan-time pathfinding test.<br><br>Without string pulling the computed path length might be longer than the actual shortest path length, which may produce an inaccurate plan cost and an incorrect path end location. Enabling this avoids that issue.
**Cost Per Unit Path Length**|Cost multiplier for the planning cost of the task.

### Set Value

During planning, sets a specified value to a specified worldstate key. Supports all default key types:
- Bool
- Int
- Float
- Enum
- NativeEnum
- String
- Name
- Vector
- Rotator
- Object
- Class 

Property|Description
---|---
**Blackboard Key**|The blackboard key to set the value of. All standard key types are supported.
**Value**|The value to assign to the key.

### Clear Value

During planning, clears the specified key in the worldstate.

Property|Description
---|---
**Blackboard Key**|The blackboard key to set the value of. All key types are supported.

### Copy Value

During planning, copies the value from one worldstate key into another. Supports keys of any type. Fails during planning if the copying fails (e.g., if the selected keys don't have matching types)

Property|Description
---|---
**Source Key**|The blackboard/worldstate key to copy from.
**Target Key**|The blackboard/worldstate key to copy to.

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

### Replan

During execution, calls [**Replan**](task?id=replan). 

All [replan parameters](replanning?id=replan-parameters) are configurable on the task.

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

A decorator node that bases its condition on whether a cooldown timer has expired. The cooldown begins [**on execution finish**](decorator?id=receiveexecutionfinish), unless **Lock Cooldown** is disabled.

Property|Description
---|---
**Lock Cooldown**|If true (default), the cooldown will lock when execution of this decorator finishes.
**Lock Even If Execution Aborted**|If true (default) and **Lock Cooldown** is true, the cooldown will lock even if execution was aborted.
**Cooldown duration**|The duration in seconds for which the decorator's condition will be false after finishing.
**Random deviation**|If not zero, the cooldown duration will be in range `[CooldownDuration - RandomDeviation, CooldownDuration + RandomDeviation]`
**Gameplay Tag**|If not None, it will be possible to influence all decorators with this gameplay tag through the [**HTNTask_ResetCooldown**](node-reference?id=reset-cooldown) task or [**HTNExtension_Cooldown**](node-reference?id=cooldown-1) extension.

### Distance check

![HTNDecorator_DistanceCheck](_media/HTNDecorator_DistanceCheck.png ':size=1200')

Checks if the distance between two worldstate keys is within a certain numeric range.

Property|Description
---|---
**A**|The [HTNLocationProvider](location-provider.md) for the first location.
**B**|The [HTNLocationProvider](location-provider.md) for the second location.
**Distance Range**|The decorator will pass if the distance between **A** and **B** is in this range. The minimum and maximum values can be inclusive, exclusive, or open.
**Check Mode**|The way to measure the distance between **A** and **B**.<br><br><table><tbody>  <tr><td>**Distance 3D**</td><td>3D distance</td></tr>  <tr><td>**Distance 2D**</td><td>Distance if the Z of both locations was 0</td></tr>  <tr><td>**Distance Z (Signed)**</td><td>Signed vertical distance: (B.Z - A.Z). Will be negative if B is below A</td></tr> <tr><td>**Distance Z (Absolute)**</td><td>Absolute vertical distance</td></tr> <tr><td>**Capsule**</td><td>If there was a capsule centered at A with the specified half-height and radius, calculates the distance from B to the surface of that capsule. If B is inside the capsule, returns 0. Swapping A and B has no effect. When capsule radius is 0 (default), this is identical to **Distance 2D** when the points are *roughly* at the same height (less than **Capsule Half Height** difference) and similar to **Distance 3D** when the heights are different.</td></tr> </tbody></table>
**Capsule Half Height**|Only relevant when the **Check Mode** is **Capsule**. The half-height of the capsule to which the distance is measured.
**Capsule Radius**|Only relevant when the **Check Mode** is **Capsule**. The radius of the capsule to which the distance is measured.
**All Must Pass**|If **A** or **B** provide multiple locations (e.g. A is configured to produce the locations of all allies and B is configured to produce the locations of all enemies), the distance test will run for all combinations of the two. If "All Must Pass" is true, the decorator will pass if all of them pass. Otherwise if any of them pass. Inverting the decorator inverts the final value of the decorator, not the individual checks against combinations.

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

Supports the following key types:

Key Type|Behavior
---|---
**Vector**|Sets the focal point to the location represented by the vector in the key
**Object (Actor)**|Sets the focus to the actor in the key. The controller actor will keep focusing on the target actor even if it moves.
**Rotator**|Sets the focus to a location some distance away (`Rotation Key Look Ahead Distance`) in the direction of this rotator. This makes the controlled actor look in the direction of the Rotator. This location is updated each frame if `Update Focal Point From Rotator Key Every Frame` is enabled. The location is calculated away from the result of calling `GetPawnViewLocation()` on the controlled pawn.

Property|Description
---|---
**Set New Focus**|If true, will set the focus of the AIController to the value of the **Focus Target** blackboard key. Upon execution finish, the focus will be restored to the value it had on execution start regardless.
**Focus Target**|The blackboard key on which to focus. Actor and Vector keys are supported.
**Observe Blackboard Value**|If true, the decorator will respond to changes in the FocusTarget key.
**Restore Old Focus On Execution Finish**|If true, OnExecutionFinish focus will be restored to the value it had before entering this focus.
**Focus Priority**|AIControllers allow multiple focuses to be active at the same time. The Blueprint functions [SetFocus](https://docs.unrealengine.com/BlueprintAPI/AI/SetFocus/) and [SetFocalPoint](https://docs.unrealengine.com/BlueprintAPI/AI/SetFocalPoint/) use priority 2 (the highest — `Gameplay`). See `EAIFocusPriority`.
**Update Focal Point From Rotator Key Every Frame**|Only relevant when the Blackboard Key is a Rotator. If true, the focal point will be updated every frame so that the controlled pawn keeps looking in the same direction even as it moves.
**Rotation Key Look Ahead Distance**|Only relevant when the Blackboard Key is a Rotator. The focal point will be set this many centimeters away from the controlled pawn's viewpoint (`GetPawnViewLocation`) along the direction of the Rotator. 

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

### Replan

Triggers a [**Replan**](service?id=replan) with the parameters in the "Replan" category of the node's settings. 

By default is configured to trigger a ["Try To Adjust Current Plan"](replanning?id=plan-adjustment) kind of replan which is suitable for (e.g.,) trying to switch to the top branch of a [Prefer](prefer.md) node as soon as possible while executing the bottom branch.

### Replan If Location Changes

If the location of the specified blackboard key changes too much from what it was [**on execution start**](service?id=receiveexecutionstart), calls [**Replan**](service?id=replan) with the parameters in the "Replan" category of the node's settings.

Property|Description
---|---
**Blackboard Key**|The blackboard key with the location to track. Can be an Actor or a Vector.
**Tolerance**|Changes below this value will be ignored.

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
