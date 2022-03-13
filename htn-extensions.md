HTN Extensions are a way to add extra data to the HTN component in a way that persists between different plans. 

For example, which [**dynamic subnetworks**](https://maksmaisak.github.io/htn/#/subnetwork-dynamic) are associated with which gameplay tags, which [**DoOnce**](node-reference?id=do-once-1) or [**Cooldown**](node-reference?id=cooldown-1) tags are active, etc.

![HTN Extensions: Find, Add, Remove](_media/HTNExtensions_FindAddRemove.png ':size=800')

> To make a custom HTNExtension, make a subclass of `HTNExtension` (for C++) or `HTNExtension_BlueprintBase` (for Blueprints) and add arbitrary variables and/or functions to it. Use the `FindOrAddExtensionByClass` function to add the extension to an HTNComponent.

For examples of HTN Extensions, see [**HTNExtension_Cooldown**](node-reference?id=cooldown-1), [**HTNExtension_DoOnce**](node-reference?id=do-once-1), [**HTNExtension_SubnetworkDynamic**](node-reference?id=subnetwork-dynamic)