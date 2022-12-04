The HTN Component is the component that runs an HTN asset, controls planning and execution of plans. 
It is a component on the [AIController](https://docs.unrealengine.com/en-US/InteractiveExperiences/Framework/Controller/AIController/) of a character. 
This page describes some of the functions for manipulating the HTNComponent.

!> Note that it is not possible to have both an HTNComponent and a BehaviorTreeComponent on the same AIController at the same time. This is because Unreal Engine does not allow more than one [BrainComponent](https://docs.unrealengine.com/en-US/API/Runtime/AIModule/UBrainComponent/) on an AIController at the same time.

## Functions

### RunHTN

![RunHTN](_media/run_htn.png ':size=400')

This is a global function to be called on an AIController. It automatically adds an HTNComponent if it wasn't there already:

Parameter|Description
---|---
**AIController**|The AIController on which to find or add an HTNComponent to run the HTN.
**HTNAsset**|The HTN asset for the HTNComponent to run. 

### StartHTN

![StartHTN](_media/start_htn.png ':size=400')

Starts a given HTN. If it's already running a different one, it will abort the currently executing plan and switch to the new HTN.

Parameter|Description
---|---
**HTN**|The HTN asset to start.

### StopHTN

![StopHTN](_media/stop_htn.png ':size=400')

Aborts the currently executing plan and stops using the current HTN.

Parameter|Description
---|---
**Disregard Latent Abort**|If true, will stop instantly, ignoring [tasks](task) that take multiple frames to abort

### Replan

![Replan HTN Component](_media/replan_htn_component.png ':size=400')

Forces the HTNComponent to start making a new plan to replace the current one. See the [Replanning](replanning.md) page for more details. 

