When using [Source Control](https://docs.unrealengine.com/en-US/source-control-in-unreal-engine/), it's often useful to compare two revisions of the same file to see what changes were made to it. This can be done with HTN assets from the Diff menu in the HTN editor. The dropdown shows all past revisions in descenging order (more recent revisions are on top).

![CreatePlanSteps of GrabFirearm](_media/diff_dropdown.png ':size=1200')

Clicking on a selected revision opens the diff view, which shows the differences between the HTN asset as it was in the selected revision (on the left) and as it is now (on the right). The diff view shows a clickable list of all differences on the left and two graph views on the right. Nodes can be selected and their properties inspected in the Details tabs on the bottom.

![The Diff View showing the difference between two revisions of the same HTN assets](_media/diff_view.png ':size=1200')

Nodes that are different between the two revisions are highlighted in the graph view. The color of the highlighting is based on how they're different:
- Green: added nodes
- Red: removed nodes
- White: moved nodes
