let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// Search notes by word, ignoring upper and lower case
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchWord)
  );
}

console.log(searchNotes("JAVASCRIPT")); // Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]
console.log(searchNotes("pizza")); // Expected: []

// Find the note with the most characters
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}

console.log(longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let savedNotes = notes;
notes = [];
console.log(longestNote()); // Expected: null
notes = savedNotes;

// Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }
console.log(countByCategory().work); // Expected: 1

// Get a summary of the notes
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}

console.log(getSummary()); // Expected: "5 notes: 2 personal, 1 work, 2 study."

savedNotes = notes;
notes = [savedNotes[0]];
console.log(getSummary()); // Expected: "1 note: 1 personal, 0 work, 0 study."
notes = savedNotes;

// Check whether a note is a duplicate
function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === normalizedText
  );
}

console.log(isDuplicate("  BUY MILK AND BREAD  ")); // Expected: true
console.log(isDuplicate("Go to the gym")); // Expected: false

// Add a new note if it passes all validation checks
function addNote(text, category) {
  if (typeof text !== "string") {
    console.log("Note was not added: text must be a string.");
    return false;
  }

  const trimmedText = text.trim();

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note was not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note was not added: duplicate note.");
    return false;
  }

  const validCategories = ["personal", "work", "study"];

  if (!validCategories.includes(category)) {
    console.log("Note was not added: invalid category.");
    return false;
  }

  const newId =
    notes.length === 0
      ? 1
      : Math.max(...notes.map((note) => note.id)) + 1;

  notes.push({
    id: newId,
    text: trimmedText,
    category: category,
  });

  console.log("Note added successfully.");
  return true;
}

console.log(addNote("Prepare for the presentation", "work")); // Expected: true
console.log(addNote("  BUY MILK AND BREAD  ", "personal")); // Expected: false
console.log(addNote("", "study")); // Expected: false
console.log(addNote("Learn Python", "invalid")); // Expected: false