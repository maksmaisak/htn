
The [Visual Logger](https://docs.unrealengine.com/5.1/en-US/visual-logger-in-unreal-engine/) is a built-in debugging tool that allows logging text and visual representations of state, bundled with timestamps and ownership information. The information is logged in a way that can be reviewed later by scrolling through a timeline.

The plugin integrates with the visual logger to provide various information about planning and plan execution.

### Visualizing the current plan

![Current plan visualization](_media/vislog.png ':size=1200')

Any AIController executing an HTN plan logs the remaining part of the plan visually per frame, shown by the blue lines in the image above. From the image above you can see that the character's plan at the selected moment in time is:

1. Move to the gun on the ground
2. Pick it up
3. Go the ammo crate
4. Grab ammo from it
5. Move to shooting location
6. Shoot at the yellow target

On the bottom left, in the Status tab of the Visual Logger, there is a more detailed, text-based representation of the current plan, with the currently-executing step prefixed with `> `. This representation includes nodes like [SubNetwork](subnetwork.md) or [Sequence](sequence.md), not just tasks.

?> Whether or not a task's name is shown on lines and locations in worldspace is determined by the `Show Task Name On Current Plan Visualization` property (true by default). Untick it to avoid  cluttering the visualization with planning-only tasks, such as [EQSQueries](eqs.md).

?> Custom tasks can log custom information during plan visualization by implementing the [`Receive Describe Plan Step To Visual Log`](task?id=receivedescribeplansteptovisuallog) function. An example of this is the `Shoot Firearm` task in the "SimpleTest" demo.

### Logging the planning process

![Log of a planning process](_media/planning_vislog.png ':size=1200')

At the end of of the planning process, a planning tree is logged, compactly showing every candidate plan considered in the process. 

Each line is a plan step that was added (or failed to be added) to a candidate plan. It shows the order in which this node was considered, and the total cost of the candidate plan after adding this node. Under each node, one indentation level deeper are the nodes that were considered as successors to it. 

Every path from root to leaf of this tree is a distinct plan. If planning succeeded, steps that are part of the final plan are prefixed with `>`.

Nodes that failed to add to the plan for one reason or another are shown with the reason for failing. For instance, `[#36 Failed decorator Has Ammo] Attack practice target` means that on step 36 of planning, the planner failed to add the task `Attack practice target` to the plan because the decorator "Has Ammo" failed during planning (meaning the character wasn't going to have enough ammo at that point in that plan).