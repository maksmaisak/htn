
It's possible to debug plan execution in the editor similar to how debugging works for [Behavior Trees]().

![Visual debugging](_media/visual_debugging.png ':size=1200')

### Current plan visualization

It’s possible to select any character and see their current plan visually in the editor of the HTN they’re using. You can see which nodes are currently active, which nodes were part of the plan and which have yet to be executed.

Currently active/executing nodes are highlighted in green.
Nodes that are part of the current plan (and connections between them) are highlighted in yellow. Bright yellow for nodes in the future of the plan, and dull yellow for tasks which already have been executed.

?> You can select the currently debugged actor in the dropdown in the top left corner, but selecting the actor in the Viewport or the World Outliner also works. This works for both AIControllers and the Pawns they possess.

### Breakpoints

Much like with Behavior Trees, you can place breakpoints on nodes by pressing <kbd>F9</kbd>. 
When plan execution on the currently selected character reaches a node with a breakpoint, the editor pauses.

### Inspecting blackboard/worldstate values

The Blackboard tab on the bottom right shows the current values of the Blackboard by default.
By switching it to `Selected` mode and selecting a node that is part of the current plan, you can see what the worldstate will be at that point in the plan, as determined during planning.