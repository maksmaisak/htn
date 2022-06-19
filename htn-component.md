The HTN Component is the component that runs an HTN asset, controls planning and execution of plans. 
It is a component on the [AIController](https://docs.unrealengine.com/en-US/InteractiveExperiences/Framework/Controller/AIController/) of a character. 
This page describes some of the functions for manipulating the HTNComponent.

!> Note that it is not possible to have both an HTNComponent and a BehaviorTreeComponent on the same AIController at the same time. This is because Unreal Engine does not allow more than one [BrainComponent](https://docs.unrealengine.com/en-US/API/Runtime/AIModule/UBrainComponent/) on an AIController at the same time.

## RunHTN

![RunHTN](_media/run_htn.png ':size=400')

This is a global function to be called on an AIController. It automatically adds an HTNComponent if it wasn't there already:

Parameter|Description
---|---
**AIController**|The AIController on which to find or add an HTNComponent to run the HTN.
**HTNAsset**|The HTN asset for the HTNComponent to run. 

## StartHTN

![StartHTN](_media/start_htn.png ':size=400')

Starts a given HTN. If it's already running a different one, it will abort the currently executing plan and switch to the new HTN.

Parameter|Description
---|---
**HTN**|The HTN asset to start.

## StopHTN

![StopHTN](_media/stop_htn.png ':size=400')

Aborts the currently executing plan and stops using the current HTN.

Parameter|Description
---|---
**Disregard Latent Abort**|If true, will stop instantly, ignoring [tasks](task) that take multiple frames to abort

## ForceReplan

![ForceReplan](_media/force_replan.png ':size=400')

Forces the HTNComponent to start making a new plan to replace the current one.

Parameter|Description
---|---
**Force Abort Plan**|If true, it will abort the current plan before starting a new planning process. If false, it will start making a new plan and only abort the current one once that’s done.
**Force Restart Active Planning**|If true and it’s already in the middle of planning, it will restart that process and start planning from scratch.
**Force Defer to Next Frame**|If true, it will only abort the current plan and/or start new planning on the next frame.

## NotifyEventBasedDecoratorCondition

![ForceReplan](_media/notify_event_based_decorator_condition.png ':size=400')

To be called by decorators that report changes in their condition in an event-based way instead of on tick (e.g., the [Blackboard decorator](node-reference?id=blackboard)). 

Parameter|Description
---|---
**Decorator**|The decorator calling this. Decorators should pass a reference to Self here.
**Raw Condition Value**|The updated raw (without any inversion applied to it) condition value.
**Can Abort Plan Instantly**|If true, and this notify triggers a replan, it will be done instantly, like calling [ForceReplan](htn-component?id=forcereplan) with **Force Abort Plan** enabled.

The function returns true if this resulted in a replan.
