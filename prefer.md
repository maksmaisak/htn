
The Prefer node is a structural node with two outputs. It plans one of its branches, such that the bottom branch is only taken if the top branch can't produce a plan.

This node can be used to build a priority-based system of goals in the top-level HTN. On the image below each SubNetwork represents a way of achieving a particular goal. The planner will try to make a plan for the first goal, if that doesn't work, it will try the second one and so on.

![Prefer nodes being used to create a priority list of goals](_media/prefer_goals.png ':size=800')

This node can also be used to make some parts of an HTN optional, so that the planner just skips them instead of failing completely. In the two examples below the task "Optional" will be added to the plan if possible, but otherwise skipped.

![A Prefer node being used to make a task optional](_media/prefer_optional_simple.png ':size=800')

![A Prefer node being used to make a task in a sequence of tasks optional](_media/prefer_optional_complex.png ':size=800')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.