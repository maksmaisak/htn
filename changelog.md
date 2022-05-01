This page contains release notes for updates of the plugin.

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
