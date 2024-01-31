async function mainFunction() {
    try {
    await supabaseInsert('spieler', ['name'], ['alaalahu']); // Call your async function

    // The code here will only execute if myAsyncFunction completes without errors
    console.log("Async function completed successfully");
    } catch (error) {
    // Handle the error for the entire code block
    console.error("Error in mainFunction:", error);
    // Stop the code block execution if an error occurs
    return;
    }

    // Code here will only execute if there were no errors in the async function
    console.log("Resst of the code after async function");
}

mainFunction(); // Call the main function
