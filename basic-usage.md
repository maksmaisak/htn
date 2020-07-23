!> This guide assumes you're familiar with Blueprint scripting, working with Blackboards, and have a basic understanding of [HTN planning](planning.md).

The main asset type is a Hierarchical Task Network asset, serving similar function to a Behavior Tree asset.
You can create an HTN asset in the Content Browser like this:

![Creating an HTN asset](_media/create_htn_asset.png ':size=800')

A Blackboard asset must be assigned to an HTN to make it usable.
An AIController running an HTN asset will use the specified asset for its Blackboard component and the planner will use it as [worldstate](planning?id=worldstates).

![Assigning a Blackboard to an HTN](_media/assign_blackboard_highlighted.png ':size=1200')

To make an AIController use HTN planning with a specific HTN asset, call the `Run HTN` function.

![Run HTN](_media/run_htn.png ':size=400')

The controller will add an `HTNComponent` (if not already present) that will create plans and execute them. 
Whenever a plan completes or aborts, it will begin making a new plan.

?> The `ForceReplan` function of `HTNComponent` can be used to start making a new plan regardless of executing an existing plan.

#### Advanced usage

Consider the [example project](https://github.com/maksmaisak/htn-example-project) for examples of usage of all main features of the plugin.
The project includes two maps with HTN-based characters:

- `SimpleTest` – a map with a character making the optimal plan to achieve a simple goal.
- `TacticsTest` – a map with two groups of characters fighting using guns and grenades, utilizing tactical reasoning in their planning.
