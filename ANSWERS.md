# Checkpoint Questions

1. **Why do we write `onPress={handlePress}` and not `onPress={handlePress()}`?**
   Writing `onPress={handlePress}` passes a reference to the function so React Native executes it only when the user taps the button. Writing `handlePress()` invokes the function immediately during render, which can cause unintended side effects or infinite render loops.

2. **What is the difference between `Button` and `Pressable`? When would you choose each one?**
   `Button` is a basic native component with fixed platform styling and no `style` prop, ideal for quick prototypes or standard system actions. `Pressable` is a flexible wrapper that accepts custom layouts, nested components, and press-state styling, making it the right choice for custom UI designs.

3. **What does the `style` function of `Pressable` receive and what does it return? Give an example.**
   It receives an object containing the boolean property `pressed` (`{ pressed }`) and returns a style object or an array of styles. Example: `style={({ pressed }) => [styles.button, pressed && styles.pressed]}`.

4. **Why can you not change a state variable directly (`isFollowing = true`) and what do you do instead?**
   Mutating a state variable directly does not notify React that the data changed, so the UI will not re-render. Instead, you must call the state setter function (e.g., `setIsFollowing(true)`) to schedule a component update.

5. **Why is `followers` not a second `useState`? What is a *derived value*?**
   A derived value is a value computed directly from existing state or props during render. Storing `followers` in a separate `useState` would duplicate data and risk synchronization bugs whenever `isFollowing` changes.

6. **What does *controlled input* mean for `TextInput`? Which two props make it controlled?**
   A controlled input means React state is the single source of truth for the text field's content. The two props that make it controlled are `value` (to display the state) and `onChangeText` (to update the state on every keystroke).

7. **Why is `selectedSkills.push(skill)` wrong when `selectedSkills` is state? Write the correct code.**
   Using `.push()` mutates the existing array in memory without changing its reference, so React will not detect a state change or re-render. The correct way is creating a new array: `setSelectedSkills([...selectedSkills, skill])`.