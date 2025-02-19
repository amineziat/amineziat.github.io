// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Firebase Config (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAQW0cRH0ojOuGJHlKga7k0QMUoAS2uVAM",
    authDomain: "gamearticles-107b8.firebaseapp.com",
    databaseURL: "https://gamearticles-107b8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gamearticles-107b8",
    storageBucket: "gamearticles-107b8.firebasestorage.app",
    messagingSenderId: "138545072231",
    appId: "1:138545072231:web:9f273d8ee3db3d0dbd6cc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Quill Editor Setup
const quill = new Quill('#editor', {
  theme: 'snow'
});

// Save Article Function
document.getElementById('saveButton').addEventListener('click', () => {
  const title = document.getElementById('titleInput').value;
  const category = document.getElementById('categoryInput').value;
  const content = quill.root.innerHTML; // Get HTML content

  if (!title.trim() || !content.trim()) {
    alert("Title and content cannot be empty!");
    return;
  }

  // Firebase reference
  const articlesRef = ref(db, 'articles'); 

  // Save article
  push(articlesRef, {
    title: title,
    category: category,
    content: content,
    timestamp: Date.now()
  }).then(() => {
    alert("Article saved successfully!");
  }).catch(error => {
    console.error("Error saving article:", error);
  });
});
