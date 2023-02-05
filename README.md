# Introduction

[Hierarchical Task Networks](https://en.wikipedia.org/wiki/Hierarchical_task_network) is a way to build AI that plans ahead instead of making decisions on a moment-to-moment basis.

![A character with its plan visualized](_media/bg.png ':size=1200')

Traditional AI techniques have characters make decisions on a moment-to-moment basis – be it with simple if statements, state machine transitions, or behavior tree branching points. Having no foresight, this may lead to suboptimal behavior or fail altogether. 

Planning-based AI can consider the consequences of their actions and model future states. 
Compared to other planning algorithms such as Goal-oriented Action Planning, HTN planning is more efficient and grants designers a lot more of control over the planning process. 

### Features

The plugin provides a suite of tools for creating, editing and debugging HTN-based AI.

- Node-based HTN graph editor
- Seamlessly using blackboard data as worldstate
- Ability to make custom Tasks, Decorators, and Services in both C++ and Blueprints
- Parallel planning
- Any-order planning
- Integration with the Visual Logger
- Integration with the Environment Query System
- Realtime debugging features

### A simple example

![A simple test situation](_media/simple_test_1.png ':size=1200')

The red character needs to shoot the tall yellow target. 
Before the character can shoot the target, they need to get a gun and some ammo for it, in no particular order.
There are two guns on the ground and two ammo crates in different locations.

There are multiple choices the character needs to make:
- Should it get a gun or ammo first? 
- Which ammo crate or which gun to go to?
- Where to shoot at the target from?

These choices affect how much the character will have to walk before shooting at the target, so only one possible sequencing of actions is the optimal one.

#### Traditional AI

A simple solution, easy to make with traditional AI would be:

1. Go to closest item (gun or ammo)
2. Go to the closest remaining item (gun if first went to ammo, ammo if first went to gun)
3. Go to the closest location from which the target can be shot. 

While workable and easy to implement, this solution will almost never produce the optimal sequence of actions. In this example, the character would go for the ammo crate on the right, then the gun on the left, then go back to the doorway on the right before shooting. This involves a lot of back-and-forth movement that could be avoided.

#### Optimal planning

The optimal plan is in fact to go to the gun and the ammo crate further away, and use the doorway next to them:

![The optimal plan](_media/simple_test_2.png ':size=1200')

?> The plan here is automatically visualized through the [Visual Logger](vislog.md).

With HTN it's easy to create a character AI that efficiently finds the optimal plan, with no more effort required than making a Behavior Tree. Here's the HTN asset that drives the character in this example:

![Simple Test HTN](_media/simple_test_htn.png ':size=1200')

This example is the "SimpleTest" map of the [example project](https://github.com/maksmaisak/htn-example-project). 
Here it is in action:

<div class="embed-responsive embed-responsive-16by9" style="max-width: 1200px;">
    <iframe src="https://www.youtube.com/embed/ARJzKhosmEI" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

### HTN for tactics

Suppose there is an FPS arena with a complex layout. There are two groups of characters fighting each other with guns and grenades. A character needs to approach the enemy while staying in cover, and optionally throwing grenades along the way.

There are myriad ways to go from point A to point B while moving from cover to cover. Every step of the way presents a unique choice: to go left or to go right, to run straight through or take a detour, to throw a grenade or to hunker down etc. The tactical consequences of each choice aren't obvious in the moment, so it's better to plan them out in advance. A planning-based AI is perfect for this kind of situation, as it finds the best (lowest-cost) plan even in a highly-branching decision space.

The [Environment Query System integration](eqs.md) allows the planner to efficiently consider a large number of tactical locations during planning.

This situation is implemented in the "TacticsTest" map of the [example project](https://github.com/maksmaisak/htn-example-project). Characters invent plans and continuously update them as the battlefield conditions change.

<div class="embed-responsive embed-responsive-16by9" style="max-width: 1200px;">
    <iframe src="https://www.youtube.com/embed/FHapYbv9vjE" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

## Getting started

The plugin is available on the [Unreal Marketplace](https://www.unrealengine.com/marketplace/en-US/product/29560d88937e4cd1a435f4b634890655).

For quick setup, check out the [Tutorials](tutorials.md) page.

For a deeper introduction to HTN planning in the plugin, check out [HTN planning overview](planning.md). 

## Support

If you have any questions or suggestions, feel free to share them on the official [Discord server](https://discord.gg/CQjRPnDNtc) or reach out by email to [max.maisak+support@gmail.com](mailto:max.maisak+support@gmail.com).
