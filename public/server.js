const express = require("express");
const path = require("path");

const app = express();
const port = 3000;  // منفذ مختلف عن backend

// خدمة الملفات الثابتة من مجلد frontend الحالي
app.use(express.static(__dirname));

// لأي طلب، أرسل index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Frontend server started on port ${port}`);
    console.log(`📁 Serving from: ${__dirname}`);
    console.log(`🌐 Open: http://localhost:${port}`);
});