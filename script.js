// Mock data for fire extinguishers
const extinguishers = [
    {
        "S.no": 1,
        "extinguisher_no": "000000000001",
        "location": "Main Hall",
        "extinguisher_type": "ABC",
        "extinguisher_kg": 5,
        "status": "Operational",
        "MFG": "2023-05-10"
    },
    {
        "S.no": 2,
        "extinguisher_no": "000000000002",
        "location": "Conference Room",
        "extinguisher_type": "CO2",
        "extinguisher_kg": 3,
        "status": "Operational",
        "MFG": "2022-07-15"
    },
    {
        "S.no": 3,
        "extinguisher_no": "000000000002",
        "location": "guduvancheryy",
        
    },
    // Add more extinguishers as needed...
];

// Function to format extinguisher details into plain text
function formatExtinguisherInfo(extinguisher) {
    return `S.no: ${extinguisher["S.no"]}
Extinguisher No: ${extinguisher["extinguisher_no"]}
Location: ${extinguisher["location"]}
Type: ${extinguisher["extinguisher_type"]}
Weight (kg): ${extinguisher["extinguisher_kg"]}
Status: ${extinguisher["status"]}
Manufacture Date: ${extinguisher["MFG"]}`;
}

// Function to open the text in Notepad
function openInNotepad(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extinguisher_info.txt'; // Filename for the text file
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to display QR codes for each extinguisher
function displayQRCodes() {
    const qrCodesContainer = document.getElementById("qr-codes");
    extinguishers.forEach((extinguisher, index) => {
        const qrData = formatExtinguisherInfo(extinguisher); // Create formatted text
        const qrElement = document.createElement("div");
        qrElement.className = "qr-code";

        // Create label for QR code
        const label = document.createElement("p");
        label.textContent = `QR ${index + 1}`; // Label for QR code
        qrElement.appendChild(label);

        // Generate QR code
        $(qrElement).qrcode({
            text: qrData, // Use the formatted text
            width: 128, // QR code width
            height: 128 // QR code height
        });

        // Append QR code to the container
        qrCodesContainer.appendChild(qrElement);
    });
}

// Initialize QR Code Reader
function initQrScanner() {
    const qrReader = new Html5Qrcode("qr-reader");
    qrReader.start(
        { facingMode: "environment" }, // Use back camera
        {
            fps: 10,    // Scans per second
            qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
            // QR code detected, open in Notepad
            openInNotepad(decodedText);
        },
        (errorMessage) => {
            console.log("QR Code scan error: " + errorMessage);
        }
    ).catch((err) => {
        console.error("Unable to start QR scanner", err);
    });
}

// Generate QR codes on page load
window.onload = () => {
    displayQRCodes();
    initQrScanner();
};
