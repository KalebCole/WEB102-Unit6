/*
How will each filter be applied to the data? Consider whether filters will apply immediately upon selection or if a user must submit all changes at once. This affects how you manage state and trigger data updates.

How are the filter values determined and populated? Are rating, subjects, availableOnAudio, and languages static lists, or do they dynamically populate based on the dataset or user input? Understanding their source can influence how you set up the component's initial state and update logic.

How will multiple filters interact with each other? Determine whether applying multiple filters will narrow down the results cumulatively (AND logic) or inclusively (OR logic). This decision impacts how you write the filtering logic.

How will you handle UI representation of each filter? For example, will rating be a slider, subjects a set of checkboxes, availableOnAudio a toggle switch, and languages a dropdown? The UI components you choose will affect how users interact with the filters and their overall experience.

What will happen when a filter is reset or cleared? Decide if clearing one filter resets only that filter or all filters at once, and how this reset mechanism will be implemented in the UI.

How will changes to filter settings be communicated to the rest of the application? Consider whether you'll use a context, props, or another state management solution to lift the filter state up or down the component tree.

Do I want to pass this down into more components? If so, how will I manage the state of the filters and how will I pass them down to the components that need them?

How will the filter component interact with the rest of the application? Will it trigger a re-render of the book list when a filter is applied, or will it update the state of the parent component, which then triggers a re-render?
*/

export default function Filters({rating, subjects, availableOnAudio, languages, setFilters}){
    return(
        <div className="container">
        
        {/* rating section */}
        <div className="rating-section">
        <ul>
            {[1, 2, 3, 4, 5].map((rating) => (
            <li key={rating} onClick={() => setFilters((prevFilters) => ({...prevFilters, rating}))}>
                {rating}
            </li>
            ))}
        </ul>
        </div>
        
        {/* subjects section */}
        <div className="subjects-section">
          {/* subjects related content */}
        </div>
    
        {/* availableOnAudio Section */}
        <div className="audio-section">
          {/* audio related content */}
        </div>
    
        {/* languages section */}
        <div className="languages-section">
          {/* languages related content */}
        </div>
        </div>
    );
}