
The If node is a structural node with two outputs. If all of its decorator conditions pass during planning, planning takes the top branch, the bottom branch otherwise.

![If node](_media/if.png)

It keeps checking the decorators during execution, so it can interrupt plan execution when conditions change. In this example, the character might be busy executing the true branch, but then a grenade gets close to them.
The condition becomes false, and the whole plan gets aborted, so the character comes up with a new plan to run for cover.

!> During the ["on Tick"](decorator?id=condition-check-time) condition checking, the False branch can only ever be interrupted if *all* decorators on the If node become true. For that to happen, all decorators must either have ["Check Condition on Tick"](decorator?id=condition-check-time) enabled or [notify of their condition via an event](htn-component?id=notifyeventbaseddecoratorcondition). If any of the decorators on the If node don't have "Check Condition On Tick" enabled, the false branch will not be aborted even if the other decorators turn true.

?> You can untick the `Can Conditions Interrupt False Branch` property to prevent the false branch from being aborted due to changing decorator conditions. 
In this example that makes the character keep running for cover even when out of grenade range.<br><br>Likewise for the true branch with the `Can Conditions Interrupt True Branch` property.

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.

## Plan Adjustment

The If node can be configured to participate in [Plan Adjustment](replanning?id=plan-adjustment) via its **"Plan Adjustment Mode"** setting with the following options:

Plan Adjustment Mode|Description
---|---
**No Adjustment Allowed**|When trying to adjust the current plan, the plan is not allowed to diverge from the current plan at this node.<br>If the conditions of the decorators of the If node were true in the current plan but are false now (or vice versa), planning just fails here.
**Try Switch To True Branch**|When trying to adjust the current plan, it counts as a divergence if the current plan took the false branch but the new plan takes the true branch.
**Try Switch To False Branch**|When trying to adjust the current plan, it counts as a divergence if the current plan took the true branch but the new plan takes the false branch.
**Try Switch To Other Branch**|When trying to adjust the current plan, it counts as a divergence if the new plan takes a different branch compared to the current plan.
