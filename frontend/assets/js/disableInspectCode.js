// for added security, to protect your code from being exploited by the developers to an extent. 
// Disable right-click context menu 
document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent default right-click context menu
});
// Disable common keyboard shortcuts for developer tools
document.addEventListener('keydown', (e) => {
    // List of key combinations to disable
    const forbiddenKeys = [
        { key: 'F12' },                                 // F12
        { ctrlKey: true, shiftKey: true, key: 'I' },    // Ctrl+Shift+I
        { ctrlKey: true, shiftKey: true, key: 'C' },    // Ctrl+Shift+C
        { ctrlKey: true, shiftKey: true, key: 'J' },    // Ctrl+Shift+J
        { ctrlKey: true, key: 'U' },                    // Ctrl+U
        { ctrlKey: true, key: 'S' },                    // Ctrl+S (optional, "Save as")
        { ctrlKey: true, shiftKey: true, key: 'i' },    // Ctrl+Shift+i
        { ctrlKey: true, shiftKey: true, key: 'c' },    // Ctrl+Shift+c
        { ctrlKey: true, shiftKey: true, key: 'j' },    // Ctrl+Shift+j
        { ctrlKey: true, key: 'u' },                    // Ctrl+u
        { ctrlKey: true, key: 's' }                     // Ctrl+s (optional, "Save as")
    ];
    // Check if the pressed key combination is in the forbidden list
    const keyCombination = forbiddenKeys.some(k => {
        return (k.key === e.key)
            && (k.ctrlKey === undefined || k.ctrlKey === e.ctrlKey)
            && (k.shiftKey === undefined || k.shiftKey === e.shiftKey);
    });
    if (keyCombination) {
        e.preventDefault(); // Prevent default action for these key combinations
    }
});