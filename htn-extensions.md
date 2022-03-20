HTN Extensions are a way to add custom data and/or behavior to the HTN component in a way that persists between different plans. 

For example, which [**dynamic subnetworks**](https://maksmaisak.github.io/htn/#/subnetwork-dynamic) are associated with which gameplay tags, which [**DoOnce**](node-reference?id=do-once-1) or [**Cooldown**](node-reference?id=cooldown-1) tags are active, etc.

![HTN Extensions: Find, Add, Remove](_media/HTNExtensions_FindAddRemove.png ':size=800')

> To make a custom HTNExtension, make a subclass of `HTNExtension` (for C++) or `HTNExtension_BlueprintBase` (for Blueprints) and add arbitrary variables and/or functions to it. Use the `FindOrAddExtensionByClass` function to add the extension to an HTNComponent.

> From within an HTN extension, its HTN component can be accessed by the `GetHTNComponent` function.

For examples of HTN Extensions, see [**HTNExtension_Cooldown**](node-reference?id=cooldown-1), [**HTNExtension_DoOnce**](node-reference?id=do-once-1), [**HTNExtension_SubnetworkDynamic**](node-reference?id=subnetwork-dynamic)

## Overridable functions

### OnInitialize

Called when the extension is created

### OnHTNStarted

Called when a new HTN is set on the HTNComponent, before starting the first planning with the new HTN.

### OnTick

Called inside the component tick of the HTNComponent. If there is a plan being executed at the moment, this is called after ticking the currently executing nodes.

### OnCleanup

Called when the extension is about to be removed, either manually or because the HTNComponent is being destroyed.