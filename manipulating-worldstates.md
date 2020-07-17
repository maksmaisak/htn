
HTN nodes ([Tasks](task.md), [Decorators](decorator.md), [Services](service.md)) have access to a set of functions to manipulate [worldstates](planning?id=worldstates) during planning and execution.

![CreatePlanSteps of GrabFirearm](_media/grab_firearm_create_plan_steps.png ':size=1200')

- `GetWorldStateValueAs [X]` – takes a `BlackboardKeySelector` and returns a value
- `SetWorldStateValueAs [X]` – takes a `BlackboardKeySelector` and a value
- `ClearWorldStateValue` – takes a `BlackboardKeySelector`

> These functions read and write values of whichever worldstate is currently active. During planning they refer to the currently considered worldstate, i.e. a hypothetical future state. During plan execution they access the Blackboard of the AIController that is executing the plan containing this node.

### Supported types

Here's the full list of types supported by the `GetValue`/`SetValue` functions:

- `Object`
- `Actor`
- `Class`
- `Enum`
- `Int`
- `Float`
- `Bool`
- `String`
- `Name`
- `Vector`
- `Rotator`

### Helper functions

#### GetLocationFromWorldState

![Get location from worldstate](_media/get_location_from_worldstate.png ':size=300')

If the given key contains a `Vector`, returns it.<br>
If the given key contains an `Actor`, returns its location and the actor itself.<br>
Otherwise `Return Value` is set to false.

#### GetSelfLocationFromWorldState

A helper returning the value of `SelfLocation` key in the worldstate. 
This key is automatically added to every blackboard asset used for HTN planning and is automatically updated.

#### GetOwnersWorldState

Returns a `WorldStateProxy` – an object with the same access member functions as a Blackboard, but may refer to either a worldstate or a blackboard depending on whether the node is planning or executing.
