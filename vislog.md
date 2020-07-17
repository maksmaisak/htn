
The [Visual Logger](https://docs.unrealengine.com/en-US/Gameplay/Tools/VisualLogger/index.html) is a built-in debugging tool that allows logging text and visual representations of state, bundled with timestamps and ownership information. The information is logged in a way that can be reviewed later by scrolling through a timeline.

The plugin integrates with the visual logger to provide various information about planning and plan execution.

## Visualizing the current plan

![Current plan visualization](_media/vislog.png ':size=800')

Any AIController executing an HTN plan logs the remaining part of the plan visually per frame, shown by the blue lines in the image above. From the image above you can see that the character's plan at the selected moment in time is:

1. Move to the gun on the ground
2. Pick it up
3. Go the ammo crate
4. Grab ammo from it
5. Move to shooting location
6. Shoot at the yellow target

?> Whether or not a task's name is shown on lines and locations in worldspace is determined by the `Show Task Name On Current Plan Visualization` property (true by default). Untick it to avoid  cluttering the visualization with planning-only tasks, such as [EQSQueries](eqs.md).

?> Custom tasks can log custom information during plan visualization by implementing the [`Receive Describe Plan Step To Visual Log`](task?id=receivedescribeplansteptovisuallog) function. An example of this is the `Shoot Firearm` task in the "SimpleTest" demo.

## Logging the planning process

![Log of a planning process](_media/planning_vislog.png ':size=800')

At the end of of the planning process, a traversal tree is logged, showing every candidate plan considered in the process, with cost and and consideration order.

Each line is a plan step, accepted or rejected, as considered for sequencing after the plan step one level above it.
This way any sequence of tasks from the top level down is a candidate plan considered by the planner. If planning succeeded, steps that are part of the final plan are prefixed with `>`.

Tasks that failed to add to the plan for one reason or another are shown with the reason for failing. For instance, `[#58 Failed decorator Has Ammo] Attack practice target` means that on step 58 of planning, the planner failed to add `Attack practice target` to the plan because the character wasn't going to have enough ammo at that point in that plan.