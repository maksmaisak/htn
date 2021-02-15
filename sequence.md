The Sequence node is structural node with two outputs. 
The outputs are planned and executed in sequence, first the top output, then the bottom.
The fragment on the image below will first execute task A or B, then C.

![Subnetwork node example: A or B, then C](_media/sequence_a_or_b_then_c.png ':size=400')

Combine this with other structural nodes such as [AnyOrder](anyorder.md) to create complex behavior.
The fragment on the image below will first execute A **and** B, in no particular order, then C.

![Subnetwork node example: A and B, then C](_media/sequence_a_and_b_then_c.png ':size=400')

This node creates an [execution scope](decorator?id=execution-scope) for subnodes.