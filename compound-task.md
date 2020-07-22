
Unlike [primitive tasks](task.md), Compound (or SubNetwork) tasks represent entire sub-plans produced from a separate HTN. This allows for greater modularity and readability.

![Subnetwork node example](_media/attack-practice-target-subnetwork.png ':size=1200')
![HTN of the subnetwork node](_media/attack-practice-target.png ':size=1200')

Here a subnetwork task references an HTN. During planning this node will expand to a sub-plan produced from that HTN. If a particular part of an HTN is complex, but serves a single discernible goal, it is recommended to consider extracting that part into a sub-HTN.

?> A subnetwork task might even reference the same HTN it is contained it, allowing Task Networks to be recursive. 
Consider `HTN_SimpleTest` from the [example project](https://github.com/maksmaisak/htn-example-project): the "Recurse" node at the end references the HTN it is in.
<br><br>![Simple Test HTN](_media/simple_test_htn.png ':size=1200')