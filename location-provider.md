The `HTNLocationSource` struct is a way to provide locations to HTN nodes that is more flexible than using Blackboard Key Selectors. For example, it's used by the [DistanceCheck decorator](node-reference?id=distance-check) to get the two locations between which to measure the distance:

![Distance Check decorator and its settings](_media/HTNDecorator_DistanceCheck.png ':size=1200')

The decorator on the image above passes when the distance between these two locations is between 0 and 1000cm:
- The location of the controlled pawn at that point in the plan, offset upwards by 50cm
- The location of the head of the CurrentEnemy

The decorator itself doesn't know where the locations are coming from, that is handled by the location source struct itself. This is very flexible because the location sources of a node can be configured differently for different uses of the same node in different parts of the HTN. 

### Settings

Property|Description
---|---
**Blackboard Key**|The Blackboard Key from which to get the location. 
**Location Extraction Method**|How to extract a location from the worldstate key:<br><br><table><tbody>  <tr><td>**Location**</td><td>The location in the key (for vector keys) or the location of the actor in the key.</td></tr>  <tr><td>**Nav Agent Location**</td><td>The location on the ground of the actor in the key.</td></tr>  <tr><td>**Actor Eyes View Point**</td><td>The location returned by the GetActorEyesViewPoint() function of the actor in the key (typically the pawn's head)</td></tr> <tr><td>**Custom**</td><td>Returned by an instance of **HTNCustomLocationSource**. This allows for providing a custom getter function.</td></tr> </tbody></table>
**CustomSource**|You can create a subclass of **HTNCustomLocationSource** and override its **ProvideLocations** function. This will let you provide custom code to provide locations given a blackboard key. If **Location Extraction Method** is **Custom**, you'll be able to select that subclass for this property via a dropdown.
**Offset**|Offset to be applied to the extracted location.

### Usage

Location Sources can be used in both C++ and Blueprint nodes. 

#### Blueprints

For Blueprint nodes, it's a matter of adding a property of type HTNLocationSource to the node, and calling **Get Single Location from HTNLocation Source** or **Get Multiple Locations from HTNLocation Source**:

![Get Locations from HTN Location Source from Blueprint code](_media/location_provider_get_location_from_blueprint.png ':size=600')

#### C++

C++ usage is similar, but has key differences:
- `GetLocation`/`GetLocations` member functions of the `FHTNLocaitonSource` struct may be used instead of the Blueprint functions above.
- `InitializeBlackboardKeySelector` needs to be called in the node's constructor and `InitializeFromAsset` needs to be called from the node's `InitializeFromAsset` function (see `UHTNDecorator_DistanceCheck` for an example).