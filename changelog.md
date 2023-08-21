This page contains release notes for updates of the plugin.

## 1.12.0

- [Decorators](decorator.md) now have a configurable condition check interval and tick function interval. This can be used to improve performance by checking the condition of a decorator (and calling its tick function) at a randomized interval (e.g., every 0.2-0.3s) instead of every frame.
- Decorators whose conditions can't abort the plan (e.g., when they're in the False branch of an [If](if.md) node with `Can Conditions Interrupt False Branch` disabled) no longer have their condition evaluated during execution, as it would have no effect. This is purely an optimization and has no effect on behavior.
- The following types of properties in Blueprint nodes now automatically appear in the node description in the editor: Object, Class, Array, Set, Map, Float Range, Int Range
- Floating-point values no longer appear with many trailing zeros.

## 1.11.5

- Fixed variable initialization bug that would cause a crash in packaged builds.

## 1.11.4

- [Diff view](diff.md) improvement: if a property in a struct was changed, the diff view now shows which property it was instead of just showing the whole struct as changed. 
- Fixed a bug in the diff view where subobjects of an HTN node (e.g. an [HTNLocationSource](location-provider.md) on a [DistanceCheck](node-reference?id=distance-check) decorator) would always show up as changed.

## 1.11.3

- The [Focus Scope decorator](node-reference?id=focus-scope) now supports Rotator keys. A Focus Scope with a Rotator key will make the character face along the rotation specified in the Rotator key.

## 1.11.2

- Added support for Unreal Engine 5.2

!> Note to UE4.27 users: Since the release of Unreal Engine 5.2, the Marketplace no longer distributes updates to users of 4.27 and below. This update still works on 4.27, but to use it you need to install it manually. To do so, install the plugin into a newer version of Unreal Engine, then copy the plugin from “UE_5.x\Engine\Plugins\Marketplace\HTN” into the Plugins folder of your project and recompile using Visual Studio. Alternatively, upgrade your project to a newer version of Unreal Engine.

## 1.11.1

- Fixed crash when changing [dynamic subnetworks](subnetwork-dynamic) while executing a plan involving both dynamic subnetworks and [subplans](subplan.md).
- When changing dynamic subnetworks during planning, now checking for the planning status of all plan instances instead of just the root plan instance.
- Made the LogHTN category show up in the output log by default to make log files more useful (only messages with Log verbosity or above, not Verbose or VeryVerbose).

## 1.11.0

### Additions & Improvements

- It is now possible to [Diff](diff.md) different revisions of the same HTN asset when using [Source Control](https://docs.unrealengine.com/en-US/source-control-in-unreal-engine/). This allows for visualizing the changes made to HTN assets over time.
- Added a [Copy Value task](node-reference?id=copy-value) for copying one worldstate key into another during planning.
- Updated the Blackboard editor. It is now possible to group Blackboard keys into categories.
- Double-clicking an [EQSQuery](eqs.md) task now opens the EQS Query it contains.
- `UHTNNode` now has a `GetAssetToOpenOnDoubleClick` function that allows custom C++ nodes to allow opening an asset on double click.

### Bug fixes

- Fixed event-based decorators not working when placed on the root node of an HTN.
- Fixed crash when replanning due to a blackboard key being changed outside of an HTNComponent's Tick.
- Fixed the "Play", "Resume", "Stop" buttons in the HTN Editor not having icons.

### Deprecations

The following functions of HTNComponent are now deprecated and will be removed in a future update. You should instead use the matching functions on the [Cooldown Extension](node-reference?id=cooldown-1) and the [SubNetworkDynamic Extension](node-reference?id=subnetwork-dynamic). For more information, see [HTN Extensions](htn-extensions.md) and the deprecation messages on the functions themselves.
- `GetCooldownEndTime`
- `AddCooldownDuration`
- `GetDynamicHTN`
- `SetDynamicHTN`

## 1.10.0

- [Random and Random Weight](random.md) nodes allow for picking between multiple branches at random during planning:
    - It is possible to make some branches more likely to be picked than others
    - If one branch fails planning, it automatically falls back to another branch until a valid plan is produced (configurable)
- Improvements to the [DistanceCheck](node-reference?id=distance-check) decorator:
    - The min and max distances for the decorator passes are now specified as a Range that may be unbounded, inclusive, or exclusive (used to be always inclusive)
    - If the location sources provide multiple values, checks all combinations and passes if all combinations pass (default) or any combinations pass (if "All Must Pass" is disabled).
    - Added more ways to measure the distance: Distance 3D (used to be the only option), Distance 2D, Distance Z (Signed), Distance Z (Absolute), Capsule (see [node reference](node-reference?id=distance-check) for details)
- [Tasks](task?id=submitting-multiple-plan-steps) now have a "Process Submitted Plan Steps In Order" option: if a task calls SubmitPlanSteps multiple times in a row and this option is enabled, each alternate plan will only be considered if all the previous ones failed, similarly to a [Prefer node](prefer.md). The default behavior is to pick the option that produces the plan with the lowest cost.
- Fixed a Garbage Collection crash related to worldstate proxies retaining a pointer to an HTN Component that is different from the proxies' owner component.
- Blueprint nodes that have structs as public properties now display them more cleanly: with newlines and indents for the struct's variables instead of describing the entire struct in one line.
- Processing subnodes (decorators and services) no longer allocates memory on the heap in most cases, leading to slightly better performance.
- `UHTNStandaloneNode` now has a `GetNextNodes` function, allowing custom C++ nodes to decide which nodes after them are considered during planning.
- Removed functions that were deprecated in v1.9.0

## 1.9.2

- Fixed [TraceTest decorators](node-reference?id=trace-test) in the HTN asset retaining references to Play-in-editor actors in a Transient buffer, causing warnings related to Garbage Collection under rare circumstances.

## 1.9.1

- Fixed UE5.1 bug where an HTNComponent is not properly initialized if it belongs to an Actor Blueprint whose C++ base class creates the HTNComponent in its constructor.

## 1.9.0

This major update introduces [SubPlan tasks](subplan.md), [Location Sources](location-provider.md), as well as many bug fixes and improvements.

!> This update contains breaking changes for C++ projects and some function deprecations for Blueprint projects, make sure your project is backed up before updating.<br>The HTNDecorator_BlackboardBase::OnBlackboardKeyValueChange() function now also passes the NodeMemory pointer.
<br>Some existing Blueprint code (e.g., calls to ForceReplan functions) will get deprecation warnings but will still work as before. 

### Additions

- [SubPlan task](subplan.md) is a task that encapsulates an independent planning & execution process. SubPlan allow for easily implementing the following use cases and more:
    - Having a character move while shooting, such that the shooting part can get replanned without interrupting the movement.
    - Making a high-level plan and planning the individual parts as we get to them.
    - Making a long plan with sections, such that if we fail in one section, it will only replan from the beginning of that section without restarting from the very beginning.
    - More examples on the [documentation page on subplans](subplan.md).
- [DistanceCheck](node-reference?id=distance-check) now uses [HTNLocationSource](location-provider.md) instead of BlackboardKeySelector to get the locations to measure the distance between. Existing usages of this decorator are automatically fixed up for the new version. HTNLocationSource is a struct that allows for getting a location flexibly from a blackboard/worldstate key. For example, it allows for getting the location of the head or the feet of the actor in the key, and allows for providing a custom location getter. This struct can be used by custom nodes (including Blueprint ones) to read locations from the worldstate or elsewhere, as an alternative to BlackboardKeySelector.

### Bug fixes

- Fixed RunHTN creating a new HTNComponent if the existing one wasn't assigned as the BrainComponent to the AIController.
- Fixed subnodes not receiving OnExecutionFinish events if a task could not start execution because one of it's decorators' condition failed during execution.
- Fixed GuardValue decorator not restoring the value on plan abort in the above case.
- Fixed the looping secondary branch of a Parallel node only doing one loop if it finished execution instantly.
- Fixed worldstate changes applied at the end of task execution not triggering conditions of Blackboard Decorators.
- Fixed Blueprint Decorators and Services not having their latent actions (e.g., Delay nodes etc.) aborted if they don't implement ReceiveOnExecutionFinished
- Fixed decorators on the root node of an HTN not having their blackboard key selectors resolved during planning. This was causing all worldstate manipulation during planning to fail.
- Fixed crash caused by custom C++ node defining a node memory struct that inherits from the memory struct of a parent class.
- Fixed instanced Blackboard keys (such as String) not copying from Worldstate to Blackboard properly.
- Fixed subnodes on the root node of an HTN being given the wrong plan step ID during initialization.
- Fixed GuardValue decorator not restoring value when placed on the root node of an HTN.
- Fixed nodes not receiving the OnPlanExecutionFinish event if the plan was aborted due to StopHTN (e.g., when the HTNComponent is destroyed).
- Fixed StopHTN(bDisregardLatentAbort=True) being ignored if called during tick of the HTN component.
- Fixed HTNComponent still advancing to next tasks if paused from inside a task that finishes execution instantly.
- Fixed RunHTN not switching to the new HTN if the HTNComponent is already running one.
- Fixed the PlanExit condition check of a decorator failing when exiting a False branch of an If node during planning. This was causing the planning to fail.
- Fixed OnPlanEnter/OnPlanExit of decorators not being called under some circumstances when entering/exiting a False branch of an If node.
- Fixed being able to add decorators/services to other decorators/services in the editor via the right-click context menu.

### Improvements and other changes

- The [Fail](node-reference?id=fail) task can now be configured to fail during execution instead of planning and now logs a configurable failure message in both cases.
- The IsRunning function of HTNComponent is more reliable, no longer returning false during the gaps between planning and execution.
- [Plan recheck](planning?id=plan-rechecking) is now also ran before a plan begins executing.
- Services now receive OnExecutionFinish events before decorators. Combined with the fact that they get OnExecutionStart *after* decorators, the order of OnExecutionFinish calls is always opposite to the order OnExecutionStart calls for all subnodes.
- If the HTNComponent is paused, aborting current plan or starting a new one is deferred until the component is no longer paused.
- Plans with no tasks (degenerate plans) now instantly succeed instead of instantly failing.
- For [HTNExtensions](htn-extensions.md), Tick is now called before the current plan is ticked instead of after.
- The [Visual Logger](vislog.md) now shows the current plan in the Status tab. If there are multiple [subplans](subplan.md), it shows each subplan separately.

### Deprecations

Functions that were deprecated and will be removed in a future update.

- **ForceReplan** functions are now deprecated. Instead, use the new [**Replan**](replanning.md) function that takes a [HTNReplanParameters](replanning?id=replan-parameters) struct, which contains a debug reason string that will be logged in the Visual Logger and other settings. This function is available on the HTNComponent and on HTNNodes.
- **NotifyEventBasedDecoratorCondition** function of HTNComponent is now deprecated. Decorators now have a member function [**NotifyEventBasedCondition**](decorator?id=notifyeventbasedcondition) that should be called instead.

!> Note to UE4.26 users: Since the release of Unreal Engine 5.1, the Marketplace no longer distributes updates to users of 4.26 and below. This update still works on 4.26, but to use it you need to install it manually. To do so, install the plugin into a newer version of Unreal Engine, then copy the plugin from “UE_4.2x\Engine\Plugins\Marketplace\HTN” into the Plugins folder of your project and recompile using Visual Studio. Alternatively, upgrade your project to a newer version of Unreal Engine.

## 1.8.10

- Fixed crash caused by calling ForceAbort inside a call to AbortTask.
- Fixed crash when calling Unpossess on the AIController or DestroyActor on the Pawn inside a call to AbortTask.
- Fixed a rare crash when exiting a Play-in-Editor session caused by decorators in an HTN asset retaining a GC reference to an HTNComponent from the PIE session.
- In the [Visual Logger's](vislog) "Status" tab, when showing the currently active subnodes, their source HTN assets are now correctly displayed instead of the top-level HTN being executed.
- If a [task](task) calls FinishTask or AbortTask after already finishing, the call will be ignored and a warning will be logged in the [Visual Logger](vislog) and the Output Log
- Scoping rules for subnodes are handled in a more robust way now, fixing a few very rare corner cases where OnExecutionStart/Tick/OnExecutionFinish on [decorators](decorator) or [services](service) could be called twice or not at all.

## 1.8.9

- Fixed [Parallel](parallel) nodes finishing early if their primary branch contains a [Sequence](sequence) or [AnyOrder](anyorder) node.
- More consistent condition checking of [If](if) nodes with multiple decorators. Unexpected aborts of the false branch no longer happen. For the false branch to be aborted during execution checks, all decorators on the If node must have ["Check Condition On Tick"](decorator?id=condition-check-time) enabled. This is because all decorators' conditions must be true to switch the If from false to true.
- It is now possible to make decorators only check on the first tick of execution, instead of every tick. To do this, enable ["Check Condition On Tick Only Once"](decorator?id=condition-check-time) alongside ["Check Condition On Tick"](decorator?id=condition-check-time). This is useful for nodes that check their condition during execution via events instead of per tick, such as the [Blackboard decorator](node-reference?id=blackboard).
- It is now possible to specify a random deviation to the time of a [Cooldown decorator](node-reference?id=cooldown).
- By default, decorators will no longer have ["Check Condition On Plan Recheck"](decorator?id=condition-check-time) enabled, and the tasks [Success](node-reference?id=success), [Wait](node-reference?id=wait), [EQSQuery](node-reference?id=eqs-query) have cost 0 instead of 100. Existing nodes are not affected by this change.

## 1.8.8

- It is now possible to add comments to nodes in the HTN editor.
- The [example project](https://github.com/maksmaisak/htn-example-project) now supports Unreal Engine 5 and makes use of the [Prefer](prefer) and [Optional](optional) nodes.

## 1.8.7

- Fixed wrong tooltip on the Root node in the HTN editor.
- Fixed showing internal node name in the Details tab in the HTN editor on UE5.

## 1.8.6

- Fixed warnings for [SubNetworkDynamic](subnetwork-dynamic) when HTNFromWorldStateKey is None.
- Fixed subnodes sometimes not getting [ExecutionFinish](decorator?id=receiveexecutionfinish) when aborting the plan after a replan.
- Fixed FinishLatentTask being erroneously ignored if one task triggers the finish of the same task on another character.

## 1.8.5

- [SubNetworkDynamic nodes](subnetwork-dynamic) can now be configured to take the HTN from a blackboard/worldstate key during planning.
- Added parameters to the [SetDynamicHTN](subnetwork-dynamic) function: bForceReplanIfChangedNodesInCurrentPlan, bForceReplanIfChangedDuringPlanning. These used to be always true, now they're configurable parameters. 

## 1.8.4

- **The plugin now supports Unreal Engine 5.**
- Fixed crash when calling FinishLatentTask from inside `UHTNTask::AbortTask`. Now logs an error in the [Visual Logger](vislog) and ignores the illegal call.
- Fixed [HTNDecorator_Blackboard](node-reference?id=blackboard) not aborting immediately if they have ["check condition on tick"](decorator?id=condition-check-time) enabled and on [ExecutionStart](decorator?id=receiveexecutionstart) the condition is false.
- When calling `FinishExecute` when aborting or `FinishAbort` when not aborting from a Blueprint [task](task), a descriptive error is now logged in the [Visual Logger](vislog). 
- In the [Visual Logger](vislog), [plan recheck](planning?id=plan-rechecking) failure is now logged as Log instead of Error.

!> Note to UE4.25 users: Since the release of Unreal Engine 5.0, the Marketplace no longer distributes updates to users of 4.25 and below. This update still works on 4.25, but to use it you need to install it manually. To do so, install the plugin into a newer version of Unreal Engine, then copy the plugin from “UE_4.2x\Engine\Plugins\Marketplace\HTN” into the Plugins folder of your project and recompile using Visual Studio. Alternatively, upgrade your project to a newer version of Unreal Engine.

## 1.8.3

- [Plan rechecking](planning?id=plan-rechecking) no longer happens for plans that are being aborted.
- Fixed crash when calling [ForceReplan](htn-component?id=forcereplan) from inside StopHTN.
- Fixed crash when the primary branch of a [Parallel node](parallel) finishes the plan.
- Fixed subnodes not receiving [ExecutionFinish](decorator?id=receiveexecutionfinish) when the following nodes in the plan are only structural nodes without any tasks.
- Fixed [Parallel](parallel) not passing through immediately if the top branch is empty.
- Fixed subnodes on or above [Parallel nodes](parallel) receiving a duplicate [Tick event](decorator?id=receivetick) on the frame the top branch finishes execution.
- Fixed [DoOnce decorators](node-reference?id=do-once) not aborting immediately if they have ["check condition on tick"](decorator?id=condition-check-time) enabled and on [ExecutionStart](decorator?id=receiveexecutionstart) the condition is false.

## 1.8.2
- The plugin now compiles for UE5 Preview 2. Note that this means it no longer compiles for UE5 Early Access!
- [If](if) and [Scope](scope) nodes now have a name that includes the names of their decorators. This makes the [Visual Logger](vislog) output of the planning process more informative.
- Added the [Optional](optional) node. It will try to plan everything after it, but if that fails, will fall back to stopping at this node instead of failing planning altogether. It's equivalent to having a [Prefer](prefer) node that only uses the top branch.

## 1.8.1
- [HTN Extensions](htn-extensions) can now receive [Tick events](htn-extensions?id=ontick)
- The HTN Component now describes in the Status tab of the [Visual Logger](vislog) the currently executing/aborting tasks and their decorators and services.
- Fixed tasks/decorators/services not receiving Tick events while aborting.
- Added missing HTN_API statements to specific nodes and structures (notably [HTNTask_EQSQuery](node-reference?id=eqs-query)).

## 1.8.0
This major update introduces [HTN Extensions](htn-extensions), [Do Once decorators](node-reference?id=do-once), more features for [Cooldown decorators](node-reference?id=cooldown), and [persistent tick countdowns for services](service?id=persistent-tick-countdown) on top of general improvements and bug fixes.

### Additions
- [HTN Extensions](htn-extensions)
- Do Once:
    - [Do Once decorator](node-reference?id=do-once)
    - [Reset Do Once task](node-reference?id=reset-do-once)
    - [Do Once extension](node-reference?id=do-once-1)
- Cooldown:
    - [Reset Cooldown task](node-reference?id=reset-cooldown)
    - [Cooldown extension](node-reference?id=cooldown-1)

### Improvements

- [HTN Services](service) now have a ["Use Persistent Tick Countdown" option](service?id=persistent-tick-countdown)
- It is now possible to specify an (optional) gameplay tag on [Cooldown decorators](node-reference?id=cooldown)
- The following HTN nodes now have a descriptive node name by default:
    - [SubNetworkDynamic](subnetwork-dynamic)
    - [HTNDecorator_Blackboard](node-reference?id=blackboard)
    - [HTNDecorator_FocusScope](node-reference?id=focus-scope)
    - [HTNTask_EQSQuery](node-reference?id=eqs-query)
- The following is now displayed in the [Visual Logger](vislog) in the Status tab:
    - The current [dynamic subnetworks](subnetwork-dynamic) by Gameplay Tag
    - Active [cooldowns](node-reference?id=cooldown) 
    - Active [do once decorators and tags](node-reference?id=do-once)
- The [FocusScope decorator](node-reference?id=focus-scope) can now be configured to respond to changes in the `FocusTarget` Blackboard key
- The [FocusScope decorator](node-reference?id=focus-scope) can now be configured to not restore the old focus on [OnExecutionFinish](decorator?id=receiveexecutionfinish)
- The maximum plan length (100 steps by default) is now configurable on the HTNComponent

### Bug fixes

- Fixed Services getting the wrong DeltaTime on their first [Tick](service?id=receivetick) during execution. 
- Fixed "don't interrupt true branch" on an [If node](if) not working for event-based decorators (such as [HTNDecorator_Blackboard](node-reference?id=blackboard)).
- Fixed crash when calling ForceAbort when a task finishes due to an event (e.g. a timer or a Delay node) instead of from inside `HTNComponent::Tick`
- Fixed `HTNDecorator_BlackboardBase` unsubscribing all instances of the node [OnExecutionFinish](decorator?id=receiveexecutionfinish), instead of just the one that finished.
- Fixed the Scope node not showing the recursion limit in the editor 

## 1.7.2
- Fixed a bug where under some circumstances there would be a one-frame gap between a plan being made and actually starting executing.
- Fixed not picking the correct navigation filter during plan-time pathfinding of the [MoveTo task](node-reference?id=move-to).
- Fixed the "Unrecognized tab" issue in UE5 Early Access.

## 1.7.1
- Fixed subnodes ([decorators](decorator) or [services](service)) on [Parallel](parallel), [Sequence](sequence), and [AnyOrder](anyorder) nodes (and above them in the plan) receiving duplicate execution start/tick/finish events (one for each of their two branches).

## 1.7.0
- All nodes (both Blueprint and C++) now have [OnPlanExecutionStarted](task?id=receiveonplanexecutionstarted)/[Finished](task?id=receiveonplanexecutionfinished) overridable functions. These are called on a node when a plan containing that node starts/finishes execution. This allows nodes to lock resources and notify other systems about what they intend to do during the plan even before they actually begin execution.
For example, it's now possible to have a decorator on a MoveTo task do something to prevent other characters from picking the same movement location OnPlanExecutionStarted, and stop that effect OnPlanExecutionFinished (and possibly [OnExecutionFinish](decorator?id=receiveexecutionfinish)).
- Fixed calls to [SetDynamicHTN](subnetwork-dynamic) sometimes not triggering a replan when the affected [SubNetworkDynamic](subnetwork-dynamic) node is part of the current plan.

## 1.6.0
This update focuses on improving debugging of the planning process.
- Tasks and structural nodes can now provide a description of the submitted plan step when calling SubmitPlanStep. This description will be shown in the [visual logger](vislog) next to the node name.
- If a task doesn't produce any plan steps during plannig, it can now provide the reason for that by calling SetPlanningFailureReason inside CreatePlanSteps. This will be shown in the [visual logger](vislog).
- The following nodes now use the above features to provide more information about planning in the visual logger: [Prefer](prefer), [AnyOrder](anyorder), [If](if), [EQSQuery](node-reference?id=eqs-query), and [MoveTo](node-reference?id=move-to). They provide a description of the submitted plan steps and/or specify a reason why no plan steps were produced. For example, the EQSQuery task will show which item was selected.
- The cost of [Wait](node-reference?id=wait) and [EQSQuery](node-reference?id=eqs-query) is now configurable (was 100 before).
- Fixed compilation warnings in UE5 Early Access (if you use `ue5-main` instead, some warnings are still possible) .

## 1.5.0

- Added [Prefer node](prefer)
- Added [Fail task](node-reference?id=fail)
- Added `OnPlanExecutionStarted`/`OnPlanExecutionFinished` events to HTNComponent. Both Blueprint and native C++ versions are available.
- The HTNComponent can now be manually added as a default component in an Actor Blueprint.
- Fixed "finished plan" messages not being logged in the [Visual Logger](vislog) if the final task didn't complete instantly.
- Fixed an issue with some structural nodes where the top branch would be taken instead of the bottom branch if the bottom branch is empty.
- Moved C++ classes of structural nodes into a "Nodes" folder. If you are extending the plugin via C++, some #includes might need to be changed.

## 1.4.5
- Fixed instances of UWorldStateProxy pointing to the wrong HTNComponent if it was added in the C++ constructor of an Actor class.

## 1.4.4
- Fixed crash if the secondary branch of a [Parallel](parallel) node can’t abort immediately.
- Fixed [Parallel](parallel) nodes never finishing under some circumstances.
- Safer iteration over plan steps pending execution, avoiding a possible memory issue.

## 1.4.3
- Fixed crash when calling ForceReplan from inside [OnPlanExit](decorator?id=receiveonplanexit) of a [decorator](decorator).
- Fixed warnings when compiling with clang for UE5 Early Access.
- Added the `bCanInterruptTrueBranch` setting to [If](if) nodes (same as `bCanInterruptFalseBranch`, but for the true branch).

!> Note to UE4.24 users: Since the release of Unreal Engine 4.27, the Marketplace no longer distributes updates to users of 4.24 and below. This update still works on 4.24, but to use it you need to install it manually. To do so, install the plugin into a newer version of Unreal Engine, then copy the plugin from “UE_4.2x\Engine\Plugins\Marketplace\HTN” into the Plugins folder of your project and recompile using Visual Studio. Alternatively, upgrade your project to a newer version of Unreal Engine. 

## 1.4.1 - 1.4.2
- Fixed compilation for UE5 Early Access on Mac.

## 1.4.0
- The plugin now compiles for UE5 Early Access out of the box. Just copy the HTN folder from `UE_4.2x\Engine\Plugins\Marketplace\HTN` to `/[Project Root]/Plugins/` and recompile the plugin.
- Added the [Set Value task](node-reference?id=set-value).
- Added the [Clear Value task](node-reference?id=clear-value).
- Added the [Guard Value decorator](node-reference?id=guard-value).
- The [TraceTest decorator](node-reference?id=trace-test) now has settings for visualizing the traces in the viewport just like the Blueprint functions Line/Box/Sphere/CapsuleTraceByChannel. 

## 1.3.5
- Added the GetCurrentHTN function to HTNComponent.

## 1.3.4
- If a [decorator](decorator) on a structural node (such as [If](if), [Scope](scope), [AnyOrder](anyorder) etc.) changes the worldstate during planning, those changes will now be properly applied to the blackboard during plan execution.

## 1.3.3
- Fixed crash in some HTN assets where a structural node doesn’t have any tasks assigned after it.
- Fixed ForceReplan restarting active planning task even if ForceRestartPlanning is false.

## 1.3.2
- Fixed crash when switching to an HTN with a different Blackboard.
- Fixed crash when the secondary branch of a [Parallel](parallel) node has no primitive tasks (i.e. only structural nodes like [If](if)).

## 1.3.1
- The following functions of HTNComponent are now exposed to Blueprints: HasActivePlan, IsPlanning, IsWaitingForAbortingTasks.
- Fixed a Blackboard observer-related crash on UE4.25 and below.
- Plan-time failures in the [MoveTo task](node-reference?id=move-to) are now logged as Warnings instead of Errors.

## 1.3.0
- Added the [FocusScope decorator](node-reference?id=focus-scope).
- Added the [Scope node](scope).
- HTN nodes now have tooltips in the HTN editor.
- [Cooldown decorators](node-reference?id=cooldown) attached to [If](if) nodes no longer lock up if the false branch was taken.
- Fixed a missing `#include` causing a compile error under certain circumstances.

## 1.2.5
- Fixed crash related to [Blackboard decorators](node-reference?id=blackboard) on UE4.25 and below.

## 1.2.4
- Fixed [Blackboard decorators](node-reference?id=blackboard) unintentionally aborting the “else” branch on [If](if) nodes.

## 1.2.3
- Added AIController and Pawn as inputs to [Receive Create Plan Steps](task?id=receivecreateplansteps).
- Fixed [EQS Query](node-reference?id=eqs-query) config not working properly.
- [Blackboard decorators](node-reference?id=blackboard) now check blackboard values in an event-based way instead of per tick, improving performance.

## 1.2.2
- Added support for Unreal Engine 4.26.
- Fixed crash when trying to write to a read-only worldstate (e.g. during plan recheck).

## 1.2.1
- The [MoveTo task](node-reference?id=move-to) now correctly supports partial paths to unreachable targets.
- Added a "Force Plan Time String Pulling" option to the [MoveTo task](node-reference?id=move-to) for more accurate navigation planning for crowd following pawns
- Fixed crash after StopHTN is called while there is a plan pending execution. 

## 1.2.0
- Added the [SubNetwork Dynamic node](subnetwork-dynamic).
- Fixed custom non-Task nodes not showing up on the "add node" menu in the HTN editor.

## 1.1.3
- Fixed [MoveTo tasks](node-reference?id=move-to) occasionally failing during planning on uneven terrain
- If "Test Path During Planning" is disabled, the planning cost of a [MoveTo task](node-reference?id=move-to) will be determined by the distance between the start location and the goal location

## 1.1.2
- Fixed AIControllers that never possessed a Pawn failing to start planning
- [Blackboard decorators](node-reference?id=blackboard) now display a default name based on their condition

## 1.1.1
- Fixed [Modify Step Cost](decorator?id=receivemodifystepcost) in Blueprint [decorators](decorator) not working
- [Modify Step Cost](decorator?id=receivemodifystepcost) can now be used to increase costs of [SubNetwork nodes](subnetwork) and other non-primitive nodes
- Removed the vestigial Search tab of the HTN editor 

## 1.1.0
- Added the [Sequence node](sequence).
- Significant refactoring and cleanup of planning/execution, making creating custom non-task nodes from C++ possible.

### Improvements
- [SubNetwork](subnetwork) nodes are now shown with the name of their subnetwork asset by default.
- Blueprint nodes are now shown with a cleaned version of the filename by default. For example, if a Blueprint [task](task) is called “HTNTask_DoSomething”, the default name of this task shown in editor will be “DoSomething”.

### Bug fixes
- Fixed crash caused by a missing branch in [If](if) nodes
- Fixed crash caused by providing a negative cost in a custom [task](task) or [decorator](decorator). Now it resets to 0 and logs a warning to [vislog](vislog) and output log.
- The "recursion limit" property is now only part of standalone (non-[decorator](decorator) and non-[service](service)) nodes.

## 1.0.3
- Fixed crash when an [If](if) node fails to produce successor tasks when one or more of the branches is empty.
- Fixed compilation for Linux.

## 1.0.2
- Fixed missing Category for some UFunctions.

## 1.0.1
- Plan memory is now zero-initialized (was uninitialized before, causing memory issues).

## 1.0.0
Initial release.
