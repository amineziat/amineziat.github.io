// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQW0cRH0ojOuGJHlKga7k0QMUoAS2uVAM",
  authDomain: "gamearticles-107b8.firebaseapp.com",
  databaseURL: "https://gamearticles-107b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamearticles-107b8",
  storageBucket: "gamearticles-107b8.firebasestorage.app",
  messagingSenderId: "138545072231",
  appId: "1:138545072231:web:9f273d8ee3db3d0dbd6cc2"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Debugging Firebase Connection
console.log("🔥 Firebase Initialized:", firebase.apps.length > 0);
console.log("🔗 Database Object:", db);

// ✅ Initialize Quill Editor
const quill = new Quill('#editor-container', {
    theme: 'snow'
});

// ✅ Function to Save Article to Firebase
const saveArticle = () => {
    const title = document.getElementById("titleInput").value.trim();
    const content = quill.root.innerHTML;

    if (!title || !content) {
        alert("❌ Title and content cannot be empty!");
        return;
    }

    const article = {
        title: title,
        content: content,
        date: new Date().toISOString()
    };

    db.ref('articles').push(article)
        .then(() => {
            alert("✅ Article saved successfully!");
            document.getElementById("titleInput").value = "";
            quill.root.innerHTML = "";
        })
        .catch(error => {
            console.error("❌ Firebase Error:", error);
        });
};

// ✅ Attach Save Function to Button
document.getElementById("saveArticleBtn").addEventListener("click", saveArticle);
